import { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

interface Partner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function PartnerManagement() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await axios.get('http://localhost:5000/api/partners', {
        headers: {
          'Authorization': token
        }
      });

      setPartners(response.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to load partners. Please try again later.');
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

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      website: '',
      description: ''
    });
    setIsEditing(false);
    setSelectedPartner(null);
  };

  const openForm = (partner?: Partner) => {
    if (partner) {
      setIsEditing(true);
      setSelectedPartner(partner);
      setFormData({
        name: partner.name,
        logo: partner.logo,
        website: partner.website || '',
        description: partner.description || ''
      });
    } else {
      setIsEditing(false);
      resetForm();
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      };

      if (isEditing && selectedPartner) {
        // Update existing partner
        const response = await axios.put(
          `http://localhost:5000/api/partners/${selectedPartner._id}`,
          formData,
          config
        );
        
        setPartners(partners.map(p => p._id === selectedPartner._id ? response.data : p));
      } else {
        // Create new partner
        const response = await axios.post(
          'http://localhost:5000/api/partners',
          formData,
          config
        );
        
        setPartners([response.data, ...partners]);
      }
      
      closeForm();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error saving partner');
    }
  };

  const deletePartner = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(
        `http://localhost:5000/api/partners/${id}`,
        {
          headers: {
            'Authorization': token
          }
        }
      );

      // Remove from local state
      setPartners(partners.filter(p => p._id !== id));
      if (selectedPartner && selectedPartner._id === id) {
        setSelectedPartner(null);
      }
    } catch (err: any) {
      setError('Failed to delete partner');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="pt-16"></div>
          <div className="py-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Partner Management</h1>
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
        <div className="p-6"></div>
        <div className="pt-16">

          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Partner Management</h1>
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
        <div className="pt-16"></div>
          
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Partner Management</h1>
            <button
              onClick={() => openForm()}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add New Partner
            </button>
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {partners.map((partner) => (
                    <tr key={partner._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="h-10 w-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/default-partner-logo.png';
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        {partner.description && (
                          <div className="text-sm text-gray-500 line-clamp-1">{partner.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {partner.website ? (
                          <a 
                            href={partner.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Visit
                          </a>
                        ) : (
                          <span className="text-gray-500">No website</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openForm(partner)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePartner(partner._id)}
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

      {/* Add/Edit Partner Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Partner' : 'Add New Partner'}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Partner Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL *
                  </label>
                  <input
                    type="url"
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com/logo.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the full URL to the partner's logo image.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Brief description of the partnership..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {isEditing ? 'Update Partner' : 'Add Partner'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    
    </DashboardLayout>
  );
}