import React from 'react';
import './profile-dashboard-button.css'
import { useUserProfileData } from '../../contexts/UserContext';

const ProfileDashboardButton = () => {
  const { userProfileData, setUserProfileData } = useUserProfileData();
  return (
    <div className='profile-dashboard-button'>
        <img src={userProfileData.avatarURL} alt='User Avatar'/>
    </div>
  )
};

export default ProfileDashboardButton;