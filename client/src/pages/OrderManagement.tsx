// components/Order.tsx (updated)
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
// Define the form data type
interface FormData {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  unit: 'ton' | 'kg' | 'bag';
  deliveryAddress: string;
  deliveryDate: string;
  specialInstructions: string;
}

export default function Order() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',  
    quantity: '1',
    unit: 'ton',
    deliveryAddress: '',
    deliveryDate: '',
    specialInstructions: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setApiError(null);
      
      try {
        // Convert quantity to number and prepare data
        const orderData = {
          ...formData,
          quantity: parseInt(formData.quantity),
          deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate) : null
        };
        
        // Send to API
        const response = await axios.post(`${API_BASE}api/orders`, orderData);
        
        if (response.data.success) {
          setLoading(false);
          setSubmitted(true);
        }
      } catch (error: any) {
        setLoading(false);
        
        if (error.response && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('Failed to submit order. Please try again.');
          console.error('Error submitting order:', error);
        }
      }
    }
  };

  // WhatsApp message generator
  const generateWhatsAppMessage = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.deliveryAddress.trim() || !formData.quantity) {
      return 'https://wa.me/250796142965?text=Hello%20GreenCare%20Rwanda,%20I%20would%20like%20to%20inquire%20about%20ordering%20Grekompost.';
    }
    
    const message = `Hello GreenCare Rwanda,%0A%0AI would like to order Grekompost:%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AQuantity: ${formData.quantity} ${formData.unit}%0ADelivery Address: ${formData.deliveryAddress}%0ADelivery Date: ${formData.deliveryDate || 'Not specified'}%0ASpecial Instructions: ${formData.specialInstructions || 'None'}%0A%0AThank you!`;
    
    return `https://wa.me/250796142965?text=${message}`;
  };

  const isFormComplete = formData.name.trim() && 
                        formData.email.trim() && 
                        formData.phone.trim() && 
                        formData.deliveryAddress.trim() && 
                        formData.quantity;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Background Image */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1602240248254-5384c0886299?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.15
          }}
        ></div>

        <div className="relative z-10 pt-16">
          <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-green-800">GreenCare Rwanda</Link>
              </div>
            </div>
          </header>

          <section className="bg-white bg-opacity-90 py-24">
            <div className="container mx-auto px-4 text-center">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 inline-block">
                <svg className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-bold">Thank you for your order!</span>
              </div>
              <h1 className="text-4xl font-bold text-green-800 mb-4">Your Grekompost Order Has Been Submitted</h1>
              <p className="text-xl text-gray-700 mb-8">Our team will contact you shortly to confirm your order details and delivery schedule.</p>
              
              <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Product:</span> Grekompost</p>
                  <p><span className="font-semibold">Quantity:</span> {formData.quantity} {formData.unit}</p>
                  <p><span className="font-semibold">Delivery Address:</span> {formData.deliveryAddress}</p>
                  <p><span className="font-semibold">Contact:</span> {formData.name} ({formData.phone})</p>
                </div>
              </div>

              <div className="mt-8 space-x-4">
                <Link to="/products" className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors">
                  Back to Products
                </Link>
                <a 
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                >
                  <svg className="h-5 w-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.148.347-.421.52-.62.173-.198.222-.346.321-.544.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.205 3.074.14.198 1.895 2.874 4.58 3.991 1.112.473 1.79.697 2.51.845a15.9 15.9 0 0 0 1.949.25c.486.013.973-.024 1.329-.073.71-.1 2.318-.927 2.586-1.818.15-.49.238-1.017.05-1.464-.198-.49-.9-.844-1.447-1.12z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1602240248254-5384c0886299?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15
        }}
      ></div>

      <div className="relative z-10 pt-16">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <img 
                  src="/images/grekompost.png" 
                  alt="Grekompost"
                  className="w-32 h-32 object-cover rounded-lg mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">Grekompost</h2>
                  <p className="text-gray-700 mb-2">Premium organic compost rich in nutrients and beneficial microorganisms</p>
                  <div className="flex items-center">
                    <span className="text-green-600 font-semibold">Available in bulk quantities</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+250 XXX XXX XXX"
                      className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity *
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={`w-2/3 px-4 py-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-l-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                      />
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-1/3 px-4 py-2 border border-gray-300 border-l-0 rounded-r-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="ton">Ton</option>
                        <option value="kg">Kilogram</option>
                        <option value="bag">Bag (50kg)</option>
                      </select>
                    </div>
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    rows={3}
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    placeholder="Enter your full delivery address"
                  ></textarea>
                  {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>}
                </div>
                
                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Any special delivery instructions or requirements"
                  ></textarea>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="font-semibold text-green-800 mb-2">Why Choose Grekompost?</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Premium organic compost rich in nutrients</li>
                    <li>Improves soil structure and water retention</li>
                    <li>Contains beneficial microorganisms for plant growth</li>
                    <li>Eco-friendly solution for sustainable agriculture</li>
                    <li>Locally produced in Rwanda from bio-waste</li>
                  </ul>
                </div>
                
                {apiError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{apiError}</span>
                  </div>
                )}
                
                <div className="flex justify-end space-x-4">
                  <Link
                    to="/products"
                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* WhatsApp Quick Contact */}
            <div className="mt-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Prefer to Order via WhatsApp?</h3>
              <p className="text-gray-700 mb-4">You can also place your order directly through WhatsApp for faster response.</p>
              <a 
                href={isFormComplete ? generateWhatsAppMessage() : '#'}
                target={isFormComplete ? '_blank' : undefined}
                rel={isFormComplete ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center px-6 py-3 rounded-md transition-colors ${
                  isFormComplete 
                    ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
                title={isFormComplete ? 'Chat with us on WhatsApp' : 'Please fill the order form'}
              >
                <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.148.347-.421.52-.62.173-.198.222-.346.321-.544.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.205 3.074.14.198 1.895 2.874 4.58 3.991 1.112.473 1.79.697 2.51.845a15.9 15.9 0 0 0 1.949.25c.486.013.973-.024 1.329-.073.71-.1 2.318-.927 2.586-1.818.15-.49.238-1.017.05-1.464-.198-.49-.9-.844-1.447-1.12z"/>
                </svg>
                Chat with Us on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}