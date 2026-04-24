import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import AccountStatusPage from './pages/Auth/AccountStatusPage';

// Giả sử chúng ta có thêm trang Dashboard rỗng để test
const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1>Chào mừng bạn đến với Dashboard SmartVibe!</h1>
    <p>Đây là nơi quản lý hệ thống sau khi đăng nhập thành công.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Mặc định vào trang Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Đường dẫn cho Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Đường dẫn cho trang Đăng Ký */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Đường dẫn cho trang Trạng Thái Tài Khoản */}
        <Route path="/account-status" element={<AccountStatusPage />} />

        {/* Đường dẫn cho trang Quên Mật Khẩu */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />


        {/* Nếu người dùng vào link lạ, tự động quay về Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;