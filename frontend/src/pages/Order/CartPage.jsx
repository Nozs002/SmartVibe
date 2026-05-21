import React, { useState, useEffect } from 'react';
import '../../styles/CartPage.css';
import { getDataWithCondition, putData, deleteData } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (!customer) {
      return;
    }
    const fetchCartItems = async () => {
      try {
        const response = await getDataWithCondition('/cart/getCartItem', {customerId: customer.id });
        setCartItems(response);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  // Xử lý chọn/bỏ chọn 1 sản phẩm
  const handleSelectItem = (id) => {
    setSelectedIds((prev) => {
      return prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id];
    });
  };

  // Xử lý chọn tất cả
  const handleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([]); // Bỏ chọn hết
    } else {
      setSelectedIds(cartItems.map(item => item.id)); // Chọn hết
    }
  };

  // Cập nhật số lượng
  const updateQuantity = async (id, delta) => {
    try {
      const currentItem = cartItems.find(item => item.id === id);
      if (!currentItem) return;
      const newQuantity = currentItem.quantity + delta;
      if (newQuantity < 1) return;
      currentItem.quantity = newQuantity;

      // CALL BACKEND
      await putData('/cart/updateQuantity', currentItem);

      // UPDATE FRONTEND
      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  // Xóa sản phẩm
  const removeItem = async (id) => {
    try {
      const currentItem = cartItems.find(item => item.id === id);
      if (!currentItem) return;
      await deleteData('/cart/deleteCartItem', currentItem);
      setCartItems(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(itemId => itemId !== id)); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToCheckout = () => {
    if (selectedIds.length === 0) return;

    // Lọc ra danh sách các item cụ thể được check chọn từ giỏ hàng
    // và chuẩn hóa cấu trúc dữ liệu gửi đi sao cho khớp với form đơn hàng nhận
    const itemsToBuy = cartItems
      .filter(item => selectedIds.includes(item.id))
      .map(item => ({
        id: item.productDTO.id, // ID sản phẩm
        name: item.productDTO.name,
        quantity: item.quantity,
        price: item.productDTO.basePrice
      }));

    // Chuyển hướng sang trang thanh toán kèm theo dữ liệu thông qua state
    navigate('/checkout', { 
      state: { cartItems: itemsToBuy } 
    });
  };

  // Tính toán tổng tiền của CÁC SẢN PHẨM ĐƯỢC CHỌN
  const selectedItems = (cartItems || []).filter(item => selectedIds.includes(item.id));
  const totalItemsCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.productDTO.basePrice * item.quantity), 0);

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-header">
        <h2>Giỏ hàng của bạn</h2>
        <p>Kiểm tra lại các sản phẩm trước khi tiến hành thanh toán</p>
      </div>

      <div className="cart-container">
        {/* THANH TIÊU ĐỀ CỘT */}
        <div className="cart-row-header">
          <div className="col-checkbox">
            <input 
              type="checkbox" 
              checked={cartItems.length > 0 && selectedIds.length === cartItems.length}
              onChange={handleSelectAll}
            />
          </div>
          <div className="col-product">Sản Phẩm</div>
          <div className="col-price">Đơn Giá</div>
          <div className="col-quantity">Số Lượng</div>
          <div className="col-total">Số Tiền</div>
          <div className="col-action">Thao Tác</div>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">Giỏ hàng đang trống</div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <div className="col-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </div>
                
                <div className="col-product">
                  <img src={item.productDTO.thumbnail} alt={item.productDTO.name} className="item-img" />
                  <span className="item-name">{item.productDTO.name}</span>
                </div>

                <div className="col-price">{item.productDTO.basePrice.toLocaleString()} ₫</div>

                <div className="col-quantity">
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>

                <div className="col-total highlight-price">
                  {(item.productDTO.basePrice * item.quantity).toLocaleString()} ₫
                </div>

                <div className="col-action">
                  <button className="btn-delete" onClick={() => removeItem(item.id)}>Xóa</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* KHU VỰC VOUCHER TƯƠNG TỰ SHOPEE (Chỉ giao diện) */}
        <div className="cart-voucher-section">
          <div className="voucher-left">
            <span className="voucher-icon">🎟️</span> SmartVibe Voucher
          </div>
          <button className="btn-choose-voucher">Chọn hoặc nhập mã</button>
        </div>

        {/* THANH CỐ ĐỊNH BÊN DƯỚI (STICKY BOTTOM BAR) */}
        <div className="cart-bottom-bar">
          <div className="bottom-left">
            <label className="select-all-label">
              <input 
                type="checkbox" 
                checked={cartItems.length > 0 && selectedIds.length === cartItems.length}
                onChange={handleSelectAll}
              />
              <span>Chọn Tất Cả ({cartItems.length})</span>
            </label>
            <button className="btn-delete-selected" onClick={() => {
              // Logic xóa các item đã chọn
              setCartItems(prev => prev.filter(item => !selectedIds.includes(item.id)));
              setSelectedIds([]);
            }}>
              Xóa mục đã chọn
            </button>
          </div>

          <div className="bottom-right">
            <div className="checkout-info">
              <span className="total-label">Tổng thanh toán ({totalItemsCount} Sản phẩm):</span>
              <span className="total-price">{totalPrice.toLocaleString()} ₫</span>
            </div>
            <button 
              className={`btn-checkout ${selectedIds.length === 0 ? 'disabled' : ''}`}
              disabled={selectedIds.length === 0}
              onClick={handleGoToCheckout}
            >
              Mua Hàng
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;