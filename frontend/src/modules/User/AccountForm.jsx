import React, { useState, useEffect } from 'react';

const AccountForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    role: 'User',
    status: 'Hoạt động',
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
    if (!formData.username || !formData.fullName) {
      alert("Vui lòng điền đầy đủ Tên đăng nhập và Họ tên!");
      return;
    }
    onSubmit(formData);
    if (!initialData) {
      setFormData({ username: '', fullName: '', role: 'User', status: 'Hoạt động' });
    }
  };

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>{initialData ? 'Chỉnh sửa Tài khoản' : 'Thêm Tài khoản mới'}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tên đăng nhập / Email:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            placeholder="Nhập tên đăng nhập..."
            disabled={!!initialData} // Thường không cho đổi tên đăng nhập khi đã tạo
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Nhập họ và tên..."
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phân quyền:</label>
          <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
            <option value="Admin">Quản trị viên (Admin)</option>
            <option value="Manager">Quản lý (Manager)</option>
            <option value="User">Nhân viên (User)</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Trạng thái:</label>
          <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Bị khóa">Bị khóa</option>
          </select>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.btnSubmit}>Lưu tài khoản</button>
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
    outline: 'none'
  },
  buttonGroup: { display: 'flex', gap: '12px', marginTop: '8px' },
  btnSubmit: { padding: '10px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' },
  btnCancel: { padding: '10px 16px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' }
};

export default AccountForm;