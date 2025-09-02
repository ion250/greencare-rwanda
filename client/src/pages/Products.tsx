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
        
        {/* Hero */}
        <section className="bg-green-800  py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-xl text-white">Sustainable solutions created from recycled materials</p>
          </div>
        </section>

        {/* Products Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
              We transform waste into sustainable resources through innovative recycling solutions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Grekompost</h3>
                <p className="text-gray-700 mb-6">
                  Premium organic compost for home gardens and farms. Rich in nutrients and beneficial microorganisms that improve soil health and plant growth.
                  Our compost is created through a carefully monitored process that ensures high quality and consistency.
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Improves soil structure and water retention</li>
                    <li>Provides essential nutrients for plants</li>
                    <li>Reduces need for chemical fertilizers</li>
                    <li>Promotes healthy root development</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Link to="/order" className="block w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors text-center">
                    Order Now
                  </Link>
                  <a 
                    href="https://wa.me/250796142965?text=Hello%20GreenCare%20Rwanda%2C%20I%20would%20like%20to%20order%20Grekompost.%20Please%20provide%20me%20with%20pricing%20and%20ordering%20information."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.148.347-.421.52-.62.173-.198.222-.346.321-.544.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.205 3.074.14.198 1.895 2.874 4.58 3.991 1.112.473 1.79.697 2.51.845a15.9 15.9 0 0 0 1.949.25c.486.013.973-.024 1.329-.073.71-.1 2.318-.927 2.586-1.818.15-.49.238-1.017.05-1.464-.198-.49-.9-.844-1.447-1.12z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Recycled Pavers</h3>
                <p className="text-gray-700 mb-6">
                  Durable pavers made from recycled plastic. An eco-friendly alternative to traditional paving materials, these pavers are perfect for 
                  pathways, driveways, and landscaping projects.
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Made from 100% recycled plastic waste</li>
                    <li>Highly durable and weather-resistant</li>
                    <li>Available in various colors and patterns</li>
                    <li>Easy to install and maintain</li>
                  </ul>
                </div>
                <Link to="/contact" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Request Quote
                </Link>
              </div>
              
              <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Recyclables</h3>
                <p className="text-gray-700 mb-6">
                  Sorted plastics and other recyclable materials available for purchase by manufacturers and recyclers. We collect, sort, and process 
                  recyclable materials to ensure high quality and consistency.
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Materials Available:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>HDPE (High-Density Polyethylene)</li>
                    <li>PET (Polyethylene Terephthalate)</li>
                    <li>PP (Polypropylene)</li>
                    <li>Paper and cardboard</li>
                  </ul>
                </div>
                <Link to="/contact" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-100 bg-opacity-90">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-700 mb-8">Partner with us to create sustainable solutions for your needs.</p>
            <Link to="/contact" className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors">
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}