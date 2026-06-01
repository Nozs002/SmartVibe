import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaBox, FaStore, FaArrowLeft } from 'react-icons/fa';
import { getData } from '../../services/api'; // Đường dẫn import API của bạn
import '../../styles/product-detail.css'; // Giữ nguyên file CSS đã tạo ở bước trước

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { id } = useParams();

  // 2. Các State quản lý dữ liệu và UI
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productStatus, setProductStatus] = useState('');

  const currentUserRole = JSON.parse(localStorage.getItem('staff'))?.type || 'customer';

  const canEdit = ['manager'].includes(currentUserRole);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getData(`/products/${id}`);
        
        if (response) {
          setInventoryData(response);
          setProductStatus(response[0].product.status);
        } else {
          setError("Không tìm thấy thông tin sản phẩm hoặc sản phẩm chưa được nhập kho.");
        }
      } catch (err) {
        console.error("Lỗi fetch chi tiết sản phẩm:", err);
        setError("Có lỗi xảy ra khi lấy dữ liệu từ máy chủ.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  // Hàm xử lý lưu thay đổi trạng thái (Dành cho Manager)
  const handleStatusChange = async (newStatus) => {
    setProductStatus(newStatus);
    // TODO: Viết hàm gọi API PUT/PATCH để cập nhật status xuống DB tại đây
    console.log(`Đã gọi API cập nhật trạng thái sản phẩm ${id} thành:`, newStatus);
  };

  // 4. Render các trạng thái Loading & Error
  if (isLoading) {
    return <div className="pd-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Đang tải dữ liệu sản phẩm...</div>;
  }

  if (error) {
    return (
      <div className="pd-wrapper">
        <button onClick={() => navigate(-1)} style={{ marginBottom: '16px', cursor: 'pointer', background: 'none', border: 'none', color: '#4318FF', fontWeight: 'bold' }}>
          <FaArrowLeft /> Quay lại
        </button>
        <div style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>{error}</div>
      </div>
    );
  }

  // Lấy thông tin chung của sản phẩm từ phần tử đầu tiên trong mảng inventory
  if (!inventoryData || inventoryData.length === 0) return null;

  const productInfo = inventoryData[0].product;
  const totalStock = inventoryData.reduce((sum, item) => sum + (item.quantityAvailable || 0), 0);
  const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);

  return (
    <div className="pd-wrapper">
      <div className="pd-breadcrumb">
        Dashboard / Products / <span>{productInfo.sku}</span>
      </div>

      <div className="pd-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate(-1)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#a3aed1', fontSize: '18px' }} title="Quay lại">
            <FaArrowLeft />
          </button>
          <h1 className="pd-title">Chi tiết Sản phẩm</h1>
        </div>
        
        {canEdit && (
          <button className="pd-btn-edit" onClick={() => console.log('Chuyển sang trang Edit form')}>
            <FaEdit /> Chỉnh sửa thông tin
          </button>
        )}
      </div>

      <div className="pd-grid">
        {/* CỘT TRÁI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Thông tin chung */}
          <div className="pd-card">
            <div className="pd-info-container">
              <img src={productInfo.thumbnail || 'https://via.placeholder.com/250'} alt={productInfo.name} className="pd-image" />
              
              <div className="pd-details">
                <h2 className="pd-name">{productInfo.name}</h2>
                <div className="pd-sku">Mã SKU: {productInfo.sku}</div>
                <div className="pd-price">{formatCurrency(productInfo.price)}</div>
                
                <div className="pd-attr-grid">
                  <div className="pd-attr-item">
                    <span className="pd-attr-label">Trạng thái kinh doanh</span>
                    {canEdit ? (
                      <select 
                        className="pd-status-select" 
                        value={productStatus} 
                        onChange={(e) => handleStatusChange(e.target.value)}
                      >
                        <option value="active">Đang kinh doanh (Active)</option>
                        <option value="inactive">Ngừng kinh doanh (Inactive)</option>
                      </select>
                    ) : (
                      <span className="pd-status-badge">
                        {productStatus === 'active' ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
                      </span>
                    )}
                  </div>
                  
                  <div className="pd-attr-item">
                    <span className="pd-attr-label">Bảo hành</span>
                    <div className="pd-attr-value">{productInfo.warrantyMonths || 0} tháng</div>
                  </div>
                </div>

                <div className="pd-attr-item">
                  <span className="pd-attr-label">Mô tả ngắn</span>
                  <span className="pd-desc-text">
                    {productInfo.description || 'Chưa có mô tả cho sản phẩm này.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tồn kho các chi nhánh */}
          <div className="pd-card">
            <h3 className="pd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaStore color="#a3aed1" /> Tồn kho theo Chi nhánh
            </h3>
            
            <div className="pd-table-wrapper">
              <table className="pd-table">
                <thead>
                  <tr>
                    <th>Chi nhánh</th>
                    <th>Loại hình</th>
                    <th style={{ textAlign: 'right' }}>Số lượng tồn</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inv) => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 600 }}>{inv.branch?.name || 'Chi nhánh không xác định'}</td>
                      <td>
                        <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#f4f7fe', borderRadius: '4px', color: '#4318FF' }}>
                          {inv.branch?.type === 'head_warehouse' ? 'Kho tổng' : 'Cửa hàng'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: '#05cd99' }}>
                        {inv.quantityAvailable}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" style={{ fontWeight: 700, textAlign: 'right', paddingTop: '16px' }}>Tổng tồn kho toàn hệ thống:</td>
                    <td style={{ fontWeight: 800, textAlign: 'right', color: '#1b2559', fontSize: '18px', paddingTop: '16px' }}>
                      {totalStock}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="pd-card">
            <h3 className="pd-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaBox color="#a3aed1" /> Thông số kỹ thuật
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {productInfo.specifications && Object.keys(productInfo.specifications).length > 0 ? (
                Object.entries(productInfo.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e0e5f2', paddingBottom: '8px' }}>
                    <span style={{ color: '#a3aed1', fontSize: '14px', textTransform: 'capitalize' }}>
                      {key}
                    </span>
                    <span style={{ fontWeight: 600, color: '#2b3674', fontSize: '14px', textAlign: 'right', maxWidth: '60%' }}>
                      {value}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '14px', color: '#a3aed1', textAlign: 'center' }}>Sản phẩm này chưa có thông số kỹ thuật.</div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;