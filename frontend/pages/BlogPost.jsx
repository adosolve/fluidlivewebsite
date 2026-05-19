import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SEO from '../components/SEO'

// Custom components that match the FluidLive design system
const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-medium text-gray-900 mt-12 mb-6" style={{ letterSpacing: '-0.02em' }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-medium text-gray-900 mt-10 mb-5" style={{ letterSpacing: '-0.02em' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-medium text-gray-900 mt-8 mb-4" style={{ letterSpacing: '-0.02em' }}>
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xl font-medium text-gray-900 mt-6 mb-3" style={{ letterSpacing: '-0.02em' }}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium transition-colors duration-300 underline-offset-4"
      style={{ color: '#4F8CFF', textDecoration: 'underline' }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="space-y-3 mb-6 ml-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-3 mb-6 ml-1 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-700 text-lg leading-relaxed flex items-start gap-3">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#4F8CFF' }}></span>
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 pl-6 py-2 my-8 bg-blue-50 rounded-r-lg pr-6" style={{ borderColor: '#4F8CFF' }}>
      <div className="text-gray-700 italic text-lg">{children}</div>
    </blockquote>
  ),
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm font-mono">
          {children}
        </code>
      )
    }
    return (
      <pre className="bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto mb-6">
        <code className="text-sm font-mono leading-relaxed">
          {children}
        </code>
      </pre>
    )
  },
  pre: ({ children }) => <>{children}</>,
  hr: () => <hr className="my-10 border-gray-200" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-600">{children}</em>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-left">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 border-b border-gray-200">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-6 py-3 text-sm font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-6 py-4 text-gray-700 border-b border-gray-100">
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    <figure className="my-8">
      <img src={src} alt={alt} className="w-full rounded-2xl border border-gray-200" />
      {alt && <figcaption className="text-center text-sm text-gray-500 mt-3">{alt}</figcaption>}
    </figure>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/blog/${slug}`)
        const data = await res.json()
        if (res.ok && data.success) {
          setPost(data.post)
        } else {
          setError(data.error || 'Post not found')
        }
      } catch (err) {
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="pt-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="pt-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-500 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link to="/insights" className="btn-primary">← Back to Insights</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-4">
      <article className="section-spacing bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SEO
            title={post.title}
            path={`/insights/${slug}`}
            description={post.excerpt}
            type="article"
            keywords={`${post.category}, AI, FluidLive, ${post.title}`}
          />
          {/* Back link */}
          <Link to="/insights" className="inline-flex items-center text-sm font-medium mb-8 transition-colors duration-300" style={{color: '#4F8CFF'}}>
            ← Back to Insights
          </Link>

          {/* Header */}
          <header className="mb-12">
            <span className="overline inline-block mb-4" style={{color: '#4F8CFF'}}>
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6" style={{letterSpacing: '-0.02em'}}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>·</span>
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Markdown Content */}
          <div className="blog-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
          </footer>
        </div>
      </article>
    </div>
  )
}
