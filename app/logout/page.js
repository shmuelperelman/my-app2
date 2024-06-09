'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const Logout = () => {
  const router = useRouter();



  useEffect(() => {
    // מחיקת העוגיות
    deleteCookie('token');
    deleteCookie('user_id');
    deleteCookie('profilePictureURL');

    router.push('/login');
  }, [router]);

  return (
    <div className="logout-container">
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;