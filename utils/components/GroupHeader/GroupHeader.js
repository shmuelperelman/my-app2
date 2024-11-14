"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getGroupById } from '@/utils/functions/apiCalls';
import { getCookie } from 'cookies-next';
import './GroupHeader.css';

const GroupHeader = ({ groupId }) => {
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      setIsLoading(true);
      try {
        const token = getCookie('token');
        const groupData = await getGroupById(groupId, token);
        setGroup(groupData);
      } catch (error) {
        console.error('Error fetching group:', error);
        setError('Failed to load group data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (groupId) {
      fetchGroup();
    }
  }, [groupId]);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!group) {
    return null;
  }

  return (
    <div className="groupHeader">
      <div className="coverPhoto" style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Image
          src={group.coverPictureURL || 'https://www.photo-art.co.il/wp-content/uploads/2015/07/BY1A5781.jpg'}
          alt="Cover"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      <div className="groupInfo">
        <h1>{group.name}</h1>
      </div>
    </div>
  );
};

export default GroupHeader;
