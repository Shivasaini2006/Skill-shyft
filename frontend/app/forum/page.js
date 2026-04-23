'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import PostCard from '../../components/PostCard';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';
import Link from 'next/link';
import { FiPlus, FiFilter } from 'react-icons/fi';

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
          apiClient.get('/posts', { params: { category: selectedCategory } }),
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-accent-primary text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase mb-2">
              <span className="text-accent-primary">Community</span> Forum
            </h1>
            <p className="text-gray-400">Discussions, questions, and knowledge sharing</p>
          </div>
          {isAuthenticated && (
            <Link href="/forum/create" className="btn-primary flex items-center gap-2">
              <FiPlus size={20} />
              New Post
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <div className="space-y-3">
                <h3 className="font-bold uppercase text-sm flex items-center gap-2">
                  <FiFilter size={16} />
                  Categories
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedCategory === null
                      ? 'bg-accent-primary/20 text-accent-primary'
                      : 'hover:bg-dark-bg'
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
                        ? 'bg-accent-primary/20 text-accent-primary'
                        : 'hover:bg-dark-bg'
                    }`}
                  >
                    <span className="mr-2">{cat.icon}</span>
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
