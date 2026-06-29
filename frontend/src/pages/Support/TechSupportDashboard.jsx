import React, { useState } from 'react';
import '../../styles/TechSupport.css';
import { FaTicketAlt, FaCheckCircle, FaReply, FaWrench, FaHistory } from 'react-icons/fa';

const TechSupportDashboard = () => {
    // === MOCK DATA (Thay bằng API GET /api/tickets) ===
    const [tickets, setTickets] = useState([
        { 
            id: 'SP-1023', topic: 'Bảo hành & Đổi trả', title: 'Màn hình bị sọc xanh', 
            content: 'Tôi mới mua máy hôm qua nhưng nay mở lên bị sọc xanh giữa màn hình.',
            customerName: 'Nguyễn Văn A', phone: '0901234567',
            reportedSerial: 'SN-IP15-888999', // Serial khách khai báo
            status: 'open', createdAt: '2023-10-25 09:30'
        },
        { 
            id: 'SP-1024', topic: 'Hỗ trợ kỹ thuật', title: 'Không cài được phần mềm', 
            content: 'Nhờ kỹ thuật viên ultraview cài giúp phần mềm đồ họa.',
            customerName: 'Trần Thị B', phone: '0987654321',
            reportedSerial: null, 
            status: 'processing', createdAt: '2023-10-25 10:15'
        }
    ]);

    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [scanSerial, setScanSerial] = useState('');
    const [isSerialVerified, setIsSerialVerified] = useState(false);

    // === HANDLERS ===
    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
        setReplyContent('');
        setScanSerial('');
        setIsSerialVerified(false); // Reset trạng thái xác thực serial khi chọn phiếu mới
    };

    const handleVerifySerial = () => {
        if (!scanSerial) {
            alert('Vui lòng quét hoặc nhập mã Serial trên thiết bị!');
            return;
        }
        
        // Kỹ thuật viên quét serial thực tế trên máy để so sánh với hệ thống
        if (scanSerial === selectedTicket.reportedSerial) {
            setIsSerialVerified(true);
            alert('✅ Xác nhận đúng thiết bị. Hệ thống hiển thị: Còn hạn bảo hành 11 tháng.');
        } else {
            alert('❌ Cảnh báo: Serial thiết bị không khớp với phiếu yêu cầu hoặc không tồn tại trong hệ thống!');
        }
    };

    const handleUpdateStatus = (newStatus) => {
        if (newStatus === 'closed' && !replyContent.trim()) {
            alert('Vui lòng nhập nội dung xử lý trước khi đóng phiếu!');
            return;
        }

        // Cập nhật state (Thực tế: Gọi API PUT /api/tickets/{id}/status)
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: newStatus } : t));
        setSelectedTicket(prev => ({ ...prev, status: newStatus }));
        
        alert(`Đã cập nhật trạng thái thành: ${newStatus}`);
        setReplyContent('');
    };

    // Lọc danh sách
    const filteredTickets = tickets.filter(t => filterStatus === 'all' || t.status === filterStatus);

    return (
        <div className="tech-container">
            {/* ================= CỘT TRÁI: DANH SÁCH TICKET ================= */}
            <div className="tech-sidebar">
                <div className="ticket-filter">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">Tất cả phiếu hỗ trợ</option>
                        <option value="open">Mới tiếp nhận (Open)</option>
                        <option value="processing">Đang xử lý (Processing)</option>
                        <option value="closed">Đã đóng (Closed)</option>
                    </select>
                </div>
                
                <div className="ticket-list">
                    {filteredTickets.map(ticket => (
                        <div 
                            key={ticket.id} 
                            className={`ticket-item ${selectedTicket?.id === ticket.id ? 'active' : ''}`}
                            onClick={() => handleSelectTicket(ticket)}
                        >
                            <span className={`ticket-badge badge-${ticket.status}`}>
                                {ticket.status.toUpperCase()}
                            </span>
                            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#333' }}>{ticket.id} - {ticket.title}</div>
                            <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                                Lên đơn lúc: {ticket.createdAt}
                            </div>
                        </div>
                    ))}
                    {filteredTickets.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>Không có phiếu nào</p>}
                </div>
            </div>

            {/* ================= CỘT PHẢI: CHI TIẾT TICKET ================= */}
            <div className="tech-main">
                {selectedTicket ? (
                    <>
                        <div className="detail-header">
                            <div>
                                <h2 style={{ margin: 0 }}><FaTicketAlt /> Chi tiết phiếu: {selectedTicket.id}</h2>
                                <span style={{ color: '#888' }}>Chủ đề: {selectedTicket.topic}</span>
                            </div>
                            <span className={`ticket-badge badge-${selectedTicket.status}`} style={{ fontSize: '14px', padding: '5px 12px' }}>
                                TRẠNG THÁI: {selectedTicket.status.toUpperCase()}
                            </span>
                        </div>

                        {/* THÔNG TIN KHÁCH HÀNG & MÔ TẢ */}
                        <div className="customer-box">
                            <h4 style={{ margin: '0 0 10px 0' }}>Thông tin khách hàng</h4>
                            <p style={{ margin: '5px 0' }}><strong>Khách hàng:</strong> {selectedTicket.customerName} - <strong>SĐT:</strong> {selectedTicket.phone}</p>
                            <hr style={{ borderTop: '1px dashed #ccc', margin: '15px 0' }}/>
                            <h4 style={{ margin: '0 0 10px 0' }}>Mô tả lỗi:</h4>
                            <p style={{ margin: 0, color: '#d32f2f', fontWeight: '500' }}>"{selectedTicket.content}"</p>
                        </div>

                        {/* KIỂM TRA SERIAL (Chỉ hiện nếu phiếu có liên quan đến phần cứng/bảo hành) */}
                        {selectedTicket.reportedSerial && (
                            <div className="serial-verify-box">
                                <FaWrench size={24} color="#faad14" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold' }}>Xác nhận thiết bị vật lý</div>
                                    <div style={{ fontSize: '13px', color: '#666' }}>Serial khách khai báo: {selectedTicket.reportedSerial}</div>
                                </div>
                                {!isSerialVerified ? (
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Quét serial thực tế..." 
                                            value={scanSerial} 
                                            onChange={(e) => setScanSerial(e.target.value)} 
                                        />
                                        <button className="btn-verify" onClick={handleVerifySerial}>Xác thực</button>
                                    </>
                                ) : (
                                    <div style={{ color: '#52c41a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <FaCheckCircle /> Đã xác thực & Đủ điều kiện BH
                                    </div>
                                )}
                            </div>
                        )}

                        {/* KHU VỰC XỬ LÝ & PHẢN HỒI */}
                        <div className="reply-box">
                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaReply /> Cập nhật tiến độ / Phản hồi</h4>
                            <textarea 
                                placeholder="Ghi chú các bước đã xử lý, hoặc nội dung phản hồi cho khách hàng..." 
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            ></textarea>
                            
                            <div className="action-buttons">
                                {selectedTicket.status === 'open' && (
                                    <button className="btn-primary" onClick={() => handleUpdateStatus('processing')}>
                                        Tiếp nhận xử lý
                                    </button>
                                )}
                                
                                <button className="btn-success" onClick={() => handleUpdateStatus('closed')}>
                                    <FaCheckCircle /> Hoàn tất & Đóng phiếu
                                </button>

                                {isSerialVerified && (
                                    <button className="btn-primary" style={{ background: '#722ed1' }}>
                                        <FaHistory /> Tạo yêu cầu Đổi/Trả hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#999', flexDirection: 'column' }}>
                        <FaTicketAlt size={60} style={{ opacity: 0.2, marginBottom: '20px' }} />
                        <h3>Chọn một phiếu bên trái để xem và xử lý</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechSupportDashboard;