'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faUserCircle,  faUsers, faStore } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const router = useRouter();

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'user') {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      setIsUserMenuOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    router.push('/logout');
  };

  const handleSelectUser = (userId) => {
    router.push(`/profile/${userId}`);
  };

  const profilePictureURL = getCookie('profilePictureURL');
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">ברוך הגבר</div>
        <div className="navbar-search">
        <SearchBar onSelectUser={handleSelectUser} />
        </div>
        <div className="navbar-center">
          <div className="navbar-icons">
            <Link href="/app" passHref>
              <button
                className={`navbar-icon-button ${activeButton === 'home' ? 'active' : ''}`}
                onClick={() => handleButtonClick('home')}
              >
                <FontAwesomeIcon icon={faHome} />
              </button>
            </Link>
            <Link href="/groups" passHref>
              <button
                className={`navbar-icon-button ${activeButton === 'groups' ? 'active' : ''}`}
                onClick={() => handleButtonClick('groups')}
              >
                <FontAwesomeIcon icon={faUsers} />
              </button>
            </Link>
            <Link href="/market" passHref>
              <button
                className={`navbar-icon-button ${activeButton === 'marketplace' ? 'active' : ''}`}
                onClick={() => handleButtonClick('marketplace')}
              >
                <FontAwesomeIcon icon={faStore} />
              </button>
            </Link>
            <Link href="/envelope" passHref>
              <button
                className={`navbar-icon-button ${activeButton === 'envelope' ? 'active' : ''}`}
                onClick={() => handleButtonClick('envelope')}
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
            </Link>
          </div>
        </div>
        <div className="navbar-profile">
          <button
            className={`navbar-icon-button ${activeButton === 'user' ? 'active' : ''}`}
            onClick={() => handleButtonClick('user')}
          >
            <div className="profile-picture-container">
              {profilePictureURL ? (
                <img src={profilePictureURL} alt="Profile Picture" className="profile-picture" />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} className="default-profile-icon" />
              )}
            </div>
          </button>
          {isUserMenuOpen && (
            <div className="dropdown-content" ref={userMenuRef}>
              <Link href="/profile">Profile</Link>
              <Link href="/setting">Settings</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
