import React, { useState, useEffect } from 'react';
import { getData, putData } from '../../services/api'; 
import '../../styles/Order.css';

// --- FORMAT DỮ LIỆU ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN');
};

const calculateTotal = (order) => {
  const itemsTotal = order.orderDetailDTO?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  return itemsTotal + (order.shippingFee || 0);
};

// Thẻ Thống Kê ---
const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: color }}>{icon}</div>
    <div className="stat-info">
      <p style={{ textTransform: 'capitalize' }}>{title}</p>
      <h3>{value}</h3>
    </div>
  </div>
);

// Modal Chi Tiết Đơn Hàng ---
const OrderDetailsModal = ({ order, onClose, onRefresh, onUpdateOrder }) => {
  const [staffInfo, setStaffInfo] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchStaffInfo = async () => {
      const staffId = order?.staff?.id; 
      if (staffId) {
        try {
          const response = await getData(`/staff/${staffId}`); 
          setStaffInfo(response);
        } catch (error) {
          console.error("Lỗi khi lấy thông tin nhân viên:", error);
        }
      }
    };

    if (order) fetchStaffInfo();
  }, [order]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      await putData(`/online_order/${order.id}/status?status=${newStatus}`,{});
      onUpdateOrder(prevOrder => ({ ...prevOrder, orderStatus: newStatus }));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePaymentChange = async (e) => {
    const newPaymentStatus = e.target.value;
    setIsUpdating(true);

    try {
      await putData(`/online_order/${order.id}/payment_status?status=${newPaymentStatus}`,{});
      onUpdateOrder(prevOrder => ({ ...prevOrder, paymentStatus: newPaymentStatus }));
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 className="modal-title">Chi tiết Đơn hàng #{order.id}</h3>
        
        <div className="modal-grid">
          {/* Thông tin chung */}
          <div className="info-block">
            <h4>📄 Thông tin chung</h4>
            <div className="info-row"><span>Ngày tạo:</span> <strong>{formatDate(order.createdAt)}</strong></div>
            
            <div className="info-row info-row-status">
              <span>Trạng thái:</span>
                <select 
                  className="status-select" 
                  value={order.orderStatus} 
                  onChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <option value="pending">Đang chờ</option>
                  <option value="confirmed">Xác nhận</option>
                  <option value="cancelled">Hủy</option>
                </select>
                {isUpdating && <span className="updating-text">Đang lưu...</span>}
            </div>

            <div className="info-row">
              <span>Thanh toán:</span> 
              <strong className="text-uppercase">{order.paymentMethod}</strong>
            </div>
            {order.paymentMethod === 'bank' && (
              <div className="info-row">
              <span>Tài khoản nhận tiền:</span> 
              <strong className="text-uppercase">{order.accountPayment}</strong>
            </div>)}
            <div className="info-row">
              <span>Trạng thái TT:</span> 
              <select 
                className="status-select" 
                value={order.paymentStatus} 
                onChange={handlePaymentChange}
                disabled={isUpdating}
              >
                <option value="paid">Đã thanh toán</option>
                <option value="unpaid">Chưa thanh toán</option>
                <option value="refunded">Hoàn tiền</option>
              </select>
              {isUpdating && <span className="updating-text">Đang lưu...</span>}
            </div>
          </div>

          {/* Thông tin Khách hàng */}
          <div className="info-block">
            <h4>👤 Thông tin Khách hàng</h4>
            <div className="info-row"><span>Tên:</span> <strong>{order.customerName}</strong></div>
            <div className="info-row"><span>SĐT:</span> <strong>{order.phone}</strong></div>
            <div className="info-row"><span>Địa chỉ nhận hàng:</span> <strong>{order.deliveryLocation}</strong></div>
            {order.note && (
              <div className="info-row"><span>Ghi chú:</span> <strong className="text-danger">{order.note}</strong></div>
            )}
          </div>
        </div>

        {/* Khối Nhân viên (Staff) */}
        <div className="info-block staff-block">
          <h4>👨‍💼 Nhân viên hỗ trợ (Staff)</h4>
          {staffInfo ? (
            <div className="staff-grid">
              <div><span>Họ tên:</span> <strong>{staffInfo.name}</strong></div>
              <div><span>Mã NV:</span> <strong>{staffInfo.id}</strong></div>
              <div><span>SĐT:</span> <strong>{staffInfo.phone || 'Chưa cập nhật'}</strong></div>
              <div><span>Email:</span> <strong>{staffInfo.email || 'Chưa cập nhật'}</strong></div>
            </div>
          ) : (
            <div className="empty-text">
              {order?.staff?.id ? 'Đang tải thông tin nhân viên...' : 'Đơn hàng này chưa được gán nhân viên hỗ trợ.'}
            </div>
          )}
        </div>

        {/* Danh sách sản phẩm */}
        <div className="info-block" style={{ marginTop: '24px' }}>
          <h4>🛒 Danh sách sản phẩm</h4>
          <table className="product-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>SL</th>
                <th className="text-right">Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetailDTO?.map(item => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td className="text-right fw-bold">{formatCurrency(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary-row">
            <span>Phí vận chuyển ({order.shippingProvider}):</span>
            <strong>{formatCurrency(order.shippingFee)}</strong>
          </div>
          <div className="summary-row">
            <span>Giảm giá ({order.discountPercent}%):</span>
            <strong>{formatCurrency(order.discountPercent * calculateTotal(order) / 100)}</strong>
          </div>
          <div className="total-row">
            <strong>Tổng cộng:</strong>
            <strong className="total-value">{formatCurrency(calculateTotal(order))}</strong>
          </div>
        </div>

        {/* Footer actions */}
        <div className="modal-footer-actions">
          <button className="btn-primary" onClick={() => window.print()}>🖨️ In Đơn Hàng</button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Trang Quản Lý Chính ---
const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const branchId = JSON.parse(localStorage.getItem('staff'))?.branchId || '';
  const role = JSON.parse(localStorage.getItem('staff'))?.type || '';

  // Lọc đơn hàng
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchMyOrders = async () => {
    try {
      if (!branchId) return;
      const response = await getData(`/online_order/branch?id=${branchId}`);
      
      if (response) {
        setOrders(response);
        setFilteredOrders(response);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [branchId]);

  useEffect(() => {
    let result = orders;

    // Lọc theo Từ khóa
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toString().includes(lowercasedTerm) || 
        (order.customerName && order.customerName.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Lọc theo Trạng thái
    if (statusFilter) {
      result = result.filter(order => order.orderStatus === statusFilter);
    }

    // Lọc theo Từ ngày
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      result = result.filter(order => new Date(order.createdAt) >= start);
    }

    // Lọc theo Đến ngày
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      result = result.filter(order => new Date(order.createdAt) <= end);
    }
    setFilteredOrders(result);

  }, [orders, searchTerm, statusFilter, startDate, endDate]);

  // Bảng thống kê nhanh
  const pendingCount = orders.filter(o => o.orderStatus === 'pending').length;
  const completedCount = orders.filter(o => o.orderStatus === 'completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + calculateTotal(o), 0);

  const stats = [
    { title: 'Chờ xử lý', value: pendingCount, icon: '⏱️', color: '#f59e0b' },
    { title: 'Hoàn thành', value: completedCount, icon: '✅', color: '#10b981' },
    { title: 'Tổng đơn', value: orders.length, icon: '📦', color: '#3b82f6' },
    { title: 'Doanh thu', value: formatCurrency(totalRevenue), icon: '💰', color: '#8b5cf6' },
  ];

  const getStatusBadge = (status) => {
    if (!status) return null;
    let displayStatus = status;
    switch (status.toLowerCase()) {
      case 'pending':
        displayStatus = 'Đang chờ';
        break;
      case 'confirmed':
        displayStatus = 'Đã xác nhận';
        break;
      case 'completed':
        displayStatus = 'Hoàn thành';
        break;
      case 'cancelled':
        displayStatus = 'Đã hủy';
        break;
    }
    const className = `badge badge-${status.toLowerCase()}`;
    return <span className={className}>{displayStatus}</span>;
  };


  return (
    <div className="order-container">
      {/* Header */}
      <div className="order-header">
        <div className="text-sub" style={{ marginBottom: '8px' }}>Dashboard / All Orders</div>
        <h2>Manage Orders</h2>
        <p>Theo dõi và quản lý tất cả đơn hàng</p>
      </div>

      {/* Thống kê */}
      <div className="stats-grid">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Bộ lọc */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Tìm kiếm</label>
          <input className="filter-input" placeholder="Nhập mã đơn, tên KH..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="filter-group">
          <label>Trạng thái</label>
          <select className="filter-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="pending">Đang chờ</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Từ ngày</label>
          <input className="filter-input" type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label>Đến ngày</label>
          <input className="filter-input" type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="order-table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>Đơn hàng</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Tổng tiền</th>
              <th style={{ textAlign: 'right' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <strong>#{order.id}</strong><br />
                  <span className="text-sub">{formatDate(order.createdAt)}</span>
                </td>
                <td>
                  <strong>{order.customerName}</strong><br />
                  <span className="text-sub">{order.phone}</span>
                </td>
                <td>{getStatusBadge(order.orderStatus)}</td>
                <td>
                  <span style={{ fontSize: '13px', marginRight: '6px', textTransform: 'uppercase' }}>
                    {order.paymentMethod}
                  </span>
                  <br />
                  {getStatusBadge(order.paymentStatus)}
                </td>
                <td>
                  <span className="text-sub">
                    {order.orderDetailDTO?.length || 0} sản phẩm
                  </span><br />
                  <strong>{formatCurrency(calculateTotal(order))}</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-icon" onClick={() => setSelectedOrder(order)} title="Xem chi tiết">👁️</button>
                  <button className="btn-icon" style={{ color: '#ef4444' }} title="Xóa">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Render */}
      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        onRefresh={fetchMyOrders}
        onUpdateOrder={setSelectedOrder}
      />
    </div>
  );
};

export default OrderManagementPage;