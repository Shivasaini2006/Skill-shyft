'use client';

import React from 'react';
import Card from './Card.jsx';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

export default function EventCard({ event }) {
  return (
    <Card>
      <div className="space-y-3">
        <h3 className="text-lg font-bold hover:text-accent-primary transition">
          {event.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FiCalendar size={16} className="text-accent-primary" />
            <span>{new Date(event.startDate).toLocaleDateString()}</span>
          </div>

          {event.location && (
            <div className="flex items-center gap-2">
              <FiMapPin size={16} className="text-accent-primary" />
              <span>{event.location}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <FiUsers size={16} className="text-accent-primary" />
            <span>{event.participants} / {event.maxParticipants || '∞'} participants</span>
          </div>
        </div>

        <div className="pt-3 border-t border-dark-border">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-accent-secondary/20 text-accent-secondary rounded">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
      </div>
    </Card>
  );
}
