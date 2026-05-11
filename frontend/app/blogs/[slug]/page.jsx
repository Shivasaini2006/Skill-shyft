'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import apiClient from '../../../lib/apiClient';
import { Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/blogs/${params.slug}`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Blog not found.');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex justify-center items-center">
        <div className="text-white">Loading blog...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 flex flex-col justify-center items-center space-y-6">
        <div className="text-red-400 text-xl font-bold">{error || 'Blog not found.'}</div>
        <Link href="/blogs" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to all blogs
        </Link>
        
        <article className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
          <header className="mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-2 text-sm font-medium text-purple-400 mb-6">
              <Calendar size={16} />
              {new Date(blog.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {blog.title}
            </h1>
          </header>

          <div 
            className="prose prose-invert prose-purple max-w-none text-gray-300 leading-relaxed text-lg
            prose-headings:text-white prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl 
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-code:text-purple-300 prose-code:bg-purple-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-blockquote:border-l-purple-500 prose-blockquote:bg-white/5 prose-blockquote:px-6 prose-blockquote:py-2"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>
    </div>
  );
}
