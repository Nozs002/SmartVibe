import React, { useState, useEffect } from 'react';

const OrderManagementForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    product: '',
    quantity: 1,
    status: 'Chờ xử lý',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.product) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSubmit(formData);
    if (!initialData) {
      setFormData({ customerName: '', product: '', quantity: 1, status: 'Chờ xử lý' });
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>{initialData ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tên khách hàng:</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Nhập tên khách hàng..."
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Sản phẩm:</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            style={styles.input}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Số lượng:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Trạng thái:</label>
          <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
            <option value="Chờ xử lý">Chờ xử lý</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.btnSubmit}>Lưu đơn hàng</button>
          <button type="button" onClick={onCancel} style={styles.btnCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: { 
    backgroundColor: '#ffffff', 
    padding: '24px', 
    borderRadius: '8px', 
    marginBottom: '24px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  formTitle: { marginTop: 0, marginBottom: '20px', color: '#111827', fontSize: '18px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '14px', fontWeight: '500', color: '#374151' },
  input: { 
    padding: '10px 12px', 
    borderRadius: '6px', 
    border: '1px solid #d1d5db', 
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  buttonGroup: { display: 'flex', gap: '12px', marginTop: '8px' },
  btnSubmit: { padding: '10px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' },
  btnCancel: { padding: '10px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }
};

export default OrderManagementForm;
