import React, { useState, useEffect } from 'react';
import '../../styles/OrderDetail.css';

const OrderForm = ({ 
  initialValues, 
  onSubmit, 
  mode = 'checkout', // 'checkout' | 'admin'
  isReadOnly = false 
}) => {
  const [formData, setFormData] = useState({
    phone: '',
    delivery_location: '',
    note: '',
    payment_method: 'cash',
    shipping_provider: '',
    // Các trường dành cho admin quản lý
    order_status: 'pending',
    delivery_status: 'not shipped',
    payment_status: 'unpaid',
    tracking_code: '',
    ...initialValues
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h3>{mode === 'checkout' ? 'Thông tin giao hàng' : 'Chi tiết đơn hàng'}</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Người nhận hàng *</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            readOnly={isReadOnly}
            required
            placeholder="Họ và tên"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại *</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            readOnly={isReadOnly}
            required
            placeholder="Nhập số điện thoại"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Địa chỉ nhận hàng *</label>
        <input 
          type="text" 
          name="delivery_location" 
          value={formData.delivery_location} 
          onChange={handleChange} 
          readOnly={isReadOnly}
          required
          placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
        <label>Phương thức thanh toán *</label>
        <select 
          name="payment_method" 
          value={formData.payment_method} 
          onChange={handleChange}
          disabled={isReadOnly}
        >
          <option value="cash">Thanh toán khi nhận hàng (COD)</option>
          <option value="bank">Chuyển khoản ngân hàng</option>
        </select>
      </div>
        <div className="form-group">
          <label>Đơn vị vận chuyển</label>
          <select 
            name="shipping_provider" 
            value={formData.shipping_provider} 
            onChange={handleChange}
            disabled={isReadOnly}
          >
            <option value="">-- Chọn đơn vị --</option>
            <option value="GHTK">Giao Hàng Tiết Kiệm (GHTK)</option>
            <option value="GHN">Giao Hàng Nhanh (GHN)</option>
            <option value="ViettelPost">Viettel Post</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Ghi chú đơn hàng</label>
        <textarea 
          name="note" 
          value={formData.note} 
          onChange={handleChange} 
          readOnly={isReadOnly}
          rows="3"
          placeholder="Ghi chú về thời gian giao hàng, chỉ dẫn địa chỉ..."
        ></textarea>
      </div>

      {/* --- PHẦN DÀNH RIÊNG CHO ADMIN / QUẢN LÝ --- */}
      {mode === 'admin' && (
        <div className="admin-fields" style={{ borderTop: '2px dashed #ccc', marginTop: '20px', paddingTop: '15px' }}>
          <h4>Thông tin nội bộ (Dành cho Quản lý)</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Trạng thái đơn hàng</label>
              <select name="order_status" value={formData.order_status} onChange={handleChange} disabled={isReadOnly}>
                <option value="pending">Chờ xử lý (Pending)</option>
                <option value="confirmed">Đã xác nhận (Confirmed)</option>
                <option value="completed">Hoàn thành (Completed)</option>
                <option value="cancelled">Đã hủy (Cancelled)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Trạng thái giao hàng</label>
              <select name="delivery_status" value={formData.delivery_status} onChange={handleChange} disabled={isReadOnly}>
                <option value="not shipped">Chưa giao (Not shipped)</option>
                <option value="shipping">Đang giao (Shipping)</option>
                <option value="delivered">Đã giao (Delivered)</option>
                <option value="fail">Giao thất bại (Fail)</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Trạng thái thanh toán</label>
              <select name="payment_status" value={formData.payment_status} onChange={handleChange} disabled={isReadOnly}>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="refunded">Đã hoàn tiền</option>
              </select>
            </div>
            <div className="form-group">
              <label>Mã vận đơn (Tracking Code)</label>
              <input 
                type="text" 
                name="tracking_code" 
                value={formData.tracking_code} 
                onChange={handleChange} 
                readOnly={isReadOnly} 
              />
            </div>
          </div>
        </div>
      )}

      {!isReadOnly && (
        <button type="submit" className="btn-submit">
          {mode === 'checkout' ? 'Hoàn tất Đặt hàng' : 'Cập nhật Đơn hàng'}
        </button>
      )}
    </form>
  );
};

export default OrderForm;