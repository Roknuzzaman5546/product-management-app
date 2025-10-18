// components/Header.tsx
'use client';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/authSlice';
import { useRouter } from 'next/navigation';
import { LogOut, Package, Home } from 'lucide-react';

export default function Header() {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push('/login');
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-2 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-white">
              Product Manager
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              href="/products"
              className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors duration-200"
            >
              <Package className="w-5 h-5" />
              <span className="font-medium">Products</span>
            </Link>

            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}