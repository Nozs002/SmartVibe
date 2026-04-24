import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/auth.css';

const AccountStatusPage = () => {
  const location = useLocation();
  const statusType = location.state?.type || 'inactive';

  const content = {
    inactive: {
      title: "Tài Khoản Chưa Kích Hoạt",
      message: "Tài khoản của bạn hiện chưa được kích hoạt. Vui lòng đợi Quản trị viên kiểm tra và phê duyệt.",
      icon: "⏳",
      color: "#ffc107"
    },
    banned: {
      title: "Tài Khoản Bị Khóa",
      message: "Rất tiếc, tài khoản của bạn đã bị khóa do vi phạm chính sách hệ thống. Vui lòng liên hệ bộ phận hỗ trợ.",
      icon: "🚫",
      color: "#dc3545"
    }
  };

  const activeContent = content[statusType];

  return (
    <div className="auth-container">
      <div className="auth-box" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>{activeContent.icon}</div>
        <h2 style={{ color: activeContent.color }}>{activeContent.title}</h2>
        <p style={{ margin: '20px 0', lineHeight: '1.6', color: '#666' }}>
          {activeContent.message}
        </p>
        <Link to="/login" className="auth-btn" style={{ textDecoration: 'none', display: 'block' }}>
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default AccountStatusPage;