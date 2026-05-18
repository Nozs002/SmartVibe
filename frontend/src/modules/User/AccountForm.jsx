import React, { useState, useEffect } from 'react';
import styles from '../../styles/UserManagement.css';   

const AccountForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

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
    <div className="formContainer">
      <h3 className="formTitle">{initialData ? 'Chỉnh sửa Tài khoản' : 'Thêm Tài khoản mới'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">Tên đăng nhập / Email:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
            placeholder="Nhập tên đăng nhập..."
            disabled={!!initialData} // Thường không cho đổi tên đăng nhập khi đã tạo
          />
        </div>

        <div className="formGroup">
          <label className="label">Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
            placeholder="Nhập họ và tên..."
          />
        </div>

        <div className="formGroup">
          <label className="label">Phân quyền:</label>
          <select name="role" value={formData.role} onChange={handleChange} className="input">
            <option value="Admin">Quản trị viên (Admin)</option>
            <option value="Manager">Quản lý (Manager)</option>
            <option value="User">Nhân viên (User)</option>
          </select>
        </div>

        <div className="formGroup">
          <label className="label">Trạng thái:</label>
          <select name="status" value={formData.status} onChange={handleChange} className="input">
            <option value="Hoạt động">Hoạt động</option>
            <option value="Bị khóa">Bị khóa</option>
          </select>
        </div>

        <div className="buttonGroup">
          <button type="submit" className="btnSubmit">Lưu tài khoản</button>
          <button type="button" onClick={onCancel} className="btnCancel">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;