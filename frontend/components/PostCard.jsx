'use client';

import React from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import Card from './Card.jsx';

export default function PostCard({ post }) {
  return (
    <Card>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <Link href={`/post/${post.id}`}>
              <h3 className="text-lg font-bold hover:text-accent-primary transition line-clamp-2">
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary rounded">
                {post.category}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <p className="text-gray-300 line-clamp-3 text-sm">
          {post.content}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 py-3 border-t border-dark-border">
          <div className="w-8 h-8 bg-accent-primary/20 rounded-full"></div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{post.author.name}</p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-dark-border text-gray-400 text-sm">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 hover:text-accent-primary transition cursor-pointer">
              <FiEye size={16} />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-accent-primary transition cursor-pointer">
              <FiHeart size={16} />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-accent-primary transition cursor-pointer">
              <FiMessageCircle size={16} />
              <span>{post.comments}</span>
            </div>
          </div>
          <button className="hover:text-accent-primary transition">
            <FiShare2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
}
