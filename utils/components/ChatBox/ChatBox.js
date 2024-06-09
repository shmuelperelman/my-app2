'use client';
import React, { useState, useRef, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/firebase';
import './ChatBox.css';
import { getCookie } from 'cookies-next';
import { getUserById } from '@/utils/functions/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import socket from '@/socket';

const ChatBox = ({ recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState({});
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const defaultProfilePic = 'https://example.com/default_profile_picture.png';

  useEffect(() => {
    console.log(`ChatBox mounted with recipientId: ${recipientId}`);

    // Fetch recipient details
    const fetchRecipient = async () => {
      try {
        const token = getCookie('token');
        const data = await getUserById(recipientId, token);
        setRecipient(data);
      } catch (error) {
        console.error('Error fetching recipient details:', error);
      }
    };

    fetchRecipient();
  }, [recipientId]);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!recipientId) {
      return;
    }

    const userId = getCookie('user_id');
    const roomId = [userId, recipientId].sort().join('_');
    console.log(`Attempting to join room: ${roomId}`);
    socket.emit('joinRoom', { userId, recipientId });
    console.log(`User ${userId} joined room ${roomId}`);

    const messageListener = (message) => {
      console.log('Received message in client:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const previousMessagesListener = (messages) => {
      console.log('Received previous messages:', messages);
      setMessages(messages);
    };

    socket.off('message', messageListener); // remove any existing listeners
    socket.on('message', messageListener); // add the new listener
    socket.off('previousMessages', previousMessagesListener); // remove any existing listeners
    socket.on('previousMessages', previousMessagesListener); // add the new listener

    return () => {
      socket.off('message', messageListener);
      socket.off('previousMessages', previousMessagesListener);
    };
  }, [recipientId]);

  const handleMessageSend = (newMessageData) => {
    if (newMessageData && newMessageData.content.trim()) {
      // Send message to server
      console.log('Sending message:', newMessageData);
      socket.emit('sendMessage', { message: newMessageData, recipientId });
    }
  };

  const handleTextMessageSend = () => {
    if (newMessage.trim()) {
      const newMessageData = {
        id: Date.now(),
        sender: getCookie('user_id'),
        content: newMessage,
        type: 'text',
        timestamp: new Date(),
      };

      setNewMessage('');
      handleMessageSend(newMessageData);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const storageRef = ref(
          storage,
          `chat_images/${Date.now()}_${file.name}`
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const newImageMessage = {
          id: Date.now(),
          sender: getCookie('user_id'),
          content: downloadURL,
          type: 'image',
          timestamp: new Date(),
        };

        handleMessageSend(newImageMessage);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(
          'An error occurred while uploading the image. Please try again later.'
        );
      }
    } else {
      alert('Invalid file. Please upload an image smaller than 5MB.');
    }
    fileInputRef.current.value = null;
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <img
          src={recipient.profilePicture || defaultProfilePic}
          alt={recipient.username || 'User'}
          className="recipient-pic"
        />
        <span className="recipient-name">{recipient.username}</span>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === getCookie('user_id')
                ? 'user-message'
                : 'recipient-message'
            }`}
          >
            <img
              src={
                message.sender === getCookie('user_id')
                  ? 'path_to_user_profile_picture'
                  : recipient.profilePicture || defaultProfilePic
              }
              alt={message.sender}
              className="message-pic"
            />
            {message.type === 'text' ? (
              <span className="message-content">{message.content}</span>
            ) : (
              <img
                src={message.content}
                alt="Uploaded"
                className="message-image"
              />
            )}
            <span className="timestamp">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleTextMessageSend();
            }
          }}
        />
        <button
          className="image-upload-button"
          onClick={() => fileInputRef.current.click()}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button className="send-button" onClick={handleTextMessageSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
