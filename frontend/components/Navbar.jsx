import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../public/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-white/95" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img 
                src={logo}
                alt="FLUID.LIVE Logo" 
                className="h-8 md:h-10 w-auto transition-all duration-300"
                style={{ height: 'clamp(1.5rem, 6vw, 2.5rem)' }}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="/#services" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Services</a>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">About</Link>
              <Link to="/insights" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Insights</Link>
              <Link to="/careers" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Careers</Link>
              <Link 
                to="/contact" 
                className="btn-primary"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-900 hover:text-blue-600 transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '5rem' }}
      >
        <div className="h-full flex flex-col justify-between py-8 px-6">
          {/* Menu Links */}
          <nav className="flex flex-col space-y-1">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 py-4 border-b border-gray-100"
              style={{letterSpacing: '-0.01em'}}
            >
              Home
            </Link>
            <a 
              href="/#services" 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 py-4 border-b border-gray-100"
              style={{letterSpacing: '-0.01em'}}
            >
              Services
            </a>
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 py-4 border-b border-gray-100"
              style={{letterSpacing: '-0.01em'}}
            >
              About
            </Link>
            <Link 
              to="/insights" 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 py-4 border-b border-gray-100"
              style={{letterSpacing: '-0.01em'}}
            >
              Insights
            </Link>
            <Link 
              to="/careers" 
              onClick={() => setIsOpen(false)} 
              className="text-2xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 py-4 border-b border-gray-100"
              style={{letterSpacing: '-0.01em'}}
            >
              Careers
            </Link>
          </nav>
          
          {/* Bottom Section */}
          <div className="space-y-6">
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full text-center block py-4 text-base"
            >
              Contact Us
            </Link>
            <p className="text-sm text-gray-500 text-center">
              Where Art meets Intelligence
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
