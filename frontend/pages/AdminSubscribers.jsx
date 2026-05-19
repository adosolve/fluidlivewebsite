import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminSubscribers() {
  const navigate = useNavigate()
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

  useEffect(() => {
    const token = localStorage.getItem('blog_token')
    if (!token) {
      navigate('/admin/blog', { replace: true })
      return
    }
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/newsletter`)
      const data = await res.json()
      if (data.success) {
        setSubscribers(data.subscribers)
      }
    } catch (err) {
      console.error('Failed to fetch subscribers')
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    if (subscribers.length === 0) return

    const headers = ['Email', 'Subscribed At']
    const rows = subscribers.map(s => [
      s.email,
      new Date(s.subscribed_at).toLocaleString()
    ])

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="pt-4">
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/blog')}
                className="text-gray-500 hover:text-gray-700 transition p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl font-medium text-gray-900" style={{letterSpacing: '-0.02em'}}>
                  Newsletter Subscribers
                </h1>
                <p className="text-gray-500 mt-2">{subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''} total</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              disabled={subscribers.length === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          </div>

          {/* Table */}
          {subscribers.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">No subscribers yet.</p>
              <p className="mt-2">Subscribers will appear here when users sign up via the newsletter form.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscribed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {subscribers.map((subscriber, index) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{subscriber.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
