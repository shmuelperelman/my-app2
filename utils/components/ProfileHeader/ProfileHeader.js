"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserById } from '@/utils/functions/apiCalls';
import "./ProfileHeader.css"


const ProfileHeader = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-header">
      <Image
        src={user.profilePictureURL || 'https://example.com/default_profile_picture.png'}
        alt={user.username}
        width={150}
        height={150}
        className="profile-pic"
      />
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
      {/* הוסף כאן מידע נוסף על המשתמש */}
    </div>
  );
};

export default ProfileHeader;
