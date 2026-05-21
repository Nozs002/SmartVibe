import React from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';
import '../../styles/CartPage.css';

const Navbar = () => {
  const userData = localStorage.getItem('user');
  const user = (userData && userData !== "undefined") ? JSON.parse(userData) : { username: 'Guest' };

  return (
    <nav className="top-navbar">
      {/* PHẦN TRÁI: Ô TÌM KIẾM */}
      <div className="nav-left">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Tìm kiếm..." />
        </div>
      </div>

      {/* PHẦN GIỮA: TABS */}
      <div className="nav-center">
        <div className="nav-tabs">
          <button className="tab active">Dashboard</button>
          <button className="tab">Website</button>
        </div>
      </div>

      {/* PHẦN PHẢI: ICON & USER */}
      <div className="nav-right">
        <Link to="/cart" className="nav-cart-btn">
          <span>Giỏ Hàng</span>
          <FaShoppingCart className="icon-cart" />
        </Link>
        
        {/* KHU VỰC USER CÓ DROPDOWN */}
        <div className="user-section">
          <img 
            src={user.avatar || "https://ui-avatars.com/api/?name=AD&background=f3f4f6"} 
            alt="avatar" 
            className="avatar-img"
          />
          <span className="user-name">{user.username}</span>

          {/* Menu thả xuống */}
          <div className="user-dropdown">
            <ul>
              <li><Link to="/profile">Hồ sơ</Link></li>
              <li><Link to="/change-password">Bảo mật</Link></li>
              <li><Link to="/settings">Cài đặt</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;