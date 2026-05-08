import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../../styles/MainLayout.css'; // File này để chia khung màn hình

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default MainLayout;