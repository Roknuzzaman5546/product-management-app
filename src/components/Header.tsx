// components/Header.tsx
'use client';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../store/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const token = useAppSelector((s) => s.auth.token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push('/login');
  }

  return (
    <header className="bg-surface shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-semibold">PM</div>
          <div>
            <div className="text-lg font-semibold">Product Manager</div>
            <div className="text-sm text-muted">Manage products — create, edit, delete</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/products" className="text-sm px-3 py-2 rounded-md hover:bg-slate-50">Products</Link>
          {token ? (
            <button onClick={handleLogout} className="text-sm px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50">
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-sm px-3 py-2 rounded-md hover:bg-slate-50">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
