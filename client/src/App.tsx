import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Blog from './pages/Blog'
import Team from './pages/Ourteam'
import ArticleDetail from './pages/ArticleDetail'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import ArticleManagement from './pages/ArticleManagement'
import ProductManagement from './pages/ProductManagement'
import ProtectedRoute from './components/ProtectedRoute'
import { ErrorBoundary } from './components/ErrorBoundary'
import Order from './pages/Order'
import OrderManagement from './pages/ManagementOrder'
import MessageManagement from './pages/MessageManagement'
import PartnerManagement from './pages/PartnerManagement'
import AdminPublishedDocuments from './components/AdminPublishedDocuments'
import TestimonialManagement from './pages/TestimonialManagement'
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/order" element={<Order />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ourteam" element={<Team/>} />
            <Route path="/blog/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/users" element={<UserManagement />} />
              <Route path="/dashboard/articles" element={<ArticleManagement />} />
              <Route path="/dashboard/products" element={<ProductManagement />} />
              <Route path="/dashboard/orders" element={<OrderManagement/>} />
              <Route path="/dashboard/messages" element={<MessageManagement/>} />
              <Route path="/dashboard/partners" element={<PartnerManagement/>} />
              <Route path="/dashboard/testimonials" element={<TestimonialManagement/>} />
              <Route path="/dashboard/docs" element={<AdminPublishedDocuments/>} />
              

              </Route>
          </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App