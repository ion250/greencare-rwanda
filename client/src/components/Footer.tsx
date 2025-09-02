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

  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GreenCare Rwanda</h3>
            <p className="text-green-100">
              Turning bio-waste into solutions for a greener Rwanda.
            </p>
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
              <p className="text-green-100">Kigali, Rwanda</p>
              <p className="text-green-100">info@greencarerwandaltd.com</p>
              <p className="text-green-100">+250 796 142 965</p>
              
              {/* Logout button - only show when logged in */}
              {isLoggedIn && (
                <div className="mt-4 pt-4 border-t border-green-700">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors w-full text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
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