import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../../styles/Cart.css';

const CartSidebar = ({ 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    onUpdateQuantity, 
    onRemoveItem, 
    handleGoToCheckout
}) => {
    
    // Tính toán tổng tiền và tổng số lượng ngay trong component con
    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalCartPrice = cartItems.reduce((sum, item) => sum + (Number(item.productDTO.price) * item.quantity), 0);

    return (
        <>
            {/* --- NÚT GIỎ HÀNG NỔI --- */}
            <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
                <FaShoppingCart />
                <span>{totalCartItems}</span>
            </button>

            {/* --- LỚP PHỦ LÀM MỜ --- */}
            <div 
                className={`cart-overlay ${isCartOpen ? 'open' : ''}`} 
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* --- GIAO DIỆN SIDEBAR --- */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Giỏ hàng của bạn ({totalCartItems})</h3>
                    <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>✕</button>
                </div>
                
                <div className="cart-items-container">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-msg">Giỏ hàng đang trống.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.productDTO.imageUrl} alt={item.productDTO.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h4>{item.productDTO.name}</h4>
                                    <p className="cart-item-price">{Number(item.productDTO.price).toLocaleString()} đ</p>
                                    
                                    <div className="cart-item-actions">
                                        <div className="quantity-controls">
                                            <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>Xóa</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Tổng cộng:</span>
                        <strong>{totalCartPrice.toLocaleString()} đ</strong>
                    </div>
                    <button className="checkout-btn" disabled={cartItems.length === 0}
                    onClick={() => handleGoToCheckout()}>
                        Mua Ngay
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;