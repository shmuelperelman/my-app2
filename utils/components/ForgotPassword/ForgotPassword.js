'use client';
import { useState } from 'react';
import { requestPasswordReset } from '@/utils/functions/apiCalls'; // שינוי שם הפונקציה
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await requestPasswordReset(email);
      setMessage('A password reset link has been sent to your email.');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Failed to send password reset email. Please try again.');
      }
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  }
  

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Send Reset Link</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
