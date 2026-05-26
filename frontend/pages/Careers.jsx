import SEO from '../components/SEO'

export default function Careers() {
  return (
    <div className="pt-4">
      <SEO
        title="Careers"
        path="/careers"
        description="Join FluidLive Solutions. We're looking for talented individuals passionate about AI, design, and technology to shape the future."
        keywords="FluidLive careers, AI jobs, tech jobs Pune, join FluidLive"
      />
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="overline">CAREERS</span>
          <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
            Join <span className="gradient-text">Fluid.Live</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            We're building the future where art meets intelligence. Join a team of passionate 
            technologists, designers, and strategists shaping the AI revolution.
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900" style={{letterSpacing: '-0.02em'}}>
              Why Join Fluid.Live?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 card">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Cutting-Edge Work</h3>
              <p className="text-gray-600">
                Work on AI projects that shape the future. Be part of a team pushing the boundaries of what's possible.
              </p>
            </div>

            <div className="p-8 card">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Growth Opportunities</h3>
              <p className="text-gray-600">
                Continuous learning and development. We invest in our team's growth and career advancement.
              </p>
            </div>

            <div className="p-8 card">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Collaborative Culture</h3>
              <p className="text-gray-600">
                Work with talented individuals who are passionate about innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
