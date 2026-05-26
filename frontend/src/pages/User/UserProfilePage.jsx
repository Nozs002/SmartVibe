import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaUserTag,
  FaMoneyBillWave,
  FaBriefcase,
  FaUserCircle,
  FaEdit,
  FaMars,
  FaVenus,
  FaGenderless,
} from "react-icons/fa";
import "../../styles/UserProfile.css";

const UserProfilePage = () => {
  const navigate = useNavigate();

  // Khởi tạo state là null để có thể kiểm tra trạng thái đang tải
  const [user, setUser] = useState(null);
  const [staff, setStaff] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const localUser = JSON.parse(localStorage.getItem("user"));
    const localStaff = JSON.parse(localStorage.getItem("staff"));
    const localCustomer = JSON.parse(localStorage.getItem("customer"));

    if (localUser) setUser(localUser);
    if (localStaff) setStaff(localStaff);
    if (localCustomer) setCustomer(localCustomer);
  }, []); // Mảng rỗng [] giúp useEffect chỉ chạy 1 lần khi load trang

  const renderGenderIcon = (sex) => {
    switch (sex) {
      case "male":
        return <FaMars color="#007bff" />;
      case "female":
        return <FaVenus color="#ff4d4d" />;
      default:
        return <FaGenderless color="#888" />;
    }
  };

  // Nếu chưa có user thì hiển thị màn hình chờ (tránh sập trang do undefined)
  if (!user) {
    return (
      <div className="profile-container">
        <h2>Đang tải thông tin...</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* ---------- PHẦN HEADER ---------- */}
        <div className="profile-header">
          <div className="header-left">
            <div className="profile-avatar">
              {/* Hiển thị avatar nếu có url, nếu không dùng icon mặc định */}
              {user.avt_url ? (
                <img
                  src={user.avt_url}
                  alt="Avatar"
                  style={{ width: 80, height: 80, borderRadius: "50%" }}
                />
              ) : (
                <FaUserCircle size={80} color="#007bff" />
              )}
            </div>
            <div className="profile-title">
              <h2>{user.username}</h2>
              {/* Sửa lại đúng tên trường là accountStatus thay vì account_status */}
              <span className={`status-badge ${user.accountStatus}`}>
                {user.accountStatus?.toUpperCase() || "CHƯA RÕ"}
              </span>
            </div>
          </div>

          <button
            className="btn-edit-profile"
            onClick={() => navigate("/update-profile")}
          >
            <FaEdit /> Chỉnh sửa
          </button>
        </div>

        <div className="profile-body">
          {/* ---------- MÔ TẢ ---------- */}
          <section className="info-section about-section">
            <h3>
              <FaUser /> Đôi chút về tôi
            </h3>
            <div className="about-content">
              <p>{user.description || "Chưa có mô tả...."}</p>
            </div>
          </section>

          {/* ---------- THÔNG TIN CHUNG ---------- */}
          <section className="info-section">
            <h3>
              <FaUser /> Thông tin cơ bản
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <label>{renderGenderIcon(user.sex)} Giới tính:</label>
                <span>
                  {user.sex === "male"
                    ? "Nam"
                    : user.sex === "female"
                      ? "Nữ"
                      : "Khác"}
                </span>
              </div>
              <div className="info-item">
                <label>
                  <FaEnvelope /> Email:
                </label>
                <span>{user.email || "Chưa cập nhật"}</span>
              </div>
              <div className="info-item">
                <label>
                  <FaPhone /> Điện thoại:
                </label>
                <span>{user.phone || "Chưa cập nhật"}</span>
              </div>
              <div className="info-item">
                <label>
                  <FaMapMarkerAlt /> Địa chỉ:
                </label>
                <span>{user.address || "Chưa cập nhật"}</span>
              </div>
              <div className="info-item">
                <label>
                  <FaBirthdayCake /> Ngày sinh:
                </label>
                <span>{user.birthday || "Chưa cập nhật"}</span>
              </div>
              <div className="info-item">
                <label>
                  <FaUserTag /> Mã định danh (CCCD):
                </label>
                <span>{user.identifyCode || "Chưa có"}</span>
              </div>
            </div>
          </section>

          {/* ---------- HIỂN THỊ DÀNH CHO NHÂN VIÊN / QUẢN TRỊ VIÊN ---------- */}
          {(user.role === "staff" || user.role === "system admin") && staff && (
            <section className="info-section role-specific staff-bg">
              <h3>
                <FaBriefcase /> Thông tin công tác
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Bộ phận/Loại:</label>
                  <span className="capitalize">
                    {staff.type || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Trạng thái làm việc:</label>
                  <span>
                    {staff.workStatus === "working"
                      ? "Đang làm việc"
                      : staff.workStatus === "quit"
                        ? "Đã nghỉ việc"
                        : "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>
                    <FaMoneyBillWave /> Lương cơ bản:
                  </label>
                  <span className="price">
                    {staff.basicSalary
                      ? `${staff.basicSalary.toLocaleString()} VNĐ`
                      : "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>
                    <FaMoneyBillWave /> Trợ cấp:
                  </label>
                  <span className="price">
                    {staff.allowance
                      ? `${staff.allowance.toLocaleString()} VNĐ`
                      : "0 VNĐ"}
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* ---------- HIỂN THỊ DÀNH CHO KHÁCH HÀNG ---------- */}
          {user.role === "customer" && customer && (
            <section className="info-section role-specific customer-bg">
              <h3>
                <FaUserTag /> Thông tin khách hàng
              </h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Hạng thành viên:</label>
                  <span className="rank-badge capitalize">
                    {customer.type
                      ? customer.type.toUpperCase()
                      : "Bình thường"}
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
