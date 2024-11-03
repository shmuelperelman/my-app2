'use client';
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import "./Groups.css";
import GroupPage from '@/utils/components/GroupPage/GroupPage';
import PostFormGroup from '@/utils/components/PostFormGruop/PostFormGruop';
import { getGroupsUserIsMemberOf } from '@/utils/functions/apiCalls';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

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

  const handleNewPost = (newPost) => {

  };

  return (
    <div className="groups-container">
      <GroupPage />
      {selectedGroupId && (
        <PostFormGroup groupId={selectedGroupId} onNewPost={handleNewPost} />
      )}
    </div>
  );
};

export default Groups;