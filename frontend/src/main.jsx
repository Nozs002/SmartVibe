import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Tìm điểm neo trong file public/index.html
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Hiển thị toàn bộ ứng dụng React vào điểm neo đó
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);