import React, { useState, useEffect, useMemo } from 'react';
import { FaPlus, FaBoxOpen, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaEye, FaPrint, FaTrashAlt } from 'react-icons/fa';
import { getData } from '../../services/api';
import '../../styles/product-management.css'; 
import { useNavigate } from 'react-router-dom';

const ProductManagementPage = () => {
  const navigate = useNavigate();

  const [inventories, setInventories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const staff = JSON.parse(localStorage.getItem('staff')) || {};
  const user = JSON.parse(localStorage.getItem('user'))

  let role = user.role;
  if(user.role === 'staff'){
    role = staff.type;
  }

  // Fetch Data
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [categoriesRes, inventoriesRes] = await Promise.all([
          getData('/categories/all').catch(() => []),
          getData('/inventory/all').catch(() => [])
        ]);
        setCategories(categoriesRes || []);
        let inventoriesData =[];
        if (staff.branchId === 1){
          inventoriesData = inventoriesRes || [];
        } else {
          inventoriesData = (inventoriesRes || []).filter(i => i.branch.id === staff.branchId);
        }
        setInventories(inventoriesData);
      
      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Lọc dữ liệu
  const filteredInventories = useMemo(() => {
    let result = [...inventories];
    
    // Lọc theo từ khóa (Tìm kiếm)
    if (searchTerm) {
      result = result.filter(i => 
        i.product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        i.product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Lọc theo Thể loại
    if (selectedCategory !== 'all') {
    
      const getSubCategoryIds = (parentId, allCategories) => {
        let ids = [String(parentId)];
        const children = allCategories.filter(cat => String(cat.parentId) === String(parentId));
        children.forEach(child => {
          ids = [...ids, ...getSubCategoryIds(child.id, allCategories)]; 
        });
        return ids;
      };
      const targetCategoryIds = getSubCategoryIds(selectedCategory, categories);
      result = result.filter(i => targetCategoryIds.includes(String(i.product.categoryId)));
    }
    
    return result;
  }, [inventories, searchTerm, selectedCategory, categories]);

  // Bảng thống kê
  const stats = useMemo(() => {
    const total = inventories.length;
    const active = inventories.filter(i => i.quantityAvailable > 10).length;
    const low = inventories.filter(i => i.quantityAvailable > 0 && i.quantityAvailable <= 10).length;
    const out = inventories.filter(i => i.quantityAvailable === 0).length;
    return { total, active, low, out };
  }, [inventories]);

  return (
    <div className="product-page-wrapper">
      
      <div className="page-breadcrumb">
        Dashboard / <span>Tất cả sản phẩm và tồn kho</span>
      </div>
      <div className="page-header-container">
        <div>
          <h1 className="page-title">Manage Products</h1>
          <p className="page-subtitle">Theo dõi, quản lý sản phẩm và tồn kho</p>
        </div>
        {((role === 'manager' && staff.branchId === 1) || role === 'warehouse') && (
          <button className="btn-primary">
            <FaPlus /> Thêm sản phẩm
          </button>
        )}
      </div>

      {/* 2. Overview Cards (Thẻ Thống Kê) */}
      <div className="overview-cards">
        <div className="stat-card">
          <div className="stat-icon total"><FaBoxOpen /></div>
          <div className="stat-info">
            <span className="stat-label">Tổng số sản phẩm</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active"><FaCheckCircle /></div>
          <div className="stat-info">
            <span className="stat-label">Sản phẩm còn hàng</span>
            <span className="stat-value">{stats.active}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon low"><FaExclamationTriangle /></div>
          <div className="stat-info">
            <span className="stat-label">Sắp hết hàng</span>
            <span className="stat-value">{stats.low}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon out"><FaTimesCircle /></div>
          <div className="stat-info">
            <span className="stat-label">Hết hàng</span>
            <span className="stat-value">{stats.out}</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Section */}
      <div className="filter-section">
        <div className="filter-group">
          <span className="filter-label">Search</span>
          <input 
            type="text" 
            placeholder="Tên sản phẩm, SKU..." 
            className="input-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <span className="filter-label">Category</span>
          <select 
            className="select-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {/* Có thể thêm các bộ lọc khác như Status, Price range tùy ý */}
      </div>

      {/* 4. Data Table */}
      <div className="table-container">
        {isLoading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải...</div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>id</th>
                <th>Sản phẩm</th>
                <th>Thể loại</th>
                <th>Trạng thái</th>
                <th>Giá</th>
                <th>Kho chứa</th>
                <th>Tồn kho</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventories.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.product.id}</td>
                  <td>
                    <div className="product-cell">
                      <img src={inventory.product.thumbnail} alt={inventory.product.name} className="product-img" />
                      <div className="product-info-text">
                        <span className="product-name">{inventory.product.name}</span>
                        <span className="product-sku">SKU: {inventory.product.sku || 'Chưa có mã sản phẩm'}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                     {categories.find(c => String(c.id) === String(inventory.product.categoryId))?.name || '---'}
                  </td>

                  <td><span className="status-badge" style={getStatusStyle(inventory.product.status)}>
                    {inventory.product.status=== 'active' ? 'Đang bán' : inventory.product.status === 'inactive' ? 'Chờ phê duyệt' : 'Ngừng bán'}
                    </span> 
                  </td>
                  
                  <td>{inventory.product.price} đ</td>
                  <td>{inventory.branch.name}</td>
                  
                  <td>{inventory.quantityAvailable} items</td>

                  <td>
                    <div className="action-buttons" onClick={() => navigate(`/product-detail/${inventory.product.id}`)}>
                      <FaEye size={18} className="action-icon" title="View" />
                      <FaPrint size={18} className="action-icon" title="Print barcode" />
                      {(role === 'manager') && (
                        <FaTrashAlt size={18} className="action-icon" title="Ngừng bán" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default ProductManagementPage;

const getStatusStyle = (status) => {
  let color = '#374151';
  let bgColor = '#e5e7eb';
  if (status === 'active') { bgColor = '#d1fae5'; color = '#059669'; }
  if (status === 'inactive') { bgColor = '#fef3c7'; color = '#d97706'; } 
  if (status === 'discontinued') { bgColor = '#fee2e2'; color = '#dc2626'; }
  return { backgroundColor: bgColor, color: color, padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block' };
}