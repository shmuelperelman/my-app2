'use client';
import { login } from '@/utils/functions/apiCalls';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import "./Login.css"
export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { token, user_id, profilePictureURL } = await login(data);
    setCookie('token', token);
    setCookie('user_id', user_id);
    setCookie('profilePictureURL', profilePictureURL);
    router.push('/');
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input name="username" type="text" placeholder="Username" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}
