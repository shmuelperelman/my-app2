"use client";
import React, { useState, useRef } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; 
import { storage } from '@/utils/services/firebase'; 
import './ChatBox.css';

const ChatBox = ({ recipient }) => {
  const [messages, setMessages] = useState([
    { sender: 'recipient', content: 'Hello!', type: 'text' },
    { sender: 'user', content: 'Hi there!', type: 'text' },
    { sender: 'recipient', content: 'How are you doing?', type: 'text' },
    { sender: 'user', content: 'https://example.com/image.jpg', type: 'image' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef(null); 

  const handleMessageSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'user', content: newMessage, type: 'text', timestamp: new Date() }]);
      setNewMessage(''); 
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.size < 5000000 && file.type.startsWith('image/')) { // בדיקת גודל קובץ וסוג
      const storageRef = ref(storage, `chat_images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: downloadURL, type: 'image', timestamp: new Date() }]);
    } else {
      alert('Invalid file. Please upload an image smaller than 5MB.');
    }
    fileInputRef.current.value = null;
  };

  return (
    <div className="chat-box">
      <div className="recipient-info">
        <img src={recipient.profilePicture} alt={recipient.name} className="profile-picture" />
        <span className="recipient-name">{recipient.name}</span>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'recipient-message'}`}
          >
            <img
              src={recipient.profilePicture}
              alt={message.sender === 'user' ? 'You' : recipient.name}
              className="profile-picture"
            />
            {message.type === 'text' ? (
              <span className="message-content">{message.content}</span>
            ) : (
              <img src={message.content} alt="Uploaded" className="message-image" />
            )}
            <span className="timestamp">{message.timestamp && message.timestamp.toLocaleString()}</span> {/* הצגת תאריך ושעה */}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <label htmlFor="image-upload" className="image-upload-label">
          <i className="fa fa-camera"></i>
        </label>
        <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} /> {/* העלאת תמונה */}
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
