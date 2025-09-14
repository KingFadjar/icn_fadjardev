'use client';

import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

type Form = { email: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<Form>();
  const login = useAuthStore(s => s.login);
  const router = useRouter();

  const onSubmit = async (values: Form) => {
    const ok = await login(values.email, values.password);
    if (ok) router.push('/dashboard');
    else alert('Login failed');
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap:12, maxWidth: 360 }}>
        <input placeholder="Email" {...register('email', { required: true })} />
        <input type="password" placeholder="Password" {...register('password', { required: true })} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
