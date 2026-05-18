import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Lấy đường dẫn hiện tại
  const { pathname } = useLocation();

  useEffect(() => {
    //cuộn của trình duyệt lên top:
    window.scrollTo(0, 0);
  }, [pathname]); // Mỗi khi 'pathname' đổi, useEffect này sẽ chạy lại

  return null;
};

export default ScrollToTop;