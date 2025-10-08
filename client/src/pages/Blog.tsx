import { useState, useEffect } from 'react';

import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE;
// Types
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
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDocPage, setCurrentDocPage] = useState(1);

  const articlesPerPage = 8;
  const documentsPerPage = 3;

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('authToken');
        const config = token ? { headers: { Authorization: token } } : {};

        // Fetch articles
        const articleRes = await axios.get(`${API_BASE}api/articles`, config);
        const formattedArticles = articleRes.data.map((article: Article) => ({
          ...article,
          image: article.image
            ? article.image.startsWith('http')
              ? article.image
              : `${API_BASE}${article.image}`
            : '/uploads/placeholder.jpg',
        }));
        setArticles(formattedArticles);

        // Fetch published documents
        const docRes = await axios.get(`${API_BASE}api/documents`);
        const sortedDocs = docRes.data.documents.sort(
          (a: PublishedDocument, b: PublishedDocument) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPublishedDocuments(sortedDocs);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pagination for Articles
  const totalArticlePages = Math.ceil(articles.length / articlesPerPage);
  const startArticleIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startArticleIndex, startArticleIndex + articlesPerPage);

  const nextArticlePage = () => currentPage < totalArticlePages && setCurrentPage(currentPage + 1);
  const prevArticlePage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToArticlePage = (page: number) => setCurrentPage(page);

  // Pagination for Documents
  const totalDocPages = Math.ceil(publishedDocuments.length / documentsPerPage);
  const startDocIndex = (currentDocPage - 1) * documentsPerPage;
  const currentDocuments = publishedDocuments.slice(startDocIndex, startDocIndex + documentsPerPage);

  const nextDocPage = () => currentDocPage < totalDocPages && setCurrentDocPage(currentDocPage + 1);
  const prevDocPage = () => currentDocPage > 1 && setCurrentDocPage(currentDocPage - 1);
  const goToDocPage = (page: number) => setCurrentDocPage(page);

  // Loading State
  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-6">Latest Articles</h1>
          <p className="text-green-600 text-lg">Loading content...</p>
          <div className="flex justify-center mt-8">
            <div className="animate-spin h-12 w-12 border-t-4 border-green-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-red-800 mb-4">Oops! Something Went Wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50" id="top">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/articles.png"
            alt="GreenCare Rwanda Waste Processing Facility"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Latest Articles</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Stay informed about sustainability practices, waste management innovations, and the benefits of composting.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles Grid */}
            <div className="lg:col-span-2">
              {articles.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-4 text-2xl font-bold text-gray-700">No Articles Yet</h3>
                  <p className="mt-2 text-gray-500">Check back soon for insightful updates and stories.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentArticles.map((article) => (
                      <article
                        key={article._id}
                        onClick={() => (window.location.href = `/blog/${article.slug}`)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            window.location.href = `/blog/${article.slug}`;
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Read article: ${article.title}`}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all cursor-pointer"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span className="font-medium text-green-700">{article.author}</span>
                            <span className="mx-2">•</span>
                            <time dateTime={article.createdAt}>
                              {new Date(article.createdAt).toLocaleDateString()}
                            </time>
                          </div>
                          <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{article.title}</h2>
                          <p className="text-gray-700 mb-4 line-clamp-3">{article.description}</p>
                          <div className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold group">
                            Read More →
                            <svg
                              className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalArticlePages > 1 && (
                    <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <p className="text-gray-600">
                        Page {currentPage} of {totalArticlePages} • Showing{' '}
                        {startArticleIndex + 1}-{Math.min(startArticleIndex + articlesPerPage, articles.length)} of {articles.length} articles
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={prevArticlePage}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            currentPage === 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          Previous
                        </button>
                        {Array.from({ length: totalArticlePages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToArticlePage(page)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={nextArticlePage}
                          disabled={currentPage === totalArticlePages}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            currentPage === totalArticlePages
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Published Documents */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Published Documents
                </h2>

                {publishedDocuments.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>No documents available</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {currentDocuments.map((doc) => (
                        <div key={doc._id} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <h3 className="font-bold text-gray-800 mb-2">{doc.title}</h3>
                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{doc.description}</p>
                          <a
                            href={`${API_BASE}${doc.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            View PDF
                          </a>
                          <div className="text-xs text-gray-500 mt-2">
                            {new Date(doc.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Document Pagination */}
                    {totalDocPages > 1 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={prevDocPage}
                            disabled={currentDocPage === 1}
                            className={`p-2 rounded ${currentDocPage === 1 ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <div className="flex space-x-1">
                            {Array.from({ length: totalDocPages }, (_, i) => i + 1).map((page) => (
                              <button
                                key={page}
                                onClick={() => goToDocPage(page)}
                                className={`w-8 h-8 rounded font-medium ${
                                  currentDocPage === page
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={nextDocPage}
                            disabled={currentDocPage === totalDocPages}
                            className={`p-2 rounded ${currentDocPage === totalDocPages ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-6 pt-16">
                <h2 className="text-2xl font-bold text-green-800 mb-6">Connect With Us</h2>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="https://www.youtube.com/@greencarerwandaltd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-800 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/GreencareRwanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-800 transition-colors"
                    aria-label="X"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/106267198/admin/dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://web.facebook.com/profile.php?id=100063590337079"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}