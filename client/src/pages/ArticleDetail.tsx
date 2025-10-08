import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE;
interface Article {
  _id: string
  title: string
  content: string
  image: string
  author: string
  createdAt: string
  description: string
  slug: string
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageMode, setImageMode] = useState<'fit' | 'original'>('fit')

  useEffect(() => {
    fetchArticleData()
  }, [slug])

  const fetchArticleData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      const config = token ? { 
        headers: { 'Authorization': token } 
      } : {};

      // Fetch the main article
      const articleResponse = await axios.get(`${API_BASE}api/articles/${slug}`, config)
      
      // Format the article image URL
      const formattedArticle = {
        ...articleResponse.data,
        image: articleResponse.data.image ? 
          (articleResponse.data.image.startsWith('http') ? 
            articleResponse.data.image : 
            `${API_BASE}${articleResponse.data.image}`) : 
          '/uploads/placeholder.jpg'
      };
      
      setArticle(formattedArticle);

      // Fetch related articles (other articles from the same author)
      const articlesResponse = await axios.get(`${API_BASE}api/articles`, config)
      
      // Format image URLs for related articles
      const formattedArticles = articlesResponse.data
        .filter((a: Article) => a.slug !== slug)
        .slice(0, 3)
        .map((a: Article) => ({
          ...a,
          image: a.image ? 
            (a.image.startsWith('http') ? 
              a.image : 
              `${API_BASE}${a.image}`) : 
            '/uploads/placeholder.jpg'
        }));
      
      setRelatedArticles(formattedArticles);
      
    } catch (error: any) {
      console.error('Error fetching article:', error)
      setError('Failed to load article. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Article Not Found'}</h1>
            <Link to="/blog" className="text-green-600 hover:text-green-800">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16"> {/* Add padding to account for fixed navbar */}
      <div className="min-h-screen bg-gray-50">
        {/* Article Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Article and Related Articles */}
                <div className="lg:w-8/12">
                  {/* Article Hero */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-700">Image Display:</h2>
                      <div className="flex bg-gray-200 rounded-lg p-1">
                        <button
                          onClick={() => setImageMode('fit')}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            imageMode === 'fit' 
                              ? 'bg-white text-gray-900 shadow-sm' 
                              : 'text-gray-700 hover:text-gray-900'
                          }`}
                        >
                          Fit to Container
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
                    
                    <div className={`relative ${imageMode === 'original' ? 'flex justify-center' : ''}`}>
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className={
                          imageMode === 'fit' 
                            ? "w-full h-64 md:h-96 object-cover rounded-lg mb-8" 
                            : "max-w-full h-auto rounded-lg mb-8"
                        }
                        style={imageMode === 'original' ? { maxWidth: '100%', height: 'auto' } : {}}
                        onError={(e) => {
                          // Handle image loading error
                          (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <span>{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-4xl font-bold text-green-800 mb-6">{article.title}</h1>
                    <p className="text-lg text-gray-700 italic mb-8">{article.description}</p>
                    
                    {/* Article Content */}
                    <div 
                      className="prose prose-green max-w-none"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    
                    {/* Share Section */}
                    <section className="py-8 mt-8 bg-white rounded-lg shadow-md">
                      <div className="text-center">
                        <p className="text-gray-700 mb-6">Found this article helpful? Share it with others!</p>
                        <div className="flex justify-center space-x-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Share on Facebook
                          </button>
                          <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors">
                            Share on Twitter
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                            Share on LinkedIn
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                  
                  {/* Related Articles */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-green-800 mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedArticles.map((relatedArticle) => (
                        <article key={relatedArticle._id} className="border-b border-gray-200 pb-6 last:border-b-0 md:border-b-0 md:pb-0">
                          <div className="aspect-w-16 aspect-h-9 mb-4">
                            <img 
                              src={relatedArticle.image} 
                              alt={relatedArticle.title}
                              className="w-full h-24 object-cover rounded"
                              onError={(e) => {
                                // Handle image loading error
                                (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                              }}
                            />
                          </div>
                          <div>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <span>{relatedArticle.author}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(relatedArticle.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-lg font-bold text-green-800 mb-2">{relatedArticle.title}</h3>
                            <p className="text-gray-700 text-sm mb-3 line-clamp-2">{relatedArticle.description}</p>
                            <Link 
                              to={`/blog/${relatedArticle.slug}`}
                              className="text-green-600 font-semibold hover:text-green-800 text-sm inline-flex items-center"
                            >
                              Read More →
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right Sidebar - Social Media Icons */}
                <div className="lg:w-4/12">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-2xl font-bold text-green-800 mb-6">Connect With Us</h2>
                      
                      
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-4 text-center">Follow us for more updates and insights:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <a 
                            href="https://x.com/GreencareRwanda" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            X (Twitter)
                          </a>
                          <a 
                            href="https://web.facebook.com/profile.php?id=100063590337079" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                          </a>
                          <a 
                            href="https://www.linkedin.com/company/106267198/admin/dashboard/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors text-sm font-medium flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                          </a>
                          <a 
                            href="https://www.youtube.com/@greencarerwandaltd" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}