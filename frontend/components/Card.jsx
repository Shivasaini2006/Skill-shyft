'use client';

import React from 'react';

export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        bg-gray-900 border-2 border-gray-700 p-8 border-sharp
        transition-all duration-300 gpu-accelerated
        ${hover ? 'hover:bg-gray-800 hover:border-gray-600 hover:shadow-strong' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
