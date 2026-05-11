'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, FolderGit2, Activity } from 'lucide-react';
import apiClient from '../../lib/apiClient';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiClient.get('/admin/dashboard');
        setStats(response.data.stats);
        setActivities(response.data.recentActivities);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="text-white">Loading dashboard...</div>;
  }

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-400' },
    { label: 'Total Blogs', value: stats?.totalBlogs || 0, icon: FileText, color: 'text-green-400' },
    { label: 'Total Projects', value: stats?.totalProjects || 0, icon: FolderGit2, color: 'text-purple-400' },
    { label: 'Core Team', value: stats?.totalTeam || 0, icon: Activity, color: 'text-orange-400' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Welcome to the Skill Shift administration panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`rounded-xl bg-white/5 p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activities</h2>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-white">{activity.action} - <span className="font-semibold">{activity.entity_type}</span></p>
                  <p className="text-xs text-gray-400">By {activity.user_name || 'System'}</p>
                </div>
                <span className="text-xs text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No recent activities found.</p>
        )}
      </div>
    </div>
  );
}
