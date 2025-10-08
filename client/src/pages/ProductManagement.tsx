import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
const API_BASE = import.meta.env.VITE_API_BASE;
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'compost',
    image: null as File | null,
    imageUrl: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API_BASE}api/products`, {
        headers: {
          'Authorization': token
        }
      });

      setProducts(response.data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to load products. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Corrected handler for inputs and selects
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // New, dedicated handler for the textarea
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file)
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.description || !formData.category) {
      setError('Name, description, and category are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('authToken');
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);

      if (formData.price) {
        formDataToSend.append('price', formData.price);
      }

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (!editingProduct) {
        // Create new product
        await axios.post(`${API_BASE}api/products`, formDataToSend, {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Update existing product
        await axios.put(`${API_BASE}api/products/${editingProduct._id}`, formDataToSend, {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Reset form and close modal
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'compost',
        image: null,
        imageUrl: ''
      });
      setShowAddProduct(false);
      setEditingProduct(null);

      // Refresh product list
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price ? product.price.toString() : '',
      category: product.category,
      image: null,
      imageUrl: product.image
    });
    setShowAddProduct(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`${API_BASE}api/products/${productId}`, {
        headers: {
          'Authorization': token
        }
      });

      // Remove from local state
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'compost',
      image: null,
      imageUrl: ''
    });
    setShowAddProduct(true);
  };

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
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Product Management</h1>
              <button
                onClick={openAddProductModal}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add New Product
              </button>
            </div>

            {/* Add/Edit Product Modal */}
            {showAddProduct && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </h3>
                      <button
                        onClick={() => {
                          setShowAddProduct(false);
                          setEditingProduct(null);
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleTextareaChange} // Use the dedicated handler here
                          rows={4}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                        <input
                          id="price"
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="compost">Compost</option>
                          <option value="biowaste">Biowaste</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
                        <input
                          id="image"
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {formData.imageUrl && (
                          <div className="mt-4">
                            <img src={formData.imageUrl} alt="Product Preview" className="h-40 object-cover" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        >
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddProduct(false);
                            setEditingProduct(null);
                          }}
                          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:shadow-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {products.map(product => (
                  <li key={product._id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <img src={`${API_BASE}${product.image}`} alt={product.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                        <p className="text-gray-500">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-green-600 font-bold mr-4">${product.price}</span>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-indigo-600 hover:text-indigo-900 font-medium mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}