'use client';
import React, { useState, useEffect } from 'react';
import './ProfileSidebar.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserFriends } from '@/utils/functions/apiCalls';
import { getCookie } from 'cookies-next';

const ProfileSidebar = () => {
  const [friends, setFriends] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = getCookie('token');
        const userId = getCookie('user_id'); // קבלת userId מהעוגיות
        if (!token || !userId) {
          console.error('Token or userId not found');
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

    fetchFriends();
  }, []);

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
                  src={friend.profilePictureURL }
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
