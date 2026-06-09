import React, { useState, useEffect } from 'react';
import { getData, putData, getErrorMessage } from '../../services/api';
import '../../styles/StaffCustomerManagement.css';
import { useToast } from '../../components/ToastContext';

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Bộ lọc tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRank, setFilterRank] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const data = await getData('/customers'); 
        setCustomers(data);
      } catch (err) {
        const errorMsg = getErrorMessage(err);
        showToast(errorMsg, 'error'); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleEditClick = (customer) => {
    setEditingCustomer({ ...customer });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    try {
      const updated = await putData(`/customers/${editingCustomer.id}`, editingCustomer);
      setCustomers(customers.map(c => c.id === editingCustomer.id ? updated : c));
      setIsModalOpen(false);
      showToast('Cập nhật hạng khách hàng thành công!', 'success');
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      showToast(errorMsg, 'error');
    }
  };

  const filteredCustomers = customers.filter(cust => {
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      cust.fullname?.toLowerCase().includes(searchLower) ||
      cust.email?.toLowerCase().includes(searchLower) ||
      cust.phone?.includes(searchTerm);

    const matchRank = filterRank ? cust.type === filterRank : true;

    return matchSearch && matchRank;
  });

  return (
    <div className="management-container">
      <h2 className="page-title">Quản lý Khách hàng</h2>

      {/* Bộ lọc */}
      <div className="filter-toolbar">
        <input 
          type="text" 
          placeholder="Tìm theo tên, email, số điện thoại..." 
          className="search-box long-search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={filterRank} onChange={e => setFilterRank(e.target.value)} className="select-box">
          <option value="">Tất cả phân hạng</option>
          <option value="normal">Thành viên thường</option>
          <option value="vip">Thành viên VIP</option>
          <option value="gold">Hạng Vàng</option>
          <option value="diamond">Hạng Kim cương</option>
        </select>
      </div>

      {/* Bảng danh sách */}
      <div className="table-container">
        {isLoading ? (
          <p className="loading-text">Đang tải danh sách khách hàng...</p>
        ) : (
          <table className="pure-management-table">
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Giới tính</th>
                <th>Hạng thành viên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr><td colSpan="7" className="empty-cell">Không có dữ liệu khách hàng phù hợp.</td></tr>
              ) : (
                filteredCustomers.map(cust => (
                  <tr key={cust.id}>
                    <td>#{cust.id}</td>
                    <td><strong>{cust.fullname || 'Ẩn danh'}</strong></td>
                    <td>{cust.email}</td>
                    <td>{cust.phone || '-'}</td>
                    <td>
                      {cust.sex === 'male' ? 'Nam' : cust.sex === 'female' ? 'Nữ' : 'Khác'}
                    </td>
                    <td><span className={`rank-badge rank-${cust.type}`}>{cust.type?.toUpperCase()}</span></td>
                    <td>
                      <button className="action-btn-edit" onClick={() => handleEditClick(cust)}>Sửa hạng</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal sửa phân hạng */}
      {isModalOpen && editingCustomer && (
        <div className="modal-mask" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box small-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Điều chỉnh phân hạng khách hàng</h3>
              <button className="close-mask-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveCustomer} className="modal-form">
              <div className="input-group">
                <label>Khách hàng</label>
                <input type="text" value={editingCustomer.fullname || editingCustomer.username} disabled className="disabled-input" />
              </div>

              <div className="input-group">
                <label>Hạng thành viên (Hệ thống SMARTVIBE)</label>
                <select name="type" value={editingCustomer.type || 'normal'} onChange={handleInputChange} required>
                  <option value="normal">Normal (Mặc định)</option>
                  <option value="vip">VIP</option>
                  <option value="gold">Gold</option>
                  <option value="diamond">Diamond</option>
                </select>
              </div>

              <div className="modal-footer-btns">
                <button type="button" className="btn-form-cancel" onClick={() => setIsModalOpen(false)}>Đóng</button>
                <button type="submit" className="btn-form-submit">Cập nhật hạng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementPage;