import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaUserTag, FaMoneyBillWave, FaBriefcase, FaUserCircle } from 'react-icons/fa';
import '../../styles/UserProfile.css';

const UserProfilePage = () => {
    // Trong thực tế, dữ liệu này sẽ fetch từ API dựa trên ID của user đang đăng nhập
    const [userData, setUserData] = useState({
        username: "admin",
        role: "staff", // Hoặc "customer"
        email: "staff2@gmail.com",
        phone: "0801111112",
        address: "TP HCM",
        birthday: "1991-02-02",
        sex: "female",
        account_status: "active",
        // Thông tin mở rộng cho Nhân viên
        employee_info: {
            type: "manager",
            work_status: "working",
            basic_salary: 15000000,
            allowance: 2000000
        },
        // Thông tin mở rộng cho Khách hàng
        customer_info: {
            type: "diamond"
        }
    });

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Phần header hồ sơ */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUserCircle size={80} color="#007bff" />
                    </div>
                    <div className="profile-title">
                        <h2>{userData.username}</h2>
                        <span className={`status-badge ${userData.account_status}`}>
                            {userData.account_status.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="profile-body">
                    {/* THÔNG TIN CHUNG (Dùng chung cho cả 2 role) */}
                    <section className="info-section">
                        <h3><FaUser /> Thông tin cơ bản</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label><FaEnvelope /> Email:</label>
                                <span>{userData.email}</span>
                            </div>
                            <div className="info-item">
                                <label><FaPhone /> Điện thoại:</label>
                                <span>{userData.phone}</span>
                            </div>
                            <div className="info-item">
                                <label><FaMapMarkerAlt /> Địa chỉ:</label>
                                <span>{userData.address}</span>
                            </div>
                            <div className="info-item">
                                <label><FaBirthdayCake /> Ngày sinh:</label>
                                <span>{userData.birthday}</span>
                            </div>
                        </div>
                    </section>

                    {/* HIỂN THỊ THEO ROLE: NHÂN VIÊN */}
                    {userData.role === 'staff' && (
                        <section className="info-section role-specific staff-bg">
                            <h3><FaBriefcase /> Thông tin công tác (Nhân viên)</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Bộ phận:</label>
                                    <span className="capitalize">{userData.employee_info.type}</span>
                                </div>
                                <div className="info-item">
                                    <label>Trạng thái:</label>
                                    <span>{userData.employee_info.work_status === 'working' ? 'Đang làm việc' : 'Nghỉ phép'}</span>
                                </div>
                                <div className="info-item">
                                    <label><FaMoneyBillWave /> Lương cơ bản:</label>
                                    <span className="price">{userData.employee_info.basic_salary.toLocaleString()} VNĐ</span>
                                </div>
                                <div className="info-item">
                                    <label>Phụ cấp:</label>
                                    <span>{userData.employee_info.allowance.toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* HIỂN THỊ THEO ROLE: KHÁCH HÀNG */}
                    {userData.role === 'customer' && (
                        <section className="info-section role-specific customer-bg">
                            <h3><FaUserTag /> Thông tin khách hàng</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Hạng thành viên:</label>
                                    <span className={`rank-badge ${userData.customer_info.type}`}>
                                        {userData.customer_info.type.toUpperCase()}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <label>Ưu đãi:</label>
                                    <span>Áp dụng theo hạng {userData.customer_info.type}</span>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;