import { useParams, Link } from 'react-router-dom'

export default function ServiceDetail() {
  const { serviceId } = useParams()

  const serviceData = {
    'ai-strategy': {
      icon: '🧠',
      title: 'AI Strategy & Consulting',
      tagline: 'Transform your business with strategic AI implementation',
      description: 'Our AI Strategy & Consulting service helps you navigate the complex landscape of artificial intelligence. We work closely with your team to understand your business objectives, assess your current capabilities, and design a comprehensive AI transformation roadmap.',
      benefits: [
        'Clear AI roadmap aligned with business goals',
        'Identification of high-impact use cases',
        'Risk assessment and mitigation strategies',
        'Change management and adoption planning'
      ],
      process: [
        { step: 'Discovery', description: 'Deep dive into your business, challenges, and opportunities' },
        { step: 'Assessment', description: 'Evaluate current AI readiness and capabilities' },
        { step: 'Strategy', description: 'Develop comprehensive AI transformation plan' },
        { step: 'Roadmap', description: 'Create prioritized implementation timeline' }
      ]
    },
    'ai-products': {
      icon: '⚙️',
      title: 'AI-Powered Products',
      tagline: 'Build intelligent products that delight users',
      description: 'We design and develop custom AI-powered products that solve real business problems. From intelligent chatbots to sophisticated AI agents, we bring your vision to life with cutting-edge technology and user-centric design.',
      benefits: [
        'Custom-built solutions for your unique needs',
        'Scalable and maintainable architecture',
        'Seamless integration with existing systems',
        'Ongoing support and optimization'
      ],
      process: [
        { step: 'Ideation', description: 'Define product vision and requirements' },
        { step: 'Design', description: 'Create user experience and technical architecture' },
        { step: 'Development', description: 'Build and test your AI product' },
        { step: 'Launch', description: 'Deploy and monitor in production' }
      ]
    },
    'ai-creative': {
      icon: '🎨',
      title: 'AI-Enhanced Creative',
      tagline: 'Where human creativity meets AI acceleration',
      description: 'Our creative services blend human artistry with AI capabilities to produce stunning visual content, compelling brand identities, and engaging marketing materials at unprecedented speed and scale.',
      benefits: [
        'Faster content creation without sacrificing quality',
        'Consistent brand identity across all touchpoints',
        'Data-driven creative decisions',
        'Scalable content production'
      ],
      process: [
        { step: 'Brief', description: 'Understand your brand and creative needs' },
        { step: 'Concept', description: 'Develop creative direction and concepts' },
        { step: 'Creation', description: 'Produce assets using AI-enhanced workflows' },
        { step: 'Refinement', description: 'Polish and perfect every detail' }
      ]
    },
    'ai-marketing': {
      icon: '📈',
      title: 'AI for Marketing & Sales',
      tagline: 'Supercharge your revenue engine with AI',
      description: 'Transform your marketing and sales operations with AI-powered automation, predictive analytics, and intelligent targeting. Reach the right customers at the right time with the right message.',
      benefits: [
        'Increased conversion rates and ROI',
        'Automated lead qualification and nurturing',
        'Personalized customer experiences at scale',
        'Data-driven campaign optimization'
      ],
      process: [
        { step: 'Audit', description: 'Analyze current marketing and sales processes' },
        { step: 'Strategy', description: 'Design AI-powered growth strategy' },
        { step: 'Implementation', description: 'Deploy AI tools and automation' },
        { step: 'Optimization', description: 'Continuously improve performance' }
      ]
    },
    'custom-solutions': {
      icon: '🔧',
      title: 'Custom AI Solutions',
      tagline: 'Bespoke AI systems for unique challenges',
      description: 'When off-the-shelf solutions won\'t cut it, we build custom AI systems tailored to your exact requirements. From complex integrations to full-stack AI platforms, we deliver enterprise-grade solutions.',
      benefits: [
        'Perfectly aligned with your requirements',
        'Full ownership and control',
        'Enterprise-grade security and scalability',
        'Competitive advantage through unique capabilities'
      ],
      process: [
        { step: 'Requirements', description: 'Define detailed technical specifications' },
        { step: 'Architecture', description: 'Design scalable system architecture' },
        { step: 'Development', description: 'Build and test custom solution' },
        { step: 'Deployment', description: 'Launch and provide ongoing support' }
      ]
    }
  }

  const service = serviceData[serviceId] || serviceData['ai-strategy']

  return (
    <div className="pt-16">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
            ← Back to Services
          </Link>

          <div className="text-center mb-12">
            <div className="text-7xl mb-6">{service.icon}</div>
            <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-2xl text-gray-400">{service.tagline}</p>
          </div>

          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-gray-300 leading-relaxed">{service.description}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <div className="space-y-4">
              {service.process.map((item, index) => (
                <div key={index} className="flex items-start p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.step}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center p-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-400 mb-6">
              Let's discuss how this service can transform your business.
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-4 gradient-bg rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
