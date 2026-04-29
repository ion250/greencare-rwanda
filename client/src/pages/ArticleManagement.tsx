import DashboardLayout from '../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

// All 17 UN SDGs
const SDG_LIST = [
  { id: 1, name: 'No Poverty', color: 'bg-red-600' },
  { id: 2, name: 'Zero Hunger', color: 'bg-orange-500' },
  { id: 3, name: 'Good Health and Well-being', color: 'bg-green-500' },
  { id: 4, name: 'Quality Education', color: 'bg-red-500' },
  { id: 5, name: 'Gender Equality', color: 'bg-orange-600' },
  { id: 6, name: 'Clean Water and Sanitation', color: 'bg-cyan-500' },
  { id: 7, name: 'Affordable and Clean Energy', color: 'bg-yellow-500' },
  { id: 8, name: 'Decent Work and Economic Growth', color: 'bg-red-700' },
  { id: 9, name: 'Industry, Innovation and Infrastructure', color: 'bg-orange-700' },
  { id: 10, name: 'Reduced Inequalities', color: 'bg-pink-600' },
  { id: 11, name: 'Sustainable Cities and Communities', color: 'bg-orange-400' },
  { id: 12, name: 'Responsible Consumption and Production', color: 'bg-yellow-600' },
  { id: 13, name: 'Climate Action', color: 'bg-green-600' },
  { id: 14, name: 'Life Below Water', color: 'bg-blue-600' },
  { id: 15, name: 'Life on Land', color: 'bg-green-700' },
  { id: 16, name: 'Peace, Justice and Strong Institutions', color: 'bg-blue-700' },
  { id: 17, name: 'Partnerships for the Goals', color: 'bg-navy-600' }
];

interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  slug: string;
  sdgs: string[];
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  title: string;
  description: string;
  content: string;
  author: string;
  image: File | null;
  imageUrl: string;
  sdgs: string[];
}

export default function ArticleManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    author: '',
    image: null,
    imageUrl: '',
    sdgs: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) return navigate('/login');

      const res = await axios.get(`${API_BASE.replace(/\/$/, '')}/api/articles`, {
        headers: { Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}` }
      });

      if (!res.data.success) {
        setError('Failed to fetch articles from server.');
        setArticles([]);
        return;
      }

      const formatted = res.data.articles.map((a: Article) => ({
        ...a,
        sdgs: a.sdgs || [],
        image: a.image
          ? a.image.startsWith('http')
            ? a.image
            : `${API_BASE.replace(/\/$/, '')}/${a.image.replace(/^\/+/, '')}`
          : ''
      }));

      setArticles(formatted);
    } catch (err: any) {
      console.error('Error fetching articles:', err);
      if (err.response?.status === 401) navigate('/login');
      else if (err.response?.status === 403)
        setError('Access denied. Admin privileges required.');
      else setError('Failed to load articles.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) return setError('Title is required'), false;
    if (!formData.description.trim()) return setError('Description is required'), false;
    if (!formData.content.trim()) return setError('Content is required'), false;
    if (!formData.author.trim()) return setError('Author is required'), false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const token = localStorage.getItem('authToken');
    const fd = new FormData();
    fd.append('title', formData.title);
    fd.append('description', formData.description);
    fd.append('content', formData.content);
    fd.append('author', formData.author);
    if (formData.image) {
      fd.append('image', formData.image);
    }

    fd.append('sdgs', JSON.stringify(formData.sdgs));

    try {
      if (editingArticle) {
        await axios.put(`${API_BASE.replace(/\/$/, '')}/api/articles/${editingArticle._id}`, fd, {
          headers: { Authorization: token!, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_BASE.replace(/\/$/, '')}/api/articles`, fd, {
          headers: { Authorization: token!, 'Content-Type': 'multipart/form-data' }
        });
      }

      setFormData({ title: '', description: '', content: '', author: '', image: null, imageUrl: '', sdgs: [] });
      setShowAddArticle(false);
      setEditingArticle(null);
      fetchArticles();
    } catch (err: any) {
      console.error('Error saving article:', err);
      setError(err.response?.data?.message || 'Failed to save article.');
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      author: article.author,
      image: null,
      imageUrl: article.image || '',
      sdgs: article.sdgs || []
    });
    setShowAddArticle(true);
  };

  const handleDeleteArticle = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE.replace(/\/$/, '')}/api/articles/${_id}`, {
        headers: { Authorization: token! }
      });
      setArticles(articles.filter((a) => a._id !== _id));
    } catch {
      setError('Failed to delete article');
    }
  };

  const openAddArticleModal = () => {
    setEditingArticle(null);
    setFormData({ title: '', description: '', content: '', author: '', image: null, imageUrl: '', sdgs: [] });
    setShowAddArticle(true);
  };

  const openPreview = (article: Article) => setPreviewArticle(article);

  const toggleSDG = (sdgId: string) => {
    setFormData(prev => ({
      ...prev,
      sdgs: prev.sdgs.includes(sdgId)
        ? prev.sdgs.filter(id => id !== sdgId)
        : [...prev.sdgs, sdgId]
    }));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="pt-16 py-6 px-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Article Management</h1>
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-green-600 rounded-full"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pt-16 py-6 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Article Management</h1>
          <button onClick={openAddArticleModal} className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md shadow-sm">
            Add New Article
          </button>
        </div>

        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48 max-w-60">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">Author</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-40">SDGs</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">Created</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No articles found.</td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 line-clamp-2 break-words max-w-60" title={article.title}>{article.title}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{article.author}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-10 w-10 object-cover rounded border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                          }}
                        />
                      ) : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {article.sdgs && article.sdgs.length > 0 ? (
                          article.sdgs.map((sdgId) => {
                            const sdg = SDG_LIST.find(s => s.id.toString() === sdgId);
                            return sdg ? (
                              <span
                                key={sdgId}
                                className={`${sdg.color} text-white text-xs px-2 py-1 rounded font-semibold`}
                                title={sdg.name}
                              >
                                {sdg.id}
                              </span>
                            ) : null;
                          })
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4 text-sm font-medium space-y-1">
                      <button onClick={() => openPreview(article)} className="block w-full text-left text-green-600 hover:text-green-900">View</button>
                      <button onClick={() => handleEditArticle(article)} className="block w-full text-left text-blue-600 hover:text-blue-900">Edit</button>
                      <button onClick={() => handleDeleteArticle(article._id)} className="block w-full text-left text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddArticle && (
        <AddEditArticleModal
          editing={!!editingArticle}
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onClose={() => { setShowAddArticle(false); setEditingArticle(null); }}
          toggleSDG={toggleSDG}
        />
      )}

      {/* Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{previewArticle.title}</h3>
              <button onClick={() => setPreviewArticle(null)} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              {previewArticle.image && <img src={previewArticle.image} alt={previewArticle.title} className="w-full h-64 object-cover rounded" />}
              <p className="text-gray-700">{previewArticle.description}</p>
              <div className="prose max-w-none whitespace-pre-line">{previewArticle.content}</div>
            </div>
            <div className="p-6 border-t border-gray-200 text-right">
              <button onClick={() => setPreviewArticle(null)} className="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// --- REDESIGNED Add/Edit Modal Component ---
function AddEditArticleModal({
  editing,
  formData,
  onChange,
  onSubmit,
  onClose,
  toggleSDG
}: {
  editing: boolean;
  formData: FormData;
  onChange: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  toggleSDG: (sdgId: string) => void;
}) {
  const removeImage = () => onChange((prev) => ({ ...prev, image: null, imageUrl: '' }));

  const SDG_LIST = [
    { id: 1, name: 'No Poverty', color: 'bg-red-600' },
    { id: 2, name: 'Zero Hunger', color: 'bg-orange-500' },
    { id: 3, name: 'Good Health and Well-being', color: 'bg-green-500' },
    { id: 4, name: 'Quality Education', color: 'bg-red-500' },
    { id: 5, name: 'Gender Equality', color: 'bg-orange-600' },
    { id: 6, name: 'Clean Water and Sanitation', color: 'bg-cyan-500' },
    { id: 7, name: 'Affordable and Clean Energy', color: 'bg-yellow-500' },
    { id: 8, name: 'Decent Work and Economic Growth', color: 'bg-red-700' },
    { id: 9, name: 'Industry, Innovation and Infrastructure', color: 'bg-orange-700' },
    { id: 10, name: 'Reduced Inequalities', color: 'bg-pink-600' },
    { id: 11, name: 'Sustainable Cities and Communities', color: 'bg-orange-400' },
    { id: 12, name: 'Responsible Consumption and Production', color: 'bg-yellow-600' },
    { id: 13, name: 'Climate Action', color: 'bg-green-600' },
    { id: 14, name: 'Life Below Water', color: 'bg-blue-600' },
    { id: 15, name: 'Life on Land', color: 'bg-green-700' },
    { id: 16, name: 'Peace, Justice and Strong Institutions', color: 'bg-blue-700' },
    { id: 17, name: 'Partnerships for the Goals', color: 'bg-indigo-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{editing ? 'Edit Article' : 'Add New Article'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => onChange(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter article title"
                  maxLength={100}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => onChange(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Author name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Summary</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => onChange(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Brief summary for listings and SEO"
                required
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Article Content</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => onChange(prev => ({ ...prev, content: e.target.value }))}
                rows={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Write your article content here. Use line breaks for paragraphs."
                required
              />
              <p className="text-xs text-gray-500 mt-2">Plain text only. Press Enter for new paragraph.</p>
            </div>
          </div>

          {/* SDG Selection */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Sustainable Development Goals (SDGs)</h4>
            <p className="text-sm text-gray-600 mb-3">Select all SDGs that apply to your article</p>
            <div className="flex flex-wrap gap-2">
              {SDG_LIST.map((sdg) => {
                const isSelected = formData.sdgs.includes(sdg.id.toString());
                return (
                  <button
                    key={sdg.id}
                    type="button"
                    onClick={() => toggleSDG(sdg.id.toString())}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${sdg.color} border-${sdg.color.replace('bg-', '')} text-white`
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="font-bold text-sm">{sdg.id}</span>
                    <span className="text-xs font-medium hidden sm:inline">{sdg.name}</span>
                    {isSelected && <span className="ml-1">✓</span>}
                  </button>
                );
              })}
            </div>
            {formData.sdgs.length > 0 && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 font-medium mb-2">Selected SDGs:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.sdgs.map((sdgId) => {
                    const sdg = SDG_LIST.find(s => s.id.toString() === sdgId);
                    return sdg ? (
                      <span
                        key={sdgId}
                        className={`${sdg.color} text-white text-xs px-3 py-1 rounded-full font-semibold`}
                      >
                        {sdg.id}. {sdg.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Featured Image</h4>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition">
              {formData.imageUrl ? (
                <div className="relative inline-block">
                  <img src={formData.imageUrl} alt="Preview" className="h-40 w-40 object-cover rounded-lg shadow-md" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="block text-sm font-medium text-green-600 cursor-pointer hover:text-green-700"
                    >
                      <span>Upload an image</span>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(prev => ({ ...prev, image: file, imageUrl: URL.createObjectURL(file) }));
                        }}
                        className="sr-only"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, or GIF (max 10MB)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-md hover:shadow-lg"
            >
              {editing ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}