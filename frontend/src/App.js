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
import DashboardPage from './pages/DashboardPage';
import ScrollToTop from './components/ScrollToTop';
import CartPage from './pages/Order/CartPage';
import CheckoutPage from './pages/Order/CheckoutPage';
import OrderHistoryPage from './pages/Order/OrderHistoryPage';
import OrderDetailPage from './pages/Order/OrderDetailPage';
import StaffStockTransfers from './pages/StockTransfer/StockTransferPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route path="/dashboard" element={<DashboardPage />} />
          
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

          {/* Đường dẫn cho trang Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* Đường dẫn cho trang Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Đường dẫn cho trang lịch sử đơn hàng của khách hàng */}
          <Route path="/order-history" element={<OrderHistoryPage />} />

          {/* Đường dẫn cho trang chi tiết đơn hàng */}
          <Route path="/order-detail" element={<OrderDetailPage />} />

          {/* Đường dẫn cho trang Quản lý chuyển kho */}
          <Route path="/stock-transfer" element={<StaffStockTransfers />} />

          {/* Đường dẫn cho trang Quản lý chuyển kho */}
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />

        </Route>

        {/* Nếu người dùng vào trang khác, quay về Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;