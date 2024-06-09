import React from 'react';
import { useRouter } from 'next/router';
import Profile from '@/utils/components/Profile1/Profile1';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Profile userId={id} />;
};

export default UserProfile;
