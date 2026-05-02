'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CalendarPlus } from 'lucide-react';
import Card from '../../../components/Card';
import useAuthStore from '../../../lib/authStore';
import apiClient from '../../../lib/apiClient';

function normalizeDateTimeLocal(value) {
  if (!value) return null;
  // input[type=datetime-local] returns YYYY-MM-DDTHH:mm
  const v = value.includes('T') ? value : value.replace(' ', 'T');
  const [datePart, timePart] = v.split('T');
  if (!datePart || !timePart) return null;
  const timeWithSeconds = timePart.length === 5 ? `${timePart}:00` : timePart;
  return `${datePart} ${timeWithSeconds}`;
}

export default function CreateEventPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const eventTypes = useMemo(() => ['hackathon', 'challenge', 'workshop'], []);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('hackathon');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setError('');
    setSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        type,
        description: description.trim() || null,
        startDate: normalizeDateTimeLocal(startDate),
        endDate: normalizeDateTimeLocal(endDate),
        location: location.trim() || null,
        maxParticipants: maxParticipants ? Number(maxParticipants) : null,
        imageUrl: imageUrl.trim() || null,
      };

      await apiClient.post('/events', payload);
      router.push('/events');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">Events</p>
            <h1 className="text-xl font-semibold tracking-tight text-white">Create event</h1>
          </div>
        </div>

        {!isAuthenticated ? (
          <Card className="text-center py-12">
            <p className="text-gray-300">You need to be logged in to create an event.</p>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Go to Login
              </Link>
            </div>
          </Card>
        ) : (
          <Card>
            <form onSubmit={onSubmit} className="space-y-6">
              {error ? (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Skill Shift Hack Night"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  >
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Max participants
                  </label>
                  <input
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    type="number"
                    min={1}
                    placeholder="Leave empty for ∞"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="What will people do? What should they bring?"
                  className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Start (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    End (optional)
                  </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Location (optional)
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="JB Knowledge Park, Faridabad"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Image URL (optional)
                  </label>
                  <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://…"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Your event will show up under Events.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <CalendarPlus className="h-4 w-4" />
                  {submitting ? 'Creating…' : 'Create'}
                </button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
