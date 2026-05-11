'use client';
import { useEffect, useState } from 'react';
import { Plus, Megaphone, Trash2, Edit2, X, Pin } from 'lucide-react';
import apiClient from '../../../lib/apiClient';
import RichTextEditor from '../../../components/RichTextEditor';

export default function UpdatesManagement() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', content: '', image_url: '', type: 'general', is_pinned: false
  });

  const fetchUpdates = async () => {
    try {
      const res = await apiClient.get('/admin/updates');
      setUpdates(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUpdates(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/admin/updates', formData);
      setIsModalOpen(false);
      fetchUpdates();
      setFormData({ title: '', content: '', image_url: '', type: 'general', is_pinned: false });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("Are you sure?")) return;
    try {
      await apiClient.delete(`/admin/updates/${id}`);
      fetchUpdates();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Community Updates</h1>
          <p className="mt-2 text-gray-400">Post announcements, notices, and updates</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200">
          <Plus size={18} /> New Update
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {updates.map(update => (
          <div key={update.id} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            {update.is_pinned && <div className="absolute top-4 right-4 text-purple-400"><Pin size={20} /></div>}
            <div className="flex gap-4">
              {update.image_url && <img src={update.image_url} alt="Cover" className="w-20 h-20 object-cover rounded-xl" />}
              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider text-purple-400">{update.type}</span>
                <h3 className="text-xl font-bold text-white mt-1">{update.title}</h3>
                <div className="mt-2 text-sm text-gray-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: update.content }} />
                <div className="mt-4 flex gap-3">
                  <button onClick={() => handleDelete(update.id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/90 p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Post Update</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Type</label>
                  <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white [&>option]:bg-black">
                    <option value="general">General</option>
                    <option value="event">Event</option>
                    <option value="release">Release</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Cover Image URL (Optional)</label>
                <input value={formData.image_url} onChange={e=>setFormData({...formData, image_url: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Content</label>
                <RichTextEditor value={formData.content} onChange={html=>setFormData({...formData, content: html})} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={formData.is_pinned} onChange={e=>setFormData({...formData, is_pinned: e.target.checked})} className="w-5 h-5 rounded border-gray-600 bg-gray-800 focus:ring-purple-500" />
                <label className="text-white">Pin this update</label>
              </div>
              <button type="submit" className="w-full rounded-xl bg-purple-600 p-3 font-semibold text-white hover:bg-purple-700">Publish Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
