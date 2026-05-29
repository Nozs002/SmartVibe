import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/OrderDetail.css'; // Đảm bảo đường dẫn này đúng

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { order, role } = location.state || {};
  
  if (!order) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const totalProductPrice = order.orderDetailDTO?.reduce(
    (total, item) => total + item.price * item.quantity, 0
  ) || 0;
  
  const discountAmount = (totalProductPrice * (order.discountPercent || 0)) / 100;
  const finalPrice = totalProductPrice + (order.shippingFee || 0) - discountAmount;

  return (
    <div className="order-detail-wrapper">
      
      {/* 1. HEADER & NÚT QUAY LẠI */}
      <div className="header-section">
        <div className="header-left">
          <button className="btn-ui btn-ui-outline" onClick={() => navigate(-1)}>
            &#8592; Quay lại
          </button>
          <h2 className="header-title">Chi tiết đơn hàng #{order.id}</h2>
        </div>
        <div className={`status-badge-ui ${order.orderStatus.toLowerCase()}`}>
          Trạng thái: {order.orderStatus.toUpperCase()}
        </div>
      </div>

      {/* 2. THÔNG TIN KHÁCH HÀNG & THANH TOÁN */}
      <div className="info-grid">
        <div className="info-box">
          <h3 className="section-title">Thông tin giao hàng</h3>
          <p><strong>Người nhận:</strong> {order.customerName || 'Khách lẻ'}</p>
          <p><strong>Số điện thoại:</strong> {order.phone || 'Không có'}</p>
          <p><strong>Địa chỉ:</strong> {order.deliveryLocation}</p>
          <p><strong>ĐV Vận chuyển:</strong> {order.shippingProvider || 'Chưa điều phối'}</p>
          {order.shippingProvider && (
            <p><strong>Mã vận đơn:</strong> {order.trackingCode || 'Đang đợi đơn vị vận chuyển cung cấp'}</p>
          )}
          
          {role === 'staff' && (
            <div className="staff-only-info">
              <p className="staff-title">Dành riêng cho Nhân viên:</p>
              <p><strong>Ghi chú khách hàng:</strong> {order.note || 'Không có'}</p>
              <p><strong>Tài khoản GD:</strong> {order.accountPayment || 'N/A'}</p>
            </div>
          )}
        </div>

        <div className="info-box">
          <h3 className="section-title">Thông tin thanh toán</h3>
          <p><strong>Hình thức:</strong> {order.paymentMethod === 'bank' ? 'Chuyển khoản' : 'Tiền mặt'}</p>
          <p><strong>Trạng thái TT:</strong> {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
          <p><strong>Loại đơn:</strong> {order.type === 'online' ? 'Mua trực tuyến' : 'Mua tại quầy (POS)'}</p>
          {order.trackingCode && (
            <p><strong>Mã vận đơn:</strong> {order.trackingCode}</p>
          )}
        </div>
      </div>

      {/* 3. DANH SÁCH SẢN PHẨM */}
      <div className="products-section">
        <h3 className="section-title">Danh sách sản phẩm</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th className="text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetailDTO?.map((item) => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.quantity}</td>
                <td className="text-right">{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. TỔNG TIỀN */}
      <div className="summary-section">
        <p className="summary-row">Tổng tiền hàng: <strong>{formatCurrency(totalProductPrice)}</strong></p>
        <p className="summary-row">Phí vận chuyển: <strong>{formatCurrency(order.shippingFee)}</strong></p>
        
        {order.discountPercent > 0 && (
          <div className="discount-wrapper">
            <p className="discount-text">
              Giảm giá (-{order.discountPercent}%): <strong>-{formatCurrency(discountAmount)}</strong>
            </p>
            <span className="discount-note">* Ưu đãi áp dụng theo phân hạng khách hàng</span>
          </div>
        )}
        
        <h3 className="total-price">
          Tổng thanh toán: <strong>{formatCurrency(finalPrice)}</strong>
        </h3>
      </div>

      {/* 5. NÚT CHỨC NĂNG */}
      <div className="action-buttons">
        {role === 'customer' && (
          <>
          {order.orderStatus === 'pending' && (
            <>
            <button className="btn-ui btn-ui-primary">Yêu cầu hỗ trợ</button>
            <button className="btn-ui-danger-soft">Yêu cầu hủy đơn</button>
            </>
          )}
          {order.orderStatus === 'confirmed' && (
            <>
            <button className="btn-ui btn-ui-success">Nhận hàng thành công</button>
            <button className="btn-ui btn-ui-primary">Yêu cầu hỗ trợ</button>
            </>            
          )}
          {order.orderStatus === 'completed' && (
            <>
            <button className="btn-ui btn-ui-primary">Yêu cầu hỗ trợ</button>
            <button className="btn-ui-danger-soft">Yêu cầu hoàn hàng</button>
            </>            
          )}
          </>
        )}

        {role === 'staff' && (
          <>
            {order.orderStatus === 'pending' && (
              <>
                <button className="btn-ui-danger-soft outline">Từ chối đơn</button>
                <button className="btn-ui btn-ui-primary">Xác nhận & Giao hàng</button>
              </>
            )}
            
            {order.orderStatus === 'shipping' && (
              <button className="btn-ui btn-ui-success">Xác nhận đã giao</button>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default OrderDetailPage;