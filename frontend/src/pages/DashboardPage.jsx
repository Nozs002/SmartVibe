import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; 
import { FaTruck, FaCartPlus, FaCompass } from 'react-icons/fa';
import { getData, getDataWithCondition } from '../services/api'; 
import { useToast } from '../components/ToastContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const response = await getData('/dashboard/admin'); 
        setStats(response.result || response);
      } catch (error) {
        showToast("Không thể kết nối đến máy chủ để lấy thống kê", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    }
    return date.toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <span className="badge blue">Đang hoạt động</span>;
      case 'inactive': return <span className="badge yellow">Chờ phê duyệt</span>;
      case 'banned': return <span className="badge red" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>Bị khóa</span>;
      default: return <span className="badge grey">Chưa rõ</span>;
    }
  };

  if (isLoading || !stats) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Đang tải dữ liệu tổng quan...</div>;
  }

  return (
    <>
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>Welcome back, Admin! 👋</h1>
          <p>Here's what's happening with your system today</p>
        </div>
        <div className="orders-today">
          <h2>{stats.totalUsers}</h2><span>Tất cả người dùng</span>
        </div>
      </div>
      
      <div className="bottom-row">
        <div className="card">
          <div className="card-header"><span className="card-title">Tài khoản theo trạng thái</span></div>
          <div className="status-grid">
            <div className="status-card active">
              <h4>{stats.activeUsers}</h4><p>Đang hoạt động</p>
            </div>
            <div className="status-card inactive">
              <h4>{stats.inactiveUsers}</h4><p>Chờ phê duyệt</p>
            </div>
            <div className="status-card banned">
              <h4>{stats.bannedUsers}</h4><p>Bị khóa</p>
            </div>
            <div className="status-card others">
              <h4>{stats.totalUsers}</h4><p>Tất cả tài khoản</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Tài khoản mới đăng ký</span>
            <Link to="/user-management" className="btn-sm">Xem tất cả</Link>
          </div>
          <div className="order-list">
            {stats.recentUsers && stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user, index) => (
                <div className="order-item" key={index}>
                  <div className="order-info">
                    <h5>{user.username}</h5>
                    <p>{user.fullname}</p>
                  </div>
                  <div className="order-status-right">
                    <h5 style={{ textAlign: 'right' }}>{formatDate(user.createdAt)}</h5>
                    {getStatusBadge(user.status)}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '15px 0' }}>Chưa có tài khoản mới nào.</p>
            )}
          </div>
        </div>
      </div>

      <div className="middle-row">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Biểu đồ tăng trưởng (7 ngày)</span>
            <div style={{ background: '#f4f7fe', padding: '4px', borderRadius: '8px' }}>
              <button className="btn-sm" style={{ background: '#4318FF', color: 'white', marginRight: '5px' }}>7 Days</button>
            </div>
          </div>
          
          <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
            {stats.userGrowthChart && stats.userGrowthChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.userGrowthChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#4318FF" radius={[4, 4, 0, 0]} barSize={30} name="Tài khoản mới" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                Đang tải dữ liệu biểu đồ...
              </div>
            )}
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
};

const StaffDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const currentStaff = JSON.parse(localStorage.getItem('staff') || '{"branchId": 1}');

  useEffect(() => {
    const fetchStaffStats = async () => {
      try {
        setIsLoading(true);
        const response = await getDataWithCondition('/dashboard/staff', { 
          branchId: currentStaff.branchId 
        });
        setStats(response || []);
      } catch (error) {
        showToast("Không thể tải dữ liệu điều chuyển kho", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffStats();
  }, [currentStaff.branchId, showToast]);

  if (isLoading || !stats) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Đang tải công việc hôm nay...</div>;
  }

  return (
    <>
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
        <div className="welcome-text">
          <h1>Chào ca làm việc, Warehouse! ☕</h1>
          <p>Có một vài lệnh điều chuyển kho đang chờ bạn xử lý tại Chi nhánh {currentStaff.branchId}.</p>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-info">
            <p>Đơn chờ xác nhận</p>
            <h3>{stats.pendingTransfers}</h3>
            {stats.pendingTransfers > 0 && (
              <span className="trend pending" style={{color: '#f59e0b'}}>Cần xử lý ngay</span>
            )}
          </div>
          <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}>
            <i className="fa-solid fa-clock"></i>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <p>Đang xuất đi / Chờ nhận</p>
            <h3>{stats.shippingTransfers}</h3>
          </div>
          <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
            <i className="fa-solid fa-box"></i>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <p>Hoàn thành / Đã lưu kho</p>
            <h3>{stats.completedTransfers}</h3>
          </div>
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
            <i className="fa-solid fa-check-double"></i>
          </div>
        </div>
      </div>

      <div className="middle-row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="card">
          <div className="card-header"><span className="card-title">Hành động nhanh</span></div>
          <div style={{ display: 'flex', gap: '10px' }}>
             <Link to="/stock-transfer" className="action-btn btn-blue" style={{ width: 'auto' }}>
               <i className="fa-solid fa-truck-fast"></i> Xử lý Lệnh Điều Chuyển
             </Link>
             <Link to="/warehouse" className="action-btn btn-indigo" style={{ width: 'auto' }}>
               <i className="fa-solid fa-qrcode"></i> Tạo phiếu nhập/xuất kho
             </Link>
             <Link to="/products"  className="action-btn btn-green" style={{ width: 'auto' }}>
               <i className="fa-solid fa-clipboard-check"></i> Tra cứu tồn kho sản phẩm
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomerDashboard = ({customer, onNavigate, user}) => (
  <>
    <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>
      <div className="welcome-text">
        <h1>Xin chào, {user.fullname || "Khách Hàng"}! 🎉</h1>
        <p>Khám phá các sản phẩm mới và theo dõi đơn hàng của bạn.</p>
      </div>
    </div>

    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <div className="stat-card">
        <div className="stat-info">
          <p>Điểm tích lũy</p>
          <span className="trend green">Thành viên {customer.type}</span>
          </div>
        <div className="stat-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}><i className="fa-solid fa-star"></i></div>
      </div>
      <div className="stat-card">
        <div className="stat-info">
          <p>Đơn hàng đang giao</p>
          <h3>1</h3>
          <span className="trend blue">Dự kiến giao: Hôm nay</span>
        </div>
        <div className="stat-icon" style={{ background: '#dbeafe', color: '#3b82f6' }}>
          <FaTruck />
        </div>
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
        <button className="action-btn btn-blue" onClick={() => onNavigate('/cart')}><FaCartPlus style={{ marginRight: '6px' }} /> Đặt đơn hàng mới</button>
        <button className="action-btn btn-purple" onClick={() => onNavigate('/online-order')}><FaCompass style={{ marginRight: '6px' }} /> Khám phá sản phẩm mới</button>
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
        {/* <Link to="/pos" className="action-btn btn-blue" style={{ textDecoration: 'none' }}><i className="fa-solid fa-cash-register"></i> Mở giao diện Bán Hàng (POS)</Link> */}
        <Link to="/customers" className="action-btn btn-green" style={{ textDecoration: 'none' }}><i className="fa-solid fa-id-card"></i> Tra cứu thành viên</Link>
        <Link to="/products" className="action-btn btn-purple" style={{ textDecoration: 'none' }}><i className="fa-solid fa-box-open"></i> Kiểm tra sản phẩm nhanh</Link>
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


const ManagerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const currentStaff = JSON.parse(localStorage.getItem('staff') || '{"branchId": 1}');

  useEffect(() => {
    const fetchManagerStats = async () => {
      try {
        setIsLoading(true);
        // Gọi API sử dụng getDataWithCondition y như Staff
        const response = await getDataWithCondition('/dashboard/manager', { 
          branchId: currentStaff.branchId 
        });
        setStats(response || {});
      } catch (error) {
        console.error("Lỗi lấy dữ liệu Manager dashboard:", error);
        showToast("Không thể tải dữ liệu quản lý", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagerStats();
  }, [currentStaff.branchId, showToast]);

  // Hàm format tiền tệ VNĐ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (isLoading || !stats) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Đang tải dữ liệu tổng quan chi nhánh...</div>;
  }

  return (
    <>
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>
        <div className="welcome-text">
          <h1>Tổng quan Cửa hàng 👋</h1>
          <p>Chi nhánh quản lý: {stats.branchName || `Chi nhánh ${currentStaff.branchId}`}</p>
        </div>
        <div className="orders-today">
          <h2>85%</h2><span>Hiệu suất</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng doanh thu (Tạm tính)</p>
            <h3>{formatCurrency(stats.totalRevenue || 0)}</h3>
            <span className="trend green">+15% so với hôm qua</span>
          </div>
          <div className="stat-icon" style={{ background: '#d1fae5', color: '#10b981' }}><i className="fa-solid fa-chart-line"></i></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <p>Nhân sự đang làm</p>
            <h3>{stats.activeStaff || 0}/{stats.totalStaff || 0}</h3>
            <span className="trend blue">Ca hiện tại</span>
          </div>
          <div className="stat-icon" style={{ background: '#e0e7ff', color: '#6366f1' }}><i className="fa-solid fa-user-clock"></i></div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <p>Cảnh báo kho (Sắp hết)</p>
            <h3>{stats.lowStockAlerts || 0} mã</h3>
            {stats.lowStockAlerts > 0 ? (
              <span className="trend pending" style={{color: '#f59e0b'}}>Cần nhập hàng ngay</span>
            ) : (
              <span className="trend green">Kho hàng ổn định</span>
            )}
          </div>
          <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><i className="fa-solid fa-triangle-exclamation"></i></div>
        </div>
      </div>

      <div className="middle-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Duyệt yêu cầu Xuất Kho</span>
          </div>
          <div className="order-list">
            {stats.pendingApprovals && stats.pendingApprovals.length > 0 ? (
              stats.pendingApprovals.map((req, index) => (
                <div className="order-item" key={index}>
                  <div className="order-info">
                    <h5>Phiếu xuất #{req.documentId} (Nhân viên: {req.staffId})</h5>
                    <p>{req.note || "Không có ghi chú"}</p>
                  </div>
                  {/* Bấm duyệt sẽ chuyển thẳng sang trang Quản lý Kho (tab APPROVAL) */}
                  <button 
                    className="btn-sm" 
                    style={{ background: '#3b82f6', color: 'white' }}
                    onClick={() => navigate('/warehouse')}
                  >
                    Xem & Duyệt
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '15px 0' }}>Không có yêu cầu nào cần duyệt.</p>
            )}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header"><span className="card-title">Công cụ Quản lý</span></div>
          <Link to="/staff-shifts" className="action-btn btn-indigo" style={{ textDecoration: 'none' }}><i className="fa-solid fa-calendar-days"></i> Phân ca làm việc</Link>
          <Link to="/warehouse" className="action-btn btn-blue" style={{ textDecoration: 'none' }}><i className="fa-solid fa-boxes-stacked"></i> Quản lý Vận hành Kho</Link>
          <Link to="/reports" className="action-btn btn-green" style={{ textDecoration: 'none' }}><i className="fa-solid fa-file-export"></i> Xuất báo cáo ngày</Link>
        </div>
      </div>
    </>
  );
};

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
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      const role = storedUser.role;
      if(role === 'system admin' || role === 'admin') {
        setUserRole('admin');
      }
      else if(role === 'staff') {
        const staff = JSON.parse(localStorage.getItem('staff'));
        if(staff) {
          if(staff.type === 'manager') {
            setUserRole('manager');
          }
          else if(staff.type === 'technical' || staff.type === 'tech') {
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
            return <CustomerDashboard customer={customer} onNavigate={navigate} user={user} />;
        case 'manager':
            return <ManagerDashboard />;
        case 'tech':
            return <TechDashboard />;
        case 'sales':
            return <SalesDashboard />;
      default:
        return <div style={{padding: '20px'}}>Lỗi: Không xác định được vai trò người dùng.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {renderDashboardByRole()}
    </div>
  );
};

export default DashboardPage;