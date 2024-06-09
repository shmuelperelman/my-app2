"use client";
import React, { useState } from 'react';
import './Setting.css';
import { updateUserProfile } from '@/utils/functions/apiCalls';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/utils/services/firebase';
import { getCookie } from 'cookies-next';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleCoverImageChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const uploadFileToFirebase = async (file, folder) => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    
    if (fullName) formData.append('fullName', fullName);
    if (email) formData.append('email', email);
    if (password) formData.append('password', password);

    try {
      if (profileImage) {
        const profileImageURL = await uploadFileToFirebase(profileImage, 'profile_pictures');
        formData.append('profileImageURL', profileImageURL);
      }
      if (coverImage) {
        const coverImageURL = await uploadFileToFirebase(coverImage, 'cover_pictures');
        formData.append('coverImageURL', coverImageURL);
      }

      const token = getCookie('token'); 
      const userId = getCookie('user_id'); 

      const response = await updateUserProfile(userId, token, formData);
      console.log('Profile updated successfully:', response);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'profile':
        return (
          <div className="settings-section">
            <h2>Profile</h2>
            <div>
              <label>Profile Image</label>
              <input type="file" onChange={handleProfileImageChange} />
            </div>
            <div>
              <label>Cover Image</label>
              <input type="file" onChange={handleCoverImageChange} />
            </div>
            <div>
              <label>Full Name</label>
              <input type="text" value={fullName} onChange={handleFullNameChange} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label>Password</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="settings-section">
            <h2>Privacy</h2>
            {/* Add privacy settings here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-body">
        <nav className="settings-menu">
          <ul>
            <li onClick={() => handleSectionChange('profile')}>Profile</li>
            <li onClick={() => handleSectionChange('privacy')}>Privacy</li>
          </ul>
        </nav>
        <form className="settings-content" onSubmit={handleSubmit}>
          {renderSection()}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
