'use client';

import React from 'react';

export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        bg-dark-card border border-dark-border rounded-lg p-6
        transition-all duration-300
        ${hover ? 'hover:border-accent-primary hover:shadow-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
