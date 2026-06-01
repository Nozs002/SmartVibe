import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaBoxOpen, 
  FaShippingFast, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaRegFileAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaMoneyBillWave
} from 'react-icons/fa';
import { getData, putData } from '../../services/api'; 
import '../../styles/OrderHistory.css'; 
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // lấy danh sách đơn hàng
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem('customer') || '{}');
    
    const fetchMyOrders = async () => {
      try {
        if (!customer.id) return;
        const response = await getData(`/online_order/customer?id=${customer.id}`);
        
        if(response) {
           setOrders(response);
           setFilteredOrders(response);
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách đơn hàng:", error);
      }
    };
    fetchMyOrders();
  }, []);

  // Lọc đơn hàng theo Tab và Ô tìm kiếm
  useEffect(() => {
    let result = [...orders];

    if (activeTab !== 'all') {
      result = result.filter(order => order.orderStatus === activeTab);
    }

    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.trim().toLowerCase();
      
      result = result.filter(order => {
        const isMatchId = order.id?.toString().includes(lowerSearchTerm);
        const isMatchProduct = order.orderDetailDTO?.some(detail => 
            detail.productName?.toLowerCase().includes(lowerSearchTerm)
        );
        return isMatchId || isMatchProduct;
      });
    }

    setFilteredOrders(result);
  }, [activeTab, searchTerm, orders]);

  // 3. Các hàm tiện ích (Trạng thái, Format ngày, Tính tiền)
  const getStatusDetails = (status) => {
    switch (status) {
      case 'pending': return { text: 'Chờ xử lý', class: 'st-pending', icon: <FaBoxOpen /> };
      case 'confirmed': return { text: 'Đã xác nhận', class: 'st-confirmed', icon: <FaRegFileAlt /> };
      case 'shipping': return { text: 'Đang giao', class: 'st-shipping', icon: <FaShippingFast /> };
      case 'completed': return { text: 'Hoàn thành', class: 'st-completed', icon: <FaCheckCircle /> };
      case 'cancelled': return { text: 'Đã hủy', class: 'st-cancelled', icon: <FaTimesCircle /> };
      default: return { text: 'Không rõ', class: 'st-unknown', icon: null };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Hàm tính tổng tiền thanh toán cho một đơn hàng
  const calculateFinalPrice = (order) => {
    const totalProductPrice = order.orderDetailDTO?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    const discountAmount = (totalProductPrice * (order.discountPercent || 0)) / 100;
    return totalProductPrice + (order.shippingFee || 0) - discountAmount;
  };

  // hủy đơn
  const handleCancelOrder = async (orderId) => {
    const isConfirm = window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${orderId} không?`);
    if (!isConfirm) return;

    try {
      await putData(`/online_order/${order.id}/status?status=cancelled`,{});
      
      setOrders(prevOrders => prevOrders.map(order => 
        order.id === orderId ? { ...order, orderStatus: 'cancelled' } : order
      ));
      
    } catch (error) {
      console.error("Lỗi khi hủy đơn:", error);
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn. Vui lòng thử lại!';
      alert(errorMsg);
    }
  };

  return (
    <div className="order-history-container">
      <div className="order-history-header">
        <h2>Đơn hàng của tôi</h2>
        <p>Quản lý và theo dõi quá trình vận chuyển các đơn hàng của bạn</p>
      </div>

      <div className="order-filter-bar">
        <div className="search-box-wrapper">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="order-tabs">
        <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Tất cả</button>
        <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Chờ xử lý</button>
        <button className={`tab-btn ${activeTab === 'confirmed' ? 'active' : ''}`} onClick={() => setActiveTab('confirmed')}>Đã xác nhận</button>
        <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>Đang giao</button>
        <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Hoàn thành</button>
        <button className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>Đã hủy</button>
      </div>

      <div className="orders-list-wrapper">
        {filteredOrders.length === 0 ? (
          <div className="empty-orders shadow-card-ui">
            <FaBoxOpen size={48} className="empty-icon" />
            <p>Không tìm thấy đơn hàng nào phù hợp.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const status = getStatusDetails(order.orderStatus);
            const finalPrice = calculateFinalPrice(order);

            return (
              <div key={order.id} className="order-card-ui shadow-card-ui">
                
                <div className="order-card-header">
                  <div className="header-left">
                    <span className="order-id-label">Mã đơn hàng:</span>
                    <span className="order-id-value">#{order.id}</span>
                    <span className="order-type-tag">{order.type === 'online' ? 'Mua trực tuyến' : 'Tại quầy'}</span>
                  </div>
                  <div className={`status-badge-ui ${status.class}`}>
                    {status.icon}
                    <span>{status.text}</span>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="body-grid">
                    <div className="info-item-ui">
                      <FaCalendarAlt className="body-icon" />
                      <div>
                        <label>Ngày đặt hàng</label>
                        <p className="info-value-mono">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="info-item-ui">
                      <FaMapMarkerAlt className="body-icon" />
                      <div>
                        <label>Địa chỉ giao hàng</label>
                        <p>{order.deliveryLocation}</p>
                      </div>
                    </div>
                    <div className="info-item-ui">
                      <FaPhoneAlt className="body-icon" />
                      <div>
                        <label>Người nhận</label>
                        <p className="info-value-mono">{order.customerName || 'Khách lẻ'}</p>
                      </div>
                    </div>
                    <div className="info-item-ui">
                      <FaPhoneAlt className="body-icon" />
                      <div>
                        <label>Số điện thoại</label>
                        <p className="info-value-mono">{order.phone}</p>
                      </div>
                    </div>
                    <div className="info-item-ui full-width">
                      <FaMoneyBillWave className="body-icon" />
                      <div>
                        <label>Phương thức thanh toán</label>
                        <p className="info-payment-method">
                          {order.paymentMethod === 'bank' ? 'Chuyển khoản' : 'Tiền mặt'} 
                          <span className="sub-status"> ({order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'})</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="order-products-summary">
                    <span className="summary-label">Sản phẩm:</span>
                    <span className="summary-content">
                      {order.orderDetailDTO?.length > 0 
                        ? order.orderDetailDTO.map(item => `${item.productName} (x${item.quantity})`).join(', ') 
                        : 'Không có sản phẩm'}
                    </span>
                  </div>
                </div>

                <div className="order-card-footer">
                  <div className="shipping-provider-info">
                    <span>Vận chuyển: <b>{order.shippingProvider || 'Chưa có'}</b></span>
                    <span className="fee-text">(Phí ship: {(order.shippingFee || 0).toLocaleString()} ₫)</span>
                  </div>
                  <div className="footer-right-billing">
                    <div className="total-price-wrapper">
                      <span className="total-label">Tổng thanh toán:</span>
                      <span className="total-value-ui">{finalPrice.toLocaleString()} ₫</span>
                    </div>
                    <div className="action-buttons-group">
                      <button className="btn-ui btn-ui-outline" onClick={() => navigate('/order-detail', { state: { order: order, role: 'customer'} })}>
                        Chi tiết đơn
                      </button>
                      {order.orderStatus === 'pending' && (
                        <button className="btn-ui btn-ui-danger" onClick={() => handleCancelOrder(order.id)}>
                          Hủy đơn
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;