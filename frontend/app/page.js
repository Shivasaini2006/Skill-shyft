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
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Logo/Title */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-shadow-strong">
              <span className="text-white">SKILL</span>
              <br />
              <span className="text-white">SHIFT</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide uppercase">
              Shift Your Potential
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Join the modern tech community. Connect with developers, designers, and innovators.
            Share knowledge, build projects, and transform your career.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            {isAuthenticated ? (
              <>
                <Link href="/forum" className="btn-primary text-lg px-12 py-5 group inline-flex items-center gap-3">
                  Explore Forum
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                </Link>
                <Link href="/events" className="btn-outline text-lg px-12 py-5 group inline-flex items-center gap-3">
                  View Events
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/signup" className="btn-primary text-lg px-12 py-5 group inline-flex items-center gap-3">
                  Join SKILL SHIFT
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                </Link>
                <Link href="/login" className="btn-outline text-lg px-12 py-5">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="space-y-3 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <Icon className="text-white mx-auto" size={40} />
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Discussions */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                Trending <span className="text-white">Discussions</span>
              </h2>
              <Link href="/forum" className="btn-secondary text-sm">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trendingPosts.map((post, idx) => (
                <div key={post.id} className="animate-scale-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                Upcoming <span className="text-gray-300">Events</span>
              </h2>
              <Link href="/events" className="btn-secondary text-sm">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, idx) => (
                <div key={event.id} className="animate-scale-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-black border-2 border-white p-16 border-sharp">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                Ready to Shift Your Potential?
              </h2>
              <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                Join thousands of developers and innovators building the future together.
              </p>
              {!isAuthenticated && (
                <Link href="/signup" className="btn-primary inline-block text-lg px-12 py-5 mt-8">
                  Get Started Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
