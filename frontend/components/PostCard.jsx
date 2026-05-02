'use client';

import { Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import Card from './Card.jsx';

export default function PostCard({ post }) {
  const authorInitial = (post?.author?.name || 'U').slice(0, 1).toUpperCase();

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <Link href={`/post/${post.id}`}>
              <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-white transition-colors hover:text-white/90">
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center gap-4 mt-4">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200">
                {post.category}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('en-US')}
              </span>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <p className="line-clamp-3 text-base leading-relaxed text-gray-400">
          {post.content}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 py-6 border-t border-white/10">
          {post?.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full border border-white/10 object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white">
              {authorInitial}
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{post.author.name}</p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 text-gray-400">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 transition-colors hover:text-white cursor-pointer">
              <Eye size={18} />
              <span className="font-bold">{post.views}</span>
            </div>
            <div className="flex items-center gap-2 transition-colors hover:text-white cursor-pointer">
              <Heart size={18} />
              <span className="font-bold">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 transition-colors hover:text-white cursor-pointer">
              <MessageCircle size={18} />
              <span className="font-bold">{post.comments}</span>
            </div>
          </div>
          <button className="transition-colors hover:text-white">
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
}
