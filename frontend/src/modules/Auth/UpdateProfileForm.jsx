import React, { useState, useEffect } from 'react';
import { FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaSave, FaCamera } from 'react-icons/fa';
import '../../styles/UpdateProfile.css'; // Sử dụng file css chung hoặc riêng

const UpdateProfileForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        address: '',
        birthday: '',
        sex: '',
        description: ''
    });

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <form className="update-form" onSubmit={(e) => e.preventDefault()}>
            <div className="avatar-section">
                <div className="avatar-wrapper">
                    {/* Sửa lỗi ảnh vỡ bằng cách thêm ảnh mặc định nếu preview null */}
                    <img 
                        src={preview || "https://ui-avatars.com/api/?name=Admin&background=random"} 
                        alt="avatar" 
                    />
                    <label htmlFor="upload-avt" className="upload-icon">
                        <FaCamera />
                    </label>
                    <input type="file" id="upload-avt" hidden onChange={handleImageChange} />
                </div>
                <h3>Chỉnh sửa hồ sơ</h3>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>Email (Không được sửa)</label>
                    <input type="email" value={formData.email} disabled className="input-readonly" />
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <div className="input-box">
                        <FaPhone />
                        <input type="text" name="phone" placeholder="Nhập SĐT" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group full-width">
                    <label>Địa chỉ</label>
                    <div className="input-box">
                        <FaMapMarkerAlt />
                        <input type="text" name="address" placeholder="Địa chỉ hiện tại" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Ngày sinh</label>
                    <div className="input-box">
                        <FaBirthdayCake />
                        <input type="date" name="birthday" onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group select">
                    <label>Giới tính</label>
                    <select name="sex" onChange={handleChange}>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div className="form-group full-width">
                    <label>Giới thiệu bản thân</label>
                    <textarea name="description" rows="4" placeholder="Viết gì đó về bạn..." onChange={handleChange}></textarea>
                </div>
            </div>

            <button type="submit" className="btn-save-profile">
                <FaSave /> Lưu thay đổi
            </button>
        </form>
    );
};

export default UpdateProfileForm;