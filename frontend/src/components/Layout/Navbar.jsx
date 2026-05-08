import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSignOutAlt, FaSearch } from 'react-icons/fa'; // Cần cài react-icons
import '../../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Code an toàn để tránh lỗi JSON parse khi chưa đăng nhập
  const userData = localStorage.getItem('user');
  const user = (userData && userData !== "undefined") ? JSON.parse(userData) : { username: 'Guest' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="top-navbar">
      {/* PHẦN TRÁI: LOGO */}
      <div className="nav-left">
        <Link to="/dashboard" className="logo-text">
          SMART<span>VIBE</span>
        </Link>
      </div>

      {/* PHẦN GIỮA: Ô TÌM KIẾM */}
      <div className="nav-center">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Tìm kiếm sản phẩm, linh kiện..." />
        </div>
      </div>

      {/* PHẦN PHẢI: ICON & USER */}
      <div className="nav-right">
        <div className="nav-icon-btn">
          <FaBell />
          <span className="badge">3</span>
        </div>
        
        <div className="user-section">
          <div className="user-info">
            <span className="user-name">{user.username}</span>
            <span className="user-role">{user.role || 'Member'}</span>
          </div>
          <FaUserCircle className="avatar-icon" />
          
          <div className="user-dropdown">
            <ul>
              <li>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                    Hồ sơ
                </Link>
              </li>
              <li>
                <Link to="/change-password" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                    Bảo mật
                </Link>
              </li>
              <li>Cài đặt</li>
              <li className="logout-item" onClick={handleLogout}>
                <FaSignOutAlt /> Thoát
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;