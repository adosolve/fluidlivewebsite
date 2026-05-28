import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Brain, Settings, Palette, TrendingUp, BarChart3, GraduationCap, Wrench, Zap, Sparkles, Waves } from 'lucide-react'
import { io } from 'socket.io-client'
import SEO from '../components/SEO'

export default function Home() {
  return (
    <div>
      <SEO
        path="/"
        description="Fluid.Live delivers cutting-edge AI solutions, digital transformation, and intelligent automation for businesses across 50+ industries. From strategy to deployment."
        keywords="AI solutions, digital transformation, artificial intelligence, machine learning, AI consulting, Pune, India"
      />
      <HeroSection />
      <PrincipleSection />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <InsightsSection />
      <CTASection />
    </div>
  )
}

function HeroSection() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set video properties to force autoplay
    video.muted = true
    video.autoplay = true
    video.loop = true
    video.playsInline = true

    // Function to attempt playing the video
    const attemptPlay = async () => {
      try {
        await video.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('Play failed:', error)
      }
    }

    // Try to play immediately
    attemptPlay()

    // Try again when video is loaded
    const handleLoadedMetadata = () => {
      attemptPlay()
    }

    const handleCanPlay = () => {
      attemptPlay()
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', () => setIsPlaying(true))
    video.addEventListener('pause', () => setIsPlaying(false))

    // Try again after a short delay
    const timeoutId = setTimeout(attemptPlay, 100)
    const timeoutId2 = setTimeout(attemptPlay, 500)
    const timeoutId3 = setTimeout(attemptPlay, 1000)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundColor: '#1a1a1a'}}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          pointerEvents: 'none', 
          WebkitPlaysinline: 'true',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          display: 'block'
        }}
      >
        <source src="/hero-section-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay - 40% opacity */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Gradient Overlay - Bottom dark to top light */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))'
      }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-screen">
        <div>
          <motion.div 
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="overline inline-block px-5 py-2 rounded-full bg-white/10 text-white">
              TECHNOCREATIVE FLUID BLEND
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-medium mb-8 leading-tight text-white" 
            style={{letterSpacing: '-0.02em'}}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where <span className="gradient-text-art">Art</span> meets <span className="gradient-text-intelligence">Intelligence</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed md:whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-led consulting, products & creative solutions for businesses ready to lead the next decade.
          </motion.p>
          
          <motion.div 
            className="flex flex-row gap-3 sm:gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="/#services" 
              className="btn-primary text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4"
            >
              Explore Our Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PrincipleSection() {
  return (
    <section className="section-spacing relative overflow-hidden" style={{backgroundColor: '#E8F1FF'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="overline">OUR GUIDING PRINCIPLE</span>
        <h2 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
          <span className="block md:inline">Fluid Behaviour</span>
          <span className="block md:inline">and</span>
          <span className="block md:inline">Co-Creation</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          We are not just a vendor. We are your trusted partner for the entire business life cycle - combining the art of design with the science of technology.
        </p>
        
        <div className="flex flex-wrap justify-center gap-12 mt-16">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-blue-600" strokeWidth={2} />
            <span className="text-base font-medium text-gray-900" style={{letterSpacing: '0.05em'}}>EXTREME ENGINEERING</span>
          </div>
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-blue-600" strokeWidth={2} />
            <span className="text-base font-medium text-gray-900" style={{letterSpacing: '0.05em'}}>WOWSOME DESIGNS</span>
          </div>
          <div className="flex items-center space-x-3">
            <Waves className="w-8 h-8 text-blue-600" strokeWidth={2} />
            <span className="text-base font-medium text-gray-900" style={{letterSpacing: '0.05em'}}>BLENDED SOLUTIONS</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      id: 'ai-strategy',
      icon: Brain,
      title: 'AI Strategy & Consulting',
      description: 'We audit your current state, identify high-impact AI opportunities, and co-create a prioritised transformation plan.'
    },
    {
      id: 'ai-products',
      icon: Settings,
      title: 'AI-Powered Products',
      description: 'We design and build bespoke AI agents, chatbots, and automation tools. From prototype to production.'
    },
    {
      id: 'ai-creative',
      icon: Palette,
      title: 'AI-Enhanced Creative',
      description: 'Brand identity, visual design, and content. Crafted by humans, accelerated by AI.'
    },
    {
      id: 'ai-marketing',
      icon: TrendingUp,
      title: 'AI for Marketing & Sales',
      description: 'AI-powered campaigns, lead generation, and sales automation that target the right person at the right moment.'
    },
    {
      id: 'custom-solutions',
      icon: Wrench,
      title: 'Custom AI Solutions',
      description: 'End-to-end development of bespoke AI systems. From complex integrations to full-stack AI platforms.'
    }
  ]

  return (
    <section id="services" className="section-spacing relative bg-white">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="overline">WHAT WE DO</span>
          <h2 className="text-5xl md:text-6xl font-medium mt-6" style={{letterSpacing: '-0.02em'}}>
            Full-spectrum AI services, <br /><span className="gradient-text">one trusted partner.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const bgColor = index % 2 === 0 ? 'bg-blue-50' : 'bg-gray-50'
            return (
              <div 
                key={service.id}
                className={`group p-8 card card-hover ${bgColor}`}
              >
                <IconComponent className="w-12 h-12 mb-6 text-blue-600" strokeWidth={1.5} />
                <h3 className="text-xl font-medium mb-4 transition-colors duration-300 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
          
          {/* CTA Container */}
          <div className="group p-8 card flex flex-col items-start justify-start text-left min-h-[300px] bg-gray-900">
            <Zap className="w-12 h-12 mb-6 text-yellow-400" strokeWidth={1.5} />
            <h3 className="text-xl font-medium mb-4 text-white">
              Ready to Transform?
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed flex-grow">
              Let's discuss how AI can drive real impact for your business.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary text-base"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [
    { number: '01', title: 'DISCOVER', description: 'Understanding your vision and challenges' },
    { number: '02', title: 'DESIGN', description: 'Crafting the perfect solution architecture' },
    { number: '03', title: 'BUILD', description: 'Developing with precision and excellence' },
    { number: '04', title: 'DEPLOY', description: 'Launching with confidence and support' },
    { number: '05', title: 'EVOLVE', description: 'Continuous improvement and optimization' }
  ]

  return (
    <section className="section-spacing bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="overline">HOW WE WORK</span>
          <h2 className="text-5xl md:text-6xl font-medium mt-6" style={{letterSpacing: '-0.02em'}}>
            From idea to impact, fluid all the way.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-medium gradient-text mb-6">{step.number}</div>
              <h3 className="text-lg font-medium mb-3 text-gray-900" style={{letterSpacing: '0.05em'}}>{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const [counts, setCounts] = useState({ projects: 0, industries: 0, years: 0 })
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef(null)

  const testimonials = [
    {
      quote: "Fluid.Live didn't just deliver a product - they became a true partner in our AI transformation.",
      author: "CEO, FINTECH SCALE-UP"
    },
    {
      quote: "The blend of creative thinking and technical depth is unlike any agency we've worked with.",
      author: "CMO, GLOBAL MEDIA GROUP"
    },
    {
      quote: "From strategy to execution, the team was with us every step. Truly fluid collaboration.",
      author: "CTO, EDTECH PLATFORM"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const duration = 2000
    const steps = 60
    const projectTarget = 300
    const industriesTarget = 50
    const yearsTarget = 10

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setCounts({
        projects: Math.floor(projectTarget * progress),
        industries: Math.floor(industriesTarget * progress),
        years: Math.floor(yearsTarget * progress)
      })

      if (currentStep >= steps) clearInterval(interval)
    }, duration / steps)

    return () => clearInterval(interval)
  }, [hasStarted])

  return (
    <section className="section-spacing" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="overline">TRUSTED PARTNER FOR LIFE</span>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-center mb-20">
          <div>
            <div className="text-7xl font-medium gradient-text mb-4">{counts.years}+</div>
            <div className="text-lg text-gray-600" style={{letterSpacing: '0.05em'}}>YEARS</div>
          </div>
          <div>
            <div className="text-7xl font-medium gradient-text mb-4">{counts.projects}+</div>
            <div className="text-lg text-gray-600" style={{letterSpacing: '0.05em'}}>PROJECTS DELIVERED</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-7xl font-medium gradient-text mb-4">{counts.industries}+</div>
            <div className="text-lg text-gray-600" style={{letterSpacing: '0.05em'}}>CLIENTS SERVED</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-10 card border border-gray-200">
              <div className="text-5xl mb-6" style={{color: '#4F8CFF'}}>"</div>
              <p className="text-lg text-gray-900 mb-8 leading-relaxed">{testimonial.quote}</p>
              <p className="text-sm text-gray-500 font-medium" style={{letterSpacing: '0.05em'}}>{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return null
}

function InsightsSection() {
  const [insights, setInsights] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/blog`)
        const data = await res.json()
        if (data.success) {
          setInsights(data.posts.slice(0, 3))
        }
      } catch (err) {
        // Silently fail
      }
    }
    fetchPosts()

    const socket = io(backendUrl)

    socket.on('blog:created', (post) => {
      if (post.published) {
        setInsights((prev) => [post, ...prev].slice(0, 3))
      }
    })

    socket.on('blog:updated', (updatedPost) => {
      setInsights((prev) => {
        let updated
        if (!updatedPost.published) {
          updated = prev.filter(p => p.id !== updatedPost.id)
        } else {
          const exists = prev.find(p => p.id === updatedPost.id)
          if (exists) {
            updated = prev.map(p => p.id === updatedPost.id ? updatedPost : p)
          } else {
            updated = [updatedPost, ...prev]
          }
        }
        return updated.slice(0, 3)
      })
    })

    socket.on('blog:deleted', (postId) => {
      setInsights((prev) => prev.filter(p => p.id !== postId))
    })

    return () => socket.disconnect()
  }, [])

  if (insights.length === 0) return null

  return (
    <section className="section-spacing bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="overline">LATEST INSIGHTS</span>
          <h2 className="text-5xl md:text-6xl font-medium mt-6" style={{letterSpacing: '-0.02em'}}>
            AI thinking, <span className="gradient-text">freshly brewed.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {insights.map((insight, index) => (
            <Link 
              key={insight.id}
              to={`/insights/${insight.slug}`}
              className={`group p-10 card card-hover ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
            >
              <span className="overline" style={{color: '#4F8CFF'}}>{insight.category}</span>
              <h3 className="text-3xl font-medium mt-4 mb-4 transition-colors duration-300 text-gray-900" style={{letterSpacing: '-0.02em'}}>
                {insight.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{insight.excerpt}</p>
              <p className="text-sm text-gray-500">{new Date(insight.createdAt).toLocaleDateString()} · {insight.author}</p>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/insights" 
            className="font-medium transition-colors duration-300" style={{color: '#4F8CFF'}}
          >
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-spacing bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-medium mb-8 text-white" style={{letterSpacing: '-0.02em'}}>
          Bring your vision to life.
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed">
          Connect with our team today to explore how we can support your next initiative.
        </p>
        <Link 
          to="/contact" 
          className="px-8 py-4 text-blue-600 font-medium rounded-full transition-all duration-300 bg-white hover:bg-gray-100 text-lg"
        >
          Schedule a Consultation
        </Link>
      </div>
    </section>
  )
}
