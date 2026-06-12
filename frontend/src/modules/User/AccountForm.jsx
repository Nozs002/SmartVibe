import React, { useState, useEffect } from 'react';
import '../../styles/UserManagement.css';
import { getData, getErrorMessage } from '../../services/api';
import { useToast } from '../../components/ToastContext';

const AccountForm = ({ onSubmit, onCancel, initialData }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(
    initialData || {
      username: '',
      fullname: '',
      email: '',
      role: 'customer',
      accountStatus: 'active',
      password: '',
      confirmPassword: '',
      phone: '',
      sex: 'other',
      branchId: '', 
      staffType: '' 
    }
  );

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchData = await getData('/branches/active');
        setBranches(branchData);
      } catch (error) {
        showToast("Lỗi khi tải danh sách", 'error');
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!initialData) {
      if (!formData.password) return showToast("vui lòng nhập mật khẩu", 'error');;
      if (formData.password !== formData.confirmPassword) return showToast("Mật khẩu và xác nhận mật khẩu không khớp", 'error');;
      if (formData.role === 'staff') {
        if (!formData.branchId) return showToast("Vui lòng chọn chi nhánh cho nhân viên!", 'error');;
        if (!formData.staffType) return showToast("Vui lòng chọn chức vụ cho nhân viên!", 'error');
      }
    }

    onSubmit(formData);

    if (!initialData) {
      setFormData({ 
        username: '', fullname: '', email: '', role: 'customer', accountStatus: 'inactive', 
        password: '', confirmPassword: '', phone: '', sex: 'other', branchId: '', staffType: ''
      });
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="form">
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Tên đăng nhập (*):</label>
            <input type="text" name="username" value={formData.username || ''} onChange={handleChange} className="input" placeholder="Nhập tên đăng nhập..." disabled={!!initialData} required />
          </div>
          
          {initialData && (
          <div className="formGroup">
            <label className="label">Họ và tên:</label>
            <input type="text" name="fullname" value={formData.fullname || ''} onChange={handleChange} className="input" placeholder="Nhập họ và tên..." />
          </div>
          )}
        </div>

        <div className="formRow">
          <div className="formGroup">
            <label className="label">Email (*):</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="input" placeholder="Nhập email..." required />
          </div>
          
          {!initialData && (
            <div className="formGroup">
              <label className="label">Số điện thoại:</label>
              <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className="input" placeholder="Nhập số điện thoại..." />
            </div>
          )}
        </div>

        {!initialData && (
          <div className="formRow">
            <div className="formGroup">
              <label className="label">Mật khẩu (*):</label>
              <input type="password" name="password" value={formData.password || ''} onChange={handleChange} className="input" placeholder="Nhập mật khẩu..." required />
            </div>
            <div className="formGroup">
              <label className="label">Xác nhận mật khẩu (*):</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword || ''} onChange={handleChange} className="input" placeholder="Nhập lại mật khẩu..." required />
            </div>
          </div>
        )}
          
        <div className="formRow">
          <div className="formGroup">
            <label className="label">Phân quyền (*):</label>
            <select 
              name="role" 
              value={formData.role || 'customer'} 
              onChange={handleChange} 
              className="input" 
              disabled={!!initialData} 
              required
            >
              <option value="system admin">Quản trị viên (Admin)</option>
              <option value="staff">Nhân viên (Staff)</option>
              <option value="customer">Khách hàng (Customer)</option>
            </select>
          </div>

          {initialData && (
            <div className="formGroup">
              <label className="label">Trạng thái tài khoản:</label>
              <select name="accountStatus" value={formData.accountStatus} onChange={handleChange} className="input">
                <option value="active">Hoạt động (Active)</option>
                <option value="inactive">Chờ phê duyệt (Inactive)</option>
                <option value="banned">Bị khóa (Banned)</option>
              </select>
            </div>
          )}
        </div>

        {/* --- KHU VỰC CHỈ HIỂN THỊ KHI TẠO NHÂN VIÊN MỚI --- */}
        {!initialData && formData.role === 'staff' && (
          <div className="staffSection">
            <div className="formRow">
              <div className="formGroup">
                <label className="label">Chi nhánh làm việc (*):</label>
                <select name="branchId" value={formData.branchId || ''} onChange={handleChange} className="input" required>
                  <option value="">-- Chọn chi nhánh --</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.name} - {branch.address}</option>
                  ))}
                </select>
              </div>
              
              <div className="formGroup">
                <label className="label">Chức vụ (*):</label>
                <select name="staffType" value={formData.staffType || ''} onChange={handleChange} className="input" required>
                  <option value="">-- Chọn chức vụ --</option>
                  <option value="manager">Quản lý (Manager)</option>
                  <option value="sales">Bán hàng (Sales)</option>
                  <option value="warehouse">Thủ kho (Warehouse)</option>
                  <option value="technical">Kỹ thuật (Technical)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="buttonGroup">
          <button type="button" onClick={onCancel} className="btnCancel">Hủy bỏ</button>
          <button type="submit" className="btnSubmit">Lưu tài khoản</button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;