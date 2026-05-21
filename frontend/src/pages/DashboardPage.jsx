import React from 'react';
import { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../styles/Dashboard.css'; 

const AdminDashboard = () => (
  <>
    <div className="welcome-banner">
      <div className="welcome-text">
        <h1>Welcome back, Admin! 👋</h1>
        <p>Here's what's happening with your store today</p>
      </div>
      <div className="orders-today">
        <h2>152</h2><span>Đơn hàng hôm nay</span>
      </div>
    </div>
     <div className="bottom-row">
        <div className="card">
          <div className="card-header"><span className="card-title">Tài khoản theo trạng thái</span></div>
          <div className="status-grid">
            <div className="status-card active">
              <h4>0</h4><p>Đang hoạt động</p>
            </div>
            <div className="status-card inactive">
              <h4>1</h4><p>Chờ phê duyệt</p>
            </div>
            <div className="status-card banned">
              <h4>1</h4><p>Bị khóa</p>
            </div>
            <div className="status-card others">
              <h4>100</h4><p>Tất cả tài khoản</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Tài khoản mới hôm nay</span>
            <Link to="/user-management" className="btn-sm">Xem tất cả</Link>
          </div>
          <div className="order-list">
            <div className="order-item">
              <div className="order-info">
                <h5>tuandepzai</h5>
                <p>Tuong Phung</p>
              </div>
              <div className="order-status-right">
                <h5>Hôm nay</h5>
                <span className="badge yellow">Chờ phê duyệt</span>
              </div>
            </div>
            <div className="order-item">
              <div className="order-info">
                <h5>Huy dở hơi</h5>
                <p>Khách hàng 1</p>
              </div>
              <div className="order-status-right">
                <h5>13/5/2026</h5>
                <span className="badge blue">Đã phê duyệt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="middle-row">
        <div className="card">
          <div className="card-header">
            <span className="card-title">User Overview</span>
            <div style={{ background: '#f4f7fe', padding: '4px', borderRadius: '8px' }}>
              <button className="btn-sm" style={{ background: '#4318FF', color: 'white', marginRight: '5px' }}>7 Days</button>
              <button className="btn-sm" style={{ color: '#8f9bba', background: 'transparent' }}>30 Days</button>
            </div>
          </div>
          <div className="chart-placeholder">
            <i className="fa-solid fa-chart-column" style={{ fontSize: '40px', marginBottom: '15px', color: '#cbd5e1' }}></i>
            <p>User chart will be here</p>
            <span style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>Chart.js integration coming soon</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Quick Actions</span></div>
          <Link to="/add-user" className="action-btn btn-blue"><i className="fa-solid fa-plus"></i> Thêm tài khoản mới</Link>
          <Link to="/user-management" className="action-btn btn-green"><i className="fa-solid fa-file-invoice"></i> Quản lý tài khoản</Link>
          <Link to="/audit-management" className="action-btn btn-purple"><i className="fa-solid fa-users"></i> Quản lý lịch sử thao tác</Link>
        </div>
      </div>
  </>
);

// const ManagerDashboard = () => (
//   <>
//     <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
//       <div className="welcome-text">
//         <h1>Welcome back, Manager! 👋</h1>
//         <p>Đây là những gì đang diễn ra tại cửa hàng của bạn hôm nay.</p>
//       </div>
//       <div className="orders-today">
//         <h2>152</h2><span>Đơn hàng hôm nay</span>
//       </div>
//     </div>
//     <div className="stats-grid">
//         <div className="stat-card">
//             <div className="stat-info">
//                 <p>Doanh thu mới nhất</p>
//                 <h3>10.000.000.000 đ</h3>
//                 <span className="trend green">+ today</span>
//             </div>
//             <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
//                 <i className="fa-solid fa-dollar-sign"></i>
//             </div>
//         </div>
        
//         <div className="stat-card">
//             <div className="stat-info">
//                 <p>Đơn hàng mới nhất</p>
//                 <h3>2</h3>
//                 <span className="trend blue">+0 today</span>
//             </div>
//             <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
//                 <i className="fa-solid fa-file-alt"></i>
//             </div>
//         </div>
        
//         <div className="stat-card">
//             <div className="stat-info">
//                 <p>Tổng sản phẩm</p>
//                 <h3>10</h3>
//                 <span className="trend green">Tất cả đang có</span>
//             </div>
//             <div className="stat-icon" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
//                 <i className="fa-solid fa-bag-shopping"></i>
//             </div>
//         </div>
        
//         <div className="stat-card">
//             <div className="stat-info">
//                 <p>Khách hàng mới nhất</p>
//                 <h3>7</h3>
//                 <span className="trend blue">+2 today</span>
//             </div>
//             <div className="stat-icon" style={{ background: '#e0e7ff', color: '#6366f1' }}>
//                 <i className="fa-solid fa-user-group"></i>
//             </div>
//             </div>
//       </div>

//       {/* Middle Row */}
//       <div className="middle-row">
//         <div className="card">
//           <div className="card-header">
//             <span className="card-title">Sales Overview</span>
//             <div style={{ background: '#f4f7fe', padding: '4px', borderRadius: '8px' }}>
//               <button className="btn-sm" style={{ background: '#4318FF', color: 'white', marginRight: '5px' }}>7 Days</button>
//               <button className="btn-sm" style={{ color: '#8f9bba', background: 'transparent' }}>30 Days</button>
//             </div>
//           </div>
//           <div className="chart-placeholder">
//             <i className="fa-solid fa-chart-column" style={{ fontSize: '40px', marginBottom: '15px', color: '#cbd5e1' }}></i>
//             <p>Sales chart will be here</p>
//             <span style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>Chart.js integration coming soon</span>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header"><span className="card-title">Quick Actions</span></div>
//           <Link to="/employee-management" className="action-btn btn-blue"><i className="fa-solid fa-plus"></i>Quản lý nhân viên</Link>
//           <Link to="/order-management" className="action-btn btn-green"><i className="fa-solid fa-file-invoice"></i> Quản lý đơn hàng</Link>
//           <Link to="/user-management" className="action-btn btn-purple"><i className="fa-solid fa-users"></i> Quản lý khách hàng</Link>
//           <Link to="/product-management" className="action-btn btn-yellow"><i className="fa-solid fa-chart-simple"></i> Quản lý sản phẩm</Link>
//           <Link to="/report-management" className="action-btn btn-indigo"><i className="fa-solid fa-chart-simple"></i> Xem báo cáo</Link>
//         </div>
//       </div>

//       {/* Bottom Row */}
//       <div className="bottom-row">
//         <div className="card">
//           <div className="card-header"><span className="card-title">Đơn hàng theo trạng thái</span></div>
//           <div className="status-grid">
//             <div className="status-card pending">
//               <h4>0</h4><p>Chờ xử lý</p>
//             </div>
//             <div className="status-card processing">
//               <h4>1</h4><p>Đang xử lý đơn hàng</p>
//             </div>
//             <div className="status-card completed">
//               <h4>1</h4><p>Hoàn thành</p>
//             </div>
//             <div className="status-card others">
//               <h4>0</h4><p>Khác</p>
//             </div>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <span className="card-title">Đơn hàng mới nhất</span>
//             <Link to="/order-management" className="btn-sm">Xem tất cả</Link>
//           </div>
//           <div className="order-list">
//             <div className="order-item">
//               <div className="order-info">
//                 <h5>ORD-20250728-6110</h5>
//                 <p>Tuong Phung</p>
//               </div>
//               <div className="order-status-right">
//                 <h5>2.200 đ</h5>
//                 <span className="badge green">Hoàn thành</span>
//               </div>
//             </div>
//             <div className="order-item">
//               <div className="order-info">
//                 <h5>ORD-20250728-4189</h5>
//                 <p>Khách hàng 1</p>
//               </div>
//               <div className="order-status-right">
//                 <h5>825.000 đ</h5>
//                 <span className="badge blue">Chờ xử lý</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   </>
// );

// STAFF
const StaffDashboard = () => (
  <>
    <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
      <div className="welcome-text">
        <h1>Chào ca làm việc, Staff! ☕</h1>
        <p>Có một vài đơn hàng đang chờ bạn xử lý.</p>
      </div>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <div className="stat-card">
        <div className="stat-info"><p>Đơn chờ xác nhận</p><h3>5</h3><span className="trend pending" style={{color: '#f59e0b'}}>Cần xử lý ngay</span></div>
        <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><i className="fa-solid fa-clock"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Đang chuẩn bị</p><h3>2</h3></div>
        <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}><i className="fa-solid fa-box"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Hoàn thành hôm nay</p><h3>18</h3></div>
        <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}><i className="fa-solid fa-check-double"></i></div>
      </div>
    </div>

    <div className="middle-row" style={{ gridTemplateColumns: '1fr' }}>
      <div className="card">
        <div className="card-header"><span className="card-title">Hành động nhanh</span></div>
        <div style={{ display: 'flex', gap: '10px' }}>
           <button className="action-btn btn-blue" style={{ width: 'auto' }}><i className="fa-solid fa-qrcode"></i> Quét mã đơn hàng</button>
           <button className="action-btn btn-green" style={{ width: 'auto' }}><i className="fa-solid fa-clipboard-check"></i> Tạo đơn tại quầy</button>
        </div>
      </div>
    </div>
  </>
);

//CUSTOMER
const CustomerDashboard = () => (
  <>
    <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>
      <div className="welcome-text">
        <h1>Xin chào, Khách hàng! 🎉</h1>
        <p>Khám phá các sản phẩm mới và theo dõi đơn hàng của bạn.</p>
      </div>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <div className="stat-card">
        <div className="stat-info"><p>Điểm tích lũy</p><h3>1,250 pt</h3><span className="trend green">Thành viên Vàng</span></div>
        <div className="stat-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}><i className="fa-solid fa-star"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Đơn hàng đang giao</p><h3>1</h3><span className="trend blue">Dự kiến giao: Hôm nay</span></div>
        <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}><i className="fa-solid fa-truck"></i></div>
      </div>
    </div>

    <div className="middle-row">
      <div className="card">
        <div className="card-header"><span className="card-title">Đơn hàng gần đây</span></div>
        <div className="order-list">
          <div className="order-item">
            <div className="order-info"><h5>Iphone 17 pro max</h5><p>Hôm qua, 14:30</p></div>
            <div className="order-status-right"><h5>50.000.000 đ</h5><span className="badge green">Đã giao</span></div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Gợi ý cho bạn</span></div>
        <button className="action-btn btn-blue"><i className="fa-solid fa-mug-hot"></i> Đặt lại đơn cũ</button>
        <button className="action-btn btn-purple"><i className="fa-solid fa-compass"></i> Xem Menu Mới</button>
      </div>
    </div>
  </>
);

const SalesDashboard = () => (
  <>
    <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
      <div className="welcome-text">
        <h1>Ca làm việc hiệu quả nhé! ☕</h1>
        <p>Mục tiêu doanh số ca này: 5.000.000 đ</p>
      </div>
      <div className="orders-today">
        <h2>12</h2><span>Đơn đã chốt</span>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info"><p>Doanh thu ca</p><h3>1.250.000 đ</h3><span className="trend green">Đạt 25% KPI</span></div>
        <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}><i className="fa-solid fa-wallet"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Khách hàng mới</p><h3>4</h3></div>
        <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}><i className="fa-solid fa-user-plus"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Đơn bị hủy</p><h3>0</h3></div>
        <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><i className="fa-solid fa-ban"></i></div>
      </div>
    </div>

    <div className="middle-row">
      <div className="card">
        <div className="card-header"><span className="card-title">Hành động nhanh (POS)</span></div>
        <Link to="/pos" className="action-btn btn-blue" style={{ textDecoration: 'none' }}><i className="fa-solid fa-cash-register"></i> Mở giao diện Bán Hàng (POS)</Link>
        <Link to="/customers" className="action-btn btn-green" style={{ textDecoration: 'none' }}><i className="fa-solid fa-id-card"></i> Tra cứu thành viên</Link>
        <Link to="/inventory-check" className="action-btn btn-purple" style={{ textDecoration: 'none' }}><i className="fa-solid fa-box-open"></i> Kiểm tra tồn kho nhanh</Link>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Giao dịch gần đây</span></div>
        <div className="order-list">
          <div className="order-item">
            <div className="order-info"><h5>#INV-0012</h5><p>10:15 AM</p></div>
            <div className="order-status-right"><h5>150.000 đ</h5><span className="badge green">Hoàn thành</span></div>
          </div>
          <div className="order-item">
            <div className="order-info"><h5>#INV-0011</h5><p>09:45 AM</p></div>
            <div className="order-status-right"><h5>85.000 đ</h5><span className="badge green">Hoàn thành</span></div>
          </div>
        </div>
      </div>
    </div>
  </>
);

// QUẢN LÝ (MANAGER)
const ManagerDashboard = () => (
  <>
    <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
      <div className="welcome-text">
        <h1>Tổng quan Cửa hàng 👋</h1>
        <p>Chi nhánh: Quận 1, TP.HCM</p>
      </div>
      <div className="orders-today">
        <h2>85%</h2><span>Hiệu suất</span>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info"><p>Tổng doanh thu</p><h3>12.500 đ</h3><span className="trend green">+15% so với hôm qua</span></div>
        <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}><i className="fa-solid fa-chart-line"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Nhân sự đang làm</p><h3>5/6</h3><span className="trend blue">Ca Sáng</span></div>
        <div className="stat-icon" style={{ background: '#e0e7ff', color: '#6366f1' }}><i className="fa-solid fa-user-clock"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Cảnh báo kho</p><h3>3</h3><span className="trend pending" style={{color: '#f59e0b'}}>Sắp hết nguyên liệu</span></div>
        <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><i className="fa-solid fa-triangle-exclamation"></i></div>
      </div>
    </div>

    <div className="middle-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="card">
        <div className="card-header"><span className="card-title">Duyệt yêu cầu</span></div>
        <div className="order-list">
          <div className="order-item">
            <div className="order-info"><h5>Nguyễn Văn A (Sales)</h5><p>Xin nghỉ phép ngày 15/05</p></div>
            <button className="btn-sm" style={{ background: '#3b82f6', color: 'white' }}>Duyệt</button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Công cụ Quản lý</span></div>
        <Link to="/staff-shifts" className="action-btn btn-indigo" style={{ textDecoration: 'none' }}><i className="fa-solid fa-calendar-days"></i> Phân ca làm việc</Link>
        <Link to="/reports" className="action-btn btn-blue" style={{ textDecoration: 'none' }}><i className="fa-solid fa-file-export"></i> Xuất báo cáo ngày</Link>
      </div>
    </div>
  </>
);

// NHÂN VIÊN KỸ THUẬT (TECHNICAL STAFF)
const TechDashboard = () => (
  <>
    <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #475569, #1e293b)' }}>
      <div className="welcome-text">
        <h1>Trung tâm Kỹ thuật 🛠️</h1>
        <p>Hệ thống đang hoạt động ổn định (Uptime: 99.9%)</p>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info"><p>Ticket chờ xử lý</p><h3>4</h3><span className="trend pending" style={{color: '#ef4444'}}>1 Lỗi nghiêm trọng</span></div>
        <div className="stat-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><i className="fa-solid fa-ticket"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Đang xử lý</p><h3>2</h3></div>
        <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><i className="fa-solid fa-screwdriver-wrench"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info"><p>Đã giải quyết</p><h3>28</h3><span className="trend green">Tháng này</span></div>
        <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}><i className="fa-solid fa-check"></i></div>
      </div>
    </div>

    <div className="middle-row">
      <div className="card">
        <div className="card-header"><span className="card-title">Danh sách Ticket mới</span></div>
        <div className="order-list">
          <div className="order-item">
            <div className="order-info"><h5>[ERR-102] Máy in bill quầy 1 không nhận mạng</h5><p>Báo cáo bởi: Thu Ngân 1 - 5 phút trước</p></div>
            <div className="order-status-right"><span className="badge" style={{ background: '#fee2e2', color: '#ef4444' }}>Khẩn cấp</span></div>
          </div>
          <div className="order-item">
            <div className="order-info"><h5>[REQ-055] Quên mật khẩu đăng nhập CRM</h5><p>Báo cáo bởi: Sales 2 - 1 giờ trước</p></div>
            <div className="order-status-right"><span className="badge blue">Bình thường</span></div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header"><span className="card-title">Công cụ</span></div>
        <Link to="/server-status" className="action-btn btn-indigo" style={{ textDecoration: 'none' }}><i className="fa-solid fa-server"></i> Tình trạng Server</Link>
        <Link to="/database-backup" className="action-btn btn-green" style={{ textDecoration: 'none' }}><i className="fa-solid fa-database"></i> Sao lưu Dữ liệu</Link>
      </div>
    </div>
  </>
);

const DashboardPage = () => {
  const [userRole, setUserRole] = useState('admin');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const role = user.role;
      if(role === 'admin') {
        setUserRole('admin');
      }
      else if(role === 'staff') {
        const staff = JSON.parse(localStorage.getItem('staff'));
        if(staff) {
          if(staff.type === 'manager') {
            setUserRole('manager');
          }
          else if(staff.type === 'tech') {
            setUserRole('tech');
          }
          else if(staff.type === 'sales') {
            setUserRole('sales');
          }
          else {
            setUserRole('warehouse');
          }
        }
      }
      else if(role === 'customer') {
        setUserRole('customer');
      }
    }
  }, []);

  const renderDashboardByRole = () => {
    switch (userRole) {
        case 'admin':
            return <AdminDashboard />;
        case 'warehouse':
            return <StaffDashboard />;
        case 'customer':
            return <CustomerDashboard />;
        case 'manager':
            return <ManagerDashboard />;
        case 'tech':
            return <TechDashboard />;
        case 'sales':
            return <SalesDashboard />;
      default:
        return <div>Lỗi: Không xác định được vai trò người dùng.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <span>Test UI: </span>
        <button onClick={() => setUserRole('admin')} className="btn-sm">View as Admin</button>
        <button onClick={() => setUserRole('warehouse')} className="btn-sm">View as Warehouse</button>
        <button onClick={() => setUserRole('customer')} className="btn-sm">View as Customer</button>
        <button onClick={() => setUserRole('manager')} className="btn-sm">View as Manager</button>
        <button onClick={() => setUserRole('tech')} className="btn-sm">View as Tech Staff</button>
        <button onClick={() => setUserRole('sales')} className="btn-sm">View as Sales</button>
      </div>

      {/*hiển thị Dashboard*/}
      {renderDashboardByRole()}
    </div>
  );
};

export default DashboardPage;