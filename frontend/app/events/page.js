'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import EventCard from '../../components/EventCard';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';
import Link from 'next/link';
import { FiPlus, FiFilter } from 'react-icons/fi';

export default function EventsPage() {
  const { isAuthenticated } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiClient.get('/events', {
          params: { type: selectedType },
        });
        setEvents(res.data.events);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-accent-primary text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase mb-2">
              <span className="text-accent-secondary">Hackathons</span> & Events
            </h1>
            <p className="text-gray-400">Challenges, competitions, and learning events</p>
          </div>
          {isAuthenticated && (
            <Link href="/events/create" className="btn-secondary flex items-center gap-2">
              <FiPlus size={20} />
              Create Event
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <div className="space-y-3">
                <h3 className="font-bold uppercase text-sm flex items-center gap-2">
                  <FiFilter size={16} />
                  Event Type
                </h3>
                <button
                  onClick={() => setSelectedType(null)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedType === null
                      ? 'bg-accent-secondary/20 text-accent-secondary'
                      : 'hover:bg-dark-bg'
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
                        ? 'bg-accent-secondary/20 text-accent-secondary'
                        : 'hover:bg-dark-bg'
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
