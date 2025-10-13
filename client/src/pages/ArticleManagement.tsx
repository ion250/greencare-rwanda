import DashboardLayout from '../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const API_BASE = import.meta.env.VITE_API_BASE;

interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  slug: string;
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
    imageUrl: ''
  });

  const navigate = useNavigate();

  const TINYMCE_API_KEY =
    import.meta.env.VITE_TINYMCE_API_KEY || '2qggg38dnagje3dzy0p5yu86ltw6jgkt4dkyoqvpo7eet8te';

  useEffect(() => {
    fetchArticles();
  }, []);

  // ✅ Fixed Image URL Handling
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) return navigate('/login');

      const res = await axios.get(`${API_BASE}api/articles`, {
        headers: {
          Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
        }
      });

      const formatted = res.data.map((a: Article) => ({
        ...a,
        image: a.image
          ? a.image.startsWith('http')
            ? a.image
            : `${API_BASE.replace(/\/$/, '')}/${a.image.replace(/^\/+/, '')}`
          : ''
      }));

      setArticles(formatted);
    } catch (err: any) {
      if (err.response?.status === 401) navigate('/login');
      else if (err.response?.status === 403)
        setError('Access denied. Admin privileges required.');
      else setError('Failed to load articles.');
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
    Object.entries(formData).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      if (editingArticle) {
        await axios.put(`${API_BASE}api/articles/${editingArticle._id}`, fd, {
          headers: { Authorization: token!, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post(`${API_BASE}api/articles`, fd, {
          headers: { Authorization: token!, 'Content-Type': 'multipart/form-data' }
        });
      }

      setFormData({ title: '', description: '', content: '', author: '', image: null, imageUrl: '' });
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
      imageUrl: article.image || ''
    });
    setShowAddArticle(true);
  };

  const handleDeleteArticle = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE}api/articles/${_id}`, {
        headers: { Authorization: token! }
      });
      setArticles(articles.filter((a) => a._id !== _id));
    } catch {
      setError('Failed to delete article');
    }
  };

  const openAddArticleModal = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      author: '',
      image: null,
      imageUrl: ''
    });
    setShowAddArticle(true);
  };

  const openPreview = (article: Article) => {
    setPreviewArticle(article);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="pt-16">
          <div className="py-6 px-4 max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Article Management</h1>
            <div className="flex justify-center py-12">
              <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pt-16">
        <div className="py-6 px-4 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Article Management</h1>
            <button
              onClick={openAddArticleModal}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
            >
              Add New Article
            </button>
          </div>

          {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48 max-w-60">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                      No articles found.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 line-clamp-2 break-words max-w-60" title={article.title}>
                        {article.title}
                      </td>
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
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium space-y-1">
                        <button
                          onClick={() => openPreview(article)}
                          className="block w-full text-left text-green-600 hover:text-green-900"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="block w-full text-left text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article._id)}
                          className="block w-full text-left text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddArticle && (
        <AddEditArticleModal
          editing={!!editingArticle}
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowAddArticle(false);
            setEditingArticle(null);
          }}
          tinymceApiKey={TINYMCE_API_KEY}
        />
      )}

      {/* Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{previewArticle.title}</h3>
                <button
                  onClick={() => setPreviewArticle(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <p className="text-sm text-gray-600">By {previewArticle.author}</p>
            </div>

            <div className="p-6 space-y-4">
              {previewArticle.image && (
                <img
                  src={previewArticle.image}
                  alt={previewArticle.title}
                  className="w-full h-64 object-cover rounded"
                />
              )}
              <p className="text-gray-700">{previewArticle.description}</p>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: previewArticle.content }}
              />
            </div>

            <div className="p-6 border-t border-gray-200 text-right">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// --- Add/Edit Modal Component ---
function AddEditArticleModal({
  editing,
  formData,
  onChange,
  onSubmit,
  onClose,
  tinymceApiKey
}: {
  editing: boolean;
  formData: FormData;
  onChange: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  tinymceApiKey: string;
}) {
  const removeImage = () => {
    onChange((prev) => ({ ...prev, image: null, imageUrl: '' }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {editing ? 'Edit Article' : 'Add New Article'}
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Max 100 characters"
                maxLength={100}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, author: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Author name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Short summary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <Editor
              apiKey={tinymceApiKey}
              value={formData.content}
              onEditorChange={(content: string) =>
                onChange((prev) => ({ ...prev, content }))
              }
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'print',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'paste',
                  'help',
                  'wordcount'
                ],
                toolbar: `
                  undo redo | formatselect | bold italic backcolor |
                  alignleft aligncenter alignright alignjustify |
                  bullist numlist outdent indent |
                  link image media table | code fullscreen | help
                `,
                branding: false,
                statusbar: true
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {formData.imageUrl ? (
                <div className="relative inline-block">
                  <img src={formData.imageUrl} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                   <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <label
                    htmlFor="file-upload"
                    className="mt-2 block text-bold text-sm text-gray-600 font-medium text-green-600 hover:text-green-500"
                  >
                    Upload an image
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange((prev) => ({
                          ...prev,
                          image: file,
                          imageUrl: URL.createObjectURL(file)
                        }));
                      }
                    }}
                    className="hidden"
                  />
                </div>
                
              )} <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>

            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editing ? 'Update Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
