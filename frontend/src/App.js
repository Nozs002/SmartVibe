import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import AccountStatusPage from './pages/Auth/AccountStatusPage';
import OnlineOrderPage from './pages/Order/OnlineOrderPage';
import MainLayout from './components/Layout/MainLayout';
import UserProfilePage from './pages/User/UserProfilePage';
import ChangePasswordPage from './pages/Auth/ChangePasswordPage';
import UpdateProfilePage from './pages/Auth/UpdateProfilePage'; 
import ProductManagementPage from './pages/Product/ProductManagementPage';
import OrderManagementPage from './pages/Order/OrderManagementPage';
import UserManagementPage from './pages/User/UserManagementPage';



// Giả sử chúng ta có thêm trang Dashboard rỗng để test
const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1>Chào mừng bạn đến với Dashboard SmartVibe!</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Mặc định vào trang Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Đường dẫn cho trang Đăng Ký */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Đường dẫn cho trang Trạng Thái Tài Khoản */}
        <Route path="/account-status" element={<AccountStatusPage />} />

        {/* Đường dẫn cho trang Quên Mật Khẩu */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Đường dẫn cho Main Layout */}
        <Route path="/" element={<MainLayout />}>
          {/* Đường dẫn cho Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Đường dẫn cho trang Order */}
          <Route path="/online-order" element={<OnlineOrderPage />} />

          {/* Đường dẫn cho trang Profile */}
          <Route path="/profile" element={<UserProfilePage />} />

          {/* Đường dẫn cho trang Change Password */}
          <Route path="/change-password" element={<ChangePasswordPage />} />

          {/* Đường dẫn cho trang Update Profile */}
          <Route path="/update-profile" element={<UpdateProfilePage />} />

          {/* Đường dẫn cho trang Product Management */}
          <Route path="/products" element={<ProductManagementPage />} />

          {/* Đường dẫn cho trang Order Management */}
          <Route path="/order-management" element={<OrderManagementPage />} />

          {/* Đường dẫn cho trang User Management */}
          <Route path="/user-management" element={<UserManagementPage />} />
        </Route>

        {/* Nếu người dùng vào trang khác, quay về Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;