'use client';
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

import './GroupPage.css';
import { getGroupsUserIsMemberOf } from '@/utils/functions/apiCalls';
import GroupMenu from '../GroupMenu/GroupMenu';
import GroupPopup from '../GroupPopup/GroupPopup';

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = getCookie('user_id');
        const token = getCookie('token');
        if (userId && token) {
          const userGroups = await getGroupsUserIsMemberOf(userId, token);
          setGroups(userGroups);
        } else {
          console.error('User ID or token is missing');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (groupName, members) => {
    try {
      setIsPopupOpen(false);
      const userId = getCookie('user_id');
      const token = getCookie('token');
      const userGroups = await getGroupsUserIsMemberOf(userId, token);
      setGroups(userGroups);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="group-page">
      <GroupMenu groups={groups} onOpenPopup={() => setIsPopupOpen(true)} />
      {isPopupOpen && <GroupPopup onCreate={handleCreateGroup} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default GroupPage;
