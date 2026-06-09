import React, { useState, useEffect } from 'react';
import { getData, postData, putData, getErrorMessage } from '../../services/api';
import '../../styles/BranchManagement.css'; 
import { useToast } from '../../components/ToastContext';

const BranchManagementPage = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setIsLoading(true);
      const data = await getData('/branches'); 
      setBranches(data);
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    // Khởi tạo đầy đủ các trường khớp với DB Not Null
    setEditingBranch({ 
      name: '', 
      address: '', 
      phone: '', 
      email: '',
      type: 'retail_branch', // Giá trị mặc định khớp ENUM của bạn
      operatingStatus: 'open',
      numberOfStaff: 0,
      capacity: 0
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (branch) => {
    setEditingBranch({ ...branch });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Chuyển đổi kiểu dữ liệu cho số lượng nhân viên và sức chứa
    const parsedValue = (name === 'numberOfStaff' || name === 'capacity') ? Number(value) : value;
    setEditingBranch(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSaveBranch = async (e) => {
    e.preventDefault();
    try {
      if (editingBranch.id) {
        const updated = await putData(`/branches/${editingBranch.id}`, editingBranch);
        setBranches(branches.map(b => b.id === updated.id ? updated : b));
        showToast('Cập nhật chi nhánh thành công!', 'success');
      } else {
        const created = await postData('/branches', editingBranch);
        setBranches([...branches, created]);
        showToast('Tạo chi nhánh mới thành công!', 'success');
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast(getErrorMessage(err), 'error');
    }
  };

  const filteredBranches = branches.filter(b => 
    b.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.operatingStatus === 'open').length;
  const headWarehouses = branches.filter(b => b.type === 'head_warehouse').length;

  return (
    <div className="branch-container">
      <h2 className="branch-page-title">Quản lý Chi nhánh & Kho tổng</h2>

      {/* THỐNG KÊ NHANH */}
      <div className="branch-stats-grid">
        <div className="branch-stat-card">
          <div className="stat-title">Tổng số cơ sở</div>
          <div className="stat-value">{totalBranches}</div>
        </div>
        <div className="branch-stat-card green">
          <div className="stat-title">Đang hoạt động</div>
          <div className="stat-value">{activeBranches}</div>
        </div>
        <div className="branch-stat-card orange">
          <div className="stat-title">Kho tổng / Trụ sở</div>
          <div className="stat-value">{headWarehouses}</div>
        </div>
      </div>

      {/* THANH CÔNG CỤ */}
      <div className="branch-toolbar">
        <input 
          type="text" 
          placeholder="Tìm tên hoặc địa chỉ chi nhánh..." 
          className="branch-search-box"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="btn-add-branch" onClick={handleAddNew}>+ Thêm chi nhánh</button>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="branch-table-wrapper">
        {isLoading ? (
          <p className="loading-text" style={{padding: '30px', textAlign: 'center'}}>Đang tải dữ liệu...</p>
        ) : (
          <table className="branch-table">
            <thead>
              <tr>
                <th>Mã CN</th>
                <th>Tên cơ sở</th>
                <th>Địa chỉ</th>
                <th>Thông tin liên hệ</th>
                <th>Phân loại</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map(branch => (
                <tr key={branch.id}>
                  <td>#{branch.id}</td>
                  <td><strong>{branch.name}</strong></td>
                  <td>{branch.address}</td>
                  <td>
                    <div>SĐT: {branch.phone}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Email: {branch.email}</div>
                  </td>
                  <td>
                    <span className={branch.type === 'head_warehouse' ? 'badge-type-main' : 'badge-type-sub'}>
                      {branch.type === 'head_warehouse' ? 'Trụ sở chính' : 'Chi nhánh'}
                    </span>
                  </td>
                  <td>
                    <span className={branch.operatingStatus === 'open' ? 'badge-active' : 'badge-closed'}>
                      {branch.operatingStatus === 'open' ? 'Hoạt động' : 'Đóng cửa'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit-branch" onClick={() => handleEditClick(branch)}>Cập nhật</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL THÊM/SỬA */}
      {isModalOpen && editingBranch && (
        <div className="branch-modal-mask" onClick={() => setIsModalOpen(false)}>
          <div className="branch-modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="branch-modal-header">
              <h3>{editingBranch.id ? 'Cập nhật thông tin chi nhánh' : 'Thiết lập chi nhánh mới'}</h3>
              <button className="branch-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleSaveBranch} className="branch-modal-form" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              <div className="form-group">
                <label>Tên cơ sở / Chi nhánh (*)</label>
                <input type="text" name="name" value={editingBranch.name} onChange={handleInputChange} required placeholder="VD: Chi nhánh Quận 1" />
              </div>
              
              <div className="form-group">
                <label>Địa chỉ (*)</label>
                <input type="text" name="address" value={editingBranch.address} onChange={handleInputChange} placeholder="Nhập địa chỉ chi tiết" required/>
              </div>

              {/* Nhóm liên hệ */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Số điện thoại (*)</label>
                  <input type="text" name="phone" value={editingBranch.phone} onChange={handleInputChange} placeholder="VD: 0901234567" required/>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Email (*)</label>
                  <input type="email" name="email" value={editingBranch.email} onChange={handleInputChange} placeholder="Email chi nhánh" required/>
                </div>
              </div>

              {/* Nhóm sức chứa và nhân viên */}
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Số lượng nhân sự tối đa(*)</label>
                  <input type="number" name="numberOfStaff" min="0" value={editingBranch.numberOfStaff} onChange={handleInputChange} required/>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Sức chứa kho (Sản phẩm) (*)</label>
                  <input type="number" name="capacity" min="0" value={editingBranch.capacity} onChange={handleInputChange} required/>
                </div>
              </div>
              
              <div className="form-group">
                <label>Quy mô / Loại cơ sở (*)</label>
                <select name="type" value={editingBranch.type || 'retail_branch'} onChange={handleInputChange} required>
                  <option value="retail_branch">Chi nhánh bán lẻ</option>
                  <option value="head_warehouse">Trụ sở / Kho tổng</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tình trạng hoạt động (*)</label>
                <select name="operatingStatus" value={editingBranch.operatingStatus || 'open'} onChange={handleInputChange} disabled={!editingBranch.id} required>
                  <option value="open">Đang mở cửa hoạt động</option>
                  <option value="close">Tạm dừng / Đóng cửa</option>
                  <option value="maintenance">Đang bảo trì</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Hủy bỏ</button>
                <button type="submit" className="btn-save">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchManagementPage;