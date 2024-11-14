'use client';
import { useState } from 'react';
import { login } from '@/utils/functions/apiCalls';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import "./Login.css";
import ForgotPassword from '@/utils/components/ForgotPassword/ForgotPassword';
import Link from 'next/link';

export default function LoginPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { token, user_id, profilePictureURL } = await login(data);
    setCookie('token', token);
    setCookie('user_id', user_id);
    setCookie('profilePictureURL', profilePictureURL);
    router.push('profile/');
  }

  return (
    <div className="login-container">
      {showForgotPassword ? (
        <ForgotPassword /> 
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit" className="submit-btn">Login</button>
          <div className="login-links">
            <Link href="/registration">
              Register
            </Link>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowForgotPassword(true); 
              }}
            >
              Forgot Password?
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
