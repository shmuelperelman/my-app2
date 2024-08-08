'use client';
import React, { useState } from 'react';
import './GroupPopup.css';
import { createGroup } from '@/utils/functions/apiCalls';
import { getCookie } from 'cookies-next';

const GroupPopup = ({ onCreate, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);

  const handleAddMember = () => {
    setMembers([...members, '']);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleCreate = async () => {
    const token = getCookie('token');
    const admin_id = getCookie('user_id');
    try {
      const groupData = {
        name: groupName,
        admin_id: admin_id,
        members: members.filter(member => member !== ''),
      };
      await createGroup(groupData, token);
      onCreate(groupName, members);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="group-popup">
      <div className="group-popup-content">
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {members.map((member, index) => (
          <input
            key={index}
            type="text"
            placeholder="Member"
            value={member}
            onChange={(e) => handleMemberChange(index, e.target.value)}
          />
        ))}
        <button onClick={handleAddMember}>Add Member</button>
        <button onClick={handleCreate}>Create</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GroupPopup;
