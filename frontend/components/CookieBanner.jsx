import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Icon + Text */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" style={{color: '#4F8CFF'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 4a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-900">We value your privacy</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              Read our <Link to="/privacy-policy" className="font-medium underline-offset-2" style={{color: '#4F8CFF'}}>Privacy Policy</Link> to learn more.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={handleReject}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-white rounded-full transition-colors duration-300"
              style={{backgroundColor: '#4F8CFF'}}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
