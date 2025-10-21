// src/pages/ArticleDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// Fix API_BASE to ensure trailing slash
const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, '') + '/' ;

interface Article {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  description: string;
  slug: string;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageMode, setImageMode] = useState<'fit' | 'original'>('fit');

  // Helper: Format image URL using API_BASE
  const formatImageUrl = (imagePath: string): string => {
    if (!imagePath) return '/uploads/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE}${imagePath.replace(/^\//, '')}`;
  };

  // ✅ SHARE URL GENERATOR
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`;
    }
    return '';
  };

// ✅ CLEAN SHARE FUNCTION - NO BOLDING, JUST TITLE + DESCRIPTION + URL
const shareTo = (platform: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin') => {
  const articleUrl = getShareUrl();
  const title = article?.title || 'Check out this article';
  const description = article?.description || '';

  let shareUrl = '';

  switch (platform) {
    case 'whatsapp':
      const whatsappText = encodeURIComponent(`${title}\n\n${description}\n\n${articleUrl}`);
      shareUrl = `https://wa.me/?text=${whatsappText}`;
      break;
    case 'facebook':
      const facebookQuote = encodeURIComponent(`${title}\n\n${description}`);
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}&quote=${facebookQuote}`;
      break;
    case 'twitter':
      const tweetText = encodeURIComponent(`${title}\n\n${description}\n\n${articleUrl}`);
      shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      break;
    case 'linkedin':
      const linkedinSummary = encodeURIComponent(`${title}\n\n${description}`);
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}&summary=${linkedinSummary}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
};

  useEffect(() => {
    fetchArticleData();
  }, [slug]);

  const fetchArticleData = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('authToken');
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

      // ✅ FIXED: Handle { success: true, article: {...} } response
      const res = await axios.get<{ success: boolean; article: Article }>(
        `${API_BASE}api/articles/${slug}`,
        config
      );

      if (!res.data.success || !res.data.article) {
        throw new Error('Article not found');
      }

      const formattedArticle = {
        ...res.data.article,
        image: formatImageUrl(res.data.article.image),
      };
      setArticle(formattedArticle);

      // Fetch all articles for related
      const articlesRes = await axios.get<{ success: boolean; articles: Article[] }>(
        `${API_BASE}api/articles`,
        config
      );
      const allArticles = articlesRes.data.articles || [];

      // Filter: different author, exclude current
      const filteredRelated = allArticles
        .filter((a) => a.slug !== slug && a.author !== res.data.article.author)
        .slice(0, 3)
        .map((a) => ({
          ...a,
          image: formatImageUrl(a.image),
        }));

      setRelatedArticles(filteredRelated);
    } catch (err: any) {
      console.error('Error fetching article:', err);
      setError(err.response?.status === 404 ? 'Article not found.' : 'Failed to load article.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="animate-spin h-12 w-12 border-t-4 border-green-600 rounded-full"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Article Not Found'}</h1>
          <Link to="/blog" className="text-green-600 hover:text-green-800">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Main Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-8/12">
                <article className="bg-white rounded-lg shadow-md p-6">
                  {/* Image Display Controls */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Image View:</h2>
                    <div className="flex bg-gray-200 rounded-lg p-1">
                      <button
                        onClick={() => setImageMode('fit')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          imageMode === 'fit'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        Fit to Screen
                      </button>
                      <button
                        onClick={() => setImageMode('original')}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          imageMode === 'original'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        Original Size
                      </button>
                    </div>
                  </div>

                  {/* Article Image */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className={
                      imageMode === 'fit'
                        ? 'w-full h-64 md:h-96 object-cover rounded-lg mb-8'
                        : 'max-w-full h-auto rounded-lg mb-8'
                    }
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                    }}
                  />

                  {/* Article Meta */}
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="font-medium text-green-700">{article.author}</span>
                    <span className="mx-2">•</span>
                    <time>{new Date(article.createdAt).toLocaleDateString()}</time>
                  </div>

                  {/* Title & Description */}
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                  <p className="text-lg text-gray-700 italic mb-6">{article.description}</p>

                  {/* Article Content */}
                  <div
                    className="prose prose-green max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  {/* ✅ SHARE SECTION WITH WORKING BUTTONS */}
                  <section className="py-8 mt-10 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Share This Article</h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => shareTo('whatsapp')}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </svg>
                        WhatsApp
                      </button>
                      <button
                        onClick={() => shareTo('facebook')}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </button>
                      <button
                        onClick={() => shareTo('twitter')}
                        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        X (Twitter)
                      </button>
                      <button
                        onClick={() => shareTo('linkedin')}
                        className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>
                    </div>
                  </section>
                </article>

                {/* Related Articles - 3 FROM DIFFERENT AUTHORS */}
                {relatedArticles.length > 0 && (
                  <section className="mt-10 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-3xl font-bold text-green-800 mb-6">More Articles You Might Like</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedArticles.map((rel) => (
                        <Link
                          key={rel._id}
                          to={`/blog/${rel.slug}`}
                          className="block group hover:scale-[1.02] transform transition-all duration-200"
                        >
                          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg">
                            <img
                              src={rel.image}
                              alt={rel.title}
                              className="w-full h-36 object-cover"
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                              }}
                            />
                            <div className="p-4">
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <span>{rel.author}</span>
                                <span className="mx-1">•</span>
                                <time>{new Date(rel.createdAt).toLocaleDateString()}</time>
                              </div>
                              <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-green-700">
                                {rel.title}
                              </h3>
                              <p className="text-gray-700 text-sm mt-2 line-clamp-3">{rel.description}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar: Social Links */}
              <div className="lg:w-4/12">
                <div className="sticky top-24 space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Connect With Us</h2>
                    <p className="text-sm text-gray-600 mb-6">Follow us for more sustainability updates.</p>

                    <div className="space-y-4">
                      <a
                        href="https://x.com/GreencareRwanda"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <span>X (Twitter)</span>
                      </a>

                      <a
                        href="https://web.facebook.com/profile.php?id=100063590337079"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Facebook</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/company/106267198/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>

                      <a
                        href="https://www.youtube.com/@greencarerwandaltd2788"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                        </svg>
                        <span>YouTube</span>
                      </a>
                    </div>
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