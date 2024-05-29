"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendsSidebar.css';

export default function FriendsSidebar() {
  
  const onlineFriends = [
    { id: 1, name: 'shmuel', profilePic: 'https://publicdomainvectors.org/he/%D7%A7%D7%9C%D7%99%D7%A4%D7%A8%D7%98%20%D7%97%D7%99%D7%A0%D7%9D/%D7%91%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%99%D7%AA-%D7%A9%D7%9C-%D7%94%D7%A7%D7%95%D7%9E%D7%99%D7%A7%D7%A1-%D7%96%D7%9B%D7%A8-%D7%A4%D7%A8%D7%95%D7%A4%D7%99%D7%9C-%D7%90%D7%99%D7%A9%D7%99/17533.htmlhttps://example.com/alice.jpg' },
    { id: 2, name: 'nir', profilePic: 'https://publicdomainvectors.org/he/%D7%A7%D7%9C%D7%99%D7%A4%D7%A8%D7%98%20%D7%97%D7%99%D7%A0%D7%9D/%D7%94%D7%99%D7%9C%D7%93-%D7%94%D7%A7%D7%95%D7%9E%D7%99%D7%A7%D7%A1-%D7%90%D7%95%D7%95%D7%90%D7%98%D7%A8-%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94-%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%99%D7%AA/16571.htmlhttps://example.com/bob.jpg' },
    { id: 3, name: 'keren', profilePic: 'https://publicdomainvectors.org/he/%D7%A7%D7%9C%D7%99%D7%A4%D7%A8%D7%98%20%D7%97%D7%99%D7%A0%D7%9D/%D7%94%D7%99%D7%9C%D7%93-%D7%94%D7%A7%D7%95%D7%9E%D7%99%D7%A7%D7%A1-%D7%90%D7%95%D7%95%D7%90%D7%98%D7%A8-%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94-%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%99%D7%AA/16571.htmlhttps://example.com/bob.jpg' },
    { id: 4, name: 'dan', profilePic: 'https://publicdomainvectors.org/he/%D7%A7%D7%9C%D7%99%D7%A4%D7%A8%D7%98%20%D7%97%D7%99%D7%A0%D7%9D/%D7%94%D7%99%D7%9C%D7%93-%D7%94%D7%A7%D7%95%D7%9E%D7%99%D7%A7%D7%A1-%D7%90%D7%95%D7%95%D7%90%D7%98%D7%A8-%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94-%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%99%D7%AA/16571.htmlhttps://example.com/bob.jpgg' },
    { id: 5, name: 'jon', profilePic: 'https://publicdomainvectors.org/he/%D7%A7%D7%9C%D7%99%D7%A4%D7%A8%D7%98%20%D7%97%D7%99%D7%A0%D7%9D/%D7%94%D7%99%D7%9C%D7%93-%D7%94%D7%A7%D7%95%D7%9E%D7%99%D7%A7%D7%A1-%D7%90%D7%95%D7%95%D7%90%D7%98%D7%A8-%D7%92%D7%A8%D7%A4%D7%99%D7%A7%D7%94-%D7%95%D7%A7%D7%98%D7%95%D7%A8%D7%99%D7%AA/16571.htmlhttps://example.com/bob.jpghttps://example.com/amir.jpg' },
 
  ];

  // const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    // Fetch online friends data from the server
    const fetchOnlineFriends = async () => {
      try {
        const response = await axios.get('/api/online-friends');
        setOnlineFriends(response.data);
      } catch (error) {
        console.error('Error fetching online friends:', error);
      }
    };

    fetchOnlineFriends();
  }, []);

  return (
    <div className="friends-sidebar">
      <h3>Online Friends</h3>
      <ul className="online-friends-list">
        {onlineFriends.map((friend, index) => (
          <li key={friend.id} className={`online-friend${index !== onlineFriends.length - 1 ? ' friend-separator' : ''}`}>
            <img
              src={friend.profilePicture}
              alt={`${friend.name}'s profile`}
              className="profile-picture"
            />
            <span className="friend-name">{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
