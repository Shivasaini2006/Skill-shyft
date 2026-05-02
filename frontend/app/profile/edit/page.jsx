'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../../../components/Card';
import useAuthStore from '../../../lib/authStore';
import apiClient from '../../../lib/apiClient';

function parseCommaList(value) {
  return (value || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, setUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [skills, setSkills] = useState('');

  const skillsPreview = useMemo(() => parseCommaList(skills).slice(0, 12), [skills]);

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await apiClient.get(`/users/${user.id}`);
        if (!active) return;

        const data = res.data;
        setName(data?.name || user.name || '');
        setBio(data?.bio || '');
        setAvatarUrl(data?.avatarUrl || '');
        setSkills((data?.skills || []).join(', '));
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        if (active) setError('Failed to load profile.');
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      active = false;
    };
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    setError('');
    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        bio: bio.trim() || null,
        avatarUrl: avatarUrl.trim() || null,
        skills: parseCommaList(skills),
      };

      await apiClient.put('/users/profile/update', payload);

      setUser({
        ...user,
        name: payload.name,
        bio: payload.bio,
        avatarUrl: payload.avatarUrl,
        skills: payload.skills,
      });

      router.push('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 flex items-center justify-center">
        <div className="animate-pulse text-gray-300 text-lg">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">Profile</p>
            <h1 className="text-xl font-semibold tracking-tight text-white">Edit</h1>
          </div>
        </div>

        {!isAuthenticated ? (
          <Card className="text-center py-12">
            <p className="text-gray-300">You need to be logged in to edit your profile.</p>
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
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Bio (optional)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                  placeholder="What are you building? What do you care about?"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Avatar URL (optional)
                  </label>
                  <input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                    placeholder="https://…"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Skills (comma separated)
                  </label>
                  <input
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-white/20 focus:ring-1 focus:ring-white/10"
                    placeholder="react, node, mysql"
                  />

                  {skillsPreview.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {skillsPreview.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Changes save instantly to your profile.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  <Save className="h-4 w-4" />
                  {submitting ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
