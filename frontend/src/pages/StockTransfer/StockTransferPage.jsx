import React, { useState } from 'react';
import { FaEye, FaPrint, FaSearch, FaFilter } from 'react-icons/fa';
import '../../styles/StockTransfer.css';

const mockTransfers = [
  { id: 1, status: 'completed', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 1, to_branch: 3 },
  { id: 2, status: 'shipping', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 2, to_branch: 5 },
  { id: 3, status: 'pending', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 1, to_branch: 4 },
  { id: 4, status: 'completed', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 2, to_branch: 6 },
  { id: 5, status: 'cancelled', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 1, to_branch: 7 },
  { id: 6, status: 'completed', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 1, to_branch: 8 },
  { id: 7, status: 'shipping', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 2, to_branch: 9 },
  { id: 8, status: 'pending', created_at: '2026-04-23 09:47:47', completed_at: null, from_branch: 2, to_branch: 10 },
];

const StockTransfers = () => {
  const [transfers, setTransfers] = useState(mockTransfers);

  // Trả về class CSS tương ứng dựa trên trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="badge badge-completed">Hoàn thành</span>;
      case 'pending': return <span className="badge badge-pending">Chờ xử lý</span>;
      case 'shipping': return <span className="badge badge-shipping">Đang giao</span>;
      case 'cancelled': return <span className="badge badge-cancelled">Đã hủy</span>;
      default: return <span className="badge badge-default">{status}</span>;
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">
        
        {/* Header */}
        <div className="header-section">
          <h2 className="header-title">Danh sách Đơn chuyển kho</h2>
          <div className="toolbar">
            <div className="search-wrapper">
              <span className="search-icon"><FaSearch /></span>
              <input 
                type="text" 
                placeholder="Tìm mã đơn..." 
                className="search-input"
              />
            </div>
            <button className="btn">
              <FaFilter /> Lọc
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã đơn (ID)</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày hoàn thành</th>
                <th className="text-center">Từ chi nhánh</th>
                <th className="text-center">Đến chi nhánh</th>
                <th className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((item) => (
                <tr key={item.id}>
                  <td className="text-bold">#{item.id}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>{item.created_at}</td>
                  <td className="text-italic">
                    {item.completed_at ? item.completed_at : 'Chưa hoàn thành'}
                  </td>
                  <td className="text-center text-blue">CN - {item.from_branch}</td>
                  <td className="text-center text-teal">CN - {item.to_branch}</td>
                  
                  {/* Cột thao tác */}
                  <td className="action-cell">
                    <button className="btn-icon" title="Xem chi tiết">
                      <FaEye size={16} /> <span className="hide-mobile">Xem</span>
                    </button>
                    <button className="btn-icon print" title="In phiếu">
                      <FaPrint size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="table-footer">
          <span>Hiển thị {transfers.length} đơn luân chuyển</span>
        </div>

      </div>
    </div>
  );
};

export default StockTransfers;