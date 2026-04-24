import React from 'react';
import LoginForm from '../../modules/Auth/LoginForm';
import { Link } from 'react-router-dom'; // Dùng để chuyển trang mà không load lại web
import '../../styles/auth.css'; // Import CSS vào trang này

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>WELCOME TO SMARTVIBE</h2>
        <LoginForm />
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;