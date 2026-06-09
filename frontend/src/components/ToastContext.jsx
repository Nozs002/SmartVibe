import React, { createContext, useState, useContext, useRef } from 'react';
import '../styles/Toast.css'; 

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Dùng useRef để lưu trữ ID của bộ đếm giờ (để hủy khi cần)
  const timerRef = useRef(null);

  const showToast = (message, type = 'success') => {
    // Nếu đang có một toast khác chờ tắt, hủy bộ đếm cũ đi
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({ show: true, message, type });

    // Cài đặt bộ đếm mới và lưu ID vào ref
    timerRef.current = setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Hàm chủ động đóng Toast khi ấn dấu X
  const closeToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToast({ show: false, message: '', type: '' });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {toast.show && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✅' : '⚠️'}
          </span>
          <span className="toast-message">{toast.message}</span>
          
          {/* NÚT ĐÓNG (DẤU X) */}
          <button className="toast-close-btn" onClick={closeToast} title="Đóng">
            &times;
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};