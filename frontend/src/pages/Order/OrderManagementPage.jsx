import React, { useState } from 'react';
import OrderManagementForm from '../../modules/Order/OrderManagementForm';

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'Nguyễn Văn A', product: 'Laptop Dell XPS', quantity: 1, status: 'Hoàn thành' },
    { id: 2, customerName: 'Trần Thị B', product: 'Bàn phím cơ', quantity: 2, status: 'Chờ xử lý' },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      setOrders(orders.map((o) => (o.id === editingOrder.id ? { ...orderData, id: o.id } : o)));
    } else {
      const newOrder = { ...orderData, id: Date.now() };
      setOrders([...orders, newOrder]);
    }
    setIsFormVisible(false);
    setEditingOrder(null);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setIsFormVisible(true);
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.headerTitle}>Quản lý Đơn hàng</h2>
      
      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)} style={styles.btnAdd}>
          + Thêm Đơn Hàng
        </button>
      )}

      {isFormVisible && (
        <OrderManagementForm 
          onSubmit={handleSaveOrder} 
          onCancel={() => {
            setIsFormVisible(false);
            setEditingOrder(null);
          }}
          initialData={editingOrder} 
        />
      )}

      {/* Bọc table trong 1 container để tạo nền trắng giống hình */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Mã ĐH</th>
              <th style={styles.th}>Khách hàng</th>
              <th style={styles.th}>Sản phẩm</th>
              <th style={styles.th}>Số lượng</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>Chưa có đơn hàng nào.</td></tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} style={styles.tr}>
                  <td style={styles.td}>#{order.id.toString().slice(-4)}</td>
                  <td style={styles.td}>{order.customerName}</td>
                  <td style={styles.td}>{order.product}</td>
                  <td style={styles.td}>{order.quantity}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(order.status)}>{order.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleEditClick(order)} style={styles.btnEdit}>Sửa</button>
                    <button onClick={() => handleDeleteOrder(order.id)} style={styles.btnDelete}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Hàm hỗ trợ đổi màu text trạng thái giống hình
const getStatusStyle = (status) => {
  let color = '#374151'; // Default
  if (status === 'Hoàn thành') color = '#059669'; // Xanh lá đậm
  if (status === 'Chờ xử lý') color = '#d97706'; // Cam đậm
  if (status === 'Đã hủy') color = '#dc2626'; // Đỏ
  if (status === 'Đang giao') color = '#2563eb'; // Xanh dương
  return { color, fontWeight: '600' };
};

// CSS Dashboard Style
const styles = {
  pageContainer: { 
    padding: '30px', 
    fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f4f6f9', // Màu nền tổng thể xám nhạt như trong ảnh
    minHeight: '100vh',
    color: '#333'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '20px',
    marginTop: '0'
  },
  btnAdd: { 
    marginBottom: '20px', 
    padding: '10px 18px', 
    backgroundColor: '#0088cc', // Xanh dương giống ảnh
    color: 'white', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  tableWrapper: {
    backgroundColor: '#ffffff', // Bảng nền trắng
    borderRadius: '8px',
    border: '1px solid #e5e7eb', // Viền mờ quanh bảng
    overflowX: 'auto'
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
  },
  th: { 
    borderBottom: '1px solid #e5e7eb', 
    borderRight: '1px solid #e5e7eb', // Các cột có viền dọc mờ
    padding: '14px 16px', 
    backgroundColor: '#f9fafb', // Nền header xám rất nhạt
    textAlign: 'left',
    color: '#111827',
    fontWeight: '600',
    fontSize: '14px'
  },
  tr: {
    borderBottom: '1px solid #e5e7eb',
  },
  td: { 
    padding: '14px 16px',
    borderRight: '1px solid #e5e7eb',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: '#ffffff'
  },
  btnEdit: { 
    marginRight: '8px', 
    padding: '6px 12px', 
    cursor: 'pointer', 
    backgroundColor: '#ffc107', // Màu vàng
    color: '#000', 
    border: 'none', 
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500'
  },
  btnDelete: { 
    padding: '6px 12px', 
    cursor: 'pointer', 
    backgroundColor: '#ef4444', // Màu đỏ
    color: 'white', 
    border: 'none', 
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500'
  }
};

// Loại bỏ border-right cho cột cuối cùng để bảng trông gọn gàng hơn
styles.th.borderRight = '1px solid #f3f4f6';
styles.td.borderRight = '1px solid #f3f4f6';

export default OrderManagementPage;
