import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sau này sẽ gọi API gửi mail ở đây
    console.log("Gửi yêu cầu khôi phục cho:", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Một liên kết khôi phục đã được gửi đến <strong>{email}</strong>.</p>
        <p>Vui lòng kiểm tra hộp thư đến của bạn.</p>
        <Link to="/login" className="auth-btn" style={{ display: 'block', textDecoration: 'none', marginTop: '20px' }}>
          Quay lại Đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
      </p>
      
      <div className="auth-form-group">
        <label>Địa chỉ Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="name@company.com" 
          required 
        />
      </div>

      <button type="submit" className="auth-btn">Gửi yêu cầu</button>
    </form>
  );
};

export default ForgotPasswordForm;