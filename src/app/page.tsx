// app/page.tsx
'use client';
import Link from 'next/link';
import { Package, LogIn, ArrowRight, ShoppingCart, BarChart3, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Product Manager
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Manage your products effortlessly with our powerful and intuitive platform.
            Create, edit, and organize your inventory with ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link
              href="/login"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <LogIn className="w-5 h-5 mr-2" />
              <span>Login Now</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/products"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-50"
            >
              <Package className="w-5 h-5 mr-2" />
              <span>View Products</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Easy Product Management
              </h3>
              <p className="text-gray-600">
                Add, update, and delete products with a user-friendly interface designed for efficiency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Track your inventory and get insights with powerful analytics and reporting tools.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and reliable cloud infrastructure.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Products Managed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-purple-100">Active Users</div>
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-red-600 rounded-2xl p-6 text-white">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-pink-100">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}