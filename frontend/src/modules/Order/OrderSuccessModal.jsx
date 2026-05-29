import React from 'react';
import { 
  FaRegCheckCircle, 
  FaRegFileAlt, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaRegCreditCard, 
  FaTruck, 
  FaInfoCircle 
} from 'react-icons/fa'; // Import các icon từ Font Awesome
import '../../styles/OrderSuccessModal.css';

const OrderSuccessModal = ({ isOpen, onClose, orderData, onView }) => {
  if (!isOpen || !orderData) return null;

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-container">
        
        {/* Header Thông báo thành công */}
        <div className="modal-header">
          <div className="icon-success-wrapper">
            {/* Sử dụng FaRegCheckCircle cho icon thành công tròn viền xanh */}
            <FaRegCheckCircle className="icon-success" size={36} />
          </div>
          <h2 className="modal-title">Đặt Hàng Thành Công!</h2>
          <p className="modal-subtitle">Cảm ơn bạn đã mua sắm tại SmartVibe</p>
          <div className="order-badge">
            Mã đơn hàng: #{orderData.id}
          </div>
        </div>

        {/* Nội dung chi tiết đơn hàng */}
        <div className="modal-body">
          <h3 className="section-title">
            <FaRegFileAlt className="icon-small" size={16} /> 
            Thông tin đơn hàng
          </h3>

          {/* Khách hàng & Địa chỉ */}
          <div className="info-box shadow-card">
            <div className="info-row">
              <span className="info-label">Người nhận:</span>
              <span className="info-value font-highlight">{orderData.customerName}</span>
            </div>
            
            <div className="info-row align-start">
              <span className="info-label flex-center">
                <FaMapMarkerAlt className="icon-inline" size={13} /> Địa chỉ:
              </span>
              <span className="info-value text-right">{orderData.deliveryLocation}</span>
            </div>
            
            <div className="info-row">
              <span className="info-label flex-center">
                <FaPhoneAlt className="icon-inline" size={12} /> Số điện thoại:
              </span>
              <span className="info-value font-mono">{orderData.phone}</span>
            </div>
          </div>

          {/* Thanh toán & Vận chuyển */}
          <div className="grid-twocol">
            <div className="info-box box-half">
              <span className="box-title flex-center text-blue">
                <FaRegCreditCard className="icon-inline" size={13} /> Thanh toán
              </span>
              <span className="font-highlight uppercase">{orderData.paymentMethod}</span>
              <span className="status-subtext text-red">
                ({orderData.paymentStatus === 'unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán'})
              </span>
            </div>
            
            <div className="info-box box-half">
              <span className="box-title flex-center text-orange">
                <FaTruck className="icon-inline" size={13} /> Vận chuyển
              </span>
              <span className="font-highlight">{orderData.shippingProvider}</span>
              <span className="status-subtext text-muted">
                Phí: {(orderData.shippingFee || 0).toLocaleString()} ₫
              </span>
            </div>
          </div>

          {/* Hướng dẫn chuyển khoản cho hình thức BANK */}
          {orderData.paymentMethod === 'bank' && orderData.accountPayment && (
            <div className="bank-instruction-box">
              <span className="bank-title">📌 Hướng dẫn chuyển khoản:</span>
              <p className="bank-desc">
                Vui lòng chuyển khoản số tiền đơn hàng vào tài khoản sau với nội dung chuyển khoản là <b className="text-red">DH{orderData.id}</b>:
              </p>
              <div className="bank-account-number select-all" title="Click để sao chép">
                {orderData.accountPayment}
              </div>
            </div>
          )}

          {/* Ghi chú */}
          {orderData.note && (
            <div className="order-note-text flex-center">
              <FaInfoCircle size={12} /> Ghi chú: "{orderData.note}"
            </div>
          )}
        </div>

        {/* Nút điều hướng ở Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Đóng
          </button>
          <button onClick={onView} className="btn-primary">
            Lịch sử đơn hàng
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessModal;