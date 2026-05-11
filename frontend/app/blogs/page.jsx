'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import apiClient from '../../lib/apiClient';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex justify-center items-center">
        <div className="text-white">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-black text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Blog</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Read the latest updates, tutorials, and community news from the Skill Shyft team.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-2">No blogs found</h3>
            <p className="text-gray-400">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="group flex flex-col justify-between p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-4">
                    <Calendar size={14} />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                    {blog.content.substring(0, 150)}...
                  </p>
                </div>
                <Link 
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-purple-400 transition-colors w-fit"
                >
                  Read Article
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
