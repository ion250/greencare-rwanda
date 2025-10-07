import { useState } from 'react';
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        const response = await axios.post(`${API_BASE}/api/messages`, {
          name,
          email,
          phone,
          message
        });
        
        if (response.data.success) {
          setLoading(false);
          setSubmitted(true);
          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
          setErrors({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1504811555212-2ff9c098c5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 pt-16">
        
        {/* Hero Section */}
<section className="bg-green-800 text-white py-24 relative overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="/images/team/bar.jpg" 
      alt="GreenCare Rwanda Waste Processing Facility"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
      Have questions about our products or services? Get in touch with our team.
    </p>
    
    {/* Badges */}
    <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm md:text-base">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 00.8.4H17a1 1 0 011 1v2a1 1 0 01-.8.999L15 9.999V19a1 1 0 01-1 1H6a1 1 0 01-1-1v-9.001L3.8 10H3a1 1 0 01-1-1V3z"/>
        </svg>
        <span>Fast Response</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
        </svg>
        <span>Expert Support</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <span>Sustainable Solutions</span>
      </div>
    </div>
  </div>
</section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
                  <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                    <svg className="w-8 h-8 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    Send Us a Message
                  </h2>
                  
                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg mb-6 flex items-start">
                      <svg className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div>
                        <h3 className="font-bold text-lg">Thank you for your message!</h3>
                        <p className="mt-1">We've received your inquiry and will get back to you within 24 hours.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setName(e.target.value);
                            if (errors.name) {
                              setErrors(prev => ({ ...prev, name: '' }));
                            }
                          }}
                          required
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                            errors.name ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                            if (errors.email) {
                              setErrors(prev => ({ ...prev, email: '' }));
                            }
                          }}
                          required
                          placeholder="Enter your email address"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPhone(e.target.value);
                            if (errors.phone) {
                              setErrors(prev => ({ ...prev, phone: '' }));
                            }
                          }}
                          required
                          placeholder="+250 XXX XXX XXX"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={message}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setMessage(e.target.value);
                            if (errors.message) {
                              setErrors(prev => ({ ...prev, message: '' }));
                            }
                          }}
                          required
                          rows={5}
                          placeholder="Tell us about your needs, questions, or how we can help you with waste management solutions..."
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors ${
                            errors.message ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                            {errors.message}
                          </p>
                        )}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Message...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </form>
                  )}
                </div>
                
                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
                    <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center">
                      <svg className="w-8 h-8 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      Contact Information
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">Our Locations</h3>
                          <p className="text-gray-700 mt-1">➡️Nduba sector, Kigali, Rwanda</p>
                          <a 
                            href="https://www.google.com/maps/place/Greencare+Rwanda+ltd/@-1.8762084,30.1069311,1127m/data=!3m2!1e3!4b1!4m6!3m5!1s0x19dca139c45733c3:0x90555dc2f3afdd3f!8m2!3d-1.8762138!4d30.109506!16s%2Fg%2F11yc0yzy0h?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 inline-flex items-center mt-2 font-medium"
                          >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            View on Google Maps
                          </a>
                          <p className="text-gray-700 mt-1">➡️Huye Industrial park, Huye, South Province</p>
                          <a 
                            href="https://www.google.com/maps/dir//CMVX%2B657,+Butare/@-2.5569708,29.6155121,36040m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x19c30d62bea7cae5:0xe246ef4e6e11ddaa!2m2!1d29.6979141!2d-2.5569734?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 inline-flex items-center mt-2 font-medium"
                          >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            View on Google Maps
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                          <a href="mailto:info@greencarerwandaltd.com" className="text-green-600 hover:text-green-800 text-lg font-semibold">
                            info@greencarerwandaltd.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
                          <div className="space-y-1">
                            <a href="tel:+250796142965" className="block text-gray-700 hover:text-green-600">
                              <span className="font-semibold">CUSTOMER CARE:</span> +250 796 142 965
                            </a>
                            <a href="tel:+250784030834" className="block text-gray-700 hover:text-green-600">
                              <span className="font-semibold">OFFICE:</span> +250 784 030 834
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                            <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.148.347-.421.52-.62.173-.198.222-.346.321-.544.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.205 3.074.14.198 1.895 2.874 4.58 3.991 1.112.473 1.79.697 2.51.845a15.9 15.9 0 0 0 1.949.25c.486.013.973-.024 1.329-.073.71-.1 2.318-.927 2.586-1.818.15-.49.238-1.017.05-1.464-.198-.49-.9-.844-1.447-1.12z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">WhatsApp</h3>
                          <div className="space-y-1">
                            <a href="https://wa.me/250796142965" target="_blank" rel="noopener noreferrer" className="block text-green-600 hover:text-green-800">
                              CUSTOMER CARE
                            </a>
                            <a href="https://wa.me/250784030834" target="_blank" rel="noopener noreferrer" className="block text-green-600 hover:text-green-800">
                              OFFICE
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business Hours */}
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                      Business Hours
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-semibold">8:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-semibold">8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-semibold">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}