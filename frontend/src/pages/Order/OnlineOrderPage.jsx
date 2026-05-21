import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../modules/Product/ProductCard';
import '../../styles/Product.css';
import ProductFilterBar from '../../modules/Product/ProductFilterBar';
import { getData, getDataWithCondition, putData, deleteData, postData } from '../../services/api';
import CartSidebar from '../../modules/Order/CartSidebar';



const OnlineOrderPage = () => {

    // Data gốc từ Database
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    
    //  States quản lý bộ lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');

    //  States quản lý giỏ hàng
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

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

      const customer = JSON.parse(localStorage.getItem('customer'));
          if (!customer) {
            return;
          }
          const fetchCartItems = async () => {
            try {
              const response = await getDataWithCondition('/cart/getCartItem', {customerId: customer.id });
              setCartItems(response);
            } catch (error) {
              console.error('Error fetching cart items:', error);
            }
          };
          fetchCartItems();
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

    // giỏ hàng
    const handleAddToCart = async (product) => {
        const currentItem = cartItems.find(item => item.id === product.id);
        const customer = JSON.parse(localStorage.getItem('customer'));
        if (!customer) {
            alert('Vui lòng đăng nhập trước!');
            return;
        }
        if (currentItem) {
            await handleUpdateQuantity(currentItem.id, 1);
        } else {
            const newCartItemPayload = {
                cartId: Number(customer.id), // Ép kiểu sang số (Long trong Java)
                quantity: 1,                 // Mặc định thêm mới là 1
                productDTO: {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                    description: product.description,
                    basePrice: product.basePrice,
                    imageUrl: product.imageUrl,
                    warrantyMonths: product.warrantyMonths,
                    specifications: product.specifications
                }
            };
            const response = await postData('/cart/addCartItem', newCartItemPayload);
            const newCartItem = response.result;
            setCartItems(prev => [...prev, newCartItem]);
        }

        setIsCartOpen(true);
    };

    const handleUpdateQuantity = async (id, delta) => {
      try {
            const currentItem = cartItems.find(item => item.id === id);
            if (!currentItem) return;
            const newQuantity = currentItem.quantity + delta;
            if (newQuantity < 1) return;
            currentItem.quantity = newQuantity;
      
            // CALL BACKEND
            await putData('/cart/updateQuantity', currentItem);
      
            // UPDATE FRONTEND
            setCartItems(prev =>
              prev.map(item =>
                item.id === id
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            );
      
          } catch (error) {
            console.error(error);
          }
    };

    const handleRemoveItem = async (id) => {
      try {
        const currentItem = cartItems.find(item => item.id === id);
        if (!currentItem) return;
        await deleteData('/cart/deleteCartItem', currentItem);
        setCartItems(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    };

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
          <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} type="shopping" />
        ))}
      </div>
      <CartSidebar 
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
    </div>
  );
};

export default OnlineOrderPage;