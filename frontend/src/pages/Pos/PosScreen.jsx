import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/PosScreen.css';
import { FaBarcode, FaTrash, FaMoneyBillWave, FaCreditCard, FaSearch, FaUserCheck, FaTimes } from 'react-icons/fa';

const PosScreen = () => {
    // === STATE QUẢN LÝ ===
    const [cartItems, setCartItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [note, setNote] = useState('');
    const [discount, setDiscount] = useState(0);

    const staffId = 1; 
    const branchId = 1;

    // === MOCK DATA KHÁCH HÀNG (Thực tế sẽ gọi API GET /api/customers?phone=...) ===
    const handleSearchCustomer = () => {
        if (customerPhone === '0901234567') {
            setSelectedCustomer({ id: 10, name: 'Nguyễn Văn VIP', phone: '0901234567', type: 'vip' });
        } else {
            alert('Không tìm thấy khách hàng. Vui lòng thêm mới hoặc kiểm tra lại!');
        }
    };

    // === LOGIC QUÉT MÃ VẠCH (SKU HOẶC SERIAL) ===
    const handleScanBarcode = (e) => {
        if (e.key === 'Enter' && searchInput.trim() !== '') {
            const code = searchInput.trim();
            
            // Giả lập API: Backend trả về thông tin sản phẩm dựa vào mã code
            // TH1: Quét trúng Serial (Bắt đầu bằng SN-)
            if (code.startsWith('SN-')) {
                const productInfo = { productId: 101, name: 'Điện thoại iPhone 15 Pro Max', price: 29000000, hasSerial: true };
                
                setCartItems(prev => {
                    const existingProduct = prev.find(item => item.productId === productInfo.productId);
                    if (existingProduct) {
                        // Tránh quét trùng 1 serial 2 lần
                        if (existingProduct.serials.includes(code)) {
                            alert('Serial này đã được quét!');
                            return prev;
                        }
                        // Gộp thêm serial vào danh sách
                        return prev.map(item => 
                            item.productId === productInfo.productId 
                            ? { ...item, serials: [...item.serials, code], quantity: item.serials.length + 1 }
                            : item
                        );
                    } else {
                        // Thêm sản phẩm mới kèm mảng serials
                        return [...prev, { ...productInfo, serials: [code], quantity: 1, id: Date.now() }];
                    }
                });
            } 
            // TH2: Quét trúng SKU Hàng Thường (Ví dụ mã: OP123)
            else {
                const productInfo = { productId: 102, name: `Ốp lưng silicon (SKU: ${code})`, price: 150000, hasSerial: false };
                
                setCartItems(prev => {
                    const existingProduct = prev.find(item => item.productId === productInfo.productId);
                    if (existingProduct) {
                        // Hàng không serial: Tự động cộng số lượng lên 1
                        return prev.map(item => 
                            item.productId === productInfo.productId 
                            ? { ...item, quantity: Number(item.quantity) + 1 }
                            : item
                        );
                    } else {
                        return [...prev, { ...productInfo, quantity: 1, serials: [], id: Date.now() }];
                    }
                });
            }
            setSearchInput(''); // Xóa ô input
        }
    };

    // === CÁC HÀM XỬ LÝ GIỎ HÀNG ===
    const handleQuantityChange = (id, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    };

    const handleRemoveProduct = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleRemoveSingleSerial = (productId, serialToRemove) => {
        setCartItems(prev => prev.map(item => {
            if (item.productId === productId) {
                const newSerials = item.serials.filter(s => s !== serialToRemove);
                return newSerials.length === 0 
                    ? null // Nếu xóa hết serial thì xóa luôn dòng sản phẩm đó
                    : { ...item, serials: newSerials, quantity: newSerials.length };
            }
            return item;
        }).filter(item => item !== null));
    };

    // === TẠO ĐƠN & BẮN API ===
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng trống!'); return;
        }

        // CHUYỂN ĐỔI DATA: Tách các serial gộp chung ra thành từng Item rời rạc cho Backend
        const payloadItems = [];
        cartItems.forEach(item => {
            if (item.hasSerial) {
                item.serials.forEach(serial => {
                    payloadItems.push({ productId: item.productId, quantity: 1, price: item.price, productSerial: serial });
                });
            } else {
                payloadItems.push({ productId: item.productId, quantity: item.quantity, price: item.price, productSerial: null });
            }
        });

        const orderPayload = {
            staffId, 
            customerId: selectedCustomer ? selectedCustomer.id : null, 
            branchId, paymentMethod, discountPercent: discount, note,
            items: payloadItems // Truyền danh sách đã tách phẳng
        };

        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.post('http://localhost:8080/api/pos/orders', orderPayload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('✅ THANH TOÁN THÀNH CÔNG! Mã đơn: ' + response.data.result.id);
            // Reset
            setCartItems([]); setNote(''); setDiscount(0); setSelectedCustomer(null); setCustomerPhone('');
        } catch (error) {
            alert('❌ LỖI TẠO ĐƠN: ' + (error.response?.data?.message || error.message));
        }
    };

    // Tính toán
    const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subTotal * (1 - discount / 100);

    return (
        <div className="pos-container">
            {/* ================= CỘT TRÁI ================= */}
            <div className="pos-left">
                <div className="search-section">
                    <div className="search-input-wrapper">
                        <FaBarcode color="#888" size={20} />
                        <input 
                            type="text" 
                            placeholder="Quét mã SKU (Hàng thường) hoặc mã Serial (Tự động cộng dồn)..." 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={handleScanBarcode}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="cart-table-container">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{item.name}</div>
                                        {/* Hiển thị danh sách Serial dạng Tag */}
                                        {item.hasSerial && (
                                            <div className="serial-list">
                                                {item.serials.map(serial => (
                                                    <span key={serial} className="serial-tag">
                                                        {serial}
                                                        <FaTimes className="serial-remove" onClick={() => handleRemoveSingleSerial(item.productId, serial)} />
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                    <td>{item.price.toLocaleString()} đ</td>
                                    <td>
                                        {/* Chỉ hàng KHÔNG serial mới cho nhập số lượng */}
                                        {item.hasSerial ? (
                                            <span style={{ padding: '5px 15px', background: '#f5f5f5', borderRadius: '4px' }}>{item.quantity}</span>
                                        ) : (
                                            <input 
                                                type="number" 
                                                className="qty-input" 
                                                value={item.quantity} 
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            />
                                        )}
                                    </td>
                                    <td style={{ fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()} đ</td>
                                    <td>
                                        <button className="btn-remove" onClick={() => handleRemoveProduct(item.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= CỘT PHẢI ================= */}
            <div className="pos-right">
                
                {/* Khu vực khách hàng */}
                <div className="customer-section">
                    <h3 style={{ marginTop: 0, fontSize: '16px', color: '#555' }}>Thông tin khách hàng</h3>
                    <div className="customer-search-wrapper">
                        <input 
                            type="text" 
                            placeholder="Nhập SĐT khách hàng (VD: 0901234567)" 
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                        <button className="btn-search" onClick={handleSearchCustomer}><FaSearch /></button>
                    </div>
                    
                    {selectedCustomer ? (
                        <div className="customer-info-card">
                            <div><FaUserCheck color="#52c41a" /> <span>{selectedCustomer.name}</span> - {selectedCustomer.phone}</div>
                            <FaTimes style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => setSelectedCustomer(null)} />
                        </div>
                    ) : (
                        <div style={{ marginTop: '10px', fontSize: '13px', color: '#888' }}>*Khách vãng lai (Bỏ trống)</div>
                    )}
                </div>

                <h2>Thanh toán</h2>
                {/* ... Các trường nhập liệu thanh toán (Giữ nguyên như bản trước) ... */}
                <div className="form-group">
                    <label>Phương thức:</label>
                    <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="cash">Tiền mặt</option>
                        <option value="bank">Chuyển khoản</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Chiết khấu / Giảm giá (%):</label>
                    <input type="number" className="form-control" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                </div>

                <div className="summary-section">
                    <div className="summary-row"><span>Tổng tiền hàng:</span><span>{subTotal.toLocaleString()} đ</span></div>
                    <div className="total-row"><span>Khách cần trả:</span><span>{totalAmount.toLocaleString()} đ</span></div>
                    <button className="btn-checkout" onClick={handleCheckout}>TẠO ĐƠN & IN BILL</button>
                </div>
            </div>
        </div>
    );
};

export default PosScreen;