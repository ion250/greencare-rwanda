import { Link } from 'react-router-dom';

export default function Products() {
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

      {/* Content */}
      <div className="relative z-10 pt-16">
        
        {/* Hero Section */}
<section className="bg-green-800 text-white py-24 relative overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="/images/product.jpg" 
      alt="GreenCare Rwanda Waste Processing Facility"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
      Sustainable solutions created from recycled materials that transform waste into valuable resources
    </p>
    
    {/* Badges */}
    <div className="flex justify-center mt-8 space-x-6 text-white/90">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 014 0v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>100% Recycled Materials</span>
      </div>
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Eco-Friendly & Sustainable</span>
      </div>
    </div>
  </div>
</section>

        {/* Products Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12 text-lg">
              We transform waste into sustainable resources through innovative recycling solutions that benefit the environment and create economic value.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Grekompost Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Grekompost</h3>
                  <p className="opacity-90">Premium Organic Compost</p>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Grekompost is a farmer's best friend, offering a powerful blend of benefits for enhanced crop production and soil vitality.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                      
                      Key Benefits:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Superior Soil Health:</strong> Dramatically improves soil structure and water retention, leading to healthier roots and reduced irrigation needs.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Nutrient-Rich:</strong> Delivers essential nutrients that fuel robust plant growth and maximize yields.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Convenient & Efficient:</strong> Easy to transport with packaging that preserves nutrient integrity from production to application.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Versatile & Long-Lasting:</strong> Usable at all plant stages and storable for over two years, offering enduring value.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Pest-Free:</strong> Its odorless nature naturally deters pests, protecting your crops.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <Link to="/order" className="block w-full bg-green-600 text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Order Now
                    </Link>
                    <a 
                      href="https://wa.me/250796142965?text=Hello%20GreenCare%20Rwanda%2C%20I%20would%20like%20to%20order%20Grekompost.%20Please%20provide%20me%20with%20pricing%20and%20ordering%20information."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-green-700 text-white px-6 py-4 rounded-lg hover:bg-green-800 transition-colors font-semibold"
                    >
                      <svg className="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.148.347-.421.52-.62.173-.198.222-.346.321-.544.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.205 3.074.14.198 1.895 2.874 4.58 3.991 1.112.473 1.79.697 2.51.845a15.9 15.9 0 0 0 1.949.25c.486.013.973-.024 1.329-.073.71-.1 2.318-.927 2.586-1.818.15-.49.238-1.017.05-1.464-.198-.49-.9-.844-1.447-1.12z"/>
                      </svg>
                      Make order direct on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Recycled Pavers Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Recycled Pavers <br></br>
                    ⚠️(Under Development)</h3> 
                  <p className="opacity-90">Eco-Friendly Building Solutions</p>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Durable pavers made from recycled plastic. An eco-friendly alternative to traditional paving materials, these pavers are perfect for pathways, driveways, and landscaping projects.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                      
                      Key Features:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>100% Recycled Plastic:</strong> Made entirely from post-consumer plastic waste, reducing landfill burden.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Exceptional Durability:</strong> Highly resistant to weather, UV rays, and heavy loads.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Variety of Options:</strong> Available in multiple colors, patterns, and sizes to suit any design.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Easy Installation:</strong> Interlocking design allows for quick installation without mortar or cement.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Link to="/contact" className="inline-block w-full bg-green-600 text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Request Quote
                  </Link>
                </div>
              </div>
              
              {/* Recyclables Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-600 to-green-900 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">Recyclables</h3>
                  <p className="opacity-90">High-Quality Raw Materials</p>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Sorted plastics and other recyclable materials available for purchase by manufacturers and recyclers. We collect, sort, and process recyclable materials to ensure high quality and consistency for industrial use.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                      
                      Materials Available:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>HDPE (High-Density Polyethylene):</strong> Ideal for manufacturing new plastic products.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>PET (Polyethylene Terephthalate):</strong> Perfect for beverage bottles and food containers.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>PP (Polypropylene):</strong> Versatile material used in various industrial applications.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span><strong>Paper and Cardboard:</strong> High-quality sorted paper products for recycling.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Link to="/contact" className="inline-block w-full bg-green-600 text-white text-center px-6 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Why Choose Our Products?</h2>
              <p className="text-gray-700">Our products are designed to deliver environmental, economic, and social benefits</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Environmental Impact</h3>
                <p className="text-gray-700">Reduce landfill waste, lower carbon emissions, and conserve natural resources through our circular economy approach.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Economic Value</h3>
                <p className="text-gray-700">Cost-effective solutions that provide long-term savings and create green jobs in local communities.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 25 25">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Social Responsibility</h3>
                <p className="text-gray-700">Support sustainable development goals, empower youth, and build cleaner, healthier communities.</p>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  )
}