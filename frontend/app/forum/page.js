'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import PostCard from '../../components/PostCard';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';
import Link from 'next/link';
import { Filter, Plus } from 'lucide-react';

export default function ForumPage() {
  const { isAuthenticated } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, catsRes] = await Promise.all([
          apiClient.get('/posts', { params: { categoryId: selectedCategory } }),
          apiClient.get('/categories'),
        ]);
        setPosts(postsRes.data.posts || []);
        setCategories(catsRes.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 flex items-center justify-center">
        <div className="animate-pulse text-gray-300 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-white mb-3">
              <span className="text-gradient">Community</span> Forum
            </h1>
            <p className="text-gray-400">Discussions, questions, and knowledge sharing</p>
          </div>
          {isAuthenticated && (
            <Link
              href="/forum/create"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              New Post
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 flex items-center gap-2">
                  <Filter size={16} />
                  Categories
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedCategory === null
                      ? 'bg-white/10 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                      selectedCategory === cat.id
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <span className="mr-2 opacity-80">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Posts */}
          <div className="md:col-span-3 space-y-6">
            {posts.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-400">No posts found. Be the first to share!</p>
              </Card>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
