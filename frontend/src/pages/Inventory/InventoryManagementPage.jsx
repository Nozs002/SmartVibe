import React, { useState, useEffect } from 'react';
import '../../styles/Inventory.css';
import { getData, postData, putData } from '../../services/api'; 

const InventoryManagementPage = () => {
  const currentStaff = JSON.parse(localStorage.getItem('staff') || '{"id": 1, "branchId": 1, "type": "staff"}');
  
  const userRole = currentStaff.type ? currentStaff.type.toLowerCase() : 'staff';
  
  const [activeTab, setActiveTab] = useState('CREATE_DOC');
  const [transactions, setTransactions] = useState([]);
  const [pendingExports, setPendingExports] = useState([]); 
  const [notes, setNotes] = useState('');

  const [docType, setDocType] = useState('import');
  const [details, setDetails] = useState([{ productId: '', quantity: 1, price: 0, serials: '', isSerialized: false }]);

  useEffect(() => {
    const fetchHistoryAndPending = async () => {
      try {
        if (activeTab === 'TRANSACTIONS') {
          const response = await getData(`/inventory-transactions/branch/${currentStaff.branchId}`);
          if (response) {
            setTransactions(response.result || response);
          }
        }
        
        if (activeTab === 'APPROVAL' && userRole === 'manager') {
          const response = await getData(`/stock-documents/pending-exports/${currentStaff.branchId}`);
          if (response) {
            setPendingExports(response.result || response);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu kho:", error);
      }
    };

    fetchHistoryAndPending();
  }, [activeTab, userRole, currentStaff.branchId]);


  const handleAddDetail = () => {
    setDetails([...details, { productId: '', quantity: 1, price: 0, serials: '', isSerialized: false }]);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    if (field === 'isSerialized') {
      newDetails[index][field] = value === 'true';
      if (value === 'false') newDetails[index]['serials'] = '';
    } else {
      newDetails[index][field] = value;
    }
    setDetails(newDetails);
  };

  const handleRemoveDetail = (indexToRemove) => {
    setDetails(details.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmitDocument = async (e) => {
    e.preventDefault();
    try {
      const payloadItems = details.map((d, index) => {
        const serialArray = d.serials ? d.serials.split(/[,\n]+/).map(s => s.trim()).filter(s => s !== '') : [];

        if (d.isSerialized && serialArray.length !== Number(d.quantity)) {
          alert(`Lỗi ở dòng số ${index + 1}: Số lượng mã Serial [${serialArray.length}] không khớp với số lượng nhập [${d.quantity}]`);
          throw new Error("Invalid serial count");
        }

        return {
          productId: Number(d.productId),
          quantity: Number(d.quantity),
          price: Number(d.price),
          isSerialized: d.isSerialized, 
          serials: serialArray
        };
      });

      const stockRequestPayload = {
        branchId: Number(currentStaff.branchId),
        staffId: Number(currentStaff.id),
        note: notes,
        items: payloadItems
      };

      if (docType === 'import') {
        await postData('/stock-documents/import', stockRequestPayload);
        alert("Nhập kho thành công!");
      } else {
        await postData('/stock-documents/export', stockRequestPayload);
        alert("Tạo phiếu yêu cầu xuất kho thành công! Đang chờ Quản lý phê duyệt.");
      }
      
      setNotes('');
      setDetails([{ productId: '', quantity: 1, price: 0, serials: '', isSerialized: false }]);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu kho:", error);
      if (error.response?.data?.message) {
        alert("Lỗi hệ thống: " + error.response.data.message);
      }
    }
  };

  const handleApproveExport = async (id) => {
    const isConfirm = window.confirm(`Bạn có chắc chắn muốn duyệt và trừ tồn kho cho phiếu xuất #${id}?`);
    if (!isConfirm) return;

    try {
      await putData(`/stock-documents/approve/${id}`, {});
      alert(`Đã phê duyệt phiếu xuất kho #${id} thành công!`);
      setPendingExports(pendingExports.filter(doc => doc.id !== id));
    } catch (error) {
      console.error("Lỗi phê duyệt:", error);
      if (error.response?.data?.message) alert("Lỗi phê duyệt: " + error.response.data.message);
    }
  };

  return (
    <div className="warehouse-container">
      <div className="header-section">
        <h1>Quản lý Vận hành Kho</h1>
      </div>

      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'CREATE_DOC' ? 'active' : ''}`} onClick={() => setActiveTab('CREATE_DOC')}>
          Tạo Phiếu Nhập/Xuất
        </button>
        <button className={`tab-btn ${activeTab === 'TRANSACTIONS' ? 'active' : ''}`} onClick={() => setActiveTab('TRANSACTIONS')}>
          Lịch sử Tồn Kho
        </button>
        
        {userRole === 'manager' && (
          <button className={`tab-btn ${activeTab === 'APPROVAL' ? 'active' : ''}`} onClick={() => setActiveTab('APPROVAL')}>
            Phê duyệt Phiếu Xuất 🔴
          </button>
        )}
      </div>

      {activeTab === 'CREATE_DOC' && (
        <div className="card">
          <form onSubmit={handleSubmitDocument}>
            <div className="form-row">
              <div className="form-group">
                <label>Loại chứng từ</label>
                <select value={docType} onChange={(e) => setDocType(e.target.value)} className="form-control">
                  <option value="import">Nhập kho (Import) - Tăng tồn kho</option>
                  <option value="export">Xuất kho (Export) - Cần phê duyệt</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ghi chú lý do</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} className="form-control" placeholder="Nhập lý do, số hóa đơn ngoài..." />
              </div>
            </div>

            <h3 style={{borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px'}}>Chi tiết hàng hóa</h3>
            {details.map((detail, index) => (
              <div key={index} style={{border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px', marginBottom: '15px', position: 'relative'}}>
                {details.length > 1 && (
                  <button type="button" onClick={() => handleRemoveDetail(index)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                    Xóa ❌
                  </button>
                )}

                <div className="form-row">
                  <div className="form-group" style={{flex: 2}}>
                    <label>ID Sản phẩm</label>
                    <input type="number" value={detail.productId} onChange={(e) => handleDetailChange(index, 'productId', e.target.value)} required className="form-control" />
                  </div>
                  <div className="form-group" style={{flex: 1.5}}>
                    <label>Phân loại quản lý</label>
                    <select value={detail.isSerialized ? 'true' : 'false'} onChange={(e) => handleDetailChange(index, 'isSerialized', e.target.value)} className="form-control">
                      <option value="false">Hàng thường (Không Serial)</option>
                      <option value="true">Hàng điện tử (Có Serial)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Số lượng</label>
                    <input type="number" min="1" value={detail.quantity} onChange={(e) => handleDetailChange(index, 'quantity', e.target.value)} required className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Đơn giá</label>
                    <input type="number" min="0" value={detail.price} onChange={(e) => handleDetailChange(index, 'price', e.target.value)} required className="form-control" />
                  </div>
                </div>
                
                {detail.isSerialized && (
                  <div className="form-row" style={{marginBottom: 0}}>
                    <div className="form-group" style={{flex: 1}}>
                      <label style={{color: '#d97706', fontWeight: '500'}}>Mã Serial/IMEI (Mỗi mã cách nhau bằng dấu phẩy hoặc xuống dòng)</label>
                      <textarea value={detail.serials || ''} onChange={(e) => handleDetailChange(index, 'serials', e.target.value)} className="form-control" rows="2" placeholder="VD: SN-99991, SN-99992..." required={detail.isSerialized}></textarea>
                      <small style={{color: '#666', marginTop: '4px'}}>
                        Đã quét: <strong style={{color: (detail.serials?.split(/[,\n]+/).filter(s => s.trim() !== '').length === Number(detail.quantity)) ? 'green' : 'red'}}>
                          {detail.serials ? detail.serials.split(/[,\n]+/).filter(s => s.trim() !== '').length : 0}
                        </strong> / {detail.quantity} mã
                      </small>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button type="button" onClick={handleAddDetail} className="btn-text">+ Thêm dòng sản phẩm</button>

            <div className="text-right">
              <button type="submit" className="btn-primary">
                {docType === 'export' ? 'Gửi Yêu Cầu Xuất Kho' : 'Hoàn tất Nhập Kho'}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'TRANSACTIONS' && (
        <div className="card" style={{padding: 0}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Thời gian</th>
                <th>Loại Giao Dịch</th>
                <th>SL Thay Đổi</th>
                <th>Sản Phẩm</th>
                <th>Tên chi nhánh</th>
                <th>Chứng từ gốc</th>
                <th>Mã CT</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : 'N/A'}</td>
                  <td>
                    {{ 'import': 'Nhập kho', 'export': 'Xuất kho', 'sale': 'Xuất bán', 'return': 'Hoàn hàng', 'transfer in': 'Nhận chuyển kho', 'transfer out': 'Xuất chuyển kho', 'adjustment': 'Bảo hành' }[tx.transactionType] || tx.transactionType}
                  </td>
                  <td className={tx.quantityChanged > 0 ? 'text-success' : 'text-danger'}>
                    {tx.quantityChanged > 0 ? `+${tx.quantityChanged}` : tx.quantityChanged}
                  </td>
                  <td>{tx.productName} (ID: {tx.productId})</td>
                  <td>{tx.branchName}</td>
                  <td>
                    {{ 'document': <span>📄 Chứng từ kho</span>, 'order': <span>🛒 Đơn hàng</span>, 'stock transfer': <span>🚚 Chuyển kho</span>, 'adjustment': <span>🔧 Kiểm kê</span> }[tx.referenceType] || <span>❓ {tx.referenceType}</span>}
                  </td>
                  <td>#{tx.referenceId}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>Không có dữ liệu lịch sử tồn kho.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'APPROVAL' && userRole === 'manager' && (
        <div className="card" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã Phiếu Xuất</th>
                <th>Mã Nhân Viên Tạo</th>
                <th>Lý do / Ghi chú</th>
                <th>Ngày Tạo Phiếu</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {pendingExports.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ fontWeight: 'bold', color: '#0056b3' }}>#EXP-{doc.id}</td>
                  <td><span className="staff-tag">👤 Staff ID: {doc.staffId}</span></td>
                  <td><span style={{ color: '#555', fontStyle: 'italic' }}>{doc.note || 'Không có ghi chú'}</span></td>
                  <td>{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                  <td>
                    <span className="badge-status status-pending" style={{ color: '#d97706', backgroundColor: '#fef3c7', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      ⏳ Chờ duyệt
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleApproveExport(doc.id)} 
                      className="btn-success"
                      style={{ padding: '6px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                    >
                      Duyệt & Trừ Kho ✔
                    </button>
                  </td>
                </tr>
              ))}
              
              {pendingExports.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#666', fontStyle: 'italic' }}>
                    📭 Hiện không có phiếu xuất kho nào đang chờ duyệt trong chi nhánh này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryManagementPage;