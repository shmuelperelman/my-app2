'use client';
import React from 'react';
import './GroupMenu.css';

const GroupMenu = ({ groups }) => {
  return (
    <div className="group-menu">
      <h2>Group Menu</h2>
      <ul>
        {groups.map(group => (
          <li key={group._id} className="group-menu-item">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupMenu;
