import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData, getData, getErrorMessage } from '../../services/api';
import { useToast } from '../../components/ToastContext';
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../../styles/product-management.css'; 

const AddProductPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State cơ bản
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    brandId: '',
    price: '',
    warrantyMonths: 12,
    isSerialized: false,
    status: 'active',
    thumbnail: '',
    description: ''
  });

  // State riêng cho mảng Thông số kỹ thuật (Dynamic Array)
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const [cats, brds] = await Promise.all([
          getData('/categories/all').catch(() => []),
          getData('/brands').catch(() => [])
        ]);
        setCategories(cats || []);
        setBrands(brds || []);
        
        if (cats?.length > 0) setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
        if (brds?.length > 0) setFormData(prev => ({ ...prev, brandId: brds[0].id }));
      } catch (error) {
        console.error("Lỗi lấy danh mục", error);
      }
    };
    fetchSelectData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Các hàm xử lý giao diện Thêm/Xóa thông số
  const handleSpecChange = (index, field, val) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index) => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Ép mảng specs [{key: 'RAM', value: '8GB'}] thành Object chuẩn JSON {"RAM": "8GB"}
      const specObject = {};
      specs.forEach(item => {
        if (item.key.trim() && item.value.trim()) {
          specObject[item.key.trim()] = item.value.trim();
        }
      });

      const payload = {
        ...formData,
        price: Number(formData.price),
        warrantyMonths: Number(formData.warrantyMonths),
        categoryId: Number(formData.categoryId),
        brandId: Number(formData.brandId),
        specifications: specObject 
      };

      await postData('/products/create', payload); 
      showToast('Thêm sản phẩm thành công! Kho đã được khởi tạo.', 'success');
      navigate('/products'); 
    } catch (error) {
      showToast(getErrorMessage(error), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-page-wrapper">
      <div className="page-breadcrumb">
        Dashboard / Sản phẩm / <span>Thêm mới</span>
      </div>
      
      <div className="page-header-container">
        <h1 className="page-title">Thêm sản phẩm mới</h1>
      </div>

      <div className="form-card-container" style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit}>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 2 }}>
              <label>Tên sản phẩm (*)</label>
              <input type="text" name="name" className="input-control" value={formData.name} onChange={handleChange} required placeholder="VD: iPhone 15 Pro Max" />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Mã SKU (*)</label>
              <input type="text" name="sku" className="input-control" value={formData.sku} onChange={handleChange} required placeholder="VD: IPH15PM-256-VN" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Danh mục</label>
              <select name="categoryId" className="select-control" value={formData.categoryId} onChange={handleChange} required>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Thương hiệu</label>
              <select name="brandId" className="select-control" value={formData.brandId} onChange={handleChange} required>
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Giá bán (VNĐ) (*)</label>
              <input type="number" name="price" min="0" className="input-control" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Bảo hành (tháng)</label>
              <input type="number" name="warrantyMonths" min="0" className="input-control" value={formData.warrantyMonths} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Trạng thái</label>
              <select name="status" className="select-control" value={formData.status} onChange={handleChange}>
                <option value="active">Đang bán</option>
                <option value="inactive">Chờ phê duyệt</option>
                <option value="discontinued">Ngừng kinh doanh</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Link ảnh đại diện (Thumbnail URL)</label>
            <input type="text" name="thumbnail" className="input-control" value={formData.thumbnail} onChange={handleChange} placeholder="https://..." />
          </div>

          {/* PHẦN THÊM THÔNG SỐ KỸ THUẬT (JSON) CHUẨN UI */}
          <div className="form-group" style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '15px', color: '#2c3e50' }}>
              <strong>Thông số kỹ thuật (Tùy chọn)</strong>
            </label>
            
            {specs.map((spec, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="input-control" 
                  style={{ flex: 1 }} 
                  placeholder="Tên thông số (VD: RAM, CPU, Pin)" 
                  value={spec.key} 
                  onChange={(e) => handleSpecChange(index, 'key', e.target.value)} 
                />
                <input 
                  type="text" 
                  className="input-control" 
                  style={{ flex: 2 }} 
                  placeholder="Giá trị (VD: 8GB, Apple M2)" 
                  value={spec.value} 
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)} 
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveSpec(index)} 
                  style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: '10px' }}
                  title="Xóa thông số này"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={handleAddSpec} 
              style={{ background: 'transparent', border: '1px dashed #3498db', color: '#3498db', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}
            >
              <FaPlus /> Thêm dòng thông số
            </button>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>Mô tả sản phẩm</label>
            <textarea name="description" className="input-control" rows="4" value={formData.description} onChange={handleChange}></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" name="isSerialized" checked={formData.isSerialized} onChange={handleChange} style={{ width: '18px', height: '18px' }}/>
              <strong>Quản lý chi tiết từng Serial/IMEI</strong> (Dùng cho điện thoại, laptop...)
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={() => navigate('/products')} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff', cursor: 'pointer' }}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ padding: '10px 20px', border: 'none', borderRadius: '6px', background: '#3498db', color: '#fff', cursor: 'pointer' }}>
              {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;