'use client';

import React from 'react';
import Card from './Card.jsx';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

export default function EventCard({ event }) {
  return (
    <div className="bg-gray-900 border-2 border-gray-700 p-8 border-sharp hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 gpu-accelerated">
      <div className="space-y-6">
        <h3 className="text-xl font-black hover:text-gray-300 transition-colors uppercase tracking-tight">
          {event.title}
        </h3>

        <div className="space-y-4 text-base text-gray-400">
          <div className="flex items-center gap-3">
            <FiCalendar size={18} className="text-white" />
            <span className="font-medium">{new Date(event.startDate).toLocaleDateString('en-US')}</span>
          </div>

          {event.location && (
            <div className="flex items-center gap-3">
              <FiMapPin size={18} className="text-white" />
              <span className="font-medium">{event.location}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <FiUsers size={18} className="text-white" />
            <span className="font-medium">{event.participants} / {event.maxParticipants || '∞'} participants</span>
          </div>
        </div>

        <div className="pt-6 border-t-2 border-gray-700">
          <span className="inline-block px-4 py-2 text-xs font-black bg-gray-800 text-white uppercase tracking-wider border border-gray-600">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
