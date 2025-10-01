// src/pages/Services.tsx
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 pt-16"></div>
      
     {/* Hero Section */}
<section className="bg-green-800 text-white py-24 relative overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="/images/services.jpg" 
      alt="GreenCare Rwanda Waste Processing Facility"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
      Comprehensive waste management solutions for a sustainable future
    </p>
    
    {/* Service Badges */}
    <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm md:text-base">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Expert Consultancy</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>Infrastructure Development</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Training & Employment</span>
      </div>
    </div>
  </div>
</section>

      {/* Services Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-gray-700 max-w-5xl mx-auto mb-12">
            Greencare Rwanda Ltd. is dedicated to transforming waste management through expert consultancy, robust infrastructure development, and empowering training programs.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Waste Management Consultancy Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Waste Management Consultancy</h3>
                <p className="opacity-90">Expert guidance for sustainable solutions</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We provide expert guidance for waste management projects, both in Rwanda and internationally. Our goal is to help organizations develop sustainable waste solutions perfectly suited to their unique needs and local environments.
                </p>
                
                <div className="mb-8">
                  <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                    
                    Our Services Include:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Waste Audit and Assessment:</strong> Thorough evaluation of existing waste streams.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Customized Waste Management Plans:</strong> Tailored strategies for effective waste handling.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Regulatory Compliance Guidance:</strong> Ensuring adherence to all relevant environmental laws.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Cost-Benefit Analysis:</strong> Evaluating the financial viability of waste management initiatives.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Sustainability Reporting:</strong> Documenting environmental impact and progress.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/contact" 
                    className="inline-block w-full bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <a 
                    href="https://wa.me/250784030834" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.998-1.413.24-.694.24-1.289.165-1.413-.075-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.933.935-3.643-.239-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.891-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.454-4.437 9.889-9.89 9.889m8.41-12.417c-1.339-1.339-3.525-1.339-4.864 0-1.34 1.34-1.34 3.525 0 4.864 1.339 1.339 3.525 1.339 4.864 0 1.34-1.34 1.34-3.526 0-4.864"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            
            {/* Design & Build Infrastructure Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Design & Build Infrastructure</h3>
                <p className="opacity-90">Complete construction services</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We offer complete design and construction services for composting and recycling infrastructure. Whether it's a small community project or a large industrial facility, we tailor our solutions to your specific requirements and local conditions.
                </p>
                
                <div className="mb-8">
                  <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                    
                    Our Solutions Include:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Composting Facilities:</strong> State-of-the-art plants for organic waste processing.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Recycling Centers:</strong> Facilities designed for efficient material sorting and processing.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Waste Collection Systems:</strong> Development of optimized systems for waste pickup.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Organic Waste Processing Plants:</strong> Specialized facilities for managing organic waste streams.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/contact" 
                    className="inline-block w-full bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <a 
                    href="https://wa.me/250784030834" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.998-1.413.24-.694.24-1.289.165-1.413-.075-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.933.935-3.643-.239-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.891-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.454-4.437 9.889-9.89 9.889m8.41-12.417c-1.339-1.339-3.525-1.339-4.864 0-1.34 1.34-1.34 3.525 0 4.864 1.339 1.339 3.525 1.339 4.864 0 1.34-1.34 1.34-3.526 0-4.864"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            
            {/* Training & Green Jobs Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Training & Green Jobs</h3>
                <p className="opacity-90">Empowering communities</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We provide comprehensive training programs designed for waste management practitioners, fostering essential skills and creating sustainable green jobs within local communities. Our aim is to empower individuals with the knowledge needed for a sustainable future.
                </p>
                
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                    
                    Our Programs Cover:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Waste Sorting and Segregation:</strong> Essential techniques for effective waste separation.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Composting Techniques:</strong> Hands-on training in effective composting methods.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Recycling Operations:</strong> Practical skills for managing recycling processes.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Environmental Safety:</strong> Ensuring safe practices in waste management.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span><strong>Entrepreneurship in Waste Management:</strong> Cultivating business skills for sustainable waste enterprises.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/contact" 
                    className="inline-block w-full bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Contact Us
                  </Link>
                  <a 
                    href="https://wa.me/250784030834" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.998-1.413.24-.694.24-1.289.165-1.413-.075-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.933.935-3.643-.239-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.891-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.454-4.437 9.889-9.89 9.889m8.41-12.417c-1.339-1.339-3.525-1.339-4.864 0-1.34 1.34-1.34 3.525 0 4.864 1.339 1.339 3.525 1.339 4.864 0 1.34-1.34 1.34-3.526 0-4.864"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Why Choose Our Services?</h2>
            <p className="text-lg text-gray-700 mb-8">
              At GreenCare Rwanda Ltd., we combine technical expertise with practical field experience to deliver sustainable waste management solutions that benefit the environment, economy, and communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Expertise & Experience</h3>
                <p className="text-gray-700">Our team brings together specialists in environmental science, engineering, and agriculture with years of practical experience.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 25 25">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Proven Results</h3>
                <p className="text-gray-700">We've successfully implemented waste management solutions across Rwanda, transforming thousands of tons of waste into valuable resources.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Community Impact</h3>
                <p className="text-gray-700">Our services create green jobs, empower youth, and build cleaner, healthier communities across Rwanda.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}