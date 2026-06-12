import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaThLarge, FaShoppingCart, FaBoxOpen, 
  FaUsers, FaChartBar, FaCog, FaUserShield, FaSignOutAlt, FaBars, FaHeadset, FaStore, FaClipboardList, FaExchangeAlt, FaWarehouse, FaUserTie
} from 'react-icons/fa';
import '../../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const navigate = useNavigate();
    
    let currentRole = 'customer';
    let currentBranchId = null; 

    const userString = localStorage.getItem('user');
    const userData = userString ? JSON.parse(userString) : null;
    
    if (userData?.role === 'staff') {
        const staffString = localStorage.getItem('staff');
        const staffData = staffString ? JSON.parse(staffString) : null;
        
        currentRole = staffData?.type || 'staff';
        currentBranchId = staffData?.branchId;
        if(staffData?.workStatus != 'working'){
            currentRole = 'guest';
        }
        
    } else if (userData?.role) {
        currentRole = userData.role; 
        currentBranchId = userData?.branchId;
    }

    const allMenuItems = [
        { path: '/guest', name: 'Trang chủ', icon: <FaThLarge />, allowedRoles: ['guest'] },
        { path: '/dashboard', name: 'Trang chủ', icon: <FaThLarge />, allowedRoles: ['manager', 'system admin', 'customer', 'sales', 'warehouse', 'technical'] },
        { path: '/order-management', name: 'Quản lý đơn hàng', icon: <FaShoppingCart />, allowedRoles: ['manager', 'sales'] },
        { path: '/products', name: 'Quản lý sản phẩm', icon: <FaBoxOpen />, allowedRoles: ['manager', 'warehouse', 'sales'] },
        { path: '/customers', name: 'Quản lý khách hàng', icon: <FaUsers />, allowedRoles: ['manager', 'sales', 'system admin'] },
        // { path: '/reports', name: 'Báo cáo doanh thu', icon: <FaChartBar />, allowedRoles: ['manager'] },
        { path: '/user-management', name: 'Quản lý tài khoản', icon: <FaUserShield />, allowedRoles: ['system admin'] },
        // { path: '/settings', name: 'Cài đặt hệ thống', icon: <FaCog />, allowedRoles: ['system admin'] },
        { path: '/online-order', name: 'Mua hàng', icon: <FaShoppingCart />, allowedRoles: ['customer'] },
        { path: '/contact', name: 'Liên hệ hỗ trợ', icon: <FaHeadset/>, allowedRoles: ['customer'] },
        { path: '/staff', name: 'Quản lý nhân viên', icon: <FaUserTie />, allowedRoles: ['manager', 'system admin'] },
        { path: '/order-history', name: 'Lịch sử mua hàng', icon: <FaClipboardList />, allowedRoles:['customer']},
        { path: '/stock-transfer', name: 'Quản lý chuyển kho', icon: <FaExchangeAlt />, allowedRoles: ['manager', 'warehouse'] },
        { path: '/warehouse', name: 'Quản lý kho', icon: <FaWarehouse />, allowedRoles: ['manager', 'warehouse'] },
        { 
            path: '/branch', 
            name: 'Quản lý chi nhánh', 
            icon: <FaStore/>, 
            allowedRoles: ['manager', 'system admin'],
            requireHeadManager: true
        }
    ];

    const filteredMenuItems = allMenuItems.filter(item => {
        if (item.requireHeadManager) {
            if (currentRole === 'system admin') return true;
            if (currentRole === 'manager' && currentBranchId === 1) return true;
            return false;
        }
        return item.allowedRoles.includes(currentRole);
    });

    const handleLogout = () => { 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('staff'); 
        localStorage.removeItem('customer');
        navigate('/login', { replace: true }); 
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
                {filteredMenuItems.map((item, index) => (
                    <NavLink 
                        key={index} 
                        to={item.path} 
                        className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
                        title={isCollapsed ? item.name : ""} 
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