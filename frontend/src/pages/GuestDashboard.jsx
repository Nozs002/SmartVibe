import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const GuestDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #64748b, #334155)' }}>
        <div className="welcome-text">
          <h1>Truy cập bị hạn chế 🚫</h1>
          <p>Hiện bạn không thể sử dụng hệ thống vì một lý do nào đó.</p>
        </div>
      </div>

      <div className="middle-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ background: '#f1f5f9', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <i className="fa-solid fa-lock" style={{ fontSize: '32px', color: '#94a3b8' }}></i>
          </div>
          
          <h2 style={{ color: '#2b3674', marginBottom: '12px', fontSize: '20px' }}>Phiên bản dành cho Khách</h2>
          <p style={{ color: '#8f9bba', maxWidth: '500px', marginBottom: '30px', lineHeight: '1.6' }}>
            Tài khoản của bạn hiện chưa đủ điều kiện để sự dụng, có thể bạn hiện đang trong giai đoạn tạm nghỉ hoặc đã không còn là nhân viên của hệ thống. Vui lòng đăng nhập bằng tài khoản hợp lệ hoặc liên hệ với ban quản trị để biết thêm chi tiết.
          </p>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              className="action-btn btn-blue" 
              style={{ width: 'auto' }} 
              onClick={() => navigate('/login')}
            >
              <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập ngay
            </button>
            <button 
              className="action-btn" 
              style={{ width: 'auto', background: '#e2e8f0', color: '#475569' }} 
              onClick={() => navigate('/contact')} // Đã trỏ tới '/contact' theo menu của bạn
            >
              <i className="fa-solid fa-headset"></i> Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;