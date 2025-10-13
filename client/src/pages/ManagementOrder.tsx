import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

// Types
interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  product: 'Grekompost' | 'Recycled Pavers' | 'Recyclables';
  quantity: number;
  unit: 'ton' | 'kg' | 'bag';
  deliveryAddress: string;
  deliveryDate: string | null;
  specialInstructions: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE;

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await axios.get(`${API_BASE}api/orders`, {
        headers: { Authorization: token }
      });

      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to load orders. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.put(
        `${API_BASE}api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: token }
        }
      );

      // Update local state
      setOrders(orders.map(order =>
        order._id === orderId ? res.data : order
      ));

      // After updating status, optionally notify via WhatsApp
      if (newStatus === 'confirmed') {
        const order = orders.find(o => o._id === orderId);
        if (order) sendWhatsAppConfirmation(order);
      }
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  // Generate WhatsApp message and open in new tab
  const sendWhatsAppConfirmation = (order: Order) => {
    const customerName = encodeURIComponent(order.name);
    const productName = order.product;
    const qty = order.quantity;
    const unit = order.unit;
    const address = order.deliveryAddress;
    const date = order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'To be scheduled';

    const message = `
Hello ${customerName},

✅ This is GreenCare Rwanda. We're happy to confirm your order!

📦 *Product:* ${productName}
🔢 *Quantity:* ${qty} ${unit}
📍 *Delivery Address:* ${address}
📅 *Delivery Date:* ${date}

Thank you for choosing sustainable solutions! 🌱

GreenCare Rwanda Ltd.
+250 796 142 965
greencarerwandaltd.com
`.trim();

    const whatsappUrl = `https://wa.me/${order.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPhoneLink = (phone: string) => {
    return `tel:${phone.replace(/\D/g, '')}`;
  };

  const formatWhatsAppClick = (phone: string) => {
    return `https://wa.me/${phone.replace(/\D/g, '')}`;
  };

  return (
    <DashboardLayout>
      <div className="pt-16">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900">Order Management</h1>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-green-600 hover:text-green-800"
                  >
                    ← Back to Dashboard
                  </button>
                </div>

                {/* Orders Table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                              No orders found.
                            </td>
                          </tr>
                        ) : (
                          orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">{order.name}</div>
                                <div className="text-sm text-gray-500">{order.email}</div>
                                <div className="mt-1 space-x-2">
                                  <a
                                    href={formatPhoneLink(order.phone)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 text-xs"
                                  >
                                    Call
                                  </a>
                                  <a
                                    href={formatWhatsAppClick(order.phone)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 text-xs"
                                  >
                                    WhatsApp
                                  </a>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.product}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {order.quantity} {order.unit}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateStatus(order._id, e.target.value as Order['status'])}
                                  className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(order.status)} capitalize`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleUpdateStatus(order._id, 'confirmed')}
                                  className="text-blue-600 hover:text-blue-900 mr-3"
                                >
                                  Confirm & Notify 📲
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this order?')) {
                                      // Implement delete later if needed
                                      alert('Delete not implemented yet.');
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900"
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
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}