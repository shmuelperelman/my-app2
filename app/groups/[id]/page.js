'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GroupDetails from '@/utils/components/GroupDetails/GroupDetails';

const GroupPage = () => {
  const router = useRouter();
  const { id } = router.query; // מקבל את ה-id מהנתיב
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    if (id) {
      setGroupId(id);
    }
  }, [id]);

  if (!groupId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GroupDetails groupId={groupId} />
    </div>
  );
};

export default GroupPage;
