'use client';
import React from 'react';
import Link from 'next/link'; // תיקון היבוא
import './GroupMenu.css';

const GroupMenu = ({ groups, onOpenPopup, onSelectGroup }) => {
  return (
    <div className="group-menu">
      <h2>Group Menu</h2>
      <ul>
        {groups.map(group => (
          <li key={group._id} className="group-menu-item">
            <Link href={`/groups/${group._id}`}>
              {group.name}
            </Link>
          </li>
        ))}
      </ul>
      <button className="create-group-btn" onClick={onOpenPopup}>
        Create Group
      </button>
    </div>
  );
};

export default GroupMenu;
