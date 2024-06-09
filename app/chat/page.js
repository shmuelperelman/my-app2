'use client';
import React, { useState, useEffect } from 'react';
import './ProfileChat.css';
import { getCookie } from 'cookies-next';
import { getUserFriends } from '@/utils/functions/apiCalls';
import ChatBox from '@/utils/components/ChatBox/ChatBox';
import Image from 'next/image';

const ProfileSidebar = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    console.log('ProfileSidebar mounted');
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
            <div key={friend._id}>
              <button
                className="friend-btn"
                onClick={() => setSelectedFriend(friend)}
              >
             <Image
      src={friend.profilePictureURL || 'https://example.com/default_profile_picture.png'}
      alt={friend.username}
      width={150}  // הגדר רוחב
      height={150} // הגדר גובה
      className="friend-pic"
    />
                <span>{friend.username}</span>
              </button>
              {selectedFriend && selectedFriend._id === friend._id && (
                <ChatBox recipientId={selectedFriend._id} />
              )}
            </div>
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
