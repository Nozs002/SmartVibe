import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaThLarge, 
  FaShoppingCart, 
  FaBoxOpen, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaUserShield
} from 'react-icons/fa';
import '../../styles/Sidebar.css';

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', name: 'Bảng điều khiển', icon: <FaThLarge /> },
        { path: '/order', name: 'Bán hàng (POS)', icon: <FaShoppingCart /> },
        { path: '/products', name: 'Sản phẩm', icon: <FaBoxOpen /> },
        { path: '/customers', name: 'Khách hàng', icon: <FaUsers /> },
        { path: '/reports', name: 'Báo cáo doanh thu', icon: <FaChartBar /> },
        { path: '/accounts', name: 'Quản lý tài khoản', icon: <FaUserShield /> },
        { path: '/settings', name: 'Cài đặt hệ thống', icon: <FaCog /> },
    ];

    return (
        <aside className="main-sidebar">
        <div className="sidebar-menu">
            {menuItems.map((item, index) => (
            <NavLink 
                key={index} 
                to={item.path} 
                className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
            >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
            </NavLink>
            ))}
        </div>
        
        <div className="sidebar-footer">
            <p>© 2026 SmartVibe v1.0</p>
        </div>
        </aside>
    );
};

export default Sidebar;