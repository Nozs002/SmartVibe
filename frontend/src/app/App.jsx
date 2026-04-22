import React from 'react';
import LoginPage from './pages/Auth/LoginPage'; // Giả sử bạn đã tạo file này bọc LoginForm
import './styles/global.css'; // File CSS tổng của dự án (nếu có)

const App = () => {
  return (
    <div className="app-container">
      {/* Trong giai đoạn này chưa có Router, ta render thẳng trang Login */}
      <LoginPage />
    </div>
  );
};

export default App;