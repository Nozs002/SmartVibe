import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/SupportTicket.css';
import { FaTicketAlt, FaPaperPlane, FaPaperclip, FaPhoneAlt, FaEnvelope, FaClock, FaQuestionCircle } from 'react-icons/fa';

const ContactSupportPage = () => {
    // === STATE ===
    const [formData, setFormData] = useState({
        topic: 'warranty',
        title: '',
        phone: '',
        productSerial: '', // Bổ sung state cho Serial
        content: ''
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // === HANDLERS ===
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.content.trim()) {
            alert('Vui lòng nhập đầy đủ tiêu đề và nội dung cần hỗ trợ!');
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token'); 
            
            const payload = new FormData();
            payload.append('topic', formData.topic);
            payload.append('title', formData.title);
            payload.append('phone', formData.phone);
            payload.append('productSerial', formData.productSerial); // Đẩy Serial xuống Backend
            payload.append('content', formData.content);
            if (file) {
                payload.append('attachment', file);
            }

            // Gọi API lưu ticket xuống Backend
            /* await axios.post('http://localhost:8080/api/tickets', payload, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            */

            await new Promise(resolve => setTimeout(resolve, 1000));

            alert('✅ Đã gửi phiếu hỗ trợ thành công! Mã phiếu của bạn là: SP-' + Math.floor(Math.random() * 10000));
            
            // Reset form bao gồm cả Serial
            setFormData({ topic: 'warranty', title: '', phone: '', productSerial: '', content: '' });
            setFile(null);
            
        } catch (error) {
            alert('❌ Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ticket-container">
            {/* CỘT TRÁI: FORM NHẬP LIỆU CHÍNH */}
            <div className="ticket-main">
                <div className="ticket-header">
                    <h2><FaTicketAlt color="#1890ff" /> Tạo Phiếu Hỗ Trợ (Ticket)</h2>
                    <p>Mô tả chi tiết vấn đề của bạn để bộ phận CSKH hỗ trợ xử lý nhanh nhất.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* HÀNG 1: Chủ đề & Số điện thoại */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Chủ đề cần hỗ trợ <span>*</span></label>
                            <select 
                                className="form-control" 
                                name="topic" 
                                value={formData.topic} 
                                onChange={handleInputChange}
                            >
                                <option value="warranty">🛠 Bảo hành & Đổi trả sản phẩm</option>
                                <option value="technical">💻 Hỗ trợ kỹ thuật / Hướng dẫn sử dụng</option>
                                <option value="delivery">🚚 Vấn đề giao hàng / Trạng thái đơn</option>
                                <option value="account">🔐 Lỗi tài khoản & Đăng nhập</option>
                                <option value="other">📝 Góp ý / Vấn đề khác</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại liên hệ <span>*</span></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="phone" 
                                placeholder="Nhập SĐT để NV gọi lại..." 
                                value={formData.phone} 
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* HÀNG 2: Tiêu đề & Mã Serial (Gom chung 1 hàng cho cân đối UI) */}
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Tiêu đề <span>*</span></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="title" 
                                placeholder="Ví dụ: Điện thoại iPhone 15 sạc không vào pin" 
                                value={formData.title} 
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Mã Serial <span style={{ color: '#7f8c8d', fontWeight: 'normal' }}>(Tùy chọn)</span></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="productSerial" 
                                placeholder="VD: SN-12345..." 
                                value={formData.productSerial} 
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label>Nội dung chi tiết <span>*</span></label>
                        <textarea 
                            className="form-control" 
                            name="content" 
                            placeholder="Mô tả rõ vấn đề bạn đang gặp phải (Tên sản phẩm, mã đơn hàng nếu có, hiện tượng lỗi...)" 
                            value={formData.content} 
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Hình ảnh đính kèm (Nếu có)</label>
                        <div className="file-upload-wrapper" onClick={() => document.getElementById('fileInput').click()}>
                            <FaPaperclip size={24} color="#7f8c8d" style={{ marginBottom: '10px' }} />
                            <p style={{ margin: 0, color: '#7f8c8d' }}>
                                {file ? `Đã chọn: ${file.name}` : 'Nhấn vào đây để tải lên ảnh chụp màn hình hoặc video lỗi'}
                            </p>
                            <input 
                                type="file" 
                                id="fileInput" 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange} 
                                accept="image/*,video/*"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        {isLoading ? 'Đang gửi...' : <><FaPaperPlane /> Gửi Yêu Cầu</>}
                    </button>
                </form>
            </div>

            {/* CỘT PHẢI: THÔNG TIN HỖ TRỢ */}
            <div className="ticket-sidebar">
                <div className="info-card">
                    <h3><FaQuestionCircle color="#f39c12" /> Bạn cần hỗ trợ gấp?</h3>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                        Trong trường hợp khẩn cấp liên quan đến đơn hàng đang giao hoặc lỗi hệ thống nghiêm trọng, vui lòng liên hệ trực tiếp qua Hotline.
                    </p>
                    <ul className="info-list">
                        <li><FaPhoneAlt color="#27ae60" /> <strong>Hotline:</strong> 1900 1234 (Miễn phí)</li>
                        <li><FaEnvelope color="#3498db" /> <strong>Email:</strong> support@smartvibe.com</li>
                        <li><FaClock color="#e67e22" /> <strong>Giờ làm việc:</strong> 08:00 - 22:00 (Cả T7 & CN)</li>
                    </ul>
                </div>

                <div className="info-card">
                    <h3>Quy trình xử lý phiếu</h3>
                    <ul className="info-list" style={{ fontSize: '14px' }}>
                        <li><strong>Bước 1:</strong> Gửi thông tin yêu cầu.</li>
                        <li><strong>Bước 2:</strong> Hệ thống cấp mã Tracking (SP-xxx).</li>
                        <li><strong>Bước 3:</strong> NV kỹ thuật tiếp nhận trong vòng 30 phút.</li>
                        <li><strong>Bước 4:</strong> Liên hệ giải quyết và đóng phiếu.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactSupportPage;