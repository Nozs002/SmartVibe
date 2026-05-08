import React, { useState } from 'react';
import '../../styles/OnlineOrder.css';

const ELECTRONICS_DATA = [
  { id: 1, name: 'MacBook Pro M3', price: 45000000, category: 'Laptop', stock: 5, image: '💻' },
  { id: 2, name: 'iPhone 15 Pro Max', price: 32000000, category: 'Mobile', stock: 12, image: '📱' },
  { id: 3, name: 'Sony WH-1000XM5', price: 8500000, category: 'Audio', stock: 8, image: '🎧' },
  { id: 4, name: 'Samsung Odyssey G7', price: 15000000, category: 'Monitor', stock: 3, image: '🖥️' },
];

const OnlineOrderPage = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('All');

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="order-layout">
      {/* Sidebar: Danh mục sản phẩm */}
      <aside className="category-sidebar">
        <h3>SmartVibe Store</h3>
        <ul>
          {['All', 'Laptop', 'Mobile', 'Audio', 'Monitor'].map(cat => (
            <li 
              key={cat} 
              className={filter === cat ? 'active' : ''} 
              onClick={() => setFilter(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main: Lưới sản phẩm */}
      <section className="product-section">
        <div className="section-header">
          <h2>Danh sách thiết bị điện tử</h2>
          <input type="text" placeholder="Tìm kiếm sản phẩm..." className="search-bar" />
        </div>
        <div className="product-grid">
          {ELECTRONICS_DATA.filter(p => filter === 'All' || p.category === filter).map(product => (
            <div key={product.id} className="item-card">
              <div className="item-icon">{product.image}</div>
              <h4>{product.name}</h4>
              <p className="price">{product.price.toLocaleString()} đ</p>
              <p className="stock">Kho: {product.stock} sản phẩm</p>
              <button onClick={() => addToCart(product)}>Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </section>

      {/* Right: Chi tiết giỏ hàng & Thanh toán */}
      <aside className="billing-panel">
        <h3>Đơn hàng trực tuyến</h3>
        <div className="cart-list">
          {cart.map(item => (
            <div key={item.id} className="bill-item">
              <div>
                <span>{item.name}</span>
                <small>x{item.qty}</small>
              </div>
              <span>{(item.price * item.qty).toLocaleString()} đ</span>
            </div>
          ))}
        </div>
        <div className="bill-footer">
          <div className="total-row">
            <span>Tổng cộng:</span>
            <strong>{total.toLocaleString()} đ</strong>
          </div>
          <button className="pay-button" disabled={cart.length === 0}>
            Xác nhận đơn hàng (F8)
          </button>
        </div>
      </aside>
    </div>
  );
};

export default OnlineOrderPage; 
