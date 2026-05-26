import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut } from 'lucide-react'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'
import { useAdmin } from '../context/AdminContext'

export default function AdminBlog() {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAdmin()
  const [posts, setPosts] = useState([])
  const [toast, setToast] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login')
    } else {
      const token = localStorage.getItem('blog_token')
      if (token) {
        fetchPosts(token)
      }
    }
  }, [isAuthenticated, navigate])

  const fetchPosts = async (token) => {
    try {
      const res = await fetch(`${backendUrl}/api/blog/all`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) setPosts(data.posts)
      else if (res.status === 401) {
        localStorage.removeItem('blog_token')
        logout()
        navigate('/admin/login')
      }
    } catch (err) {
      console.error('Failed to fetch posts')
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem('blog_token')
    try {
      const res = await fetch(`${backendUrl}/api/blog/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        setToast({ type: 'success', message: 'Post deleted successfully.' })
        fetchPosts(token)
      } else {
        setToast({ type: 'error', message: 'Failed to delete post.' })
      }
    } catch (err) {
      setToast({ type: 'error', message: 'Failed to delete post.' })
    } finally {
      setDeleteTarget(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  // Posts list
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 pt-24 pb-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-white rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-medium text-gray-900" style={{letterSpacing: '-0.02em'}}>
              Blog Manager
            </h1>
            <p className="text-gray-500 mt-2">Create and manage blog posts for the Insights page</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/admin/blog/subscribers')} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition">
              Subscribers
            </button>
            <button onClick={() => navigate('/admin/blog/new')} className="btn-primary">
              + New Post
            </button>
          </div>
        </div>

        {/* Toast notification */}
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}

          {/* Delete confirmation dialog */}
          {deleteTarget && (
            <ConfirmDialog
              title="Delete Post"
              message={`Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`}
              onConfirm={() => handleDelete(deleteTarget.id)}
              onCancel={() => setDeleteTarget(null)}
            />
          )}

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No blog posts yet.</p>
                <p className="mt-2">Click "+ New Post" to create your first post.</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="p-6 card flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-xs text-blue-600 font-medium">{post.category}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(post.createdAt).toLocaleDateString()} · {post.readTime} · by {post.author}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(post)}
                      className="px-3 py-2 text-sm border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    )
  }
