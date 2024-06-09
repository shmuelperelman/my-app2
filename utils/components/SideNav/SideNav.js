// components/SideNav.js
"use client"
import { useState } from 'react';
import styles from './SideNav.css';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  return (
    <>
      <div className={`${styles.sidenav} ${isOpen ? styles.open : ''}`}>
        <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776; open</span>
    </>
  );
};

export default SideNav;
