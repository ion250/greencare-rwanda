import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define Article type
interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;  // Added this property
  author: string;
  createdAt: string;
  slug: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<Article[]>(
        "http://localhost:5000/api/articles?limit=3"
      );

      if (Array.isArray(response.data)) {
        setArticles(response.data);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles. Please try again later.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-4">
            Our Environment, Our Concern
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Turning bio-waste into solutions for a greener Rwanda.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">About Us</h2>
            <p className="text-lg text-gray-700 mb-8">
              GreenCare Rwanda Ltd is a waste management company dedicated to
              creating Grekompost and promoting recycling practices across
              Rwanda. Our mission is to transform bio-waste into valuable
              resources for sustainable development.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">2M+</div>
              <div className="text-green-700 font-semibold">
                Tons of waste treated by 2050
              </div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">400+</div>
              <div className="text-green-700 font-semibold">
                Tons of compost produced
              </div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-800 mb-2">300+</div>
              <div className="text-green-700 font-semibold">
                Green jobs created
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
            Our Products
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
            We transform waste into sustainable resources through innovative
            recycling solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Grekompost",
                desc: "Premium organic compost for home gardens and farms. Rich in nutrients and beneficial microorganisms.",
              },
              {
                title: "Recycled Pavers",
                desc: "Durable pavers made from recycled plastic. Eco-friendly alternative for pathways and landscaping.",
              },
              {
                title: "Recyclables",
                desc: "Sorted plastics and other recyclable materials available for purchase by manufacturers and recyclers.",
              },
            ].map((product) => (
              <div
                key={product.title}
                className="bg-white p-8 rounded-lg shadow-md text-center"
              >
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  {product.title}
                </h3>
                <p className="text-gray-700 mb-6">{product.desc}</p>
                <Link
                  to="/products"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
            Our Services
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
            We offer comprehensive waste management solutions and expertise to
            organizations across Rwanda and beyond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Waste Management Consultancy",
                desc: "Expert guidance on waste management projects in Rwanda and abroad. We help organizations develop sustainable waste solutions.",
              },
              {
                title: "Design & Build Infrastructure",
                desc: "Complete design and construction of composting and recycling infrastructure tailored to your specific needs and local conditions.",
              },
              {
                title: "Training & Green Jobs",
                desc: "Comprehensive training programs for waste management practitioners and creation of sustainable green jobs in local communities.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6">{service.desc}</p>
                <Link
                  to="/contact"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      {/* Latest Articles */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
      Latest Articles
    </h2>
    <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
      Stay informed about sustainability practices, waste management
      innovations, and the benefits of composting.
    </p>

    {loading ? (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    ) : error ? (
      <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-center">
        {error}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.slice(0, 3).map((article) => {
            // Format the image URL to ensure it's complete
            const imageUrl = article.image ? 
              (article.image.startsWith('http') ? 
                article.image : 
                `http://localhost:5000${article.image}`) : 
              '/uploads/placeholder.jpg';

            return (
              <article
                key={article._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col"
              >
                {/* Article Image */}
                <div className="mb-4">
                  <img
                    src={imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded"
                    onError={(e) => {
                      // Handle image loading error
                      (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                    }}
                  />
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <Link
                  to={`/blog/${article.slug}`}
                  className="text-green-600 font-semibold hover:text-green-800 transition-colors inline-flex items-center mt-auto"
                >
                  Read More →
                </Link>
              </article>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-700">
              No articles available at the moment.
            </p>
          </div>
        )}
      </div>
    )}

    <div className="text-center mt-12">
      <Link
        to="/blog"
        className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors inline-block"
      >
        View All Articles
      </Link>
    </div>
  </div>
</section>

      {/* Contact Us */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
              Contact Us
            </h2>
            <p className="text-center text-gray-700 mb-12">
              Have questions about our products or services? Get in touch with
              our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-6">
                  Send Us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-800 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">Our Location</h4>
                    <p className="text-gray-700">Kigali, Rwanda</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email Us</h4>
                    <p className="text-green-600">
                      info@greencarerwandaltd.com
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Call Us</h4>
                    <p className="text-gray-700">+250 796 142 965</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
