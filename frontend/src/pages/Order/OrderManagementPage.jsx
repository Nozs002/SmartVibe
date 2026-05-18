import React, { useState } from 'react';
import '../../styles/Order.css'; // Import file CSS

// --- COMPONENT: Thẻ Thống Kê ---
const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: color }}>{icon}</div>
    <div className="stat-info">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  </div>
);

// --- COMPONENT: Modal Chi Tiết Đơn Hàng ---
const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h3 style={{ marginTop: 0 }}>Order #{order.id}</h3>
        
        <div className="modal-grid">
          <div className="info-block">
            <h4>📄 Order Information</h4>
            <div className="info-row"><span>Date:</span> <strong>{order.date}</strong></div>
            <div className="info-row">
              <span>Status:</span> 
              <span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <div className="info-row"><span>Payment:</span> <strong>{order.paymentMethod}</strong></div>
            <div className="info-row">
              <span>Payment Status:</span> 
              <span className={`badge badge-${order.paymentStatus.toLowerCase()}`}>{order.paymentStatus}</span>
            </div>
          </div>

          <div className="info-block">
            <h4>👤 Customer Information</h4>
            <div className="info-row"><span>Name:</span> <strong>{order.customerName}</strong></div>
            <div className="info-row"><span>Email:</span> <strong>{order.email}</strong></div>
            <div className="info-row"><span>ID:</span> <strong>{order.customerId}</strong></div>
          </div>
        </div>

        <div className="info-block" style={{ marginTop: '24px' }}>
          <h4>📍 Shipping Address</h4>
          <strong>{order.customerName}</strong>
          <p style={{ margin: '4px 0', color: '#637381', fontSize: '14px' }}>{order.address}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button className="btn-primary" onClick={() => window.print()}>🖨️ Print Order</button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT CHÍNH: Trang Quản Lý ---
const OrderManagementPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data dựa trên ảnh
  const stats = [
    { title: 'Pending', value: 0, icon: '⏱️', color: '#f59e0b' },
    { title: 'Processing', value: 1, icon: '🔄', color: '#3b82f6' },
    { title: 'Completed', value: 1, icon: '✅', color: '#10b981' },
    { title: 'Revenue', value: '2.200 đ', icon: '💰', color: '#8b5cf6' },
  ];

  const orders = [
    { 
      id: 'ORD-20250726-6110', 
      customerId: '#36',
      customerName: 'Tuong Phung', 
      email: 'baochau.936@gmail.com', 
      status: 'Delivered', 
      paymentMethod: 'SePay - Online Banking',
      paymentStatus: 'Completed', 
      items: 1,
      total: '2.200 đ', 
      date: 'Jul 26, 2025 4:46 PM', 
      address: '16 phố lộc 5, Hòa Minh, Liên Chiểu, Đà Nẵng, DN 550000\n📞 0935388228' 
    },
    { 
      id: 'ORD-20250725-4189', 
      customerId: '#9',
      customerName: 'Guest', 
      email: 'No email provided', 
      status: 'Processing', 
      paymentMethod: 'SePay - Online Banking',
      paymentStatus: 'Pending', 
      items: 1,
      total: '825.000 đ', 
      date: 'Jul 25, 2025 10:15 AM', 
      address: 'Guest Address...' 
    },
  ];

  const getStatusBadge = (status) => {
    const className = `badge badge-${status.toLowerCase()}`;
    return <span className={className}>{status}</span>;
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
          <label>Search</label>
          <input className="filter-input" placeholder="Order number or product..." />
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select className="filter-input">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
          </select>
        </div>
        <div className="filter-group">
          <label>From Date</label>
          <input className="filter-input" type="date" />
        </div>
        <div className="filter-group">
          <label>To Date</label>
          <input className="filter-input" type="date" />
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="order-table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Total</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <strong>{order.id}</strong><br />
                  <span className="text-sub">ID: {order.customerId} • {order.date.split(' ')[0]} {order.date.split(' ')[1]} {order.date.split(' ')[2]}</span>
                </td>
                <td>
                  <strong>{order.customerName}</strong><br />
                  <span className="text-sub">{order.email}</span>
                </td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  <span style={{ fontSize: '13px', marginRight: '6px' }}>SePay</span>
                  {getStatusBadge(order.paymentStatus)}
                </td>
                <td>
                  <span className="text-sub">{order.items} items</span><br />
                  <strong>{order.total}</strong>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-icon" onClick={() => setSelectedOrder(order)} title="View Details">👁️</button>
                  <button className="btn-icon" title="Print">🖨️</button>
                  <button className="btn-icon" style={{ color: '#ef4444' }} title="Delete">🗑️</button>
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
      />
    </div>
  );
};

export default OrderManagementPage;
