import DashboardLayout from '../components/DashboardLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    articles: 0,
    products: 0,
    orders: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      };

      const [usersRes, articlesRes, productsRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users/count', config).catch(() => ({ data: { count: 0 } })),
        axios.get('http://localhost:5000/api/articles/count', config).catch(() => ({ data: { count: 0 } })),
        axios.get('http://localhost:5000/api/products/count', config).catch(() => ({ data: { count: 0 } })),
        axios.get('http://localhost:5000/api/orders/count', config).catch(() => ({ data: { count: 0 } }))
      ]);

      setStats({
        users: usersRes.data.count,
        articles: articlesRes.data.count,
        products: productsRes.data.count,
        orders: ordersRes.data.count
      });

      // Fetch real recent activity including orders
      const activityRes = await axios.get('http://localhost:5000/api/activity/recent', config).catch(() => ({ data: [] }));
      
      // If we can't get real data, use mock data
      const activityData = activityRes.data.length > 0 ? activityRes.data : [
        {
          id: 1,
          action: 'New order received',
          details: 'Grekompost - 5 tons',
          time: '1 hour ago',
          type: 'order',
          status: 'pending'
        },
        {
          id: 2,
          action: 'New article published',
          details: 'Innovative Plastic Recycling Solutions',
          time: '2 hours ago',
          type: 'article'
        },
        {
          id: 3,
          action: 'New order confirmed',
          details: 'Recycled Pavers - 100 units',
          time: '5 hours ago',
          type: 'order',
          status: 'confirmed'
        },
        {
          id: 4,
          action: 'New user registered',
          details: 'Jeanine Uwase',
          time: '1 day ago',
          type: 'user'
        },
        {
          id: 5,
          action: 'New product added',
          details: 'Recycled Pavers',
          time: '3 days ago',
          type: 'product'
        }
      ];

      setRecentActivity(activityData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
            <button
              onClick={fetchData}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Users */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.users}</dd>
                </div>
              </div>
            </div>

            {/* Articles */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-2m-2-2h-4m-6 6h12m-6 6v6" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Articles</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.articles}</dd>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V5c0-1 1-2 2-2h4c1 0 2 1 2 2v2M8 17v-2h8v2" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Products</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.products}</dd>
                </div>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <div className="flex-shrink-0 bg-orange-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.orders}</dd>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {recentActivity.length === 0 ? (
                <p className="text-gray-500">No recent activity.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {activity.type === 'order' && (
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              activity.status === 'pending' ? 'bg-yellow-400' :
                              activity.status === 'confirmed' ? 'bg-green-400' :
                              'bg-blue-400'
                            }`}></div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.details}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => window.location.href = '/dashboard/articles'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Article
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard/products'}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Product
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard/order'}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  View Orders
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard/users'}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  Manage Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}