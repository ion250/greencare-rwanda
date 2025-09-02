// src/pages/Services.tsx
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero */}
      <section className="bg-green-800 text-white py-24 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Comprehensive waste management solutions for a sustainable future</p>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
            We offer comprehensive waste management solutions and expertise to organizations across Rwanda and beyond.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Waste Management Consultancy</h3>
              <p className="text-gray-700 mb-6">
                Expert guidance on waste management projects in Rwanda and abroad. We help organizations develop sustainable waste solutions 
                tailored to their specific needs and local conditions.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Our Consultancy Includes:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Waste audit and assessment</li>
                  <li>Customized waste management plans</li>
                  <li>Regulatory compliance guidance</li>
                  <li>Cost-benefit analysis</li>
                  <li>Sustainability reporting</li>
                </ul>
              </div>
              <Link to="/contact" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Contact Us
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Design & Build Infrastructure</h3>
              <p className="text-gray-700 mb-6">
                Complete design and construction of composting and recycling infrastructure tailored to your specific needs and local conditions. 
                From small-scale community projects to large industrial facilities.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Our Infrastructure Solutions:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Composting facilities</li>
                  <li>Recycling centers</li>
                  <li>Waste collection systems</li>
                  <li>Material recovery facilities</li>
                  <li>Organic waste processing plants</li>
                </ul>
              </div>
              <Link to="/contact" className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Contact Us
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Training & Green Jobs</h3>
              <p className="text-gray-700 mb-6">
                Comprehensive training programs for waste management practitioners and creation of sustainable green jobs in local communities. 
                Empowering people with the skills they need for a sustainable future.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Our Training Programs:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Waste sorting and segregation</li>
                  <li>Composting techniques</li>
                  <li>Recycling operations</li>
                  <li>Environmental safety</li>
                  <li>Entrepreneurship in waste management</li>
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
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Waste Management?</h2>
          <p className="text-xl mb-8 opacity-90">Let's work together to create sustainable solutions.</p>
          <Link to="/contact" className="bg-white text-green-800 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}