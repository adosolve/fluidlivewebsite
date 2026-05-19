import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import About from './pages/About'
import Insights from './pages/Insights'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import AdminBlog from './pages/AdminBlog'
import AdminBlogEditor from './pages/AdminBlogEditor'
import AdminSubscribers from './pages/AdminSubscribers'
import BlogPost from './pages/BlogPost'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
  return (
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
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
          <Route path="/admin/blog/edit/:id" element={<AdminBlogEditor />} />
          <Route path="/admin/blog/subscribers" element={<AdminSubscribers />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}

export default App
