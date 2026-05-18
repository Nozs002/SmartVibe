import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../modules/Product/ProductCard';
import '../../styles/Product.css';
import ProductFilterBar from '../../modules/Product/ProductFilterBar';
import { getData } from '../../services/api';



const OnlineOrderPage = () => {

    // 1. Data gốc từ Database
    const [products, setProducts] = useState([]);
    
    // THÊM MỚI: State lưu danh sách Category lấy từ API
    const [categories, setCategories] = useState([]); 
    
    // 2. States quản lý bộ lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
  
    // Giả lập Fetch Data từ Database
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getData('/categories/all'); 
          
          setCategories(response); 
        } catch (error) {
          console.error("Lỗi lấy danh mục:", error);
        }
      };
      
      fetchCategories();
  
      const fetchProducts = async () => {
            try {
              const response = await getData('/products/all');
              setProducts(response);
            } catch (error){
              console.error("Lỗi lấy sản phẩm:", error);
            }
          }
          fetchProducts();
    }, []);
  
    // Lọc (Filter) và Sắp xếp (Sort) dữ liệu dựa trên State
    // useMemo sẽ chạy lại khi một trong các dependencies(products, searchTerm, selectedCategory, sortBy) thay đổi
    const filteredAndSortedProducts = useMemo(() => {
        // copy mảng products để tránh thay đổi mảng gốc
        let result = [...products];
    
        // Lọc theo Từ khóa tìm kiếm
        if (searchTerm.trim() !== '') {
          result = result.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        // Lọc theo Danh mục
        if (selectedCategory && selectedCategory !== 'all') {
          
          const targetCatId = String(selectedCategory);
          
          // mảng category id hợp lệ
          const validCategoryIds = [targetCatId];
    
          // Lọc tất cả các category con của category đang chọn
          categories.forEach(cat => {
            if (cat.parentId && String(cat.parentId) === targetCatId) {
              validCategoryIds.push(String(cat.id));
            }
          });
          result = result.filter(p => {
            return p.categoryId && validCategoryIds.includes(String(p.categoryId));
          });
        }
    
        // Sắp xếp
        switch (sortBy) {
          case 'price_asc':
            result.sort((a, b) => Number(a.basePrice) - Number(b.basePrice));
            break;
          case 'price_desc':
            result.sort((a, b) => Number(b.basePrice) - Number(a.basePrice));
            break;
          case 'best_selling':
            result.sort((a, b) => (b.sold || 0) - (a.sold || 0));
            break;
          case 'newest':
            result.sort((a, b) => Number(b.id) - Number(a.id));
            break;
          case 'default':
            result.sort((a, b) => Number(a.id) - Number(b.id));
            break;
          default:
            result.sort((a, b) => Number(a.id) - Number(b.id));
            break;
        }
  
      return result;
    }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="online-order-page">
      <div className="hero-banner">
        <h2>Sản phẩm công nghệ mới nhất</h2>
        <p>Ưu đãi hấp dẫn dành cho thành viên SmartVibe</p>
      </div>

      <ProductFilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories.filter(cat => cat.parentId === null)}
      />

      <div className="product-grid">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} type="shopping" />
        ))}
      </div>
    </div>
  );
};

export default OnlineOrderPage;