import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import thêm thư viện điều hướng
import { register } from '../../services/auth.service';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '', confirmPassword: '',
        email: '', phone: '',
        sex: 'other',
        role: 'customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Cho phép chuyển trang mà không cần click vào link

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/wait-for-activation');
        } catch (err) {
            setError(err.message);
        }
    };


return (
    <form onSubmit={handleRegister}>
      {error && <p className="auth-error">{error}</p>}
      <div className='auth-form-group'>
        <input type="text" placeholder="Tên đăng nhập" onChange={e => setFormData({...formData, username: e.target.value})} required />
      </div>
      <div className='auth-form-group'>
        <input type="password" placeholder="Mật khẩu" onChange={e => setFormData({...formData, password: e.target.value})} required />
      </div>
      <div className='auth-form-group'>
        <input type="password" placeholder="Nhập lại mật khẩu" onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required />
      </div>
      <div className='auth-form-group'>
        <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
      </div>
      <div className='auth-form-group'>
        <input type="phone" placeholder="Số điện thoại" onChange={e => setFormData({...formData, phone: e.target.value})} />
      </div>
      <div className="auth-form-group">
        <label>Giới tính</label>
        <select 
          value={formData.sex} 
          onChange={(e) => setFormData({...formData, sex: e.target.value})}
          className="auth-select"
        >
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>
      </div>
      <div className="auth-form-group">
        <label>Vai trò</label>
        <select 
          value={formData.role} 
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className="auth-select"
        >
          <option value="customer">Khách hàng</option>
          <option value="staff">Nhân viên</option>
        </select>
      </div>
      <button type="submit" className="auth-btn">Đăng Ký</button>
    </form>
);
};

export default RegisterForm;