import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

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

interface SocialPost {
  id: string
  platform: 'facebook' | 'twitter'
  content: string
  image?: string
  timestamp: string
  url: string
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([])
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
      const articleResponse = await axios.get(`http://localhost:5000/api/articles/${slug}`, config)
      
      // Format the article image URL
      const formattedArticle = {
        ...articleResponse.data,
        image: articleResponse.data.image ? 
          (articleResponse.data.image.startsWith('http') ? 
            articleResponse.data.image : 
            `http://localhost:5000${articleResponse.data.image}`) : 
          '/uploads/placeholder.jpg'
      };
      
      setArticle(formattedArticle);

      // Fetch related articles (other articles from the same author)
      const articlesResponse = await axios.get('http://localhost:5000/api/articles', config)
      
      // Format image URLs for related articles
      const formattedArticles = articlesResponse.data
        .filter((a: Article) => a.slug !== slug)
        .slice(0, 3)
        .map((a: Article) => ({
          ...a,
          image: a.image ? 
            (a.image.startsWith('http') ? 
              a.image : 
              `http://localhost:5000${a.image}`) : 
            '/uploads/placeholder.jpg'
        }));
      
      setRelatedArticles(formattedArticles);

      // Mock social media posts (in a real app, this would come from API calls to Facebook/Twitter)
      const mockSocialPosts: SocialPost[] = [
        {
          id: '1',
          platform: 'facebook',
          content: 'Just read an amazing article about sustainable farming practices in Rwanda. The insights on composting are game-changing!',
          image: 'https://example.com/fb-post1.jpg',
          timestamp: '2023-06-15T10:30:00Z',
          url: 'https://facebook.com/greencarerwanda/posts/1'
        },
        {
          id: '2',
          platform: 'twitter',
          content: 'Innovative plastic recycling solutions are transforming waste management in Rwanda. Check out this insightful article!',
          timestamp: '2023-06-14T15:45:00Z',
          url: 'https://twitter.com/greencarerwanda/status/1'
        },
        {
          id: '3',
          platform: 'facebook',
          content: 'Our team is proud to contribute to a greener Rwanda through sustainable waste management practices.',
          image: 'https://example.com/fb-post2.jpg',
          timestamp: '2023-06-13T09:15:00Z',
          url: 'https://facebook.com/greencarerwanda/posts/2'
        },
        {
          id: '4',
          platform: 'twitter',
          content: 'Did you know that proper composting can reduce household waste by up to 30%? Learn how in our latest article.',
          timestamp: '2023-06-12T13:20:00Z',
          url: 'https://twitter.com/greencarerwanda/status/2'
        }
      ];
      
      setSocialPosts(mockSocialPosts);
      
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
                
                {/* Right Sidebar - Latest Updates */}
                <div className="lg:w-4/12">
                  <div className="sticky top-24">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-2xl font-bold text-green-800 mb-6">Latest Updates</h2>
                      <div className="space-y-6">
                        {socialPosts.map((post) => (
                          <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="flex items-center mb-2">
                              {post.platform === 'facebook' ? (
                                <svg className="h-5 w-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                              )}
                              <span className="text-sm font-medium text-gray-700 capitalize">{post.platform}</span>
                            </div>
                            
                            <p className="text-gray-700 text-sm mb-2">{post.content}</p>
                            
                            {post.image && (
                              <div className="mb-2">
                                <img 
                                  src={post.image} 
                                  alt="Social post" 
                                  className="w-full h-24 object-cover rounded"
                                />
                              </div>
                            )}
                            
                            <a 
                              href={post.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-600 text-xs hover:text-green-800"
                            >
                              View on {post.platform}
                            </a>
                            
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(post.timestamp).toLocaleDateString()} at {new Date(post.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-4">Follow us for more updates:</p>
                        <div className="flex space-x-4">
                          <a 
                            href="https://facebook.com/greencarerwanda" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Facebook
                          </a>
                          <a 
                            href="https://twitter.com/greencarerwanda" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-400 text-white px-3 py-1 rounded text-sm hover:bg-blue-500"
                          >
                            Twitter
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