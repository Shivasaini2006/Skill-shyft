'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon } from 'lucide-react';
import apiClient from '../../../lib/apiClient';

export default function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    bio: '',
    avatar_url: '',
    skills: '', // stored as string in UI, comma-separated
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    portfolio_url: '',
    is_active: true,
    is_featured: false
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await apiClient.get('/admin/team');
      setTeam(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const filteredTeam = team.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '', role: '', email: '', bio: '', avatar_url: '',
      skills: '', github_url: '', linkedin_url: '', twitter_url: '', portfolio_url: '',
      is_active: true, is_featured: false
    });
    setImagePreview(null);
    setEditingId(null);
    setError(null);
  };

  const handleOpenEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email || '',
      bio: member.bio || '',
      avatar_url: member.avatar_url || '',
      skills: Array.isArray(member.skills) ? member.skills.join(', ') : '',
      github_url: member.github_url || '',
      linkedin_url: member.linkedin_url || '',
      twitter_url: member.twitter_url || '',
      portfolio_url: member.portfolio_url || '',
      is_active: member.is_active,
      is_featured: member.is_featured
    });
    setImagePreview(member.avatar_url || null);
    setEditingId(member.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await apiClient.delete(`/admin/team/${id}`);
      fetchTeam();
    } catch (err) {
      console.error(err);
      alert("Failed to delete team member");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setError(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;
          
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height / width) * maxDimension;
              width = maxDimension;
            } else {
              width = (width / height) * maxDimension;
              height = maxDimension;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setFormData((prev) => ({ ...prev, avatar_url: compressedBase64 }));
          setImagePreview(compressedBase64);
        };
        img.onerror = () => setError('Failed to load image');
        img.src = event.target.result;
      };
      reader.onerror = () => setError('Failed to read file');
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : []
      };

      if (editingId) {
        await apiClient.put(`/admin/team/${editingId}`, payload);
      } else {
        await apiClient.post('/admin/team', payload);
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchTeam();
    } catch (err) {
      console.error(err);
      setError("Failed to save team member");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-gray-400 mt-1">Manage core team members, their roles, and social profiles.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
        />
      </div>

      {loading ? (
        <div className="text-white">Loading team members...</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-white/5 text-xs uppercase text-gray-500 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-semibold">Member</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Skills</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredTeam.length > 0 ? (
                  filteredTeam.map((member) => (
                    <tr key={member.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                        {member.avatar_url ? (
                          <img src={member.avatar_url} alt={member.name} className="h-10 w-10 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold border border-purple-500/30">
                            {member.name.charAt(0)}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span>{member.name}</span>
                          <span className="text-xs text-gray-500 font-normal">{member.email || 'No email'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span>{member.role}</span>
                          {member.is_featured && <span className="text-xs text-yellow-400 mt-0.5">Featured</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {Array.isArray(member.skills) && member.skills.map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${member.is_active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-end gap-3 h-[72px]">
                        <button onClick={() => handleOpenEdit(member)} className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-blue-500/10 rounded-lg">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-10 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-3 md:w-1/3">
                  <div className="relative h-32 w-32 rounded-full border-2 border-dashed border-white/20 overflow-hidden bg-white/5 flex items-center justify-center group">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-gray-500" />
                    )}
                    <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-xs font-medium text-white">Upload</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                  {imagePreview && (
                    <button type="button" onClick={() => { setImagePreview(null); setFormData(p => ({...p, avatar_url: ''})); }} className="text-xs text-red-400 hover:text-red-300">
                      Remove Image
                    </button>
                  )}
                  <p className="text-[10px] text-gray-500 text-center px-4">Images are automatically compressed and optimized.</p>
                </div>

                {/* Main Info */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                      <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500" placeholder="Lead Developer" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Skills (Comma separated)</label>
                    <input type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500" placeholder="React, Node.js, UI/UX" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500 min-h-[80px]" placeholder="Short bio..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
                  <input type="url" value={formData.github_url} onChange={(e) => setFormData({...formData, github_url: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500 text-sm" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn URL</label>
                  <input type="url" value={formData.linkedin_url} onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500 text-sm" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Twitter URL</label>
                  <input type="url" value={formData.twitter_url} onChange={(e) => setFormData({...formData, twitter_url: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500 text-sm" placeholder="https://twitter.com/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Portfolio URL</label>
                  <input type="url" value={formData.portfolio_url} onChange={(e) => setFormData({...formData, portfolio_url: e.target.value})} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-purple-500 text-sm" placeholder="https://..." />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 pb-2 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                <label className="flex items-center gap-2 text-sm text-gray-200 cursor-pointer font-medium">
                  <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="rounded bg-black border-white/20 text-purple-500 h-4 w-4" />
                  Active Member
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-200 cursor-pointer font-medium">
                  <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} className="rounded bg-black border-white/20 text-purple-500 h-4 w-4" />
                  Featured Member
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0a]">
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 transition-colors disabled:opacity-50">
                  {submitting ? 'Saving...' : editingId ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
