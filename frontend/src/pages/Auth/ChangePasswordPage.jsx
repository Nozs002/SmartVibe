import React from 'react';
import ChangePasswordForm from '../../modules/Auth/ChangePasswordForm';
import '../../styles/ChangePassword.css';

const ChangePasswordPage = () => {
  return (
    <div className="cp-page-container">
      <div className="cp-card">
        <div className="cp-header">
          <h2>🔒 Bảo mật tài khoản</h2>
          <p>Thay đổi mật khẩu định kỳ để bảo vệ thông tin của bạn.</p>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;