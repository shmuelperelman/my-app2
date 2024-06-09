'use client';
import SubmitBtn from '@/utils/components/submitBth/submitBtn';
import { login } from '@/utils/functions/apiCalls';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

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
    <form className="column form" onSubmit={handleSubmit}>
      <h1>Login form</h1>
      <input name="username" label="username" />
      <input name="password" label="password" type="password" />
      <SubmitBtn text="Login" />
    </form>
  );
}
