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
  const [showCard, setShowCard] = useState(false);

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
    <div className="min-h-screen bg-white pt-16"> {/* Added pt-16 to start below navbar */}

{/* Hero Section */}


{/* Hero Section */}
<section className="bg-green-800 text-white py-24 relative overflow-hidden">
  <div className="absolute inset-0">
    <img 
      src="/images/workers.jpg" // Replace with your actual image URL
      alt="GreenCare Rwanda Workers"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  </div>
  
  <div className="container mx-auto px-4 text-center relative z-10 flex items-center justify-center h-96">
    <div>
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
        Our Environment, Our Concern
      </h1>
      <p className="text-xl md:text-2xl opacity-90 text-white mb-8">
        Turning bio-waste into solutions for a greener Rwanda.
      </p>
      
      <button 
        onClick={() => setShowCard(true)}
        className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Learn More →
      </button>
    </div>
  </div>

  {/* Information Card */}
  {showCard && (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={() => setShowCard(false)}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 transition-transform duration-200 z-10" onClick={() => setShowCard(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 rounded-t-2xl">
            <h2 className="text-3xl font-bold text-white">GreenCare Rwanda Ltd — Turning Waste into Value</h2>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Origins & Founding (2016)</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed ml-14">
                  Founded in 2016 by four passionate University of Rwanda graduates—Noel Nizeyimana, Francis Mizinduko, Christian Ruzindana, and Jean-Paul Iyakaremye—GreenCare emerged in Huye, Southern Province, to tackle the severe waste management issues they observed around campus. What others saw as filth, Nizeyimana recognized as "gold".
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Mission & Innovations</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed ml-14">
                  GreenCare began by transforming landfill waste into GreKompost, an organic fertilizer targeting the critical problem of soil nutrient depletion and aiming to boost agricultural productivity.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed ml-14 mt-3">
                  Soon, the team also began repurposing plastic waste into eco-friendly pavers, supporting Rwanda's circular economy and contributing to the construction sector.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Growth & Impact</h3>
                </div>
                <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 ml-14">
                  <li>Processes approximately 10 tonnes of waste daily—with around 75% being biodegradable, and the rest sorted into recyclable streams</li>
                  <li>Produces between 600 and 800 tonnes of compost annually, plus eco-pavers from plastics</li>
                  <li>Employs around 25 permanent staff, contributing to green jobs and skills development</li>
                  <li>Delivers measurable results for farmers: compost has helped increase crop yields from 2–3 to 4–6 tons per hectare</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.165-2.052-.48-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Recognition & Support</h3>
                </div>
                <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 ml-14">
                  <li><strong>2021:</strong> Won the Youth Green Innovation and Investment Award by UNDP/REMA, earning Rwf 6 million to expand operations</li>
                  <li><strong>2022:</strong> Secured an impressive Rwf 25 million from the Youth Connekt Awards, which financed better production equipment</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Current Standing</h3>
                </div>
                <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 ml-14">
                  <li>By 2023–2025: Compost volumes increased to about 400 tonnes annually</li>
                  <li>Products like GreKompost and pavers are serving co-ops and farmers in Huye, contributing significantly to sustainable agriculture and local green economy</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Looking Ahead</h3>
                </div>
                <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 ml-14">
                  <li>Scaling compost production to deliver thousands of tons per year beyond Huye—potentially nationwide</li>
                  <li>Expanding into secondary cities and Kigali, with ambitions to make waste-to-resource operations a national norm</li>
                  <li>Building partnerships with UNDP and other global actors to amplify their impact locally and internationally</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Why People Should Know About GreenCare Rwanda</h3>
                </div>
                <ul className="text-gray-700 text-lg list-disc list-inside space-y-2 ml-14">
                  <li>It's a youth-led innovation proving environmental responsibility and profitability go hand-in-hand.</li>
                  <li>It shows how local solutions can tackle global issues—by turning waste into sustainable agriculture inputs.</li>
                  <li>It delivers real economic impact—from job creation to empowering farmers.</li>
                  <li>It's scalable and replicable, offering a model of sustainable, circular economic development for Rwanda and beyond.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</section>
      {/* About Us */}
<section id="about" className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-green-800 mb-6">About Us</h2>
      <p className="text-lg mb-6">
        GreenCare Rwanda Ltd is a youth-led company dedicated to building a greener and more sustainable future. Founded in 2016 by young innovators from the University of Rwanda, GreenCare transforms bio-waste into GreKompost, an organic fertilizer that restores soil health and boosts agricultural productivity. The company also repurposes plastic waste into eco-friendly pavers, contributing to Rwanda's circular economy and cleaner cities.
      </p>
      <p className="text-lg mb-6">
        Beyond composting and paver production, GreenCare prepares and compacts recyclable materials such as plastics and other solid waste, supplying them to partner industries that refine them into new raw materials. This integrated approach ensures that nothing goes to waste, while supporting a wider network of sustainable manufacturing in Rwanda.
      </p>
      </div>
  </div>
</section>

{/* Vision & Mission */}
<section id="vision-mission" className="py-16 ">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-green-800 mb-6">Our Vision & Mission</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Our goals and commitments for a sustainable future
        <br></br>Our mission is to transform bio-waste into valuable
        resources for sustainable development.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="text-center p-8 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-5xl font-bold text-green-800 mb-4">2M+</div>
        <div className="text-green-700 font-semibold text-xl">
          Tons of waste treated by 2050
        </div>
      </div>
      <div className="text-center p-8 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-5xl font-bold text-green-800 mb-4">400+</div>
        <div className="text-green-700 font-semibold text-xl">
          Tons of compost produced
        </div>
      </div>
      <div className="text-center p-8 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-5xl font-bold text-green-800 mb-4">300+</div>
        <div className="text-green-700 font-semibold text-xl">
          Green jobs created
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Products */}
      <section id="products" className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
      Our Products
    </h2>
    <p className="text-center text-gray-700 text-lg max-w-2xl mx-auto mb-12">
      We transform waste into sustainable resources through innovative
      recycling solutions.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Grekompost",
          desc: "Premium organic compost for home gardens and farms. Rich in nutrients and beneficial microorganisms.",
          image: "/images/grekompost.png"
        },
        {
          title: "Recycled Pavers",
          desc: "Durable pavers made from recycled plastic. Eco-friendly alternative for pathways and landscaping.",
          image: "/images/pavers.jpg"
        },
        {
          title: "Recyclables",
          desc: "Sorted plastics and other recyclable materials available for purchase by manufacturers and recyclers.",
          image: "/images/Recyclables.jpg"
        },
      ].map((product) => (
        <div
          key={product.title}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6 flex-grow">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              {product.title}
            </h3>
            <p className="text-gray-700 mb-6">
              {product.desc}
            </p>
            <Link
              to="/products"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Services */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
            Our Services
          </h2>
          <p className="text-center text-lg max-w-2xl mx-auto mb-12">
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
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
      Latest Articles
    </h2>
    <p className="text-center text-lg max-w-2xl mx-auto mb-12">
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
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                {/* Article Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      // Handle image loading error
                      (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                    }}
                  />
                </div>

                <div className="p-6 flex-grow">
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
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-black text-lg">
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
            <h2 className="text-4xl font-bold text-green-800 text-center mb-8">
              Contact Us
            </h2>
            <p className="text-center text-lg mb-12">
              Have questions about our products or services? Get in touch with
              our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-6">
                  Send Us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-black mb-2">Name</label>
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
                <h3 className="text-2xl font-bold text-green-800 mb-6">
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
                  <div>
                    <h4 className="font-semibold text-gray-800">WhatsApp</h4>
                    <a 
                      href="https://wa.me/250796142965" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-green-600 hover:text-green-800"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.998-1.413.24-.694.24-1.289.165-1.413-.075-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.933.935-3.643-.239-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.891-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.454-4.437 9.889-9.89 9.889m8.41-12.417c-1.339-1.339-3.525-1.339-4.864 0-1.34 1.34-1.34 3.525 0 4.864 1.339 1.339 3.525 1.339 4.864 0 1.34-1.34 1.34-3.526 0-4.864"/>
                      </svg>
                      +250 796 142 965
                    </a>
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