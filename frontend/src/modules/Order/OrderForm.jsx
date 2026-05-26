import React, { useState, useEffect } from 'react';
import '../../styles/OrderDetail.css';

const OrderForm = ({ 
  initialValues = {}, 
  onSubmit, 
  mode = 'checkout', // 'checkout' | 'admin'
  isReadOnly,
  setShippingFee,
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChangeShippingProvider = (e) => {
    const value = e.target.value;
    let shippingFee = 0;
    if (value === 'GHTK') {
      shippingFee = 50000;
    } else if (value === 'GHN') {
      shippingFee = 100000;
    } else if (value === 'ViettelPost') {
      shippingFee = 80000;
    }

    if(formData.customerType == 'vip')
      shippingFee = shippingFee * 0.7;
    else if(formData.customerType == 'gold')
      shippingFee = shippingFee * 0.5;
    else if(formData.customerType == 'diamond')
      shippingFee = 0;
    setFormData(prev => ({ ...prev, shippingProvider: value, shippingFee: shippingFee }));
    setShippingFee(shippingFee);
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
            name="customerName" 
            value={formData.customerName} 
            onChange={handleChange} 
            readOnly={isReadOnly}
            required
            placeholder="Nhập họ và tên người nhận"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại *</label>
          <input 
            type="text" 
            name="customerPhone" 
            value={formData.customerPhone} 
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
          name="deliveryLocation" 
          value={formData.deliveryLocation} 
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
          name="paymentMethod" 
          value={formData.paymentMethod} 
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
            name="shippingProvider" 
            value={formData.shippingProvider} 
            onChange={handleChangeShippingProvider}
            disabled={isReadOnly}
            required
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