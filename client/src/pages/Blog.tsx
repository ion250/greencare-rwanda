import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Article {
  _id: string
  title: string
  description: string
  image: string
  author: string
  createdAt: string
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

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([])
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchArticles()
    fetchSocialPosts()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('authToken');
      const config = token ? { 
        headers: { 'Authorization': token } 
      } : {};

      const response = await axios.get('http://localhost:5000/api/articles', config)
      
      // Format the image URLs to ensure they're complete
      const formattedArticles = response.data.map((article: Article) => ({
        ...article,
        image: article.image ? 
          (article.image.startsWith('http') ? 
            article.image : 
            `http://localhost:5000${article.image}`) : 
          '/uploads/placeholder.jpg'
      }));
      
      setArticles(formattedArticles)
    } catch (error: any) {
      console.error('Error fetching articles:', error)
      setError('Failed to load articles. Please try again later.')
    }
  }

  const fetchSocialPosts = async () => {
    // In a real app, this would fetch from Facebook/Twitter APIs
    // For now, using mock data
    const mockPosts: SocialPost[] = [
      {
        id: '1',
        platform: 'facebook',
        content: 'Just launched our new composting initiative in Kigali! Over 100 households have joined our program to reduce organic waste.',
        timestamp: '2023-06-15T10:30:00Z',
        url: 'https://facebook.com/greencarerwanda/posts/1'
      },
      {
        id: '2',
        platform: 'twitter',
        content: 'Excited to announce our partnership with the Ministry of Environment to expand recycling programs across Rwanda!',
        timestamp: '2023-06-14T15:45:00Z',
        url: 'https://twitter.com/greencarerwanda/status/1'
      },
      {
        id: '3',
        platform: 'facebook',
        content: 'Our team at work transforming organic waste into premium Grekompost. Every ton of waste diverted from landfills makes a difference!',
        image: 'https://example.com/team-working.jpg',
        timestamp: '2023-06-13T09:15:00Z',
        url: 'https://facebook.com/greencarerwanda/posts/2'
      },
      {
        id: '4',
        platform: 'twitter',
        content: 'Did you know? Proper composting can reduce household waste by up to 30%! Learn how to get started with our free guide.',
        timestamp: '2023-06-12T13:20:00Z',
        url: 'https://twitter.com/greencarerwanda/status/2'
      },
      {
        id: '5',
        platform: 'facebook',
        content: 'Celebrating 300+ green jobs created through our training programs! Empowering communities while protecting our environment.',
        timestamp: '2023-06-10T08:00:00Z',
        url: 'https://facebook.com/greencarerwanda/posts/3'
      }
    ];
    
    setSocialPosts(mockPosts);
  }

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchArticles(), fetchSocialPosts()]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Latest Articles</h1>
            <p className="text-green-600">Loading articles...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-red-800 mb-4">Error</h1>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => {
              setError('');
              setLoading(true);
              fetchArticles();
            }}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50" id="top">
     
      {/* Blog Hero */}
      <section className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Latest Articles</h1>
          <p className="text-xl opacity-90">Stay informed about sustainability practices, waste management innovations, and the benefits of composting.</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles */}
            <div className="lg:col-span-2">
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-700">No articles available at the moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articles.map((article) => (
                    <article key={article._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          // Handle image loading error
                          (e.target as HTMLImageElement).src = '/uploads/placeholder.jpg';
                        }}
                      />
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h2 className="text-xl font-bold text-green-800 mb-3">{article.title}</h2>
                        <p className="text-gray-700 mb-4">{article.description}</p>
                        <Link 
                          to={`/blog/${article.slug}`}
                          className="text-green-600 font-semibold hover:text-green-800 transition-colors inline-flex items-center"
                        >
                          Read More →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Latest Updates from Social Media */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
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
      </section>
    </div>
  )
}