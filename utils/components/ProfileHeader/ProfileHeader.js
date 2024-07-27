"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getUserById, updateUserProfile } from '@/utils/functions/apiCalls';
import { getCookie, setCookie } from 'cookies-next';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/utils/services/firebase';
import './ProfileHeader.css';

const ProfileHeader = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const token = getCookie('token');
        const userData = await getUserById(userId, token);
        setUser(userData);

        const currentUser = getCookie('user_id');
        setCurrentUserId(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const uploadFileToFirebase = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      try {
        const profileImageURL = await uploadFileToFirebase(profileImage, 'profile_pictures');
        const formData = new FormData();
        formData.append('profileImageURL', profileImageURL);

        const token = getCookie('token');
        const userId = getCookie('user_id');

        const response = await updateUserProfile(userId, token, formData);
        console.log('Profile picture updated successfully:', response);
        
        // עדכון העוגייה עם התמונה החדשה
        setCookie('profilePictureURL', profileImageURL);
        
        // עדכון מצב המשתמש עם התמונה החדשה
        setUser((prevUser) => ({ ...prevUser, profilePictureURL: profileImageURL }));
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profileHeader">
      <div className="coverPhoto" style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={user.coverPictureURL || 'https://www.photo-art.co.il/wp-content/uploads/2015/07/BY1A5781.jpg'}
          alt="Cover"
          fill
          style={{ objectFit: 'cover' }}
          priority // הוספת מאפיין priority
        />
      </div>
      
      <div className="profileInfo">
        <div className="profilePicture">
          <Image
            src={user.profilePictureURL || 'https://www.photo-art.co.il/wp-content/uploads/2015/07/BY1A5781.jpg'}
            alt={user.username}
            width={150}
            height={150}
            priority // הוספת מאפיין priority
          />
          {currentUserId === user._id && (
            <div>
              <input
                type="file"
                id="profileImageInput"
                name="profileImage"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleProfileImageChange}
              />
              <button className="changePhotoButton" title="Change profile picture" onClick={handleProfileImageUpload}>
                📷
              </button>
            </div>
          )}
        </div>

        <div className="userDetails">
          <h1>{user.username}</h1>
          <p>{user.bio || 'No bio available'}</p>
          
          <div className="additionalInfo">
            <span>📍 {user.location || 'Location not set'}</span>
            <span>🔗 <a href={user.website}>{user.website || 'Website not set'}</a></span>
            <span>📅 Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="stats">
            <span><strong>{user.followers?.length || 0}</strong> Followers</span>
            <span><strong>{user.following?.length || 0}</strong> Following</span>
          </div>
        </div>

        {currentUserId === user._id && (
          <button className="editButton" onClick={handleEditButtonClick}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
