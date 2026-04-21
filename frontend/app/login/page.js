'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '../../components/Card';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/login', formData);
      login(response.data.user, response.data.token);
      router.push('/forum');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black">
            <span className="text-accent-primary">SKILL</span> SHIFT
          </h1>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Form */}
        <Card className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-card text-gray-400">Or</span>
            </div>
          </div>

          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-accent-primary hover:text-accent-secondary font-semibold transition">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
