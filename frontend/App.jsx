import { Routes, Route } from 'react-router-dom'
import { AdminProvider } from './context/AdminContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import Home from './pages/Home'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminBlog from './pages/AdminBlog'
import AdminBlogEditor from './pages/AdminBlogEditor'
import AdminSubscribers from './pages/AdminSubscribers'
import BlogPost from './pages/BlogPost'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/blog" 
              element={
                <ProtectedAdminRoute>
                  <AdminBlog />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/blog/new" 
              element={
                <ProtectedAdminRoute>
                  <AdminBlogEditor />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/blog/edit/:id" 
              element={
                <ProtectedAdminRoute>
                  <AdminBlogEditor />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/blog/subscribers" 
              element={
                <ProtectedAdminRoute>
                  <AdminSubscribers />
                </ProtectedAdminRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </AdminProvider>
  )
}

export default App
