import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../modules/Product/ProductCard';
import { useNavigate } from 'react-router-dom';

import '../../styles/Product.css';
import ProductFilterBar from '../../modules/Product/ProductFilterBar';
import { getData, getDataWithCondition, putData, deleteData, postData } from '../../services/api';
import CartSidebar from '../../modules/Order/CartSidebar';
import ProductList from '../../modules/Product/ProductList';



const OnlineOrderPage = () => {
  const navigate = useNavigate();

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

    // Thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async (product) => {
      try{
        const currentItem = cartItems.find(item => item.productDTO.id === product.id);
        const customer = JSON.parse(localStorage.getItem('customer'));
        if (!customer) {
            alert('Vui lòng đăng nhập trước!');
            return;
        }
        if (currentItem) {
            await handleUpdateQuantity(currentItem.id, 1);
        } else {
            const newCartItemPayload = {
                cartId: Number(customer.id),
                quantity: 1,                
                productDTO: {
                    id: product.id,
                    sku: product.sku,
                    name: product.name,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                    description: product.description,
                    isSerialized: product.isSerialized || false,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    warrantyMonths: product.warrantyMonths,
                    specifications: product.specifications,
                    stock: product.stock
                }
            };
            const response = await postData('/cart/addCartItem', newCartItemPayload);
            const newCartItem = response;
            const exists = cartItems.some(
                item => item.productDTO.id === newCartItem.productDTO.id
            );
            if (!exists) {
                setCartItems(prev => [...prev, newCartItem]);
            } else{
              setCartItems(prev => prev.map(item =>
                  item.productDTO.id === newCartItem.productDTO.id
                      ? newCartItem
                      : item
              ));
            }
        }

        setIsCartOpen(true);
      } catch(error) {
        const errrorMessage = error.response?.data?.message || "Đã xảy ra lỗi";
        alert(errrorMessage);
      }
    };

    // Câp nhật số lượng sản phẩm trong giỏ hàng
    const handleUpdateQuantity = async (id, delta) => {
      try {
            const currentItem = cartItems.find(item => item.id === id);
            if (!currentItem) return;
            const newQuantity = currentItem.quantity + delta;
            if (newQuantity < 1) return;
            currentItem.quantity = newQuantity;
      
            await putData('/cart/updateQuantity', currentItem);
      
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

    // Xóa sản phẩm khỏi giỏ hàng
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

  // Xử lý các hành động của khách hàng trên thẻ sản phẩm (chỉ có "Thêm vào giỏ hàng" đối với khách hàng)
  const handleCustomerActions = (actionType, product) => {
    if (actionType === 'add_to_cart') {
      handleAddToCart(product); 
    }
  };

  // Đi tới trang thanh toán
  const handleGoToCheckout = () => {
    if (cartItems.length === 0) return;

    navigate('/checkout', { 
      state: { cartItems: cartItems} 
    });
  };

  // Đi tới trang chi tiết sản phẩm
  const handleViewProductDetail = (productId) => {
    navigate(`/product-detail/${productId}`);
  }

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

      <ProductList 
        products={filteredAndSortedProducts} 
        role="customer" 
        onProductAction={handleCustomerActions}
        onProductViewDetail={(productId) => handleViewProductDetail(productId)}
      />

      <CartSidebar 
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        handleGoToCheckout={handleGoToCheckout}
      />
    </div>
  );
};

export default OnlineOrderPage;