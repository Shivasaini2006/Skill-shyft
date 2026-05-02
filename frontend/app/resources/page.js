'use client';

import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import ResourceCard from '../../components/ResourceCard';
import apiClient from '../../lib/apiClient';
import { Filter } from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resRes, catsRes] = await Promise.all([
          apiClient.get('/resources', { params: { categoryId: selectedCategory } }),
          apiClient.get('/categories'),
        ]);
        setResources(resRes.data.resources || []);
        setCategories(catsRes.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

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
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.05em] text-white mb-3">
            Learning <span className="text-gradient">Resources</span>
          </h1>
          <p className="text-gray-400">Articles, tutorials, and curated learning materials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400 flex items-center gap-2">
                  <Filter size={16} />
                  Categories
                </h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedCategory === null
                      ? 'bg-white/10 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  All Resources
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                      selectedCategory === cat.id
                        ? 'bg-white/10 text-white'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <span className="mr-2 opacity-80">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Resources */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.length === 0 ? (
              <Card className="text-center py-12 md:col-span-2">
                <p className="text-gray-400">No resources found.</p>
              </Card>
            ) : (
              resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
