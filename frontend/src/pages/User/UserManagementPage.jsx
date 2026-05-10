import React, { useState } from 'react';
import AccountForm from '../../modules/User/AccountForm';

const UserManagementPage = () => {
  // Dữ liệu mẫu cho Tài khoản
  const [accounts, setAccounts] = useState([
    { id: 1, username: 'admin@smartvibe.vn', fullName: 'Lê Quản Trị', role: 'Admin', status: 'Hoạt động' },
    { id: 2, username: 'nguyenvana', fullName: 'Nguyễn Văn A', role: 'User', status: 'Hoạt động' },
    { id: 3, username: 'tranthib', fullName: 'Trần Thị B', role: 'Manager', status: 'Bị khóa' },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const handleSaveAccount = (accountData) => {
    if (editingAccount) {
      setAccounts(accounts.map((acc) => (acc.id === editingAccount.id ? { ...accountData, id: acc.id } : acc)));
    } else {
      const newAccount = { ...accountData, id: Date.now() };
      setAccounts([...accounts, newAccount]);
    }
    setIsFormVisible(false);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác.")) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setIsFormVisible(true);
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.headerTitle}>Quản lý Tài khoản</h2>
      
      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)} style={styles.btnAdd}>
          + Thêm Tài Khoản
        </button>
      )}

      {isFormVisible && (
        <AccountForm 
          onSubmit={handleSaveAccount} 
          onCancel={() => {
            setIsFormVisible(false);
            setEditingAccount(null);
          }}
          initialData={editingAccount} 
        />
      )}

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Tên đăng nhập</th>
              <th style={styles.th}>Họ và tên</th>
              <th style={styles.th}>Phân quyền</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>Chưa có tài khoản nào trong hệ thống.</td></tr>
            ) : (
              accounts.map((account, index) => (
                <tr key={account.id} style={styles.tr}>
                  <td style={styles.td}>#{index + 1}</td>
                  <td style={styles.td}><strong>{account.username}</strong></td>
                  <td style={styles.td}>{account.fullName}</td>
                  <td style={styles.td}>
                    <span style={getRoleStyle(account.role)}>{account.role}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(account.status)}>{account.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleEditClick(account)} style={styles.btnEdit}>Sửa</button>
                    <button onClick={() => handleDeleteAccount(account.id)} style={styles.btnDelete}>Xóa</button>
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

// Hàm định dạng màu sắc cho Trạng thái
const getStatusStyle = (status) => {
  let color = '#374151';
  if (status === 'Hoạt động') color = '#059669'; // Xanh lá
  if (status === 'Bị khóa') color = '#dc2626'; // Đỏ
  return { color, fontWeight: '600' };
};

// Hàm định dạng màu nền (badge) cho Phân quyền
const getRoleStyle = (role) => {
  let bgColor = '#e5e7eb';
  let color = '#374151';
  if (role === 'Admin') { bgColor = '#fee2e2'; color = '#991b1b'; } // Nền đỏ nhạt, chữ đỏ đậm
  if (role === 'Manager') { bgColor = '#e0e7ff'; color = '#3730a3'; } // Nền xanh nhạt, chữ xanh đậm
  if (role === 'User') { bgColor = '#d1fae5'; color = '#065f46'; } // Nền xanh lá nhạt, chữ xanh lá đậm

  return {
    backgroundColor: bgColor,
    color: color,
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block'
  };
};

// CSS Dashboard Style (Giữ nguyên như trang Order)
const styles = {
  pageContainer: { 
    padding: '30px', 
    fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: '#f4f6f9', 
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
    backgroundColor: '#0088cc', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  tableWrapper: {
    backgroundColor: '#ffffff', 
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    overflowX: 'auto'
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
  },
  th: { 
    borderBottom: '1px solid #e5e7eb', 
    borderRight: '1px solid #f3f4f6', 
    padding: '14px 16px', 
    backgroundColor: '#f9fafb', 
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
    borderRight: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: '#ffffff'
  },
  btnEdit: { 
    marginRight: '8px', 
    padding: '6px 12px', 
    cursor: 'pointer', 
    backgroundColor: '#ffc107', 
    color: '#000', 
    border: 'none', 
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500'
  },
  btnDelete: { 
    padding: '6px 12px', 
    cursor: 'pointer', 
    backgroundColor: '#ef4444', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '500'
  }
};

export default UserManagementPage;
