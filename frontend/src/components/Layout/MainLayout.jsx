import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../styles/MainLayout.css'; 

const MainLayout = () => {
  // Trạng thái thu nhỏ Sidebar (mặc định là false - mở rộng)
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="main-layout-container">
      {/* Truyền state và hàm toggle xuống Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Thêm class 'collapsed' vào wrapper nếu đang thu nhỏ */}
      <div className={`content-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
        <Navbar />
        <main className="main-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;