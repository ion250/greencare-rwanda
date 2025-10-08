import { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
// Import DashboardLayout
import DashboardLayout from './DashboardLayout';

interface PublishedDocument {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AdminPublishedDocuments() {
  const [documents, setDocuments] = useState<PublishedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<PublishedDocument | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.get(`${API_BASE}api/documents`, config);
      
      // Sort by creation date (newest first)
      const sortedDocs = response.data.documents.sort((a: PublishedDocument, b: PublishedDocument) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setDocuments(sortedDocs);
    } catch (err: any) {
      console.error('Error fetching documents:', err);
      setError(err.response?.data?.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
    setPreviewUrl(null);
    setEditingDoc(null);
    setError('');
  };

  const openModal = (doc?: PublishedDocument) => {
    if (doc) {
      setEditingDoc(doc);
      setTitle(doc.title);
      setDescription(doc.description);
      setPreviewUrl(doc.fileUrl);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (!description.trim()) {
      setError('Description is required');
      return false;
    }
    
    if (!file && !editingDoc) {
      setError('PDF file is required');
      return false;
    }
    
    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return false;
    }
    
    if (file && file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size cannot exceed 10MB');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      if (file) {
        formData.append('file', file);
      }

      const config = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editingDoc) {
        // Update existing document
        const result = await axios.put(
          `${API_BASE}api/documents/${editingDoc._id}`,
          formData,
          config
        );
        
        if (result.data.success) {
          setDocuments(prev => prev.map(doc => 
            doc._id === editingDoc._id ? result.data.updatedDocument : doc
          ));
        } else {
          setError(result.data.message || 'Failed to update document');
          return;
        }
      } else {
        // Create new document
        const result = await axios.post(
          `${API_BASE}api/documents`,
          formData,
          config
        );
        
        if (result.data.success) {
          setDocuments(prev => [result.data.document, ...prev]);
        } else {
          setError(result.data.message || 'Failed to create document');
          return;
        }
      }

      // Refresh the list and close modal
      fetchDocuments();
      closeModal();
    } catch (err: any) {
      console.error('Error saving document:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };

      const result = await axios.delete(`${API_BASE}api/documents/${id}`, config);
      
      if (result.data.success) {
        // Remove from local state
        setDocuments(prev => prev.filter(doc => doc._id !== id));
      } else {
        setError(result.data.message || 'Failed to delete document');
      }
    } catch (err: any) {
      console.error('Error deleting document:', err);
      setError(err.response?.data?.message || 'An unexpected error occurred');
    }
  };

  // Function to get full file URL
  const getFullFileUrl = (fileUrl: string) => {
    if (!fileUrl) return '';
    
    // If the URL already includes the protocol, return as-is
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
      return fileUrl;
    }
    
    // Otherwise, prepend the server URL
    return `${API_BASE}${fileUrl}`;
  };

  return (
    <DashboardLayout>
      
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-green-800">Published Documents Management</h1>
            <button
              onClick={() => openModal()}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Document
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No documents found</h3>
                  <p className="mt-1 text-gray-500">Get started by adding your first published document.</p>
                  <button
                    onClick={() => openModal()}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Add Document
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr key={doc._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                                <div className="text-sm text-gray-500">PDF Document</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 line-clamp-2">{doc.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(doc.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(doc.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <a
                                href={getFullFileUrl(doc.fileUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-900 px-3 py-1 rounded hover:bg-green-50"
                              >
                                View
                              </a>
                              <button
                                onClick={() => openModal(doc)}
                                className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded hover:bg-blue-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(doc._id)}
                                className="text-red-600 hover:text-red-900 px-3 py-1 rounded hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingDoc ? 'Edit Document' : 'Add New Document'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {error && (
                    <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter document title"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter document description"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                      PDF File *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {previewUrl ? (
                          <div className="space-y-4">
                            <div className="flex justify-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {file ? file.name : 'Document ready for upload'}
                            </div>
                            <div className="flex justify-center space-x-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setFile(null);
                                  setPreviewUrl(null);
                                }}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                              {!editingDoc && (
                                <button
                                  type="button"
                                  onClick={() => document.getElementById('fileInput')?.click()}
                                  className="text-green-600 hover:text-green-800 text-sm"
                                >
                                  Change
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4 4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="fileInput"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                              >
                                <span>Upload a PDF file</span>
                                <input
                                  id="fileInput"
                                  name="fileInput"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf"
                                  onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PDF up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6 border-t">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      {editingDoc ? 'Update Document' : 'Create Document'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}