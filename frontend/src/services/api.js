// src/services/service.js (hoặc api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/smartvibe/api', // Thay đổi baseURL ở đây
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json'
  } 
});

// Tự động đính kèm Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const getData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data.result; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lấy dữ liệu thất bại!');
  }
};

// Xuất các hàm cho POST, PUT, DELETE để giao diện dùng (Clean Code)
export const postData = async (url, data) => {
    const response = await api.post(url, data);
    return response.data.result || response.data;
};

export const putData = async (url, data) => {
    const response = await api.put(url, data);
    return response.data.result || response.data;
};

export const deleteData = async (url) => {
    const response = await api.delete(url);
    return response.data;
};

export default api;