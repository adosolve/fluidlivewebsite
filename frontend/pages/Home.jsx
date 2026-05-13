import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Brain, Settings, Palette, TrendingUp, BarChart3, GraduationCap, Wrench, Zap, Sparkles, Waves } from 'lucide-react'

export default function Home() {
  return (
    <div className="pt-4">
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
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated Wave Background - Professional & Smooth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave Layer 1 - Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.08) 100%)',
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="rgba(96, 165, 250, 0.15)"
              d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              animate={{
                d: [
                  "M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                  "M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,197.3C840,203,960,181,1080,165.3C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                  "M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>

        {/* Wave Layer 2 - Middle */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-56"
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="rgba(79, 140, 255, 0.12)"
              d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,138.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              animate={{
                d: [
                  "M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,138.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                  "M0,128L60,138.7C120,149,240,171,360,165.3C480,160,600,128,720,122.7C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                  "M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,138.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </svg>
        </motion.div>

        {/* Wave Layer 3 - Top */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48"
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <motion.path
              fill="rgba(59, 130, 246, 0.1)"
              d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,90.7C840,85,960,107,1080,106.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              animate={{
                d: [
                  "M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,90.7C840,85,960,107,1080,106.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                  "M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,90.7C840,85,960,107,1080,122.7C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                  "M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,90.7C840,85,960,107,1080,106.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </svg>
        </motion.div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="overline inline-block px-5 py-2 rounded-full bg-blue-50">
            TECHNOCREATIVE FLUID BLEND
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-medium mb-8 leading-tight" 
          style={{letterSpacing: '-0.02em'}}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Where <span className="gradient-text-art">Art</span> meets <span className="gradient-text-intelligence">Intelligence</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
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
            Explore Our Work
          </a>
          <Link 
            to="/contact" 
            className="btn-secondary text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4"
          >
            Book a Call
          </Link>
        </motion.div>
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
          Fluid Behaviour and Co-Creation
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
          We are not just a vendor. We are your trusted partner for the entire business life cycle — combining the art of design with the science of technology.
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
      description: 'We design and build bespoke AI agents, chatbots, and automation tools — from prototype to production.'
    },
    {
      id: 'ai-creative',
      icon: Palette,
      title: 'AI-Enhanced Creative',
      description: 'Brand identity, visual design, and content — crafted by humans, accelerated by AI.'
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
      description: 'End-to-end development of bespoke AI systems — from complex integrations to full-stack AI platforms.'
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
            <Zap className="w-12 h-12 mb-6 text-blue-400" strokeWidth={1.5} />
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
              Start a Project
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
            From idea to impact — fluid all the way.
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
  const [counts, setCounts] = useState({ projects: 0, industries: 0, retention: 0 })
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef(null)

  const testimonials = [
    {
      quote: "Fluid.Live didn't just deliver a product — they became a true partner in our AI transformation.",
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
    const projectTarget = 150
    const industriesTarget = 25
    const retentionTarget = 98

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      
      setCounts({
        projects: Math.floor(projectTarget * progress),
        industries: Math.floor(industriesTarget * progress),
        retention: Math.floor(retentionTarget * progress)
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center mb-20">
          <div>
            <div className="text-7xl font-medium gradient-text mb-4">{counts.projects}+</div>
            <div className="text-lg text-gray-600" style={{letterSpacing: '0.05em'}}>AI PROJECTS DELIVERED</div>
          </div>
          <div>
            <div className="text-7xl font-medium gradient-text mb-4">{counts.industries}+</div>
            <div className="text-lg text-gray-600" style={{letterSpacing: '0.05em'}}>INDUSTRIES SERVED</div>
          </div>
          <div>
            <div className="text-7xl font-medium gradient-text mb-4">{counts.retention}%</div>
            <div className="text-lg text-gray-600" style={{letterSpacing: '0.05em'}}>CLIENT RETENTION</div>
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
  const insights = [
    {
      category: 'AI STRATEGY',
      title: 'The AI Audit: Where to Start in 2026',
      description: 'Most businesses know they need AI. Few know where to begin. Here\'s the framework we use with every new client.',
      date: '2026-04-01'
    },
    {
      category: 'AI THINKING',
      title: 'Co-Creation in the Age of Agentic AI',
      description: 'Agentic AI changes the relationship between humans and technology. Here\'s what it means for how we build together.',
      date: '2026-03-15'
    },
    {
      category: 'AI INNOVATION',
      title: 'From Concept to Impact: Building AI Products That Matter',
      description: 'Learn how we approach AI product development with a focus on real-world impact and user-centric design.',
      date: '2026-02-28'
    }
  ]

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
              key={index}
              to="/insights"
              className={`group p-10 card card-hover ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}`}
            >
              <span className="overline" style={{color: '#4F8CFF'}}>{insight.category}</span>
              <h3 className="text-3xl font-medium mt-4 mb-4 transition-colors duration-300 text-gray-900" style={{letterSpacing: '-0.02em'}}>
                {insight.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{insight.description}</p>
              <p className="text-sm text-gray-500">{insight.date} · Fluid.Live Team</p>
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
          Ready to start the journey?
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed">
          Let's co-create something extraordinary.
        </p>
        <Link 
          to="/contact" 
          className="px-8 py-4 text-blue-600 font-medium rounded-full transition-all duration-300 bg-white hover:bg-gray-100 text-lg"
        >
          Contact Our Team
        </Link>
      </div>
    </section>
  )
}
