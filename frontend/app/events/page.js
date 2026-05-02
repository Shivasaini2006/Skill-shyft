'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import EventCard from '../../components/EventCard';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';
import Link from 'next/link';
import { Filter, Plus } from 'lucide-react';

export default function EventsPage() {
  const { isAuthenticated } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/events', {
          params: { type: selectedType },
        });
        setEvents(res.data.events || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedType]);

  const eventTypes = ['hackathon', 'challenge', 'workshop'];

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 flex items-center justify-center">
        <div className="animate-pulse text-gray-300 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-white mb-3">
              <span className="text-gradient">Hackathons</span> & Events
            </h1>
            <p className="text-gray-400">Challenges, competitions, and learning events</p>
          </div>
          {isAuthenticated && (
            <Link
              href="/events/create"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              Create Event
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 flex items-center gap-2">
                  <Filter size={16} />
                  Event Type
                </h3>
                <button
                  onClick={() => setSelectedType(null)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedType === null
                      ? 'bg-white/10 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  All Events
                </button>
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded transition text-sm capitalize ${
                      selectedType === type
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Events */}
          <div className="md:col-span-3 space-y-6">
            {events.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-gray-400">No events found. Check back soon!</p>
              </Card>
            ) : (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
