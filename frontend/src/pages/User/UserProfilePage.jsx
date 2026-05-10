import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm dòng này để điều hướng
import { 
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
    FaBirthdayCake, FaUserTag, FaMoneyBillWave, 
    FaBriefcase, FaUserCircle, FaEdit, FaMars, FaVenus, FaGenderless,
} from 'react-icons/fa';
import '../../styles/UserProfile.css';

const UserProfilePage = () => {
    const navigate = useNavigate();
    
    // Trong thực tế, dữ liệu này sẽ fetch từ API
    const [userData, setUserData] = useState({
        username: "admin",
        role: "staff", 
        email: "staff2@gmail.com",
        phone: "0801111112",
        address: "TP HCM",
        birthday: "1991-02-02",
        sex: "male",
        account_status: "active",
        employee_info: {
            type: "manager",
            work_status: "working",
            basic_salary: 15000000,
            allowance: 2000000
        },
        customer_info: {
            type: "diamond"
        }
    });

    const renderGenderIcon = (sex) => {
        switch (sex) {
            case 'male': return <FaMars color="#007bff" />;
            case 'female': return <FaVenus color="#ff4d4d" />;
            default: return <FaGenderless color="#888" />;
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Phần header hồ sơ */}
                <div className="profile-header">
                    <div className="header-left">
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
                    
                    {/* NÚT CẬP NHẬT Ở GÓC PHẢI */}
                    <button 
                        className="btn-edit-profile" 
                        onClick={() => navigate('/update-profile')}
                    >
                        <FaEdit /> Chỉnh sửa
                    </button>
                </div>

                <div className="profile-body">
                    {/* MÔ TẢ */}
                    <section className="info-section about-section">
                        <h3><FaUser /> Đôi chút về tôi</h3>
                        <div className="about-content">
                            <p>
                                {userData.employee_info.description || 'Chưa có mô tả....'}
                            </p>
                        </div>
                    </section>

                    {/* THÔNG TIN CHUNG */}
                    <section className="info-section">
                        <h3><FaUser /> Thông tin cơ bản</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>{renderGenderIcon(userData.sex)}Giới tính:</label>
                                <span>{userData.sex === 'male' ? 'Nam' : (userData.sex === 'female' ? 'Nữ' : "Giới tính không xác định")}</span>
                            </div>
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
                            <div className="info-item">
                                <label><FaBirthdayCake /> CCCD</label>
                                <span>{userData.cccd || 'Chưa có'}</span>
                            </div>
                        </div>
                    </section>

                    {/* HIỂN THỊ CHO QUẢN TRỊ VIÊN */}
                    {userData.role === 'system admin' && (
                        <section className="info-section role-specific staff-bg">
                            <h3><FaBriefcase /> Thông tin công tác</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Bộ phận:</label>
                                    <span className="capitalize">{userData.employee_info.type}</span>
                                </div>
                                <div className="info-item">
                                    <label>Trạng thái:</label>
                                    <span>{userData.employee_info.work_status === 'working' ? 'Đang làm việc' : 'Nghỉ'}</span>
                                </div>
                                <div className="info-item">
                                    <label><FaMoneyBillWave /> Lương cơ bản:</label>
                                    <span className="price">{userData.employee_info.basic_salary.toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* HIỂN THỊ CHO NHÂN VIÊN */}
                    {userData.role === 'staff' && (
                        <section className="info-section role-specific staff-bg">
                            <h3><FaBriefcase /> Thông tin công tác</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Bộ phận:</label>
                                    <span className="capitalize">{userData.employee_info.type}</span>
                                </div>
                                <div className="info-item">
                                    <label>Trạng thái:</label>
                                    <span>{userData.employee_info.work_status === 'working' ? 'Đang làm việc' : 'Nghỉ'}</span>
                                </div>
                                <div className="info-item">
                                    <label><FaMoneyBillWave /> Lương cơ bản:</label>
                                    <span className="price">{userData.employee_info.basic_salary.toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* HIỂN THỊ CHO KHÁCH HÀNG */}
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
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;