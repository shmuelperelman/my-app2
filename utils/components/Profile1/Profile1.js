import React from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import ProfileSidebar from '../ProfileSidebar/ProfileSidebar';
import { getCookie } from 'cookies-next';
import './Profile1.css';
import PostForm from '../post/post';

const Profile = ({ userId }) => {
  const currentUserId = getCookie('user_id'); 

  return (
    <div className="profile-container">
      <ProfileHeader userId={userId} />
      <div className="profile-body">
        <div className="profile-main-content">
          {currentUserId === userId && (
            <PostForm/> 
          )}
          <ProfilePosts userId={userId} />
        </div>
        <ProfileSidebar className="profile-sidebar" />
      </div>
    </div>
  );
};

export default Profile;
