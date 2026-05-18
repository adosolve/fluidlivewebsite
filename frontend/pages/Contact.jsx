import { useState, useRef, useEffect } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const recaptchaRef = useRef(null)
  const [captchaToken, setCaptchaToken] = useState('')

  useEffect(() => {
    // Define the reCAPTCHA callback globally
    window.onRecaptchaChange = (token) => {
      setCaptchaToken(token)
    }
    window.onRecaptchaExpired = () => {
      setCaptchaToken('')
    }
    return () => {
      delete window.onRecaptchaChange
      delete window.onRecaptchaExpired
    }
  }, [])

  useEffect(() => {
    // Render reCAPTCHA when the component mounts and the script is loaded
    const renderCaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
          callback: 'onRecaptchaChange',
          'expired-callback': 'onRecaptchaExpired'
        })
      }
    }

    // If grecaptcha is already loaded, render immediately
    if (window.grecaptcha && window.grecaptcha.render) {
      renderCaptcha()
    } else {
      // Otherwise wait for it to load
      const interval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          renderCaptcha()
          clearInterval(interval)
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!captchaToken) {
      setStatus({ type: 'error', message: 'Please complete the CAPTCHA verification.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Message sent successfully!' })
        setFormData({ name: '', email: '', company: '', message: '' })
        setCaptchaToken('')
        if (window.grecaptcha) window.grecaptcha.reset()
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="pt-4">
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="overline">GET IN TOUCH</span>
            <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Get in touch and let's start the conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="p-8 card">
              <h2 className="text-3xl font-medium mb-6 text-gray-900" style={{letterSpacing: '-0.02em'}}>Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-900">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <div ref={recaptchaRef} className="mb-2"></div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {status.message && (
                  <p className={`text-sm mt-3 ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-8 card">
                <h3 className="text-2xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" style={{color: '#4F8CFF'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:hrteam@fluid.live" className="transition-colors duration-300" style={{color: '#4F8CFF'}}>
                        hrteam@fluid.live
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" style={{color: '#4F8CFF'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">Bungalow #2, Lane O, 81/1, N Main Rd, behind One Restaurant and Bar, Koregaon Park Annexe, Pune, Maharashtra 411036</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-blue-50 rounded-2xl border border-gray-200">
                <h3 className="text-2xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Why Work With Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" style={{color: '#4F8CFF'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Proven track record across 25+ industries
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" style={{color: '#4F8CFF'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    End-to-end support from strategy to deployment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" style={{color: '#4F8CFF'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    98% client retention rate
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0" style={{color: '#4F8CFF'}} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Cutting-edge AI expertise
                  </li>
                </ul>
              </div>

              <div className="p-8 card">
                <h3 className="text-2xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.linkedin.com/company/fluidlive/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/fluid.live" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/fluid_live" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/fluid.live/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition text-gray-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Where We Are Section */}
          <div className="mt-20 pt-20 border-t border-gray-200">
            <div className="text-center mb-12">
              <span className="overline">WHERE WE ARE</span>
              <h2 className="text-4xl md:text-5xl font-medium mt-6 mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>
                Pune, India
              </h2>
              <p className="text-lg text-gray-600 mb-2">📍 Bungalow #2, Lane O, 81/1, N Main Rd, behind One Restaurant and Bar, Koregaon Park Annexe, Pune, Maharashtra 411036</p>
              <p className="text-lg text-gray-600">Working with clients globally, rooted in Pune.</p>
            </div>

            {/* Map Container */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-96 md:h-[500px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2606050000003!2d73.88590!3d18.52040!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07cedc1e4fb%3A0x8f8f8f8f8f8f8f8f!2sKoregaon%20Park%20Annexe%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715000000000"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
