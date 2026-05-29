import React from 'react';
import '../../styles/Product.css';

const ProductCard = ({ product, role = 'customer', onViewDetail, onActionClick }) => {
  
  // Xử lý sự kiện click vào nút hành động
  const handleAction = (actionType) => {
    if (onActionClick) {
      onActionClick(actionType, product);
    }
  };

  // Render nút bấm dựa trên Role để tái sử dụng
  const renderButtons = () => {
    switch (role) {
      case 'manager':
        return (
          <>
            <button className="btn-action btn-outline" onClick={() => handleAction('edit')}>
              Chỉnh sửa
            </button>
            <button className="btn-action btn-danger" onClick={() => handleAction('discontinue')}>
              Ngừng bán
            </button>
          </>
        );
      case 'staff':
        return (
          <>
            <button className="btn-action btn-outline" onClick={() => handleAction('check_stock')}>
              Kiểm kho
            </button>
            <button className="btn-action btn-primary" onClick={() => handleAction('create_pos')}>
              Lên đơn POS
            </button>
          </>
        );
      case 'customer':
      default:
        const isOutOfStock = product.stock <= 0;
        return (
          <>
            <button className="btn-action btn-dark" onClick={() => handleAction('add_to_cart')} disabled={isOutOfStock}>
              Thêm vào giỏ hàng
            </button>
          </>
        );
    }
  };

  return (
    <div className="product-card">
      {/* Box hình ảnh - Click để xem chi tiết */}
      <div className="product-image-wrapper" onClick={() => onViewDetail && onViewDetail(product)}>
        <span className="product-badge">{product.categoryName || 'Other'}</span>
        <img 
          src={product.thumbnail || '/placeholder-image.png'} 
          alt={product.name} 
          className="product-image"
        />
      </div>

      <div className="product-info">
        {/* Tên sản phẩm - Click để xem chi tiết */}
        <h3 className="product-title" onClick={() => onViewDetail && onViewDetail(product)}>
          {product.name}
        </h3>
        
        <div className="product-meta">
          <div className="product-price">
            {Number(product.price).toLocaleString()}đ
          </div>
          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="text-in-stock">Tồn kho: {product.stock}</span>
            ) : (
              <span className="text-out-of-stock">Hết hàng</span>
            )}
          </div>
        </div>

        <div className="product-actions">
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;