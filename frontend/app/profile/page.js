'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';
import Link from 'next/link';
import { Edit3, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await apiClient.get(`/users/${user.id}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 flex items-center justify-center">
        <div className="animate-pulse text-gray-300 text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black pt-28 flex items-center justify-center">
        <Card>
          <p className="text-gray-400">Profile not found.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-24 w-24 rounded-3xl border border-white/10 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-3xl font-semibold text-white">
                  {(profile.name || 'U').slice(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-black tracking-[-0.04em] text-white mb-2">{profile.name}</h1>
                <p className="text-gray-400 mb-4">{profile.email}</p>
                {profile.bio && (
                  <p className="text-sm text-gray-300">{profile.bio}</p>
                )}
                <div className="flex gap-6 mt-4 text-sm">
                  <div>
                    <p className="font-bold text-white">{profile.posts}</p>
                    <p className="text-gray-400">Posts</p>
                  </div>
                  <div>
                    <p className="font-bold text-white">{profile.followers}</p>
                    <p className="text-gray-400">Followers</p>
                  </div>
                  <div>
                    <p className="font-bold text-white">{profile.following}</p>
                    <p className="text-gray-400">Following</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-2xl transition-transform hover:-translate-y-0.5"
              >
                <Edit3 size={16} />
                Edit Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </Card>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <Card className="mb-8">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                <span key={idx} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-200">
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Member Since */}
        <Card>
          <div className="text-center">
            <p className="text-gray-400">Member since</p>
            <p className="text-2xl font-bold text-white">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
