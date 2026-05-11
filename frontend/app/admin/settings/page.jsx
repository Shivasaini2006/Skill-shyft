'use client';
import { useEffect, useState } from 'react';
import { Save, Settings } from 'lucide-react';
import apiClient from '../../../lib/apiClient';

export default function SettingsManagement() {
  const [settings, setSettings] = useState({
    community_details: { name: '', contact_email: '', logo_url: '' },
    seo: { title: '', description: '' },
    social_links: { github: '', twitter: '', linkedin: '', discord: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/admin/settings');
        const parsedSettings = { ...settings };
        
        // Parse JSON fields from the database
        if (res.data.community_details) {
          parsedSettings.community_details = typeof res.data.community_details === 'string' ? JSON.parse(res.data.community_details) : res.data.community_details;
        }
        if (res.data.seo) {
          parsedSettings.seo = typeof res.data.seo === 'string' ? JSON.parse(res.data.seo) : res.data.seo;
        }
        if (res.data.social_links) {
          parsedSettings.social_links = typeof res.data.social_links === 'string' ? JSON.parse(res.data.social_links) : res.data.social_links;
        }
        
        setSettings(parsedSettings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.post('/admin/settings', settings);
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-2xl"><Settings size={28} className="text-white" /></div>
        <div>
          <h1 className="text-3xl font-bold text-white">Global Settings</h1>
          <p className="mt-1 text-gray-400">Manage community branding, SEO, and links</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Community Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Community Name</label>
              <input value={settings.community_details.name} onChange={e=>handleChange('community_details', 'name', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Contact Email</label>
              <input type="email" value={settings.community_details.contact_email} onChange={e=>handleChange('community_details', 'contact_email', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Logo URL</label>
              <input value={settings.community_details.logo_url} onChange={e=>handleChange('community_details', 'logo_url', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">SEO Configuration</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Meta Title</label>
              <input value={settings.seo.title} onChange={e=>handleChange('seo', 'title', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Meta Description</label>
              <textarea value={settings.seo.description} onChange={e=>handleChange('seo', 'description', e.target.value)} rows={3} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Social Links</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {['github', 'twitter', 'linkedin', 'discord'].map(platform => (
              <div key={platform}>
                <label className="block text-sm text-gray-400 mb-2 capitalize">{platform}</label>
                <input value={settings.social_links[platform]} onChange={e=>handleChange('social_links', platform, e.target.value)} placeholder={`https://${platform}.com/...`} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50">
            <Save size={20} /> {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
