import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../../services/auth.service';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      
      if (data.user.accountStatus === 'inactive') {
        navigate('/account-status', { state: { type: 'inactive' } });
        return;
      } 
      
      if (data.user.accountStatus === 'banned') {
        navigate('/account-status', { state: { type: 'banned' } });
        return; 
      } 

      const userData = data.user;
      if (userData?.role === 'staff') {
        const staffData = data.staff;
        
        if (staffData?.workStatus !== 'working') {
            navigate("/guest");
            return; 
        }
        navigate('/dashboard'); 
      } else {
        navigate('/dashboard'); 
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}
      
      <div className="auth-form-group">
        <label>Tên đăng nhập</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>

      <div className="auth-form-group">
        <div className="label-wrapper">
          <label>Mật khẩu</label>
          <Link to="/forgot-password" className="forgot-link">Quên mật khẩu?</Link>
        </div>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>

      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
      </button>
    </form>
  );
};

export default LoginForm;