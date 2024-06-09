import React from 'react';
import { getCookie } from 'cookies-next';
import Profile from '@/utils/components/Profile1/Profile1';

const MyProfile = () => {
  const userId = getCookie('user_id'); 
  return <Profile userId={userId} />;
};

export default MyProfile;
