export default function Careers() {
  const openings = [
    {
      title: 'Senior AI Engineer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build cutting-edge AI solutions for enterprise clients. Experience with LLMs, RAG, and production ML systems required.'
    },
    {
      title: 'AI Product Designer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive interfaces for AI-powered products. Strong UX background and understanding of AI capabilities needed.'
    },
    {
      title: 'AI Strategy Consultant',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help clients navigate their AI transformation journey. Business acumen and technical understanding essential.'
    },
    {
      title: 'Creative Technologist',
      location: 'Remote',
      type: 'Full-time',
      description: 'Bridge the gap between creative vision and technical execution. Experience with generative AI tools a plus.'
    }
  ]

  return (
    <div className="pt-4">
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="overline">CAREERS</span>
            <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
              Join <span className="gradient-text">Fluid.Live</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building the future where art meets intelligence. Join a team of passionate 
              technologists, designers, and strategists shaping the AI revolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Cutting-Edge Work</h3>
              <p className="text-gray-600 leading-relaxed">
                Work on the latest AI technologies and solve real-world problems for leading companies.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Remote-First</h3>
              <p className="text-gray-600 leading-relaxed">
                Work from anywhere. We believe great talent isn't limited by geography.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Growth & Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous learning budget, conference attendance, and mentorship opportunities.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-medium text-center mb-12 text-gray-900" style={{letterSpacing: '-0.02em'}}>Open Positions</h2>
            <div className="space-y-6">
              {openings.map((job, index) => (
                <div 
                  key={index}
                  className="p-8 card card-hover"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-medium mb-2 text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="px-3 py-1 bg-blue-50 rounded-full" style={{color: '#4F8CFF'}}>
                          {job.location}
                        </span>
                        <span className="px-3 py-1 bg-blue-50 rounded-full" style={{color: '#4F8CFF'}}>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 btn-primary">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center p-12 bg-blue-50 rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Don't see the right role?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're always looking for exceptional talent. Send us your resume and let's talk.
            </p>
            <a 
              href="mailto:hr@fluid.live" 
              className="btn-primary text-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
