import React, { useState, useEffect } from 'react';
import { getData, putData } from '../../services/api';
import '../../styles/StaffCustomerManagement.css';

const StaffManagementPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // Bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [staffData, branchData] = await Promise.all([
          getData('/staffs'), // Giả định API lấy danh sách nhân viên kèm thông tin user
          getData('/branches/active')
        ]);
        setStaffs(staffData);
        setBranches(branchData);
      } catch (err) {
        console.error('Lỗi tải dữ liệu nhân viên:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (staff) => {
    setEditingStaff({ ...staff });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingStaff(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveStaff = async (e) => {
    e.preventDefault();
    try {
      const updated = await putData(`/staffs/${editingStaff.id}`, editingStaff);
      setStaffs(staffs.map(s => s.id === editingStaff.id ? updated : s));
      setIsModalOpen(false);
      alert('Cập nhật thông tin nhân viên thành công!');
    } catch (err) {
      alert(err.message || 'Lỗi khi cập nhật nhân viên!');
    }
  };

  const filteredStaffs = staffs.filter(staff => {
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      staff.fullname?.toLowerCase().includes(searchLower) ||
      staff.username?.toLowerCase().includes(searchLower) ||
      staff.phone?.includes(searchTerm);
    
    const matchBranch = filterBranch ? staff.branchId === Number(filterBranch) : true;
    const matchType = filterType ? staff.type === filterType : true;
    const matchStatus = filterStatus ? staff.workStatus === filterStatus : true;

    return matchSearch && matchBranch && matchType && matchStatus;
  });

  return (
    <div className="management-container">
      <h2 className="page-title">Quản lý Nhân viên</h2>

      {/* Bộ lọc thanh công cụ */}
      <div className="filter-toolbar">
        <input 
          type="text" 
          placeholder="Tìm theo tên, username, SĐT..." 
          className="search-box"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="select-box">
          <option value="">Tất cả chi nhánh</option>
          {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="select-box">
          <option value="">Tất cả chức vụ</option>
          <option value="manager">Quản lý</option>
          <option value="sales">Bán hàng</option>
          <option value="warehouse">Thủ kho</option>
          <option value="technical">Kỹ thuật</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="select-box">
          <option value="">Tất cả trạng thái</option>
          <option value="working">Đang làm việc</option>
          <option value="on_leave">Nghỉ phép</option>
          <option value="resigned">Đã nghỉ việc</option>
        </select>
      </div>

      {/* Bảng dữ liệu */}
      <div className="table-container">
        {isLoading ? (
          <p className="loading-text">Đang tải dữ liệu nhân viên...</p>
        ) : (
          <table className="pure-management-table">
            <thead>
              <tr>
                <th>Mã NV</th>
                <th>Họ và tên</th>
                <th>Chức vụ</th>
                <th>Chi nhánh</th>
                <th>SĐT</th>
                <th>Lương cơ bản</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaffs.length === 0 ? (
                <tr><td colSpan="8" className="empty-cell">Không tìm thấy nhân viên nào.</td></tr>
              ) : (
                filteredStaffs.map(staff => (
                  <tr key={staff.id}>
                    <td>#{staff.id}</td>
                    <td>
                      <div className="user-info-cell">
                        <span className="user-fullname">{staff.fullname || 'Chưa cập nhật'}</span>
                        <span className="user-username">@{staff.username}</span>
                      </div>
                    </td>
                    <td><span className={`role-badge type-${staff.type}`}>{staff.type}</span></td>
                    <td>{branches.find(b => b.id === staff.branchId)?.name || `Chi nhánh #${staff.branchId}`}</td>
                    <td>{staff.phone || '-'}</td>
                    <td>{staff.basicSalary ? `${Number(staff.basicSalary).toLocaleString()}đ` : '0đ'}</td>
                    <td><span className={`status-badge ws-${staff.workStatus}`}>{staff.workStatus}</span></td>
                    <td>
                      <button className="action-btn-edit" onClick={() => handleEditClick(staff)}>Sửa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal cập nhật nhân viên */}
      {isModalOpen && editingStaff && (
        <div className="modal-mask" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cập nhật hồ sơ nhân viên #{editingStaff.id}</h3>
              <button className="close-mask-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSaveStaff} className="modal-form">
              <div className="grid-row">
                <div className="input-group">
                  <label>Họ và tên</label>
                  <input type="text" name="fullname" value={editingStaff.fullname || ''} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                  <label>Số điện thoại</label>
                  <input type="text" name="phone" value={editingStaff.phone || ''} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid-row">
                <div className="input-group">
                  <label>Chi nhánh công tác (*)</label>
                  <select name="branchId" value={editingStaff.branchId || ''} onChange={handleInputChange} required>
                    {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Chức vụ công tác (*)</label>
                  <select name="type" value={editingStaff.type || ''} onChange={handleInputChange} required>
                    <option value="manager">Manager</option>
                    <option value="sales">Sales</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
              </div>

              <div className="grid-row">
                <div className="input-group">
                  <label>Lương cơ bản (đ)</label>
                  <input type="number" name="basicSalary" value={editingStaff.basicSalary || 0} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                  <label>Trạng thái công tác (*)</label>
                  <select name="workStatus" value={editingStaff.workStatus || ''} onChange={handleInputChange} required>
                    <option value="working">Working</option>
                    <option value="on_leave">On Leave</option>
                    <option value="resigned">Resigned</option>
                  </select>
                </div>
              </div>

              <div className="grid-row">
                <div className="input-group">
                  <label>Phụ cấp</label>
                  <input type="number" name="allowance" value={editingStaff.allowance || 0} onChange={handleInputChange} />
                </div>
                <div className="input-group">
                  <label>Khấu trừ</label>
                  <input type="number" name="deduction" value={editingStaff.deduction || 0} onChange={handleInputChange} />
                </div>
              </div>

              <div className="input-group text-area-group">
                <label>Ghi chú mô tả công việc</label>
                <textarea name="description" value={editingStaff.description || ''} onChange={handleInputChange} rows="3" placeholder="Nhập mô tả nhiệm vụ nhân viên..."></textarea>
              </div>

              <div className="modal-footer-btns">
                <button type="button" className="btn-form-cancel" onClick={() => setIsModalOpen(false)}>Hủy</button>
                <button type="submit" className="btn-form-submit">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagementPage;