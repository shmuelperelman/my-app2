'use client';
import React, { useState, useEffect } from 'react';
import './ProfileSidebar.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserFriends } from '@/utils/functions/apiCalls';

const ProfileSidebar = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = getCookie('token'); 
        if (!token) {
          console.error('No token found');
          return;
        }
        const friendsData = await getUserFriends(userId, token);
        console.log('Fetched friends:', friendsData); 
        setFriends(friendsData);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setFriends([]);
      }
    };

    if (userId) {
      fetchFriends();
    }
  }, [userId]);

  const handleFriendClick = (friend) => {
    router.push(`/profile/${friend._id}`);
  };

  return (
    <div className="sidebar-container">
      <div className="section">
        <h2 className="section-title">Friends</h2>
        {friends && friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend._id}>
              <button
                className="friend-btn"
                onClick={() => handleFriendClick(friend)}
              >
                <Image
                  src={friend.profilePictureURL || 'https://example.com/default_profile_picture.png'}
                  alt={friend.username}
                  width={50}
                  height={50}
                  className="friend-pic"
                />
                <span>{friend.username}</span>
              </button>
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
