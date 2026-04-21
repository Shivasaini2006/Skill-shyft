'use client';

import Link from 'next/link';
import { FiArrowRight, FiGitBranch, FiTrendingUp, FiUsers, FiCode } from 'react-icons/fi';
import Card from '../components/Card';
import PostCard from '../components/PostCard';
import EventCard from '../components/EventCard';
import useAuthStore from '../lib/authStore';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  // Mock data
  const trendingPosts = [
    {
      id: 1,
      title: 'Building Scalable APIs with Node.js and Express',
      content: 'Learn how to build production-ready APIs that can handle millions of requests...',
      category: 'Web Dev',
      views: 1200,
      likes: 342,
      comments: 45,
      author: { name: 'John Dev', avatar: null },
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'AI & Machine Learning: Getting Started in 2024',
      content: 'A comprehensive guide to machine learning fundamentals and practical applications...',
      category: 'AI & ML',
      views: 2100,
      likes: 856,
      comments: 123,
      author: { name: 'Sarah AI', avatar: null },
      createdAt: new Date(),
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Web Dev Hackathon 2024',
      type: 'hackathon',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'San Francisco, CA',
      participants: 245,
      maxParticipants: 500,
    },
    {
      id: 2,
      title: 'AI Innovation Challenge',
      type: 'challenge',
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      location: 'Virtual',
      participants: 512,
      maxParticipants: 1000,
    },
  ];

  const stats = [
    { label: 'Active Members', value: '12.5K', icon: FiUsers },
    { label: 'Discussions', value: '45.2K', icon: FiGitBranch },
    { label: 'Growth Rate', value: '+23%', icon: FiTrendingUp },
    { label: 'Projects', value: '3.8K', icon: FiCode },
  ];

  return (
    <div className="bg-dark-bg">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fadeIn">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
              <span className="text-white">SKILL </span>
              <span className="text-accent-primary">SHIFT</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide">
              Shift Your Potential
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join the modern tech community. Connect with developers, designers, and innovators.
            Share knowledge, build projects, and transform your career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {isAuthenticated ? (
              <>
                <Link href="/forum" className="btn-primary text-lg px-8 py-3 group inline-flex items-center gap-2">
                  Explore Forum
                  <FiArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
                <Link href="/events" className="btn-outline text-lg px-8 py-3 group inline-flex items-center gap-2">
                  View Events
                  <FiArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="btn-primary text-lg px-8 py-3 group inline-flex items-center gap-2">
                  Join SKILL SHIFT
                  <FiArrowRight className="group-hover:translate-x-1 transition" />
                </Link>
                <Link href="/login" className="btn-outline text-lg px-8 py-3">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="space-y-2">
                  <Icon className="text-accent-primary mx-auto" size={32} />
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Discussions */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black uppercase tracking-tight">
              Trending <span className="text-accent-primary">Discussions</span>
            </h2>
            <Link href="/forum" className="btn-outline text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-black uppercase tracking-tight">
              Upcoming <span className="text-accent-secondary">Events</span>
            </h2>
            <Link href="/events" className="btn-outline text-sm">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border-accent-primary/50 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black uppercase">
              Ready to Shift Your Potential?
            </h2>
            <p className="text-lg text-gray-300">
              Join thousands of developers and innovators building the future together.
            </p>
            {!isAuthenticated && (
              <Link href="/signup" className="btn-primary inline-block text-lg px-8 py-3">
                Get Started Now
              </Link>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
