'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import Card from '../../../components/Card';
import useAuthStore from '../../../lib/authStore';
import apiClient from '../../../lib/apiClient';

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.id;

  const { isAuthenticated } = useAuthStore();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  const authorInitial = useMemo(() => (post?.author?.name || 'U').slice(0, 1).toUpperCase(), [post]);

  const fetchPost = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    setError('');

    try {
      const res = await apiClient.get(`/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load post.');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    const content = comment.trim();
    if (!content) return;

    setCommentError('');
    setSubmitting(true);

    try {
      await apiClient.post(`/comments/${postId}/comments`, { content });
      setComment('');
      await fetchPost();
    } catch (err) {
      setCommentError(err.response?.data?.error || 'Failed to add comment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 flex items-center justify-center">
        <div className="animate-pulse text-gray-300 text-lg">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Card className="py-12 text-center">
            <p className="text-gray-300">{error}</p>
            <div className="mt-6">
              <Link
                href="/forum"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Back to Forum
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <Card className="py-12 text-center">
            <p className="text-gray-300">Post not found.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Forum
          </Link>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">{post.category}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        <Card>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-[-0.05em] text-white">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200">
                  {post.category}
                </span>

                <div className="flex items-center gap-3 text-sm text-gray-400">
                  {post?.author?.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-8 w-8 rounded-full border border-white/10 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                      {authorInitial}
                    </div>
                  )}

                  <span className="font-semibold text-gray-200">{post.author?.name}</span>
                </div>
              </div>

              {post.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.slice(0, 12).map((tag) => (
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

            <div className="border-t border-white/10 pt-8">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-300">
                {post.content}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="font-semibold">{post.comments?.length || 0}</span>
                <span>comments</span>
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                {post.views} views • {post.likes} likes
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-white">Comments</h2>
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="rounded-full border border-white/15 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 transition-colors hover:bg-white/5"
              >
                Login to reply
              </Link>
            ) : null}
          </div>

          {isAuthenticated ? (
            <Card>
              <form onSubmit={onSubmitComment} className="space-y-4">
                {commentError ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                    {commentError}
                  </div>
                ) : null}

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Write a helpful comment…"
                  className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting || !comment.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? 'Posting…' : 'Post'}
                  </button>
                </div>
              </form>
            </Card>
          ) : null}

          {post.comments?.length ? (
            <div className="space-y-4">
              {post.comments.map((c) => (
                <Card key={c.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {c?.author?.avatar ? (
                        <img
                          src={c.author.avatar}
                          alt={c.author.name}
                          className="h-9 w-9 rounded-full border border-white/10 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                          {(c?.author?.name || 'U').slice(0, 1).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-semibold text-white">{c.author?.name}</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">{c.content}</p>
                      </div>
                    </div>

                    <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                      {formatDate(c.createdAt)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="py-10 text-center">
              <p className="text-gray-400">No comments yet.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
