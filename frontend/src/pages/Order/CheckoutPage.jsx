import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../services/api';
import OrderForm from '../../modules/Order/OrderForm';
import '../../styles/OrderDetail.css';
import OrderSuccessModal from '../../modules/Order/OrderSuccessModal';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy danh sách cartItems được truyền từ giỏ hàng sang
  const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [shippingFee, setShippingFee] = useState(0);

  const customer = JSON.parse(localStorage.getItem('customer') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successOrderData, setSuccessOrderData] = useState(null);

  let discountPercent = 0;

    switch (customer.type) {
      case 'member': 
        discountPercent = 2; 
        break;
      case 'vip': 
        discountPercent = 5; 
        break;
      case 'gold': 
        discountPercent = 8; 
        break;
      case 'diamond':
        discountPercent = 10;
        break;
      default: discountPercent = 0; break;
    }
  // Tính toán
  const subTotal = cartItems.reduce((total, item) => total + (item.productDTO.price * item.quantity), 0);

  const initialValues = useMemo(() => {
    return {
      customerId: customer.id || '',
      customerName: user.fullname || '',
      discountPercent: discountPercent,
      type: 'online',
      note: '',
      phone: user.phone || '',
      deliveryLocation: user.address || '',
      orderStatus: 'pending',
      deliveryStatus: 'not shipped',
      accountPayment: '',
      paymentMethod: 'cash',
      paymentStatus: 'unpaid',
      trackingCode: '',
      shippingProvider: '',
      shippingFee: shippingFee,
      customerType: customer.type || '',
  }; 
  }, [customer.id, user.fullname, user.phone, user.address, discountPercent, shippingFee, customer.type]);

  const discountAmount = subTotal * (discountPercent / 100);
  const grandTotal = subTotal - discountAmount + shippingFee;

  const handlePlaceOrder = async (formData) => {
    const data = {
      ...formData,
      customer: customer,
      cartItemDTO: cartItems,
    }
    const response = await postData('/online_order/create', data);
    
    if (response) {
      setSuccessOrderData(response); 
      console.log(response);
      setIsModalOpen(true);
    } else {
      alert('Lỗi khi tạo đơn hàng. Vui lòng thử lại.');
    } 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/dashboard');
  };

  const handleViewOrderHistory = () => {
    setIsModalOpen(false);
    navigate('/order-history');
  }

  if (cartItems.length === 0) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Giỏ hàng của bạn đang trống!</div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-form-section">
        <h2>Thanh toán</h2>
        {/* Tái sử dụng OrderForm cho mode checkout */}
        <OrderForm 
          initialValues={initialValues}
          mode="checkout" 
          onSubmit={handlePlaceOrder} 
          isReadOnly={false}
          setShippingFee={setShippingFee}
        />
      </div>

      <div className="checkout-summary-section">
        <h3>Đơn hàng của bạn</h3>
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={item.productDTO.productId} className="cart-item">
              <span>{item.productDTO.name} (x{item.quantity})</span>
              <span>{(item.productDTO.price * item.quantity).toLocaleString()} ₫</span>
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

      <OrderSuccessModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        orderData={successOrderData} 
        onView = {handleViewOrderHistory}
      />
    </div>
  );
};

export default CheckoutPage;