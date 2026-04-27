'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useAuthStore from '../lib/authStore';
import { FiMenu, FiX, FiSearch, FiBell } from 'react-icons/fi';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b-2 border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/SS.png" 
              alt="Skill Shift Logo" 
              width={160} 
              height={50} 
              className="object-contain"
              priority 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/forum" className="text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
              Forum
            </Link>
            <Link href="/resources" className="text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
              Resources
            </Link>
            <Link href="/events" className="text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
              Events
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-6">
            <button className="p-3 hover:bg-gray-800 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 border-sharp">
              <FiSearch size={20} className="text-white" />
            </button>
            <button className="p-3 hover:bg-gray-800 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 border-sharp">
              <FiBell size={20} className="text-white" />
            </button>
            {!isMounted || !isAuthenticated ? (
              <div className="flex gap-3">
                <Link href="/login" className="btn-outline text-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-sm">
                  Join
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="text-sm font-bold hover:text-gray-300 transition-colors uppercase tracking-wide">
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-primary text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 hover:bg-gray-800 border-2 border-gray-700 hover:border-gray-600 transition-all duration-300 border-sharp"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-6 pt-6 border-t-2 border-gray-700 space-y-4">
            <Link href="/forum" className="block py-3 text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
              Forum
            </Link>
            <Link href="/resources" className="block py-3 text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
              Resources
            </Link>
            <Link href="/events" className="block py-3 text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
              Events
            </Link>
            {!isMounted || !isAuthenticated ? (
              <div className="flex gap-3 mt-4">
                <Link href="/login" className="btn-outline flex-1 text-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary flex-1 text-sm">
                  Join
                </Link>
              </div>
            ) : (
              <>
                <Link href="/profile" className="block py-3 text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full btn-primary text-sm mt-4"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
