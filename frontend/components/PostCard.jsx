'use client';

import React from 'react';
import { FiHeart, FiMessageCircle, FiShare2, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import Card from './Card.jsx';

export default function PostCard({ post }) {
  return (
    <div className="bg-gray-900 border-2 border-gray-700 p-8 border-sharp hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 gpu-accelerated">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <Link href={`/post/${post.id}`}>
              <h3 className="text-xl font-black hover:text-gray-300 transition-colors uppercase tracking-tight line-clamp-2">
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase tracking-wider border border-gray-600">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                {new Date(post.createdAt).toLocaleDateString('en-US')}
              </span>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <p className="text-gray-400 line-clamp-3 text-base leading-relaxed">
          {post.content}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 py-6 border-t-2 border-gray-700">
          <div className="w-10 h-10 bg-gray-700 border-2 border-gray-600"></div>
          <div className="flex-1">
            <p className="text-base font-bold text-white uppercase tracking-wide">{post.author.name}</p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between pt-6 border-t-2 border-gray-700 text-gray-500">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FiEye size={18} />
              <span className="font-bold">{post.views}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FiHeart size={18} />
              <span className="font-bold">{post.likes}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <FiMessageCircle size={18} />
              <span className="font-bold">{post.comments}</span>
            </div>
          </div>
          <button className="hover:text-white transition-colors">
            <FiShare2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
