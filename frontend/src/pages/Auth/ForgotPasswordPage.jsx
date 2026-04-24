import React from 'react';
import ForgotPasswordForm from '../../modules/Auth/ForgotPasswordForm';
import { Link } from 'react-router-dom';
import '../../styles/auth.css';

const ForgotPasswordPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Khôi phục mật khẩu</h2>
        <ForgotPasswordForm />
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          Bạn đã nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;