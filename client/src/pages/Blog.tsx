// src/pages/Blog.tsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, "");

interface Article {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  createdAt: string;
  slug: string;
  sdgs: string[];
}

interface PublishedDocument {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [publishedDocuments, setPublishedDocuments] = useState<PublishedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDocPage, setCurrentDocPage] = useState(1);

  const articlesPerPage = 8;
  const documentsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("authToken");
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        const articleRes = await axios.get<{ success: boolean; articles: Article[] }>(
          `${API_BASE}/api/articles`,
          config
        );

        
        const formattedArticles = (articleRes.data.articles || []).map((article) => {
          let imageUrl = "/images/placeholder.jpg";
          if (article.image) {
            if (article.image.startsWith("http")) {
              imageUrl = article.image;
            } else {
              const cleanApiBase = API_BASE.replace(/\/+$/, ""); 
              const cleanImagePath = article.image.replace(/^\/+/, ""); 
              imageUrl = `${cleanApiBase}/${cleanImagePath}`;
            }
          }
          return { ...article, image: imageUrl };
        });

        setArticles(formattedArticles);

        const { data: docData } = await axios.get(`${API_BASE}/api/documents`);
        const sortedDocs = docData.documents.sort(
          (a: PublishedDocument, b: PublishedDocument) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPublishedDocuments(sortedDocs);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError("Failed to load content. Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ===== Pagination Helper =====
  const paginate = (items: any[], currentPage: number, perPage: number) =>
    items.slice((currentPage - 1) * perPage, currentPage * perPage);

  const currentArticles = paginate(articles, currentPage, articlesPerPage);
  const currentDocuments = paginate(publishedDocuments, currentDocPage, documentsPerPage);

  // SDG Color Mapping with official UN colors
  const getSDGColor = (sdgId: string): string => {
    const sdgColors: { [key: string]: string } = {
      '1': 'bg-[#E5243B]',
      '2': 'bg-[#DDA63A]',
      '3': 'bg-[#4C9F38]',
      '4': 'bg-[#C5192D]',
      '5': 'bg-[#FF3A21]',
      '6': 'bg-[#26BDE2]',
      '7': 'bg-[#FCC30B]',
      '8': 'bg-[#A21942]',
      '9': 'bg-[#FD6925]',
      '10': 'bg-[#DD1367]',
      '11': 'bg-[#FD9D24]',
      '12': 'bg-[#BF8B2E]',
      '13': 'bg-[#3F7E44]',
      '14': 'bg-[#0A97D9]',
      '15': 'bg-[#56C02B]',
      '16': 'bg-[#00689D]',
      '17': 'bg-[#19486A]'
    };
    return sdgColors[sdgId] || 'bg-gray-600';
  };

  const getSDGName = (sdgId: string): string => {
    const sdgNames: { [key: string]: string } = {
      '1': 'NO POVERTY',
      '2': 'ZERO HUNGER',
      '3': 'GOOD HEALTH',
      '4': 'EDUCATION',
      '5': 'GENDER EQUALITY',
      '6': 'CLEAN WATER',
      '7': 'CLEAN ENERGY',
      '8': 'DECENT WORK',
      '9': 'INDUSTRY',
      '10': 'INEQUALITIES',
      '11': 'CITIES',
      '12': 'CONSUMPTION',
      '13': 'CLIMATE ACTION',
      '14': 'LIFE BELOW WATER',
      '15': 'LIFE ON LAND',
      '16': 'PEACE & JUSTICE',
      '17': 'PARTNERSHIPS'
    };
    return sdgNames[sdgId] || '';
  };

    // ✅ Compact SDG Icons (Fixed duplicate fill warning)
  const getSDGIcon = (sdgId: string) => {
    const icons: { [key: string]: JSX.Element } = {
      '1': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 20c-8 0-15 6-15 15 0 5 2 9 6 12l-11 33h40l-11-33c4-3 6-7 6-12 0-9-7-15-15-15z M35 35c0-8 7-15 15-15s15 7 15 15-7 15-15 15-15-7-15-15z M20 80h60v10H20V80z"/>
        </svg>
      ),
      '2': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 15c-3 0-5 2-5 5v5h10v-5c0-3-2-5-5-5z M30 35c-5 0-10 4-10 10v25h60V45c0-6-5-10-10-10H30z M25 50h10v15H25V50z M40 50h10v15H40V50z M55 50h10v15H55V50z M30 75h40v10H30V75z M70 50h5v10h-5V50z"/>
        </svg>
      ),
      '3': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 20c-17 0-30 13-30 30s13 30 30 30 30-13 30-30-13-30-30-30z M50 75c-14 0-25-11-25-25s11-25 25-25 25 11 25 25-11 25-25 25z M45 35h10v20H45V35z M45 60h10v10H45V60z"/>
          <circle fill="white" cx="70" cy="30" r="8"/>
        </svg>
      ),
      '4': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 15L20 35v50h60V35L50 15z M45 30h10v5H45V30z M30 45h40v30H30V45z M70 40h5v5h-5V40z"/>
        </svg>
      ),
      '5': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <circle fill="white" cx="50" cy="35" r="12"/>
          <path fill="white" d="M50 50c-15 0-25 10-25 20v15h50V70c0-10-10-20-25-20z M35 55h30v5H35V55z"/>
          <path fill="white" d="M65 25h10v10H65V25z M25 25h10v10H25V25z"/>
        </svg>
      ),
      '6': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 20c-15 0-25 10-25 25 0 10 5 18 15 22v18h20V67c10-4 15-12 15-22 0-15-10-25-25-25z M50 65c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z M45 35h10v20H45V35z"/>
        </svg>
      ),
      '7': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <circle fill="white" cx="50" cy="50" r="20"/>
          <path fill="white" d="M50 15v10M50 75v10M15 50h10M75 50h10M25 25l7 7M68 68l7 7M25 75l7-7M68 32l7-7"/>
        </svg>
      ),
      '8': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M20 70l15-30 15 20 20-35 10 45H20z M35 45l10 13 18-31 8 38H28l7-20z"/>
        </svg>
      ),
      '9': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M30 40l20-10 20 10v35H30V40z M50 35l-15 8 15 7 15-7-15-8z M35 48v30h30V48l-15 7-15-7z"/>
          <rect fill="white" x="20" y="55" width="10" height="20"/>
          <rect fill="white" x="70" y="55" width="10" height="20"/>
        </svg>
      ),
      '10': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M20 45h60v10H20V45z M30 30h40v10H30V30z M30 60h40v10H30V60z"/>
          <path fill="white" d="M15 50l10-5v10l-10-5z M85 50l-10-5v10l10-5z"/>
        </svg>
      ),
      '11': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <rect fill="white" x="20" y="40" width="15" height="40"/>
          <rect fill="white" x="40" y="25" width="15" height="55"/>
          <rect fill="white" x="60" y="35" width="20" height="45"/>
          <rect fill="white" x="25" y="50" width="5" height="5"/>
          <rect fill="white" x="45" y="35" width="5" height="5"/>
          <rect fill="white" x="65" y="45" width="5" height="5"/>
          <rect fill="white" x="75" y="45" width="5" height="5"/>
        </svg>
      ),
      '12': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 25c-14 0-25 11-25 25s11 25 25 25 25-11 25-25-11-25-25-25z M50 70c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z"/>
          <path fill="white" d="M50 35c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z M50 60c-6 0-10-4-10-10s4-10 10-10 10 4 10 10-4 10-10 10z"/>
        </svg>
      ),
      '13': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <circle fill="white" cx="50" cy="50" r="25"/>
          <path fill="white" d="M50 30c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z M35 50h30v5H35V50z M50 35v30h-5V35h5z"/>
          <path fill="white" d="M20 25l5 5M75 75l5 5M20 75l5-5M75 25l5-5"/>
        </svg>
      ),
      '14': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 35c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z M50 60c-6 0-10-4-10-10s4-10 10-10 10 4 10 10-4 10-10 10z"/>
          <path fill="white" d="M20 70c10-5 20-5 30 0s20 5 30 0v10H20V70z M25 55c8-4 16-4 25 0s17 4 25 0v5c-8 4-16 4-25 0s-17-4-25 0v-5z"/>
        </svg>
      ),
      '15': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <circle fill="white" cx="50" cy="35" r="15"/>
          <rect fill="white" x="45" y="50" width="10" height="25"/>
          <path fill="white" d="M25 75h50v10H25V75z"/>
          <circle fill="white" cx="35" cy="45" r="3"/>
          <circle fill="white" cx="65" cy="45" r="3"/>
        </svg>
      ),
      '16': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          <path fill="white" d="M50 25l-20 10v35l20 10 20-10V35L50 25z M50 30l15 8v30l-15 8-15-8V38l15-8z"/>
          <path fill="white" d="M45 45h10v25H45V45z M50 35l-3 2v18h6V37l-3-2z"/>
          <circle fill="white" cx="70" cy="30" r="5"/>
        </svg>
      ),
      '17': (
        <svg viewBox="0 0 100 100" className="w-4 h-4">
          {/* ✅ FIXED: Removed duplicate fill="white" */}
          <circle fill="none" cx="50" cy="50" r="20" stroke="white" strokeWidth="3" />
          <circle fill="white" cx="50" cy="30" r="8"/>
          <circle fill="white" cx="70" cy="50" r="8"/>
          <circle fill="white" cx="50" cy="70" r="8"/>
          <circle fill="white" cx="30" cy="50" r="8"/>
        </svg>
      )
    };
    return icons[sdgId] || null;
  };

  // ===== Loader =====
  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-4 border-green-600 rounded-full mb-6"></div>
        <p className="text-green-600 text-lg font-medium">Loading content...</p>
      </div>
    );
  }

  // ===== Error =====
  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-4">⚠️ Something Went Wrong</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  // ===== UI =====
  return (
    <div className="pt-16 min-h-screen bg-gray-50" id="top">
      {/* ===== Hero Section ===== */}
      <section className="bg-green-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/articles.png"
            alt="GreenCare Rwanda Facility"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Latest Articles</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Stay updated with sustainability, waste management, and composting insights.
          </p>
        </div>
      </section>

      {/* ===== Main Section ===== */}
      <section className="py-16 container mx-auto px-4 grid lg:grid-cols-3 gap-10">
        {/* ===== Articles Section ===== */}
        <div className="lg:col-span-2">
          {articles.length === 0 ? (
            <div className="bg-white text-center py-16 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Articles Yet</h3>
              <p className="text-gray-500">Check back soon for new updates.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {currentArticles.map((article) => (
                  <div
                    key={article._id}
                    onClick={() => (window.location.href = `/blog/${article.slug}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all"
                  >
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                        }}
                      />
                      {/* ✅ COMPACT: Small SDG Badges with Icons */}
                      {article.sdgs && article.sdgs.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2">
                          <div className="flex flex-wrap gap-1.5">
                            {article.sdgs.slice(0, 4).map((sdgId: string) => (
                              <div
                                key={sdgId}
                                className={`${getSDGColor(sdgId)} text-white rounded-sm p-1 min-w-[60px] flex flex-col items-center justify-center shadow-lg`}
                                title={`SDG ${sdgId}: ${getSDGName(sdgId)}`}
                              >
                                {/* SDG Number & Icon Row */}
                                <div className="flex items-center gap-0.5 mb-0.5">
                                  <span className="text-xs font-bold leading-none">{sdgId}</span>
                                  {getSDGIcon(sdgId)}
                                </div>
                                {/* SDG Name */}
                                <span className="text-[5px] font-bold text-center leading-tight uppercase tracking-tighter">
                                  {getSDGName(sdgId)}
                                </span>
                              </div>
                            ))}
                            {article.sdgs.length > 4 && (
                              <div className="bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-sm flex items-center justify-center">
                                +{article.sdgs.length - 4}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2 flex gap-2 items-center">
                        <span className="text-green-700 font-medium">{article.author}</span>
                        <span>•</span>
                        <time>{new Date(article.createdAt).toLocaleDateString()}</time>
                      </div>
                      <h2 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h2>
                      <p className="text-gray-600 line-clamp-3">{article.description}</p>
                      <span className="text-green-600 mt-3 inline-block font-semibold">
                        Read More →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ===== Article Pagination ===== */}
              {articles.length > articlesPerPage && (
                <div className="mt-10 flex justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-2 text-gray-700">
                    Page {currentPage} / {Math.ceil(articles.length / articlesPerPage)}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) =>
                        p < Math.ceil(articles.length / articlesPerPage) ? p + 1 : p
                      )
                    }
                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ===== Documents Sidebar ===== */}
        <aside className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-20">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Published Documents</h2>

          {publishedDocuments.length === 0 ? (
            <p className="text-gray-500 text-center">No documents available</p>
          ) : (
            <>
              {currentDocuments.map((doc) => {
                const cleanUrl = `${API_BASE}${doc.fileUrl.startsWith("/") ? "" : "/"}${doc.fileUrl}`;
                return (
                  <div key={doc._id} className="mb-5 pb-5 border-b last:border-none">
                    <h3 className="font-semibold text-gray-800 mb-2">{doc.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{doc.description}</p>
                    <button
                      onClick={() => {
                        const newTab = window.open(cleanUrl, '_blank');
                        if (newTab) {
                          newTab.focus();
                        } else {
                          alert('Please allow popups to download the document.');
                        }
                      }}
                      className="text-blue-600 text-sm hover:underline text-left"
                    >
                      📄 Download PDF
                    </button>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}

              {publishedDocuments.length > documentsPerPage && (
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setCurrentDocPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 text-sm"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 text-gray-700 text-sm">
                    Page {currentDocPage} / {Math.ceil(publishedDocuments.length / documentsPerPage)}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentDocPage((p) =>
                        p < Math.ceil(publishedDocuments.length / documentsPerPage) ? p + 1 : p
                      )
                    }
                    className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </aside>
      </section>
    </div>
  );
}