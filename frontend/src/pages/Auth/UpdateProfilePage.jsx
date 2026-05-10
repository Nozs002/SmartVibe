import React from 'react';
import UpdateProfileForm from '../../modules/Auth/UpdateProfileForm';
import '../../styles/UpdateProfile.css'; 

const UpdateProfilePage = () => {
    return (
        <div className="cp-page-container">
            <div className="cp-card">
                <UpdateProfileForm />
            </div>
        </div>
    );
};

export default UpdateProfilePage;