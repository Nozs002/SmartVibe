import React, { useState, useEffect } from 'react';
import '../../styles/UserManagement.css'; // Sửa lại cách import css nếu bạn không dùng CSS Modules

const AccountForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      username: '',
      fullname: '',
      role: 'customer',
      accountStatus: 'active',
      password: '',
      confirmPassword: '',
      phone: ''
    }
  );

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

    if (!initialData) {
      if (!formData.password) {
        alert("Vui lòng nhập mật khẩu!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
    }

    onSubmit(formData);

    if (!initialData) {
      setFormData({ 
        username: '', 
        fullname: '', 
        role: 'customer', 
        accountStatus: 'inactive', 
        password: '', 
        confirmPassword: '', 
        phone: '',
        sex: 'other'
      });
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">Tên đăng nhập / Email:</label>
          <input
            type="text"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            className="input"
            placeholder="Nhập tên đăng nhập..."
            disabled={!!initialData}
            required
          />
        </div>

        {initialData && (
          <>
          <div className="formGroup">
            <label className="label">Họ và tên:</label>
            <input
              type="text"
              name="fullname" 
              value={formData.fullname || ''}
              onChange={handleChange}
              className="input"
              placeholder="Nhập họ và tên..."
            />
          </div>
          </>
        )}

        <div className="formGroup">
          <label className="label">Email:</label>
          <input
            type="text"
            name="email" 
            value={formData.email || ''}
            onChange={handleChange}
            className="input"
            placeholder="Nhập email ...."
            required
          />
        </div>

        {!initialData && (
          <>
            <div className="formGroup">
              <label className="label">Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="input"
                placeholder="Nhập số điện thoại..."
              />
            </div>

            <div className="formGroup">
              <label className="label">Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                className="input"
                placeholder="Nhập mật khẩu..."
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Xác nhận mật khẩu:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                className="input"
                placeholder="Nhập lại mật khẩu..."
                required
              />
            </div>
          </>
        )}

        <div className="formGroup">
          <label className="label">Phân quyền:</label>
          <select name="role" value={formData.role || ''} onChange={handleChange} className="input" required>
            <option value="">Phân quyền tài khoản</option>
            <option value="system admin">Quản trị viên (Admin)</option>
            <option value="staff">Nhân viên (Staff)</option>
            <option value="customer">Khách hàng (Customer)</option>
          </select>
        </div>

        {initialData && (
          <>
          <div className="formGroup">
          <label className="label">Trạng thái:</label>
          <select name="accountStatus" value={formData.accountStatus} onChange={handleChange} className="input">
            <option value="active">Hoạt động</option>
            <option value="inactive">Chờ phê duyệt</option>
            <option value="banned">Bị khóa</option>
          </select>
        </div>
          </>
        )}
        

        <div className="buttonGroup">
          <button type="submit" className="btnSubmit">Lưu tài khoản</button>
          <button type="button" onClick={onCancel} className="btnCancel">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;