'use client';
import React from 'react';
import './GroupMenu.css';

const GroupMenu = ({ groups, onOpenPopup }) => {
  return (
    <div className="group-menu">
      <h2>Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group._id} className="group-menu-item">
            {group.name}
          </li>
        ))}
      </ul>
      <button className="fab" onClick={onOpenPopup}>
        Create Group
      </button>
    </div>
  );
};

export default GroupMenu;
