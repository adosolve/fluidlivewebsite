export default function Insights() {
  const insights = [
    {
      category: 'AI STRATEGY',
      title: 'The AI Audit: Where to Start in 2026',
      description: 'Most businesses know they need AI. Few know where to begin. Here\'s the framework we use with every new client to identify high-impact opportunities and build a realistic transformation roadmap.',
      date: '2026-04-01',
      readTime: '8 min read'
    },
    {
      category: 'AI THINKING',
      title: 'Co-Creation in the Age of Agentic AI',
      description: 'Agentic AI changes the relationship between humans and technology. Here\'s what it means for how we build together, and why the future of work is more collaborative than ever.',
      date: '2026-03-15',
      readTime: '6 min read'
    },
    {
      category: 'CASE STUDY',
      title: 'How We Helped a FinTech Scale-Up Automate 70% of Customer Support',
      description: 'A deep dive into our AI chatbot implementation that reduced response times from hours to seconds while maintaining high customer satisfaction scores.',
      date: '2026-03-01',
      readTime: '10 min read'
    },
    {
      category: 'TECHNOLOGY',
      title: 'RAG vs Fine-Tuning: Choosing the Right Approach for Your AI Product',
      description: 'Understanding the tradeoffs between Retrieval-Augmented Generation and fine-tuning for building production AI applications.',
      date: '2026-02-20',
      readTime: '7 min read'
    },
    {
      category: 'DESIGN',
      title: 'Designing for AI: New Patterns for Intelligent Interfaces',
      description: 'How AI is changing UX design patterns and what it means for creating intuitive, trustworthy user experiences.',
      date: '2026-02-10',
      readTime: '5 min read'
    },
    {
      category: 'BUSINESS',
      title: 'The ROI of AI: Measuring What Matters',
      description: 'Beyond the hype: practical frameworks for measuring and demonstrating the business value of AI investments.',
      date: '2026-01-25',
      readTime: '9 min read'
    }
  ]

  return (
    <div className="pt-4">
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="overline">LATEST THINKING</span>
            <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
              <span className="gradient-text">Insights</span> & Thinking
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Perspectives on AI strategy, technology, and the future of intelligent business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <article 
                key={index}
                className="group p-8 card card-hover cursor-pointer"
              >
                <span className="overline inline-block mb-4" style={{color: '#4F8CFF'}}>
                  {insight.category}
                </span>
                
                <h2 className="text-2xl font-medium mb-3 group-hover:text-blue-600 transition text-gray-900" style={{letterSpacing: '-0.02em'}}>
                  {insight.title}
                </h2>
                
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {insight.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{insight.date}</span>
                  <span>{insight.readTime}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16 p-12 bg-blue-50 rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Want to stay updated?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest insights on AI and business transformation.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button 
                type="submit"
                className="btn-primary"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
