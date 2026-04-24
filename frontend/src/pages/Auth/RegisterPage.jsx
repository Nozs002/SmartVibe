import React from 'react';
import RegisterForm from '../../modules/Auth/RegisterForm';
import { Link } from 'react-router-dom'; // Dùng để chuyển trang mà không load lại web
import '../../styles/auth.css';

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng Ký Tài Khoản</h2>
        <RegisterForm />
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;