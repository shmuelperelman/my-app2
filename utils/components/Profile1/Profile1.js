import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import './Profile1.css';


const Profile = ({ userId }) => {
  return (
    <div className="profile-container">
      <ProfileHeader userId={userId} />
      <div className="profile-body">
        <div className="profile-main-content">
          <ProfilePosts userId={userId} />
        </div>
        <ProfileSidebar  className="profile-sidebar" />
      </div>
    </div>
  );
};

export default Profile;


