import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Briefcase, Clock, ChevronRight, Zap, TrendingUp, Users, Loader2, AlertCircle } from 'lucide-react'
import SEO from '../components/SEO'
import { fetchPublishedJobs, titleToSlug, formatSalary, formatExperience, formatPostedDate } from '../utils/jobUtils'

export default function Careers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchPublishedJobs()
      .then(setJobs)
      .catch(() => setError('Unable to load openings right now. Please try again shortly.'))
      .finally(() => setLoading(false))
  }, [])

  // Unique job types for filter pills
  const types = ['All', ...Array.from(new Set(jobs.map(j => j.jobType || j.job_type).filter(Boolean)))]
  const filtered = filter === 'All' ? jobs : jobs.filter(j => (j.jobType || j.job_type) === filter)

  return (
    <div className="pt-4">
      <SEO
        title="Careers"
        path="/careers"
        description="Join FluidLive Solutions. We're looking for talented individuals passionate about AI, design, and technology to shape the future."
        keywords="FluidLive careers, AI jobs, tech jobs Pune, join FluidLive, fluid live jobs"
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-12 md:pt-20 pb-8 md:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="overline">CAREERS</span>
          <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{ letterSpacing: '-0.02em' }}>
            Join <span className="gradient-text">Fluid.Live</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            We're building the future where art meets intelligence. Join a team of passionate
            technologists, designers, and strategists shaping the AI revolution.
          </p>
        </div>
      </section>

      {/* ── Open Positions ───────────────────────────────────────── */}
      <section className="pt-8 md:pt-12 pb-20 md:pb-32 bg-gray-50" id="openings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-16">
            <span className="overline">OPEN POSITIONS</span>
            <h2 className="text-4xl md:text-5xl font-medium mt-6" style={{ letterSpacing: '-0.02em' }}>
              Current <span className="gradient-text">Openings</span>
            </h2>
            {!loading && !error && jobs.length > 0 && (
              <p className="text-gray-500 mt-4 text-lg">
                {jobs.length} open position{jobs.length !== 1 ? 's' : ''} — find your fit
              </p>
            )}
          </div>

          {/* Filter pills */}
          {!loading && !error && types.length > 1 && (
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    filter === t
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-gray-500 text-lg">Loading openings…</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-gray-600 text-lg">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-6">🌊</div>
              <h3 className="text-2xl font-medium text-gray-800 mb-3">No openings right now</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're always looking for great talent. Send your profile to{' '}
                <a href="mailto:hrteam@fluid.live" className="text-blue-600 hover:underline">
                  hrteam@fluid.live
                </a>
              </p>
            </div>
          )}

          {/* Job cards grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Join ─────────────────────────────────────────────── */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900" style={{ letterSpacing: '-0.02em' }}>
              Why Join Fluid.Live?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-xl">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Cutting-Edge Work</h3>
              <p className="text-gray-600">
                Work on AI projects that shape the future. Be part of a team pushing the boundaries of what's possible.
              </p>
            </div>
            <div className="p-8 card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Growth Opportunities</h3>
              <p className="text-gray-600">
                Continuous learning and development. We invest in our team's growth and career advancement.
              </p>
            </div>
            <div className="p-8 card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-xl">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Collaborative Culture</h3>
              <p className="text-gray-600">
                Work with talented individuals who are passionate about innovation and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── General Apply CTA ────────────────────────────────────── */}
      <section className="section-spacing bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-white" style={{ letterSpacing: '-0.02em' }}>
            Don't see the right fit?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            We're always open to connecting with great people. Drop us your profile and we'll reach out when something clicks.
          </p>
          <a
            href="mailto:hrteam@fluid.live"
            className="px-8 py-4 text-blue-600 font-medium rounded-full transition-all duration-300 bg-white hover:bg-gray-100 text-lg"
          >
            Send Your Profile
          </a>
        </div>
      </section>
    </div>
  )
}

/* ─────────────────────── Job Card Component ────────────────────────── */
function JobCard({ job }) {
  const slug = titleToSlug(job.title)
  const salary = formatSalary(job.minSalary || job.min_salary, job.maxSalary || job.max_salary, job.showSalaryToCandidate ?? job.show_salary_to_candidate)
  const experience = formatExperience(job.minExperience || job.min_experience, job.maxExperience || job.max_experience)
  const posted = formatPostedDate(job.postedDate || job.created_at)
  const location = typeof job.location === 'string' ? job.location : (Array.isArray(job.locations) ? job.locations.join(', ') : '')
  const mode = job.modeOfJob || job.mode_of_job
  const type = job.jobType || job.job_type
  const company = job.company || 'FluidLive Solutions'
  const coverImg = job.selectedImage || job.selected_image

  return (
    <Link
      to={`/careers/${slug}`}
      state={{ job }}
      className="group block card card-hover p-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {coverImg && (
        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-50">
          <img
            src={coverImg}
            alt={job.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>
      )}

      {/* Card body */}
      <div className="p-7">
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            {/* Type badge */}
            {type && (
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 mb-3 border border-blue-100">
                {type}
              </span>
            )}
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{company}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-3 mb-5">
          {location && (
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              {location}
            </span>
          )}
          {mode && (
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <Briefcase className="w-4 h-4 text-gray-400" />
              {mode}
            </span>
          )}
          {experience && (
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              {experience}
            </span>
          )}
        </div>

        {/* Salary + Posted */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {salary ? (
            <span className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              {salary}
            </span>
          ) : (
            <span className="text-sm text-gray-400">Competitive</span>
          )}
          {posted && (
            <span className="text-xs text-gray-400">{posted}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
