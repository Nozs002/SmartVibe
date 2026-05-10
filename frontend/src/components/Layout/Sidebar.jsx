import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaThLarge, FaShoppingCart, FaBoxOpen, 
  FaUsers, FaChartBar, FaCog, FaUserShield, FaSignOutAlt, FaBars, FaHeadset, FaStore
} from 'react-icons/fa';
import '../../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    
    const userData = localStorage.getItem('user');
    const user = (userData && userData !== "undefined") ? JSON.parse(userData) : { role: 'system admin' };
    const currentRole = user.role.toLowerCase();

    const allMenuItems = [
        { path: '/dashboard', name: 'Trang chủ', icon: <FaThLarge />, allowedRoles: ['manager', 'system admin', 'customer', 'sales staff'] },
        { path: '/order-management', name: 'Quản lý đơn hàng', icon: <FaShoppingCart />, allowedRoles: ['manager', 'sales staff', 'system admin'] },
        { path: '/products', name: 'Quản lý sản phẩm', icon: <FaBoxOpen />, allowedRoles: ['manager', 'warehouse staff', 'system admin'] },
        { path: '/customers', name: 'Quản lý khách hàng', icon: <FaUsers />, allowedRoles: ['manager', 'sales staff', 'system admin'] },
        { path: '/reports', name: 'Báo cáo doanh thu', icon: <FaChartBar />, allowedRoles: ['manager', 'system admin'] },
        { path: '/user-management', name: 'Quản lý tài khoản', icon: <FaUserShield />, allowedRoles: ['system admin'] },
        { path: '/settings', name: 'Cài đặt hệ thống', icon: <FaCog />, allowedRoles: ['system admin'] },
        { path: '/online-order', name: 'Mua hàng', icon: <FaShoppingCart />, allowedRoles: ['manager', 'sales staff', 'warehouse staff', 'system admin', 'customer', 'guest'] },
        { path: '/contact', name: 'Liên hệ hỗ trợ', icon: <FaHeadset/>, allowedRoles: ['customer', 'guest'] },
        { path: '/branch', name: 'Quản lý chi nhánh', icon: <FaStore/>, allowedRoles: ['manager', 'sales staff', 'system admin'] },
        { path: '/staff', name: 'Quản lý nhân viên', icon: <FaUsers />, allowedRoles: ['manager', 'system admin'] },
    ];

    const menuItems = allMenuItems.filter(item => item.allowedRoles.includes(currentRole));

    const handleLogout = () => { 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login'); 
    };

    return (
        <aside className={`main-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {/* Tiêu đề & Nút Toggle */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <span className="logo-icon">»</span> 
                    {!isCollapsed && <span>SMART<span>VIBE</span></span>}
                </div>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FaBars />
                </button>
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <NavLink 
                        key={index} 
                        to={item.path} 
                        className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
                        title={isCollapsed ? item.name : ""} /* Hiện tooltip khi thu nhỏ */
                    >
                        <span className="menu-icon">{item.icon}</span>
                        {!isCollapsed && <span className="menu-text">{item.name}</span>}
                    </NavLink>
                ))}
            </div>
            
            <div className="sidebar-footer">
                <button className="btn-logout" onClick={handleLogout} title={isCollapsed ? "Đăng xuất" : ""}>
                    <FaSignOutAlt className="menu-icon" />
                    {!isCollapsed && <span className="menu-text">Đăng xuất</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
