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
          <a 
            href="https://fluidjobs.ai/career" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  )
}
