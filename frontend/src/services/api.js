import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/smartvibe/api', // Địa chỉ mặc định của Backend Spring Boot
  timeout: 5000, // Nếu sau 5 giây không phản hồi thì báo lỗi
  headers: {
    'Content-Type': 'application/json'
  } // Backend Spring Boot hiểu kiểu dữ liệu được gửi đến là json
});

// Tự động đính kèm Token vào Header nếu người dùng đã đăng nhập
// khi có người dùng đã đăng nhập thì luôn đính kem authorization vào Header để Backend Spring Boot xác định quyền
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;