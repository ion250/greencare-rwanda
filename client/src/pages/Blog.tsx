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

        // ✅ Published Documents 
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
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                      }}
                    />
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

        {/* ===== Documents Sidebar (UNCHANGED) ===== */}
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