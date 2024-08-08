import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { getCookie } from 'cookies-next';
import { getUserFriends } from '@/utils/functions/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookie('token');
        const userId = getCookie('user_id');
    
        if (!token || !userId) {
          console.error('Token or userId is missing');
          console.log('Token:', token);
          console.log('UserId:', userId);
          return;
        }
    
        const fetchedUsers = await getUserFriends(userId, token);
        console.log('Fetched users:', fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error in fetchUsers:', error);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (users.length > 0) {
      const filtered = users.filter(user =>
        user.username && user.username.toLowerCase().includes(value.toLowerCase())
      );

      console.log('searchTerm:', value);
      console.log('filteredUsers:', filtered);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (onSelectUser) {
      onSelectUser(userId);
    }
    setSearchTerm(''); 
    setFilteredUsers([]);
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>
      {searchTerm && (
        <ul className="search-results">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <li
                key={index}
                onClick={() => handleSelectUser(user._id)}
                className="search-result-item"
              >
                {user.username}
              </li>
            ))
          ) : (
            <li className="search-result-item">No results found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
