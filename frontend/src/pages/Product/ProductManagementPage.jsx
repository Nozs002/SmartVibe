import React, { useState, useEffect, useMemo } from 'react';
import ProductFilterBar from '../../modules/Product/ProductFilterBar';
import ProductList from '../../modules/Product/ProductList';
import { getData } from '../../services/api';
import '../../styles/Product.css';

const ProductManagementPage = () => {
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

  // 3. Logic: Lọc (Filter) và Sắp xếp (Sort) dữ liệu dựa trên State
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
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price_desc':
        result.sort((a, b) => Number(b.price) - Number(a.price));
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

  // Hàm xử lý chung cho mọi nút bấm ở role="manager"
  const handleManagerActions = (actionType, product) => {
    if (actionType === 'edit') {
      // Mở modal chỉnh sửa sản phẩm
      console.log("Chỉnh sửa sản phẩm:", product.id);
    } else if (actionType === 'discontinue') {
      // Gọi API ngừng bán
      console.log("Ngừng bán sản phẩm:", product.id);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Danh sách sản phẩm
      </h1>

      {/* Gọi Component Thanh Công Cụ */}
      <ProductFilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories.filter(cat => cat.parentId === null)}
      />

      {/* Truyền dữ liệu ĐÃ QUA LỌC vào ProductList */}
      <ProductList 
        products={filteredAndSortedProducts} 
        role="manager" 
        onProductAction={handleManagerActions}
      />
    </div>
  );
};

export default ProductManagementPage;