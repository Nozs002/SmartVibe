import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../styles/ChangePassword.css';

const ChangePasswordForm = () => {
  // 1. Quản lý trạng thái ẩn/hiện riêng cho từng ô
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 2. Quản lý dữ liệu nhập vào
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 3. ĐỊNH NGHĨA HÀM handleChange (Để sửa lỗi Line 30, 49, 67)
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // 4. ĐỊNH NGHĨA HÀM handleSubmit (Để sửa lỗi Line 20)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    console.log("Dữ liệu gửi lên Backend:", formData);
    // Tại đây bạn sẽ gọi API: authService.changePassword(formData)
  };

  return (
    <form className="cp-form" onSubmit={handleSubmit}>
      {/* Ô MẬT KHẨU HIỆN TẠI */}
      <div className="cp-input-group">
        <label>Mật khẩu hiện tại</label>
        <div className="cp-input-wrapper">
          <FaLock className="cp-icon" />
          <input 
            type={showCurrent ? "text" : "password"} 
            name="currentPassword"
            placeholder="Nhập mật khẩu cũ"
            value={formData.currentPassword}
            onChange={handleChange}
            required 
          />
          <div className="cp-eye-icon" onClick={() => setShowCurrent(!showCurrent)}>
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>

      {/* Ô MẬT KHẨU MỚI */}
      <div className="cp-input-group">
        <label>Mật khẩu mới</label>
        <div className="cp-input-wrapper">
          <FaLock className="cp-icon" />
          <input 
            type={showNew ? "text" : "password"} 
            name="newPassword"
            placeholder="Nhập mật khẩu mới"
            value={formData.newPassword}
            onChange={handleChange}
            required 
          />
          <div className="cp-eye-icon" onClick={() => setShowNew(!showNew)}>
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>

      {/* Ô XÁC NHẬN MẬT KHẨU */}
      <div className="cp-input-group">
        <label>Xác nhận mật khẩu mới</label>
        <div className="cp-input-wrapper">
          <FaLock className="cp-icon" />
          <input 
            type={showConfirm ? "text" : "password"} 
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu mới"
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
          <div className="cp-eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      </div>

      <button type="submit" className="cp-button">Cập nhật mật khẩu</button>
    </form>
  );
};

export default ChangePasswordForm;