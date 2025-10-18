// app/login/page.tsx
'use client';
import { useAuthMutation } from '../../store/api';
import { useAppDispatch } from '../../hooks';
import { setToken } from '../../store/authSlice';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo/Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Sign in to continue to Product Manager
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>
              {formState.errors.email && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <span className="font-medium">{formState.errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Info Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 text-center">
                💡 Use the same email you used on your job application
              </p>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Back to Home Link */}
          <Link
            href="/"
            className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don't have an account?{' '}
          <span className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
}