'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Form = { email: string; name: string; password: string };

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<Form>();
  const router = useRouter();

  const onSubmit = async (values: Form) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, values);
      router.push('/login');
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display:'grid', gap:12, maxWidth: 360 }}>
        <input placeholder="Name" {...register('name', { required: true })} />
        <input placeholder="Email" {...register('email', { required: true })} />
        <input type="password" placeholder="Password" {...register('password', { required: true, minLength: 6 })} />
        <button type="submit">Create account</button>
      </form>
    </main>
  );
}
