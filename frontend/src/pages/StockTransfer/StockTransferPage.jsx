import React, { useState, useEffect } from 'react';
import '../../styles/StockTransfer.css';
import { getData, postData, putData } from '../../services/api'; 

const StockTransferPage = () => {
  const currentStaff = JSON.parse(localStorage.getItem('staff') || '{"id": 1, "branchId": 1, "type": "staff"}');
  const isHeadWarehouse = Number(currentStaff.branchId) === 1;

  // Nếu không phải kho tổng, tab mặc định là TRANSFER_LIST
  const [activeTab, setActiveTab] = useState(isHeadWarehouse ? 'TRANSFER_STOCK' : 'TRANSFER_LIST');
  const [transferTickets, setTransferTickets] = useState([]);
  
  // Form điều chuyển kho
  const [targetFromBranch, setTargetFromBranch] = useState('');
  const [targetToBranch, setTargetToBranch] = useState('');
  const [transferDetails, setTransferDetails] = useState([{ productId: '', quantity: 1, serials: '', isSerialized: false }]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedTicketDetails, setSelectedTicketDetails] = useState([]);

  const fetchTransferTickets = async () => {
    try {
      const response = await getData(`/stock-transfers/branch/${currentStaff.branchId}`);
      if (response) setTransferTickets(response.result || response);
    } catch (error) {
      console.error("Lỗi tải phiếu điều chuyển:", error);
    }
  };

  useEffect(() => {
    if (activeTab === 'TRANSFER_LIST') {
      fetchTransferTickets();
    }
  }, [activeTab]);

  const handleAddTransferRow = () => {
    setTransferDetails([...transferDetails, { productId: '', quantity: 1, serials: '', isSerialized: false }]);
  };

  const handleTransferRowChange = (index, field, value) => {
    const newDetails = [...transferDetails];
    if (field === 'isSerialized') {
      newDetails[index][field] = value === 'true';
    } else {
      newDetails[index][field] = value;
    }
    setTransferDetails(newDetails);
  };

  const handleRemoveTransferRow = (indexToRemove) => {
    setTransferDetails(transferDetails.filter((_, index) => index !== indexToRemove));
  };

const handleSubmitTransfer = async (e) => {
    e.preventDefault();
    if (!isHeadWarehouse) return;

    try {
      const payloadItems = transferDetails.map(d => ({
        productId: Number(d.productId),
        quantity: Number(d.quantity),
        isSerialized: d.isSerialized,
        serials: d.serials ? d.serials.split(/[,\n]+/).map(s => s.trim()).filter(s => s !== '') : []
      }));

      const payload = {
        staffBranchId: Number(currentStaff.branchId), 
        fromBranchId: Number(targetFromBranch),
        toBranchId: Number(targetToBranch),
        items: payloadItems
      };

      // XÓA PHẦN HEADERS, CHỈ CẦN GỬI PAYLOAD
      await postData('/stock-transfers/create', payload);
      
      alert("Tạo phiếu điều phối kho thành công!");
      setTransferDetails([{ productId: '', quantity: 1, serials: '', isSerialized: false }]);
      setTargetFromBranch('');
      setTargetToBranch('');
      setActiveTab('TRANSFER_LIST');
    } catch (error) {
      alert("Thao tác thất bại: " + (error.response?.data?.message || "Lỗi mạng"));
    }
  };

const handleUpdateTransferStatus = async (id, action) => {
    const isConfirm = window.confirm(`Bạn xác nhận muốn ${action === 'ship' ? 'xuất kho vận chuyển' : 'nhận hàng vào kho'} đối với phiếu #${id}?`);
    if (!isConfirm) return;

    try {
      const payloadBody = { staffBranchId: currentStaff.branchId };
      await putData(`/stock-transfers/${id}/${action}`, payloadBody);
      
      alert("Cập nhật trạng thái điều phối thành công!");
      fetchTransferTickets(); 
    } catch (error) {
      alert("Lỗi thao tác: " + (error.response?.data?.message || "Bạn không có quyền thực hiện hoặc lỗi hệ thống"));
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const response = await getData(`/stock-transfers/${id}/details`);
      if (response) {
        setSelectedTicketDetails(response.result || response);
        setSelectedTicketId(id);
        setIsModalOpen(true);
      }
    } catch (error) {
      alert("Lỗi tải chi tiết lệnh điều chuyển!");
    }
  };

  return (
    <div className="st-container">
      {/* HEADER */}
      <div className="st-header">
        <div>
          <h1 className="st-title">Quản lý Điều Chuyển Kho</h1>
          <p className="st-subtitle">Kiểm soát luân chuyển hàng hóa giữa các chi nhánh</p>
        </div>
        <div className="st-badge">
          <span className="st-icon">🏢</span> Chi nhánh hiện tại: <strong>ID {currentStaff.branchId}</strong>
          {isHeadWarehouse && <span className="st-tag-vip">Kho Tổng</span>}
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="st-tabs">
        {isHeadWarehouse && (
          <button 
            className={`st-tab-btn ${activeTab === 'TRANSFER_STOCK' ? 'active' : ''}`} 
            onClick={() => setActiveTab('TRANSFER_STOCK')}
          >
            <span className="st-icon">➕</span> Khởi tạo Lệnh Điều Chuyển
          </button>
        )}
        <button 
          className={`st-tab-btn ${activeTab === 'TRANSFER_LIST' ? 'active' : ''}`} 
          onClick={() => setActiveTab('TRANSFER_LIST')}
        >
          <span className="st-icon">📋</span> Theo dõi Lệnh Điều Chuyển
        </button>
      </div>

      {/* TAB 1: KHỞI TẠO (CHỈ HIỂN THỊ CHO KHO TỔNG) */}
      {activeTab === 'TRANSFER_STOCK' && isHeadWarehouse && (
        <div className="st-card animate-fade-in">
          <div className="st-card-header">
            <h2>Lập Phiếu Điều Phối Mới</h2>
          </div>
          <div className="st-card-body">
            <form onSubmit={handleSubmitTransfer}>
              <div className="st-row">
                <div className="st-form-group">
                  <label>Từ Chi Nhánh (Kho Xuất)</label>
                  <input type="number" value={targetFromBranch} onChange={(e) => setTargetFromBranch(e.target.value)} required className="st-input" placeholder="Nhập ID kho xuất đi..." />
                </div>
                <div className="st-form-icon">➡️</div>
                <div className="st-form-group">
                  <label>Đến Chi Nhánh (Kho Nhận)</label>
                  <input type="number" value={targetToBranch} onChange={(e) => setTargetToBranch(e.target.value)} required className="st-input" placeholder="Nhập ID kho nhận hàng..." />
                </div>
              </div>

              <div className="st-section-divider">
                <span>Danh sách Sản phẩm Cần Luân Chuyển</span>
              </div>

              {transferDetails.map((detail, index) => (
                <div key={index} className="st-item-box">
                  {transferDetails.length > 1 && (
                    <button type="button" className="st-btn-delete" onClick={() => handleRemoveTransferRow(index)}>✖ Xóa</button>
                  )}
                  <div className="st-row">
                    <div className="st-form-group flex-2">
                      <label>ID Sản phẩm</label>
                      <input type="number" value={detail.productId} onChange={(e) => handleTransferRowChange(index, 'productId', e.target.value)} required className="st-input" placeholder="VD: 105" />
                    </div>
                    <div className="st-form-group flex-2">
                      <label>Định dạng quản lý</label>
                      <select value={detail.isSerialized ? 'true' : 'false'} onChange={(e) => handleTransferRowChange(index, 'isSerialized', e.target.value)} className="st-input">
                        <option value="false">📦 Hàng phổ thông (Không Serial)</option>
                        <option value="true">📱 Hàng điện tử (Có Serial)</option>
                      </select>
                    </div>
                    <div className="st-form-group flex-1">
                      <label>Số lượng</label>
                      <input type="number" min="1" value={detail.quantity} onChange={(e) => handleTransferRowChange(index, 'quantity', e.target.value)} required className="st-input text-center" />
                    </div>
                  </div>
                  {detail.isSerialized && (
                    <div className="st-form-group mt-3">
                      <label className="text-warning">Mã Serial/IMEI (Các mã cách nhau bằng dấu phẩy)</label>
                      <textarea value={detail.serials} onChange={(e) => handleTransferRowChange(index, 'serials', e.target.value)} className="st-input st-textarea" placeholder="VD: SN-001, SN-002..."></textarea>
                      <div className="st-counter">
                        Đã quét: <strong>{detail.serials ? detail.serials.split(/[,\n]+/).filter(s => s.trim() !== '').length : 0}</strong> / {detail.quantity}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="st-actions-row">
                <button type="button" onClick={handleAddTransferRow} className="st-btn-outline">+ Thêm dòng hàng hóa</button>
                <button type="submit" className="st-btn-primary">🚀 Phát Hành Lệnh</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: DANH SÁCH & TRẠNG THÁI */}
      {activeTab === 'TRANSFER_LIST' && (
        <div className="st-card animate-fade-in">
          <div className="st-table-wrapper">
            <table className="st-table">
              <thead>
                <tr>
                  <th>Mã Lệnh</th>
                  <th>Kho Xuất</th>
                  <th>Kho Nhận</th>
                  <th>Trạng Thái</th>
                  <th>Tác Vụ Vận Hành</th>
                </tr>
              </thead>
              <tbody>
                {transferTickets.map(ticket => {
                  // Phân quyền hiển thị nút:
                  // Nút Xuất: Dành cho Kho Xuất (hoặc kho tổng can thiệp)
                  const canShip = currentStaff.branchId === ticket.fromBranchId || isHeadWarehouse;
                  // Nút Nhận: Dành cho Kho Nhận (hoặc kho tổng can thiệp)
                  const canComplete = currentStaff.branchId === ticket.toBranchId || isHeadWarehouse;

                  return (
                    <tr key={ticket.id} className="st-tr">
                      <td className="st-fw-bold text-primary">#{ticket.id}</td>
                      <td>
                        <span className={`st-branch-pill ${currentStaff.branchId === ticket.fromBranchId ? 'highlight' : ''}`}>
                          {ticket.fromBranchName}
                        </span>
                      </td>
                      <td>
                        <span className={`st-branch-pill ${currentStaff.branchId === ticket.toBranchId ? 'highlight' : ''}`}>
                          {ticket.toBranchName}
                        </span>
                      </td>
                      <td>
                        <span className={`st-status-badge ${ticket.status}`}>
                          {
                            { 'pending': '⏳ Chờ xuất kho', 'shipping': '🚚 Đang giao hàng', 'completed': '✔ Hoàn tất', 'cancelled': '❌ Đã hủy' }[ticket.status] || ticket.status
                          }
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="st-action-group">
                          
                          {/* ĐÂY LÀ NÚT XEM CHI TIẾT */}
                          <button 
                            onClick={() => handleViewDetails(ticket.id)} 
                            className="st-action-btn btn-info"
                            title="Xem chi tiết các mặt hàng"
                          >
                            Chi tiết 👁️
                          </button>

                          {/* BÊN XUẤT BẤM GỬI HÀNG */}
                          {ticket.status === 'pending' && (
                            <button 
                              onClick={() => handleUpdateTransferStatus(ticket.id, 'ship')} 
                              className={`st-action-btn btn-ship ${!canShip ? 'disabled' : ''}`} 
                              disabled={!canShip}
                              title={!canShip ? "Chỉ chi nhánh xuất mới được bấm nút này" : ""}
                            >
                              Xuất Xe Đi 🚀
                            </button>
                          )}
                          
                          {/* BÊN NHẬN BẤM XÁC NHẬN CẬP BẾN */}
                          {ticket.status === 'shipping' && (
                            <button 
                              onClick={() => handleUpdateTransferStatus(ticket.id, 'complete')} 
                              className={`st-action-btn btn-complete ${!canComplete ? 'disabled' : ''}`} 
                              disabled={!canComplete}
                              title={!canComplete ? "Chỉ chi nhánh nhận mới được bấm xác nhận" : ""}
                            >
                              Đã Nhận Hàng 📦
                            </button>
                          )}

                          {/* TRẠNG THÁI HOÀN TẤT */}
                          {ticket.status === 'completed' && (
                            <span className="st-text-success">✔ Đã lưu kho</span>
                          )}
                          
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {transferTickets.length === 0 && (
                  <tr>
                    <td colSpan="5" className="st-empty-state">
                      <div className="st-empty-icon">📭</div>
                      Chưa có dữ liệu lệnh điều chuyển nào liên quan đến chi nhánh của bạn.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="st-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="st-modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="st-modal-header">
              <h2>Chi tiết lệnh vận chuyển <span className="text-primary">#TRF-{selectedTicketId}</span></h2>
              <button className="st-modal-close" onClick={() => setIsModalOpen(false)}>✖</button>
            </div>
            
            <div className="st-modal-body">
              <table className="st-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th className="text-center">Số lượng</th>
                    <th>Mã Serial/IMEI</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTicketDetails.map((detail, idx) => (
                    <tr key={idx} className="st-tr">
                      <td>
                        <strong>{detail.productName || 'Sản phẩm không xác định'}</strong>
                        <div style={{fontSize: '12px', color: '#a3aed1'}}>ID: {detail.productId}</div>
                      </td>
                      <td className="text-center" style={{fontWeight: 'bold'}}>
                        {detail.quantity}
                      </td>
                      <td>
                        {detail.productItemSerial ? (
                          <span className="st-serial-tag">{detail.productItemSerial}</span>
                        ) : (
                          <span style={{color: '#a3aed1', fontStyle: 'italic'}}>Hàng không serial</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {selectedTicketDetails.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center" style={{padding: '20px'}}>Không tìm thấy chi tiết mặt hàng.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="st-modal-footer">
              <button className="st-btn-outline" onClick={() => setIsModalOpen(false)}>Đóng lại</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockTransferPage;