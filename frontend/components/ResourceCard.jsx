'use client';

import React from 'react';
import Card from './Card.jsx';

export default function ResourceCard({ resource }) {
  return (
    <Card>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold tracking-tight text-white transition-colors hover:text-white/90">
          {resource.title}
        </h3>

        {resource.description && (
          <p className="text-gray-300 text-sm line-clamp-2">
            {resource.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {resource.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-xs text-gray-500">{resource.category}</span>
          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gray-200 transition-colors hover:text-white"
            >
              View →
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
