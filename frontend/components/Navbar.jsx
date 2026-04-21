'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '../lib/authStore';
import { FiMenu, FiX, FiSearch, FiBell } from 'react-icons/fi';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-2xl font-black text-accent-primary group-hover:text-accent-secondary transition">
              SKILL SHIFT
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/forum" className="text-sm uppercase tracking-wider hover:text-accent-primary transition">
              Forum
            </Link>
            <Link href="/resources" className="text-sm uppercase tracking-wider hover:text-accent-primary transition">
              Resources
            </Link>
            <Link href="/events" className="text-sm uppercase tracking-wider hover:text-accent-primary transition">
              Events
            </Link>
            <Link href="/community" className="text-sm uppercase tracking-wider hover:text-accent-primary transition">
              Community
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-dark-card rounded-lg transition">
              <FiSearch size={20} />
            </button>
            <button className="p-2 hover:bg-dark-card rounded-lg transition">
              <FiBell size={20} />
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="text-sm hover:text-accent-primary transition">
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-primary text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="btn-outline text-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary text-sm">
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-dark-card rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-dark-border space-y-3">
            <Link href="/forum" className="block py-2 hover:text-accent-primary transition">
              Forum
            </Link>
            <Link href="/resources" className="block py-2 hover:text-accent-primary transition">
              Resources
            </Link>
            <Link href="/events" className="block py-2 hover:text-accent-primary transition">
              Events
            </Link>
            <Link href="/community" className="block py-2 hover:text-accent-primary transition">
              Community
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="block py-2 hover:text-accent-primary transition">
                  {user?.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full btn-primary text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="btn-outline flex-1 text-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary flex-1 text-sm">
                  Join
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
