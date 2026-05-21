import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderForm from '../../modules/Order/OrderForm';
import '../../styles/OrderDetail.css';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const MOCK_CART_ITEMS = [
  { 
    id: 101, 
    name: 'Bàn phím cơ Keychron K8 Pro', 
    quantity: 1, 
    price: 2150000 
  },
  { 
    id: 102, 
    name: 'Chuột không dây Logitech MX Master 3S', 
    quantity: 2, 
    price: 2450000 
  },
  { 
    id: 103, 
    name: 'Màn hình Dell UltraSharp 27 inch 4K', 
    quantity: 1, 
    price: 11500000 
  }
];
  
  // Lấy danh sách cartItems được truyền từ giỏ hàng sang (nếu dùng react-router-dom)
  // Nếu không có, ta dùng state rỗng (hoặc mock data để test)
  const [cartItems, setCartItems] = useState(location.state?.cartItems || MOCK_CART_ITEMS);
  
  const [shippingFee, setShippingFee] = useState(30000); // Mock phí ship mặc định
  const [discountPercent, setDiscountPercent] = useState(0); 

  // Tính toán
  const subTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = subTotal * (discountPercent / 100);
  const grandTotal = subTotal - discountAmount + shippingFee;

  const handlePlaceOrder = async (formData) => {
    // Chuẩn bị payload khớp với cấu trúc Database của bạn
    const orderPayload = {
      ...formData,
      type: 'online', // Đặt hàng từ web luôn là online
      discount_percent: discountPercent,
      shipping_fee: shippingFee,
      // order_status, delivery_status, payment_status thường được backend gán mặc định
      cartItems: cartItems // Gửi kèm list item để backend lưu vào bảng order_details (nếu có)
    };

    console.log("Dữ liệu gửi lên API tạo đơn:", orderPayload);
    // TODO: Call API (VD: axios.post('/api/orders', orderPayload))
    alert("Đặt hàng thành công!");
    navigate('/success');
  };

  if (cartItems.length === 0) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Giỏ hàng của bạn đang trống!</div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-form-section">
        <h2>Thanh toán</h2>
        {/* Tái sử dụng OrderForm cho mode checkout */}
        <OrderForm 
          mode="checkout" 
          onSubmit={handlePlaceOrder} 
        />
      </div>

      <div className="checkout-summary-section">
        <h3>Đơn hàng của bạn</h3>
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>{(item.price * item.quantity).toLocaleString()} ₫</span>
            </div>
          ))}
        </div>
        
        <hr />
        
        <div className="cart-item">
          <span>Tạm tính</span>
          <span>{subTotal.toLocaleString()} ₫</span>
        </div>
        <div className="cart-item">
          <span>Phí giao hàng</span>
          <span>{shippingFee.toLocaleString()} ₫</span>
        </div>
        {discountPercent > 0 && (
          <div className="cart-item">
            <span>Chiết khấu ({discountPercent}%)</span>
            <span>- {discountAmount.toLocaleString()} ₫</span>
          </div>
        )}
        
        <div className="summary-total">
          <span>Tổng cộng</span>
          <span style={{ color: '#d9534f' }}>{grandTotal.toLocaleString()} ₫</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;