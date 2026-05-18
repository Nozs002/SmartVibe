import React, { useState, useEffect } from 'react';
import AccountForm from '../../modules/User/AccountForm';
import { getData, postData, putData, deleteData } from '../../services/api';
import '../../styles/UserManagement.css';

const UserManagementPage = () => {
  const [accounts, setAccounts] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getData('/users/all');
        setAccounts(response);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleSaveAccount = async (accountData) => {
    try {
      if (editingAccount) {
        // Cập nhật (PUT) - Gọi API PUT
        const updatedAccount = await putData(`/users/${editingAccount.id}`, accountData);
        setAccounts(accounts.map((acc) => (acc.id === editingAccount.id ? updatedAccount : acc)));
        alert("Cập nhật thành công!");
      } else {
        // Thêm mới (POST) - Gọi API POST
        const newAccount = await postData('/users', accountData);
        setAccounts([...accounts, newAccount]);
        alert("Thêm mới thành công!");
      }
      setIsFormVisible(false);
      setEditingAccount(null);
    } catch (err) {
      alert(err.message || "Lỗi khi lưu tài khoản!");
      console.error(err);
    }
  };

  // 3. XÓA TÀI KHOẢN
  const handleDeleteAccount = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        // Gọi API DELETE
        await deleteData(`/users/${id}`);
        setAccounts(accounts.filter((acc) => acc.id !== id));
        alert("Đã xóa thành công!");
      } catch (err) {
        alert(err.message || "Lỗi khi xóa tài khoản!");
        console.error(err);
      }
    }
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setIsFormVisible(true);
  };

  return (
    <div className="page-container">
      <h2 className="header-title">Quản lý Tài khoản</h2>
      
      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)} className="btn-add">
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

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Tên đăng nhập</th>
              <th className="th">Email</th>
              <th className="th">Số điện thoại</th>
              <th className="th">Chức vụ</th>
              <th className="th">Trạng thái</th>
              <th className="th">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                  Chưa có tài khoản nào trong hệ thống.
                </td>
              </tr>
            ) : (
              accounts.map((account, index) => (
                <tr key={account.id} className="tr">
                  <td className="td">#{index + 1}</td>
                  <td className="td"><strong>{account.username}</strong></td>
                  <td className="td">{account.email}</td>
                  <td className="td">{account.phone}</td>
                  <td className="td">
                    {/* Đổi className thành style và đổi tên hàm */}
                    <span style={getRoleStyle(account.role)}>{account.role === 'system admin' ? 'Quản trị viên' : account.role === 'staff' ? 'Nhân viên' : 'Khách hàng'}</span>
                  </td>
                  <td className="td">
                    <span style={getStatusStyle(account.accountStatus)}>{account.accountStatus === 'active' ? 'Hoạt động' : account.accountStatus === 'inactive' ? 'Chờ phê duyệt' : 'Bị khóa'}</span>
                  </td>
                  <td className="td">
                    <button onClick={() => handleEditClick(account)} className="btn-edit">Sửa</button>
                    <button onClick={() => handleDeleteAccount(account.id)} className="btn-delete">Xóa</button>
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

// Đổi tên hàm cho đúng ngữ nghĩa (trả về style chứ không phải className)
const getStatusStyle = (status) => {
  let color = '#374151';
  let bgColor = '#e5e7eb';
  if (status === 'active') {
    bgColor = '#d1fae5';
    color = '#059669'; 
  }
  if (status === 'inactive') {
    bgColor = '#fee2e2';
    color = '#ff9900'; 
  }
  if (status === 'banned') {
    bgColor = '#fee2e2';
    color = '#dc2626'; 
  }
  return { backgroundColor: bgColor,
    color: color,
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block' };
};

const getRoleStyle = (role) => {
  let bgColor = '#e5e7eb';
  let color = '#374151';
  if (role === 'system admin') { bgColor = '#fee2e2'; color = '#991b1b'; } 
  if (role === 'staff') { bgColor = '#e0e7ff'; color = '#3730a3'; } 
  if (role === 'customer') { bgColor = '#d1fae5'; color = '#065f46'; } 

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

export default UserManagementPage;