'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import Card from './Card.jsx';

export default function EventCard({ event }) {
  return (
    <Card className="h-full">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold tracking-tight text-white transition-colors hover:text-white/90">
          {event.title}
        </h3>

        <div className="space-y-4 text-base text-gray-400">
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-gray-200" />
            <span className="font-medium">{new Date(event.startDate).toLocaleDateString('en-US')}</span>
          </div>

          {event.location && (
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-gray-200" />
              <span className="font-medium">{event.location}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Users size={18} className="text-gray-200" />
            <span className="font-medium">{event.participants} / {event.maxParticipants || '∞'} participants</span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200">
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
      </div>
    </Card>
  );
}
