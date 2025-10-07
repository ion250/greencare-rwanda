import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
const API_BASE = import.meta.env.VITE_API_BASE;
interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
  readAt?: string;
  repliedAt?: string;
}

export default function MessageManagement() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get(`${API_BASE}/api/messages`, {
        headers: {
          'Authorization': token
        }
      });

      setMessages(response.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to load messages. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Removed unused response variable
      await axios.put(
        `${API_BASE}/api/messages/${id}/read`,
        {},
        {
          headers: {
            'Authorization': token
          }
        }
      );

      // Update local state
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, status: 'read', readAt: new Date().toISOString() } : msg
      ));

      // If this message is selected, update it too
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'read', readAt: new Date().toISOString() });
      }
    } catch (err) {
      setError('Failed to update message status');
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Removed unused response variable
      await axios.put(
        `${API_BASE}/api/messages/${id}/replied`,
        {},
        {
          headers: {
            'Authorization': token
          }
        }
      );

      // Update local state
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, status: 'replied', repliedAt: new Date().toISOString() } : msg
      ));

      // If this message is selected, update it too
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'replied', repliedAt: new Date().toISOString() });
      }
    } catch (err) {
      setError('Failed to update message status');
    }
  };

  const deleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(
      `${API_BASE}/api/messages/${id}`,
        {
          headers: {
            'Authorization': token
          }
        }
      );

      // Remove from local state
      setMessages(messages.filter(m => m._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError('Failed to delete message');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Message Management</h1>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Message Management</h1>
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Message Management</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Messages List */}
            <div className="lg:w-3/4 flex-1">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">All Messages</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {messages.map((message) => (
                        <tr key={message._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{message.name}</div>
                            <div className="text-sm text-gray-500">{message.email}</div>
                            <div className="text-sm text-gray-500">{message.phone}</div>
                          </td>
                          <td className="px-6 py-4 max-w-lg">
                            <div className="text-sm text-gray-900 line-clamp-3">{message.message}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(message.status)}`}>
                              {message.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(message.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedMessage(message)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              View
                            </button>
                            {message.status !== 'replied' && (
                              <button
                                onClick={() => markAsReplied(message._id)}
                                className="text-green-600 hover:text-green-900 mr-4"
                              >
                                Mark Replied
                              </button>
                            )}
                            {message.status !== 'read' && (
                              <button
                                onClick={() => markAsRead(message._id)}
                                className="text-yellow-600 hover:text-yellow-900 mr-4"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(message._id)}
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

            {/* Message Details */}
            {selectedMessage && (
              <div className="lg:w-1/2 flex-1">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Message Details</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedMessage.status)}`}>
                        {selectedMessage.status}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900">{selectedMessage.name}</h3>
                      <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                      <p className="text-sm text-gray-500">{selectedMessage.phone}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Message:</h4>
                      <p className="text-gray-700 whitespace-pre-line">{selectedMessage.message}</p>
                    </div>
                    
                    <div className="flex space-x-4">
                      {selectedMessage.status !== 'replied' && (
                        <button
                          onClick={() => markAsReplied(selectedMessage._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                          Mark Replied
                        </button>
                      )}
                      {selectedMessage.status !== 'read' && (
                        <button
                          onClick={() => markAsRead(selectedMessage._id)}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}