import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { register } from '../../services/auth.service';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '', 
        confirmPassword: '',
        email: '', 
        phone: '',
        sex: 'other',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }
        try {
            setLoading(true);
            await register(formData);
            alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
            navigate('/login'); 
            
        } catch (err) {
            setError(err.message || 'Đăng ký thất bại, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            {error && <p className="auth-error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            
            <div className='auth-form-group'>
                <input type="text" placeholder="Tên đăng nhập (*)" onChange={e => setFormData({...formData, username: e.target.value})} required />
            </div>
            
            <div className='auth-form-group'>
                <input type="email" placeholder="Email (*)" onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>

            <div className='auth-form-group'>
                <input type="text" placeholder="Số điện thoại" onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div className='auth-form-group'>
                <input type="password" placeholder="Mật khẩu (*)" onChange={e => setFormData({...formData, password: e.target.value})} required minLength={8} />
            </div>
            
            <div className='auth-form-group'>
                <input type="password" placeholder="Nhập lại mật khẩu (*)" onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required minLength={8} />
            </div>
            
            <div className="auth-form-group">
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Giới tính</label>
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

            <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng Ký'}
            </button>
        </form>
    );
};

export default RegisterForm;