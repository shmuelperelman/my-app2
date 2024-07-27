'use client';
import React, { useState, useEffect } from 'react';
import './FriendsSidebar.css';
import { getCookie } from 'cookies-next';
import { getUserFriends } from '@/utils/functions/apiCalls';
import Image from 'next/image';

const FriendsSidebar = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    console.log('FriendsSidebar mounted');
    const fetchFriends = async () => {
      try {
        const token = getCookie('token');
        const userId = getCookie('user_id');
        if (!token || !userId) {
          throw new Error('Token or User ID not found');
        }
        const friendsData = await getUserFriends(userId, token);
        setFriends(friendsData);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setFriends([]);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="sidebar-container">
      <div className="section">
        <h2 className="section-title">Friends</h2>
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <button
              key={friend._id}
              className="friend-btn"
              onClick={() => onSelectFriend(friend)}
            >
              <Image
                src={friend.profilePictureURL || 'https://example.com/default_profile_picture.png'}
                alt={friend.username}
                width={60}
                height={60}
                className="friend-pic"
              />
              <span>{friend.username}</span>
            </button>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendsSidebar;
