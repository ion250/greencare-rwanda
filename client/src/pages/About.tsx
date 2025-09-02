// src/pages/About.tsx
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
            {/* Hero */}
      <section className="bg-green-800 text-white py-24 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl opacity-90">Transforming bio-waste into valuable resources for sustainable development</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              GreenCare Rwanda Ltd is a waste management company dedicated to creating Grekompost and promoting recycling practices across Rwanda. 
              Our mission is to transform bio-waste into valuable resources for sustainable development.
            </p>

            <h2 className="text-3xl font-bold text-green-800 mb-6">Vision & Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-800 mb-2">2M+</div>
                <div className="text-green-700 font-semibold">Tons of waste treated by 2050</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-800 mb-2">400+</div>
                <div className="text-green-700 font-semibold">Tons of compost produced</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-800 mb-2">300+</div>
                <div className="text-green-700 font-semibold">Green jobs created</div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Our Approach</h2>
              <p className="text-gray-700 mb-4">
                We believe in a circular economy where waste becomes a resource. Our innovative processes transform organic waste into high-quality compost 
                and recycled materials into durable products, creating a sustainable cycle that benefits both the environment and local communities.
              </p>
              <p className="text-gray-700">
                Through our training programs and green job initiatives, we're not just managing waste – we're building a greener future for Rwanda, 
                one community at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-700 mb-8">Together, we can create a cleaner, greener Rwanda</p>
          <Link to="/contact" className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}
