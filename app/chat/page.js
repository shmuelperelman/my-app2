'use client';
import React, { useState } from 'react';
import './ProfileChat.css';
import ChatBox from '@/utils/components/ChatBox/ChatBox';
import FriendsSidebar from '@/utils/components/sidebar/FriendsSidebar';

const ProfileSidebar = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="profile-layout">
      <FriendsSidebar onSelectFriend={handleFriendClick} />
      {selectedFriend && (
        <div className="chat-container">
          <ChatBox recipientId={selectedFriend._id} />
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
