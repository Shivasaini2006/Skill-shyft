'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import useAuthStore from '../../lib/authStore';
import apiClient from '../../lib/apiClient';
import Link from 'next/link';
import { FiEdit2, FiLogOut } from 'react-icons/fi';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-accent-primary text-lg">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p className="text-gray-400">Profile not found.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg"></div>
              <div>
                <h1 className="text-3xl font-black mb-2">{profile.name}</h1>
                <p className="text-gray-400 mb-4">{profile.email}</p>
                {profile.bio && (
                  <p className="text-sm text-gray-300">{profile.bio}</p>
                )}
                <div className="flex gap-6 mt-4 text-sm">
                  <div>
                    <p className="font-bold text-accent-primary">{profile.posts}</p>
                    <p className="text-gray-400">Posts</p>
                  </div>
                  <div>
                    <p className="font-bold text-accent-primary">{profile.followers}</p>
                    <p className="text-gray-400">Followers</p>
                  </div>
                  <div>
                    <p className="font-bold text-accent-primary">{profile.following}</p>
                    <p className="text-gray-400">Following</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link href="/profile/edit" className="btn-primary flex items-center gap-2 text-sm">
                <FiEdit2 size={16} />
                Edit Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="btn-outline flex items-center gap-2 text-sm"
              >
                <FiLogOut size={16} />
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
                <span key={idx} className="px-4 py-2 bg-accent-primary/20 text-accent-primary rounded-full text-sm font-semibold">
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
            <p className="text-2xl font-bold text-accent-primary">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
