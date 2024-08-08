"use client"
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Profile from '@/utils/components/Profile1/Profile1';

const MyProfile = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromCookie = getCookie('user_id');
    console.log('User ID from cookie:', userIdFromCookie); 
    setUserId(userIdFromCookie);
  }, []);

  if (!userId) {
    return <p>User ID not found. Please login.</p>;
  }

  return <Profile userId={userId} />;
};

export default MyProfile;
