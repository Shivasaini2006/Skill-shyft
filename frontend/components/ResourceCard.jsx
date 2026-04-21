'use client';

import React from 'react';
import Card from './Card.jsx';

export default function ResourceCard({ resource }) {
  return (
    <Card>
      <div className="space-y-3">
        <h3 className="text-lg font-bold hover:text-accent-primary transition">
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
              className="px-2 py-1 text-xs bg-accent-secondary/20 text-accent-secondary rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-dark-border">
          <span className="text-xs text-gray-500">{resource.category}</span>
          {resource.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:text-accent-secondary transition text-sm font-semibold"
            >
              View →
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
