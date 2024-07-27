import React from 'react';
import Profile from '@/utils/components/Profile1/Profile1';

const UserProfile = ({ params }) => {
  const { id } = params;
  return <Profile userId={id} />;
};

export default UserProfile;