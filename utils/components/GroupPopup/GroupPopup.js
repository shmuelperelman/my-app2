'use client';
import React, { useState } from 'react';
import './GroupPopup.css';

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

  const handleCreate = () => {
    onCreate(groupName, members);
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
            placeholder="Member Email"
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
