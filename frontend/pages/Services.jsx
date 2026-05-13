import { Link } from 'react-router-dom'

export default function Services() {
  const services = [
    {
      id: 'ai-strategy',
      icon: '🧠',
      title: 'AI Strategy & Consulting',
      description: 'We audit your current state, identify high-impact AI opportunities, and co-create a prioritised transformation plan.',
      features: [
        'AI Readiness Assessment',
        'Opportunity Identification',
        'Roadmap Development',
        'Change Management'
      ]
    },
    {
      id: 'ai-products',
      icon: '⚙️',
      title: 'AI-Powered Products',
      description: 'We design and build bespoke AI agents, chatbots, and automation tools — from prototype to production.',
      features: [
        'Custom AI Agents',
        'Intelligent Chatbots',
        'Process Automation',
        'Integration Services'
      ]
    },
    {
      id: 'ai-creative',
      icon: '🎨',
      title: 'AI-Enhanced Creative',
      description: 'Brand identity, visual design, and content — crafted by humans, accelerated by AI.',
      features: [
        'Brand Identity Design',
        'Visual Content Creation',
        'AI-Generated Assets',
        'Creative Strategy'
      ]
    },
    {
      id: 'ai-marketing',
      icon: '📈',
      title: 'AI for Marketing & Sales',
      description: 'AI-powered campaigns, lead generation, and sales automation that target the right person at the right moment.',
      features: [
        'Predictive Lead Scoring',
        'Campaign Optimization',
        'Sales Automation',
        'Customer Insights'
      ]
    },
    {
      id: 'custom-solutions',
      icon: '🔧',
      title: 'Custom AI Solutions',
      description: 'End-to-end development of bespoke AI systems — from complex integrations to full-stack AI platforms.',
      features: [
        'Custom Development',
        'System Integration',
        'API Development',
        'Scalable Architecture'
      ]
    }
  ]

  return (
    <div className="pt-4">
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="overline">WHAT WE DO</span>
            <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI solutions tailored to your business needs. From strategy to execution, 
              we're with you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="p-8 card card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{service.icon}</div>
                  <Link 
                    to={`/services/${service.id}`}
                    className="font-medium transition-colors duration-300" style={{color: '#4F8CFF'}}
                  >
                    Learn More →
                  </Link>
                </div>
                
                <h3 className="text-2xl font-medium mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" style={{color: '#4F8CFF'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              to="/contact" 
              className="btn-primary text-lg"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
