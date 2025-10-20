import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('authToken');

  const isActive = (path: string) => {
    return window.location.pathname === path ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600';
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/images/g-logo.png" 
                alt="GreenCare Rwanda Logo" 
                className="h-[80px] w-auto"
              />
            </Link>
          </div>          
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/about')}`}>
              About
            </Link>
            <Link to="/products" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/products')}`}>
              Products
            </Link>
            <Link to="/services" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/services')}`}>
              Services
            </Link>
            <Link to="/blog" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/blog')}`}>
              Blog
            </Link>
            <Link to="/ourteam" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/ourteam')}`}>
              Our Team
            </Link>
            <Link to="/contact" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/contact')}`}>
              Contact
            </Link>
            
            {/* Only show Logout button when logged in */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/products"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/products')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/services"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/services')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/blog')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Our Team
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          
          {/* Only show Logout button when logged in for mobile */}
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left mt-2 bg-red-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}