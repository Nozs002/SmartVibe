import React from 'react';
import ProductCard from './ProductCard';
import '../../styles/Product.css';

const ProductList = ({ products, role, onProductViewDetail, onProductAction }) => {
  
  if (!products || products.length === 0) {
    return <div>Không có sản phẩm nào để hiển thị.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          role={role}
          onViewDetail={onProductViewDetail}
          onActionClick={onProductAction}
        />
      ))}
    </div>
  );
};

export default ProductList;