'use client';
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { getGroupsUserIsMemberOf, createGroup } from '@/utils/functions/apiCalls';
import GroupPopup from '../GroupPopup/GroupPopup';
import GroupMenu from '../GroupMenu/GroupMenu';
import './GroupPage.css';


const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = getCookie('user_id');
        const token = getCookie('token');
        const userGroups = await getGroupsUserIsMemberOf(userId, token);
        setGroups(userGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (groupName, members) => {
    try {
      const userId = getCookie('user_id');
      const token = getCookie('token');
      await createGroup({ name: groupName, members, admin_id: userId }, token);
      setIsPopupOpen(false);
      // Reload groups after creation
      const userGroups = await getGroupsUserIsMemberOf(userId, token);
      setGroups(userGroups);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="group-page">
      <GroupMenu groups={groups} />
      <button className="fab" onClick={() => setIsPopupOpen(true)}>
        Create Group
      </button>
      {isPopupOpen && <GroupPopup onCreate={handleCreateGroup} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default GroupPage;
