'use client';

import React from 'react';

export default function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`
        rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl
        transition duration-300 will-change-transform
        ${hover ? 'hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.07]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
