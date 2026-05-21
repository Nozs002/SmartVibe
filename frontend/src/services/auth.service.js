import api from './api';

// Hàm Đăng Nhập
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });

    const data = response.data.result; 
    console.log("Dữ liệu từ Backend:", response.data);
    
    if (data) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      localStorage.setItem('staff', JSON.stringify(data.staff));
      localStorage.setItem('customer', JSON.stringify(data.customer));
    }
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại!');
  }
};

// Hàm Đăng Ký
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng ký thất bại!');
  }
};