import { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardLayout from '../components/DashboardLayout'

interface Order {
  _id: string
  name: string
  email: string
  phone: string
  product: string
  quantity: number
  unit: string
  deliveryAddress: string
  deliveryDate: string | null
  specialInstructions: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('authToken')
      if (!token) {
        window.location.href = '/login'
        return
      }

      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: token }
      })

      setOrders(res.data)
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.')
      } else {
        setError('Failed to load orders. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setError('Not authenticated. Please log in again.')
        return
      }

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: token } }
      )

      // Update local state optimistically
      setOrders(orders.map(order =>
        order._id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      ))
    } catch {
      setError('Failed to update order status')
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-purple-100 text-purple-800'
      case 'shipped': return 'bg-indigo-100 text-indigo-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout>
      <div className="pt-16"></div>
      <div className="py-6"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
              Order Management
            </h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">All Orders</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage customer orders and track their status
                </p>
              </div>

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
                        Delivery
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
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.product}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.quantity} {order.unit}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.deliveryAddress}
                          </div>
                          {order.deliveryDate && (
                            <div className="text-sm text-gray-500">
                              {new Date(order.deliveryDate).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={e =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              const phone = order.phone.replace(/\D/g, '')
                              window.open(
                                `https://wa.me/${phone}?text=Hello%20${order.name},%20your%20order%20status%20is%20now%20${order.status}.`,
                                '_blank'
                              )
                            }}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            WhatsApp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
