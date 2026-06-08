import React, { useState, useEffect } from 'react';
import AccountForm from '../../modules/User/AccountForm';
import { getData, postData, putData, deleteData, patchData } from '../../services/api';
import '../../styles/UserManagement.css';
import { register } from '../../services/auth.service';

const UserManagementPage = () => {

  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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
    };
    fetchUsers();
  }, []);

  const handleSaveAccount = async (accountData) => {
    try {
      if (editingAccount) {
        const updatedAccount = await putData(`/users/${editingAccount.id}`, accountData);
        setAccounts(accounts.map((acc) => (acc.id === editingAccount.id ? updatedAccount : acc)));
      } else {
        if (accountData.role === 'staff') {
          const newStaff = await postData('/users/staff', accountData);
          setAccounts([newStaff, ...accounts]);
        } else {
          const response = await register(accountData);
          const newAccount = response.result;
          setAccounts([newAccount, ...accounts]);
          alert("Tạo khách hàng thành công!");
        }
      }
      closeModal();
    } catch (err) {
      alert(err.message || "Lỗi khi lưu tài khoản!");
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm("Xác nhận duyệt tài khoản này?")) {
      try {
        const updatedAccount = await patchData(`/users/${id}/status`, null, { status: 'active' });
        setAccounts(accounts.map((acc) => (acc.id === id ? updatedAccount : acc)));
      } catch (err) {
        alert(err.message || "Lỗi khi duyệt tài khoản!");
      }
    }
  };

  const handleDeleteAccount = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        await deleteData(`/users/${id}`);
        setAccounts(accounts.filter((acc) => acc.id !== id));
      } catch (err) {
        alert("⚠️ Không thể xóa tài khoản này. Tài khoản đã phát sinh dữ liệu trong hệ thống (nhật ký hoạt động, đơn hàng...). Để bảo toàn lịch sử dữ liệu, vui lòng dùng chức năng 'Khóa tài khoản' (Banned) thay vì xóa");
        console.error(err.response?.data);
      }
    }
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setIsFormVisible(true);
  };

  const handleAddClick = () => {
    setEditingAccount(null);
    setIsFormVisible(true);
  };

  const closeModal = () => {
    setIsFormVisible(false);
    setEditingAccount(null);
  };

  // Logic Tìm kiếm & Lọc
  const filteredAccounts = accounts.filter((account) => {
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      account.username?.toLowerCase().includes(searchLower) ||
      account.email?.toLowerCase().includes(searchLower) ||
      account.fullname?.toLowerCase().includes(searchLower);
      
    const matchRole = filterRole ? account.role === filterRole : true;
    const matchStatus = filterStatus ? account.accountStatus === filterStatus : true;

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="page-container">
      <h2 className="header-title">Quản lý Tài khoản</h2>
      
      {/* Thanh công cụ Tìm kiếm & Lọc */}
      <div className="toolbar">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Tìm theo tên, username, email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select className="filter-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="">Tất cả chức vụ</option>
          <option value="system admin">Quản trị viên</option>
          <option value="staff">Nhân viên</option>
          <option value="customer">Khách hàng</option>
        </select>

        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Chờ phê duyệt</option>
          <option value="banned">Bị khóa</option>
        </select>

        <button onClick={handleAddClick} className="btn-add">
          + Thêm Tài Khoản
        </button>
      </div>

      {/* Bảng dữ liệu */}
      <div className="table-wrapper">
        {isLoading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Đang tải dữ liệu...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="th">ID</th>
                <th className="th">Họ và tên</th>
                <th className="th">Tên đăng nhập</th>
                <th className="th">Email</th>
                <th className="th">Số điện thoại</th>
                <th className="th">Chức vụ</th>
                <th className="th">Trạng thái</th>
                <th className="th">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                    Không tìm thấy tài khoản nào.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account, index) => (
                  <tr key={account.id} className="tr">
                    <td className="td">#{account.id || index + 1}</td>
                    <td className="td">{account.fullname || 'Chưa cập nhật'}</td>
                    <td className="td"><strong>{account.username}</strong></td>
                    <td className="td">{account.email}</td>
                    <td className="td">{account.phone}</td>
                    <td className="td">
                      <span style={getRoleStyle(account.role)}>
                        {account.role === 'system admin' ? 'Quản trị viên' : account.role === 'staff' ? 'Nhân viên' : 'Khách hàng'}
                      </span>
                    </td>
                    <td className="td">
                      <span style={getStatusStyle(account.accountStatus)}>
                        {account.accountStatus === 'active' ? 'Hoạt động' : account.accountStatus === 'inactive' ? 'Chờ phê duyệt' : 'Bị khóa'}
                      </span>
                    </td>
                    <td className="td action-group">
                      {/* Thêm nút Duyệt nếu trạng thái là inactive */}
                      {account.accountStatus === 'inactive' && (
                        <button 
                          onClick={() => handleApprove(account.id)} 
                          className="btn-approve" 
                          style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                        >
                          Duyệt
                        </button>
                      )}
                      <button onClick={() => handleEditClick(account)} className="btn-edit" style={{ marginRight: '5px' }}>Sửa</button>
                      {(account.id !== 1 && account.role !== 'system admin') && ( 
                        <button onClick={() => handleDeleteAccount(account.id)} className="btn-delete">Xóa</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Popup */}
      {isFormVisible && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingAccount ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}</h3>
              <button className="btn-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <AccountForm 
                onSubmit={handleSaveAccount} 
                onCancel={closeModal}
                initialData={editingAccount} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusStyle = (status) => {
  let color = '#374151';
  let bgColor = '#e5e7eb';
  if (status === 'active') { bgColor = '#d1fae5'; color = '#059669'; }
  if (status === 'inactive') { bgColor = '#fef3c7'; color = '#d97706'; }
  if (status === 'banned') { bgColor = '#fee2e2'; color = '#dc2626'; }
  return { backgroundColor: bgColor, color: color, padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block' };
};

const getRoleStyle = (role) => {
  let bgColor = '#e5e7eb';
  let color = '#374151';
  if (role === 'system admin') { bgColor = '#fee2e2'; color = '#991b1b'; } 
  if (role === 'staff') { bgColor = '#e0e7ff'; color = '#3730a3'; } 
  if (role === 'customer') { bgColor = '#d1fae5'; color = '#065f46'; } 
  return { backgroundColor: bgColor, color: color, padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block' };
};

export default UserManagementPage;