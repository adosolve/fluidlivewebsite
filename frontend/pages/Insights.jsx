import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import SEO from '../components/SEO'

export default function Insights() {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

  useEffect(() => {
    // Initial fetch
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/blog`)
        const data = await res.json()
        if (data.success) {
          setInsights(data.posts)
        }
      } catch (err) {
        console.error('Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()

    // Socket.IO real-time connection
    const socket = io(backendUrl)

    socket.on('blog:created', (post) => {
      if (post.published) {
        setInsights((prev) => [post, ...prev])
      }
    })

    socket.on('blog:updated', (updatedPost) => {
      setInsights((prev) => {
        // If post is now unpublished, remove it
        if (!updatedPost.published) {
          return prev.filter(p => p.id !== updatedPost.id)
        }
        // If post exists, update it; if it's newly published, add it
        const exists = prev.find(p => p.id === updatedPost.id)
        if (exists) {
          return prev.map(p => p.id === updatedPost.id ? updatedPost : p)
        }
        return [updatedPost, ...prev]
      })
    })

    socket.on('blog:deleted', (postId) => {
      setInsights((prev) => prev.filter(p => p.id !== postId))
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="pt-4">
      <SEO
        title="Insights"
        path="/insights"
        description="Perspectives on AI strategy, technology, and the future of intelligent business from the Fluid.Live team."
        keywords="AI insights, AI blog, technology trends, AI strategy, digital transformation articles"
      />
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="overline">LATEST THINKING</span>
            <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
              <span className="gradient-text">Insights</span> & Thinking
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Perspectives on AI strategy, technology, and the future of intelligent business.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4">Loading insights...</p>
            </div>
          ) : insights.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No insights published yet.</p>
              <p className="text-gray-400 mt-2">Check back soon for fresh perspectives on AI and business.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight) => (
                <Link 
                  to={`/insights/${insight.slug}`}
                  key={insight.id}
                  className="group p-8 card card-hover cursor-pointer block"
                >
                  <span className="overline inline-block mb-4" style={{color: '#4F8CFF'}}>
                    {insight.category}
                  </span>
                  
                  <h2 className="text-2xl font-medium mb-3 group-hover:text-blue-600 transition text-gray-900" style={{letterSpacing: '-0.02em'}}>
                    {insight.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {insight.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(insight.createdAt).toLocaleDateString()}</span>
                    <span>{insight.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch(`${backendUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', message: data.message })
        setEmail('')
      } else {
        setStatus({ type: 'error', message: data.error })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to subscribe. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="text-center mt-16 p-12 bg-blue-50 rounded-2xl border border-gray-200">
      <h2 className="text-3xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Want to stay updated?</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Subscribe to our newsletter for the latest insights on AI and business transformation.
      </p>
      <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
        <input 
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50"
        >
          {isSubmitting ? '...' : 'Subscribe'}
        </button>
      </form>
      {status.message && (
        <p className={`text-sm mt-4 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}
    </div>
  )
}
