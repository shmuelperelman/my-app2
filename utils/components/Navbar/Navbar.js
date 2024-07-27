'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import './styles.css'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

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

  const profilePictureURL = getCookie('profilePictureURL');



  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">ברוך הגבר</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search…" className="navbar-search-input" />
          <button className="navbar-search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="navbar-icons">
          <button 
            className={`navbar-icon-button ${activeButton === 'home' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('home')}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button 
            className={`navbar-icon-button ${activeButton === 'envelope' ? 'active' : ''}`} 
            onClick={() => handleButtonClick('envelope')}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </button>
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
