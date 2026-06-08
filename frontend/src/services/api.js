// src/services/service.js (hoặc api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/smartvibe/api', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json'
  } 
});

export const getErrorMessage = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || "Lỗi xử lý từ máy chủ!";
  }
  
  if (error.message && error.message !== 'Network Error') {
    return error.message;
  }

  return "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng hoặc hệ thống!";
};

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
    return response.data.result;
};

export const putData = async (url, data) => {
    const response = await api.put(url, data);
    return response.data.result || response.data;
};

export const deleteData = async (url, payload) => {
    const response = await api.delete(url, {data: payload});
    return response.data.result || response.data;
};

export const getDataWithCondition = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data.result; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lấy dữ liệu thất bại!');
  }
};

export const patchData = async (url, data = null, params = {}) => {
  try {
    const response = await api.patch(url, data, { params });
    return response.data.result || response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Thao tác thất bại!');
  }
};

export default api;