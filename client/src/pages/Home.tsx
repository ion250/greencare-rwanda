import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, '') + '/';

// Types
interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  slug: string;
}

interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  image: string;
  featured: boolean;
  createdAt: string;
}

interface Partner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  createdAt: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Animation counters
  const [animatedWasteCount, setAnimatedWasteCount] = useState(0);
  const [animatedCompostCount, setAnimatedCompostCount] = useState(0);
  const [animatedJobsCount, setAnimatedJobsCount] = useState(0);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);

  // Carousel & Pagination
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [partnerPage, setPartnerPage] = useState(0);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  

  // Hero images list
  const heroImages = [
    "/images/workers.jpg",
    "/images/workers1.png",
    "/images/workers2.jpg",
    "/images/workers3.png",
    "/images/workers4.jpg",
    "/images/workers5.jpg",
    "/images/workers6.png",
    "/images/workers7.jpg",
    "/images/workers8.jpg",
    "/images/workers9.jpg",
    "/images/workers10.jpg",
    "/images/workers11.jpg",
    "/images/workers12.jpg",
    "/images/workers13.jpg",
    "/images/workers14.jpg",
    "/images/workers15.png"
  ];

  useEffect(() => {
    fetchLatestArticles();
    fetchTestimonials();
    fetchPartners();

    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && articles.length > 0) {
      animateNumbers();
    }
  }, [loading]);

  useEffect(() => {
    if (testimonials.length > 0) startAutoPlay();
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, [testimonials]);

  const startAutoPlay = () => {
    if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    autoPlayIntervalRef.current = setInterval(() => {
      handleNextTestimonial();
    }, 5000);
  };

  const resetAutoPlay = () => {
    if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    startAutoPlay();
  };

  const handleNextTestimonial = () => {
    resetAutoPlay();
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevTestimonial = () => {
    resetAutoPlay();
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const animateNumbers = () => {
    const duration = 2000;
    const frames = Math.round(duration / (1000 / 60));

    const incWaste = 2_000_000 / frames;
    const incCompost = 4000 / frames;
    const incJobs = 300 / frames;

    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      if (frame <= frames) {
        setAnimatedWasteCount(Math.floor(incWaste * frame));
        setAnimatedCompostCount(Math.floor(incCompost * frame));
        setAnimatedJobsCount(Math.floor(incJobs * frame));
      } else {
        setAnimatedWasteCount(2_000_000);
        setAnimatedCompostCount(4000);
        setAnimatedJobsCount(300);
        clearInterval(timer);
      }
    }, 1000 / 60);
  };

  // ✅ FIXED: Correct API response handling
  const fetchLatestArticles = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get<{ success: boolean; articles: Article[] }>(
        `${API_BASE}api/articles?limit=3`
      );
      const articlesData = res.data.success ? res.data.articles : [];
      setArticles(Array.isArray(articlesData) ? articlesData : []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load latest articles.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get<Testimonial[]>(`${API_BASE}api/testimonials`);
      setTestimonials(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setTestimonials([]);
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await axios.get<Partner[]>(`${API_BASE}api/partners`);
      setPartners(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching partners:", err);
      setPartners([]);
    }
  };

  // Partner Pagination
  const ITEMS_PER_PAGE = 12;
  const totalPartnerPages = Math.ceil(partners.length / ITEMS_PER_PAGE);
  const currentPartners = partners.slice(
    partnerPage * ITEMS_PER_PAGE,
    (partnerPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-24 relative overflow-hidden h-screen flex items-center">
        <div className="absolute inset-0 transition-opacity duration-1500 ease-in-out">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Hero background ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Our Environment, Our Concern
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Turning bio-waste into solutions for a greener Rwanda.
          </p>
          <Link
            to="/about"
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Learn More →
          </Link>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full border border-white transition-all ${
                index === currentHeroImageIndex ? 'bg-white' : 'bg-transparent'
              }`}
              onClick={() => setCurrentHeroImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">About Us</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Greencare Rwanda Ltd. is dedicated to pioneering sustainable waste management solutions. We specialize in providing expert consultancy for waste audits and planning, alongside the design and construction of state-of-the-art composting and recycling infrastructure. Our core mission is to transform biowaste into high-quality organic fertilizer, branded as Grekompost, and to efficiently process recyclable materials.
            </p>
            <Link 
              to="/about" 
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors mt-4"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              To be the premier leader in waste management consultancy, renowned for designing and constructing state-of-the-art composting and recycling infrastructure. We aspire to transform biowaste into high-quality Grekompost and efficiently process recyclables, thereby achieving an exceptional 95% landfill diversion rate.
            </p>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              GreenCare Rwanda Ltd. is dedicated to advancing sustainable waste management by providing expert consultancy, developing innovative composting and recycling infrastructure, and delivering capacity-building programs that create green jobs. Through the transformation of biowaste into high-quality Grekompost and the recovery of recyclables, we strive to reduce landfill dependency by 95%, promote circular economy practices, and build cleaner, healthier, and more resilient communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
                {animatedWasteCount.toLocaleString()}+
              </div>
              <div className="text-green-700 font-semibold text-lg md:text-xl">
                Tons of Waste Treated
              </div>
            </div>
            <div className="text-center p-8 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-green-800 mb-4">{animatedCompostCount}+</div>
              <div className="text-green-700 font-semibold text-lg md:text-xl">
                Tons of Compost Produced
              </div>
            </div>
            <div className="text-center p-8 bg-green-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-green-800 mb-4">{animatedJobsCount}+</div>
              <div className="text-green-700 font-semibold text-lg md:text-xl">
                Green Jobs Created
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-8">Our Products</h2>
          <p className="text-center text-gray-700 text-lg max-w-2xl mx-auto mb-12">
            We transform waste into sustainable resources through innovative recycling solutions.
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
              <div key={product.title} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{product.title}</h3>
                  <p className="text-gray-700 mb-6">{product.desc}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-8">Our Services</h2>
          <p className="text-center text-lg max-w-2xl mx-auto mb-12">
            We offer comprehensive waste management solutions and expertise to organizations across Rwanda and beyond.
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
              <div key={service.title} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4">{service.title}</h3>
                <p className="text-gray-700 mb-6">{service.desc}</p>
                <Link
                  to="/services"
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
    <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-8">
      Latest Articles
    </h2>
    <p className="text-center text-gray-700 text-lg max-w-2xl mx-auto mb-12">
      Stay informed about sustainability practices, waste management innovations, 
      and the benefits of composting.
    </p>

    {error && (
      <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-center">
        {error}
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.slice(0, 3).map((article) => {
        // ✅ FIXED: Robust image URL construction
        let imageUrl = "/images/placeholder.jpg";
        if (article.image) {
          if (article.image.startsWith("http")) {
            imageUrl = article.image;
          } else {
            const basePath = API_BASE.replace(/\/+$/, "");
            const imagePath = article.image.replace(/^\/+/, "");
            imageUrl = `${basePath}/${imagePath}`;
          }
        }

        return (
          <article
            key={article._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
          >
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
              }}
            />
            <div className="p-6 flex-grow">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{article.author || "GreenCare Team"}</span>
                <span className="mx-2">•</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {article.description}
              </p>
              <Link
                to={`/blog/${article.slug}`}
                className="text-green-600 font-semibold hover:text-green-800 transition-colors inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>
        );
      })}
    </div>

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

      {/* ===== WORKING TESTIMONIALS CAROUSEL ===== */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our partners, clients, and community members.
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="relative max-w-4xl mx-auto">
              {/* Single testimonial display (centered) */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-green-100">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={testimonials[currentTestimonialIndex]?.image || "/images/placeholder.jpg"}
                    alt={testimonials[currentTestimonialIndex]?.name || "Client"}
                    className="w-20 h-20 rounded-full object-cover border-2 border-green-500 mb-4"
                    onError={(e) => (e.target as HTMLImageElement).src = "/images/placeholder.jpg"}
                  />
                  <h3 className="font-bold text-xl text-gray-900">
                    {testimonials[currentTestimonialIndex]?.name}
                  </h3>
                  {testimonials[currentTestimonialIndex]?.position && (
                    <p className="text-green-600 mt-1">
                      {testimonials[currentTestimonialIndex]?.position}
                      {testimonials[currentTestimonialIndex]?.company && 
                        ` • ${testimonials[currentTestimonialIndex]?.company}`}
                    </p>
                  )}
                </div>
                <p className="text-gray-700 italic text-lg max-w-2xl mx-auto">
                  "{testimonials[currentTestimonialIndex]?.content}"
                </p>
                <div className="mt-6 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < (testimonials[currentTestimonialIndex]?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.18a1 1 0 00.95.69h4.392c.969 0 1.371 1.24.588 1.81l-3.56 2.585a1 1 0 00-.364 1.118l1.358 4.18c.3.921-.755 1.688-1.54 1.118l-3.56-2.585a1 1 0 00-1.175 0l-3.56 2.585c-.784.57-1.838-.197-1.539-1.118l1.357-4.18a1 1 0 00-.364-1.118L2.76 9.607c-.783-.57-.38-1.81.588-1.81h4.392a1 1 0 00.95-.69l1.357-4.18z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonialIndex(index);
                      resetAutoPlay();
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonialIndex 
                        ? 'bg-green-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white text-green-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-green-50 z-10 border border-green-200 hidden md:block"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={handleNextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white text-green-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-green-50 z-10 border border-green-200 hidden md:block"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Partners */}
      {partners.length > 0 ? (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-6">Our Partners</h2>
            <p className="text-center text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
              We collaborate with organizations that share our vision for a sustainable Rwanda.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentPartners.map((partner) => (
                <div 
                  key={partner._id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <a 
                    href={partner.website || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <div className="mb-4">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-h-16 mx-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{partner.name}</h3>
                    {partner.description && (
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{partner.description}</p>
                    )}
                  </a>
                </div>
              ))}
            </div>

            {totalPartnerPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6">
                <span className="text-gray-700">
                  Page <strong>{partnerPage + 1}</strong> of {totalPartnerPages}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPartnerPage(prev => Math.max(prev - 1, 0))}
                    disabled={partnerPage === 0}
                    className={`px-5 py-2 rounded-lg font-medium min-w-24 ${
                      partnerPage === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPartnerPage(prev => Math.min(prev + 1, totalPartnerPages - 1))}
                    disabled={partnerPage === totalPartnerPages - 1}
                    className={`px-5 py-2 rounded-lg font-medium min-w-24 ${
                      partnerPage === totalPartnerPages - 1
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-12">Our Partners</h2>
            <p className="text-gray-700">No partners currently available.</p>
          </div>
        </section>
      )}
    </div>
  );
}