import React from 'react';
import '../../styles/Product.css';

const ProductFilterBar = ({ 
  searchTerm, onSearchChange, 
  selectedCategory, onCategoryChange,
  sortBy, onSortChange,
  categories = [] 
}) => {

  return (
    <div className="filter-container">
      {/* Hàng 1: Tìm kiếm & Chọn danh mục */}
      <div className="filter-top-row">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Tìm kiếm tên sản phẩm..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select 
          className="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Hàng 2: Sắp xếp giống Shopee */}
      <div className="filter-bottom-row">
        <span className="filter-label">Sắp xếp theo</span>
        
        <button 
          className={`filter-btn ${sortBy === 'default' ? 'active' : ''}`}
          onClick={() => onSortChange('default')}
        >
          Mặc định
        </button>
        
        <button 
          className={`filter-btn ${sortBy === 'newest' ? 'active' : ''}`}
          onClick={() => onSortChange('newest')}
        >
          Mới Nhất
        </button>
        
        <button 
          className={`filter-btn ${sortBy === 'best_selling' ? 'active' : ''}`}
          onClick={() => onSortChange('best_selling')}
        >
          Bán Chạy
        </button>

        <select 
          className="sort-select"
          value={sortBy.includes('price') ? sortBy : 'default'}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default" disabled>Giá</option>
          <option value="price_asc">Giá: Từ Thấp đến Cao</option>
          <option value="price_desc">Giá: Từ Cao đến Thấp</option>
        </select>

        {/* 
        <div className="pagination-mini">
          <span className="page-info"><span className="current">1</span>/7</span>
          <div className="page-controls">
            <button className="page-btn" disabled>&lt;</button>
            <button className="page-btn">&gt;</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductFilterBar;