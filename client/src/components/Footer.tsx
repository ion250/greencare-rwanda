import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken');

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Redirect to home page
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">GreenCare Rwanda</h3>
            <p className="text-green-100 mb-4">
              Turning bio-waste into solutions for a greener Rwanda.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://x.com/GreencareRwanda" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://web.facebook.com/profile.php?id=100063590337079" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/106267198/admin/dashboard/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@greencarerwandaltd2788" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-green-100 hover:text-white">Home</a></li>
              <li><a href="/about" className="text-green-100 hover:text-white">About</a></li>
              <li><a href="/products" className="text-green-100 hover:text-white">Products</a></li>
              <li><a href="/services" className="text-green-100 hover:text-white">Services</a></li>
              <li><a href="/blog" className="text-green-100 hover:text-white">Blog</a></li>
              <li><a href="/contact" className="text-green-100 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-green-100">Nduba Sector, Kigali, Rwanda</p>
              <a 
                href="https://www.google.com/maps/place/Greencare+Rwanda+ltd/@-1.8762084,30.1069311,1127m/data=!3m2!1e3!4b1!4m6!3m5!1s0x19dca139c45733c3:0x90555dc2f3afdd3f!8m2!3d-1.8762138!4d30.109506!16s%2Fg%2F11yc0yzy0h?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white text-sm font-medium inline-flex items-center mt-1"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View on Google Maps
              </a>
              <p className="text-green-100">info@greencarerwanda.com</p>
              <p className="text-green-100">+250 796 142 965 CUSTOMER CARE</p>
              <p className="text-green-100">+250 784 030 834 OFFICE</p>
              
              {/* Login/Logout buttons */}
              <div className="mt-4 pt-4 border-t border-green-700">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors w-full text-center"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors w-full text-center"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p>&copy; 2023 GreenCare Rwanda Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}