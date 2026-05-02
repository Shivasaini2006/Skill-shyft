'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';
import Card from '../../../components/Card';
import useAuthStore from '../../../lib/authStore';
import apiClient from '../../../lib/apiClient';

function parseCommaList(value) {
  return (value || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function CreateForumPostPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const tagPreview = useMemo(() => parseCommaList(tags).slice(0, 8), [tags]);

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      setLoadingCats(true);
      try {
        const res = await apiClient.get('/categories');
        if (!active) return;
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        if (active) setLoadingCats(false);
      }
    };

    fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setError('');
    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        content: content.trim(),
        categoryId,
        tags: parseCommaList(tags),
      };

      const res = await apiClient.post('/posts', payload);
      const postId = res.data?.postId;
      router.push(postId ? `/post/${postId}` : '/forum');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to publish. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">Forum</p>
            <h1 className="text-xl font-semibold tracking-tight text-white">Create post</h1>
          </div>
        </div>

        {!isAuthenticated ? (
          <Card className="text-center py-12">
            <p className="text-gray-300">You need to be logged in to publish a post.</p>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Go to Login
              </Link>
            </div>
          </Card>
        ) : (
          <Card>
            <form onSubmit={onSubmit} className="space-y-6">
              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="What are you building? What do you need help with?"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    disabled={loadingCats}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10 disabled:opacity-60"
                  >
                    <option value="" disabled>
                      {loadingCats ? 'Loading…' : 'Select a category'}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon ? `${cat.icon} ` : ''}{cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Tags (comma separated)
                  </label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="react, gsap, mysql"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />

                  {tagPreview.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tagPreview.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={10}
                  placeholder="Share details, context, links, what you've tried, and what you're aiming for."
                  className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Tip: Keep it concrete. A clear question gets high-signal answers.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Publishing…' : 'Publish'}
                </button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
