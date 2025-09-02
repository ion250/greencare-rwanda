import DashboardLayout from '../components/DashboardLayout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

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

// Function to initialize TinyMCE with API key
const initializeTinyMCE = (apiKey: string) => {
  // Create script element for TinyMCE
  const script = document.createElement('script');
  script.src = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/6/tinymce.min.js`;
  script.referrerPolicy = 'origin';
  
  // Add script to document head
  document.head.appendChild(script);
  
  // Return cleanup function
  return () => {
    if (document.head.contains(script)) {
      document.head.removeChild(script);
    }
  };
};

// Function to check if TinyMCE is loaded
const isTinyMCEReady = (): boolean => {
  return !!(window as any).tinymce;
};

export default function ArticleManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [tinymceError, setTinyMCEError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    image: null as File | null,
    imageUrl: ''
  });
  
  const navigate = useNavigate();

  // TinyMCE API Key - Replace with your actual key
  const TINYMCe_API_KEY = '2qggg38dnagje3dzy0p5yu86ltw6jgkt4dkyoqvpo7eet8te'; // Replace with your actual API key

  useEffect(() => {
    // Initialize TinyMCE when component mounts
    const cleanup = initializeTinyMCE(TINYMCe_API_KEY);
    
    // Check if TinyMCE loaded successfully
    const checkTinyMCE = setInterval(() => {
      if (isTinyMCEReady()) {
        setTinyMCEError(null);
        clearInterval(checkTinyMCE);
      } else {
        setTinyMCEError('A valid API key is required to continue using TinyMCE. Please contact the administrator.');
      }
    }, 1000);
    
    // Cleanup
    return () => {
      cleanup();
      clearInterval(checkTinyMCE);
    };
  }, []);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/articles', {
        headers: {
          'Authorization': token
        }
      });

      // Ensure image URLs are properly formatted
      const formattedArticles = response.data.map((article: Article) => ({
        ...article,
        image: article.image ? (article.image.startsWith('http') ? article.image : `http://localhost:5000${article.image}`) : ''
      }));
      
      setArticles(formattedArticles);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to load articles. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContentChange = (content: string) => {
    setFormData({
      ...formData,
      content: content
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      // Validate file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }
      
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file)
      });
      setError(''); // Clear any previous error
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title || !formData.description || !formData.content || !formData.author) {
      setError('Title, description, content, and author are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('authToken');
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('author', formData.author);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (!editingArticle) {
        // Create new article
        await axios.post('http://localhost:5000/api/articles', formDataToSend, {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Update existing article
        await axios.put(`http://localhost:5000/api/articles/${editingArticle._id}`, formDataToSend, {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        content: '',
        author: '',
        image: null,
        imageUrl: ''
      });
      setShowAddArticle(false);
      setEditingArticle(null);
      
      // Refresh article list
      fetchArticles();
    } catch (err: any) {
      console.error('Error saving article:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to save article');
      }
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

  const handleDeleteArticle = async (articleId: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5000/api/articles/${articleId}`, {
        headers: {
          'Authorization': token
        }
      });

      // Remove from local state
      setArticles(articles.filter(article => article._id !== articleId));
    } catch (err) {
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="pt-16">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Article Management</h1>
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="pt-16">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">Article Management</h1>
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
              {error.includes('Admin privileges') && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="pt-16">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Article Management</h1>
              <button
                onClick={openAddArticleModal}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add New Article
              </button>
            </div>

            {/* Add/Edit Article Modal */}
            {showAddArticle && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {editingArticle ? 'Edit Article' : 'Add New Article'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowAddArticle(false);
                          setEditingArticle(null);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                      </div>
                    )}
                    
                    {tinymceError && (
                      <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-md">
                        {tinymceError}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Article Title"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                            Author
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="author"
                            name="author"
                            type="text"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Author Name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                          Description
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Short description"
                          rows={3}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Content
                        </label>
                        {tinymceError ? (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <p className="text-yellow-700">{tinymceError}</p>
                            <p className="text-yellow-600 text-sm mt-2">
                              Please contact your administrator to resolve this issue.
                            </p>
                          </div>
                        ) : (
                          <Editor
                            apiKey={TINYMCe_API_KEY}
                            value={formData.content}
                            onEditorChange={handleContentChange}
                            init={{
                              height: 500,
                              menubar: true,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                              ],
                              toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help'
                            }}
                          />
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Featured Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            {formData.imageUrl ? (
                              <div className="relative">
                                <img
                                  src={formData.imageUrl}
                                  alt="Preview"
                                  className="mx-auto h-32 w-32 object-cover rounded"
                                  onError={(e) => {
                                    // Handle image loading error
                                    (e.target as HTMLImageElement).src = '/path/to/placeholder-image.jpg';
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      image: null,
                                      imageUrl: ''
                                    });
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            ) : (
                              <>
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4 4v8m-12 4h.02"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="image-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="image-upload"
                                      name="image-upload"
                                      type="file"
                                      accept="image/*"
                                      onChange={handleImageChange}
                                      className="sr-only"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end mt-6">
                        <button
                          type="button"
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => {
                            setShowAddArticle(false);
                            setEditingArticle(null);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          disabled={!!tinymceError}
                        >
                          {editingArticle ? 'Update' : 'Create'} Article
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">All Articles</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage articles and content
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article: Article) => (
                      <tr key={article._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{article.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{article.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{article.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {article.image ? (
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="h-10 w-10 object-cover rounded"
                              onError={(e) => {
                                // Handle image loading error
                                (e.target as HTMLImageElement).src = '/path/to/placeholder-image.jpg';
                              }}
                            />
                          ) : (
                            <span className="text-gray-400">No image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}