import React, { useState } from 'react';
import ProductCard from '../../modules/Product/ProductCard';
import '../../styles/ProductGrid.css';

const ProductManagementPage = () => {
  // Dữ liệu mẫu (Sau này sẽ fetch từ API Spring Boot)
  const [products] = useState([
    { id: 1, name: 'iPhone 15 Pro', category: 'Điện thoại', price: 28000000, stock: 15, image: '' },
    { id: 2, name: 'MacBook M3', category: 'Laptop', price: 45000000, stock: 5, image: '' },
    { id: 3, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 5500000, stock: 0, image: '' },
  ]);

  return (
    <div className="management-page">
      <div className="page-header">
        <h2>Quản lý sản phẩm</h2>
        <button className="btn-add-new">+ Thêm sản phẩm mới</button>
      </div>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} type="management" />
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;