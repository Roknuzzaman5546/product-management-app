// app/login/page.tsx
'use client';
import { useState } from 'react';
import { useAuthMutation } from '../../store/api';
import { useAppDispatch } from '../../hooks';
import { setToken } from '../../store/authSlice';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({ email: z.string().email() });

export default function LoginPage() {
  const [auth] = useAuthMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<{ email: string }>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: { email: string }) {
    try {
      const res = await auth({ email: data.email }).unwrap();
      dispatch(setToken({ token: res.token, email: data.email }));
      router.push('/products');
    } catch (err: any) {
      alert('Login failed: ' + (err?.data?.message ?? String(err)));
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-surface p-6 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Email</label>
          <input
            {...register('email')}
            placeholder="you@example.com"
            className="w-full border p-2 rounded-md"
          />
          {formState.errors.email && <div className="text-sm text-danger mt-1">{formState.errors.email.message}</div>}
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md">
          Sign in
        </button>
        <p className="text-xs text-muted mt-2">Use the same email you used on your job application.</p>
      </form>
    </div>
  );
}
