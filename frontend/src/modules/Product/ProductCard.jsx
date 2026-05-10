import React from 'react';
import { FaEdit, FaTrash, FaCartPlus, FaEye } from 'react-icons/fa';

const ProductCard = ({ product, type }) => {
  // Format giá tiền theo VNĐ
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' VNĐ';
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
        {product.stock <= 0 && <span className="out-of-stock-label">Hết hàng</span>}
      </div>
      
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{formatPrice(product.price)}</p>
        {type === 'management' && (
          <p className="product-stock">Kho: <strong>{product.stock}</strong></p>
        )}
      </div>

      <div className="product-actions">
        {type === 'management' ? (
          <>
            <button className="btn-edit" title="Sửa sản phẩm"><FaEdit /> Sửa</button>
            <button className="btn-delete" title="Xóa sản phẩm"><FaTrash /> Xóa</button>
          </>
        ) : (
          <>
            <button className="btn-view" title="Xem chi tiết"><FaEye /> Chi tiết</button>
            <button 
              className="btn-add-cart" 
              disabled={product.stock <= 0}
              title="Thêm vào giỏ hàng"
            >
              <FaCartPlus /> Thêm
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;