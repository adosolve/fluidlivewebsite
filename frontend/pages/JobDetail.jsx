import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import {
  MapPin, Briefcase, Clock, DollarSign, ChevronLeft,
  Upload, CheckCircle, AlertCircle, Loader2, X, User,
  Phone, Mail, Building2, Calendar, Banknote, MapPinned,
  ChevronDown, ArrowRight, ArrowLeft, IndianRupee
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import {
  fetchPublishedJobs, findJobBySlug, titleToSlug,
  formatSalary, formatExperience, formatPostedDate,
  submitApplication, FLUIDJOBS_API
} from '../utils/jobUtils'
import LocationAutocomplete from '../components/LocationAutocomplete'

/* ═══════════════════════════════════════════════════════════════
   JOB DETAIL PAGE
═══════════════════════════════════════════════════════════════ */
export default function JobDetail() {
  const { slug } = useParams()
  const location = useLocation()
  const [job, setJob] = useState(location.state?.job || null)
  const [loading, setLoading] = useState(!job)
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (job) return
    fetchPublishedJobs()
      .then(jobs => setJob(findJobBySlug(jobs, slug)))
      .catch(() => setJob(null))
      .finally(() => setLoading(false))
  }, [slug])

  const scrollToForm = () => {
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-6xl mb-2">🌊</div>
        <h1 className="text-3xl font-medium text-gray-900">Job Not Found</h1>
        <p className="text-gray-500 max-w-md">This opening may no longer be available or the link might be outdated.</p>
        <Link to="/careers" className="btn-primary mt-4 text-base">← View All Openings</Link>
      </div>
    )
  }

  const salary    = formatSalary(job.minSalary || job.min_salary, job.maxSalary || job.max_salary, job.showSalaryToCandidate ?? job.show_salary_to_candidate)
  const exp       = formatExperience(job.minExperience || job.min_experience, job.maxExperience || job.max_experience)
  const posted    = formatPostedDate(job.postedDate || job.created_at)
  const location_ = typeof job.location === 'string' ? job.location : (Array.isArray(job.locations) ? job.locations.join(', ') : '')
  const mode      = job.modeOfJob || job.mode_of_job
  const type      = job.jobType || job.job_type
  const company   = job.company || 'FluidLive Solutions'
  const coverImg  = job.selectedImage || job.selected_image
  const skills    = Array.isArray(job.skills) ? job.skills : []
  const desc      = (job.description || job.job_description || '').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")

  return (
    <div className="pt-4 min-h-screen bg-white">
      <SEO
        title={job.title}
        path={`/careers/${slug}`}
        description={`${job.title} at ${company} - ${location_}. ${type ? type + ' · ' : ''}${exp ? exp + ' experience required.' : ''}`}
        keywords={`${job.title}, ${company}, ${location_}, jobs, careers, fluid live`}
      />

      {/* Cover image banner */}
      {coverImg && (
        <div className="w-full h-56 md:h-72 overflow-hidden">
          <img src={coverImg} alt={job.title} className="w-full h-full object-cover" onError={e => { e.target.parentElement.style.display = 'none' }} />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Breadcrumb */}
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Openings
        </Link>

        {/* Header */}
        <div className="mb-10">
          {type && (
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 mb-4">
              {type}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-3" style={{ letterSpacing: '-0.02em' }}>
            {job.title}
          </h1>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          {location_ && (
            <InfoCell icon={<MapPin className="w-4 h-4 text-blue-500" />} label="Location" value={location_} />
          )}
          {mode && (
            <InfoCell icon={<Briefcase className="w-4 h-4 text-blue-500" />} label="Work Mode" value={mode} />
          )}
          {exp && (
            <InfoCell icon={<Clock className="w-4 h-4 text-blue-500" />} label="Experience" value={exp} />
          )}
          {salary && (
            <InfoCell icon={<DollarSign className="w-4 h-4 text-blue-500" />} label="Salary" value={salary} />
          )}
          {posted && (
            <InfoCell icon={<Calendar className="w-4 h-4 text-blue-500" />} label="Posted" value={posted} />
          )}
        </div>

        {/* Apply button (top) */}
        {!showForm && (
          <button onClick={scrollToForm} className="btn-primary w-full md:w-auto text-lg mb-12">
            Apply for This Role →
          </button>
        )}

        {/* Description */}
        {desc && (
          <div className="mb-10">
            <h2 className="text-2xl font-medium text-gray-900 mb-5" style={{ letterSpacing: '-0.02em' }}>About the Role</h2>
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed job-description-html"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-5" style={{ letterSpacing: '-0.02em' }}>Required Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <span key={i} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Apply button (bottom, before form) */}
        {!showForm && (
          <div className="border-t border-gray-100 pt-10 mb-4">
            <button onClick={scrollToForm} className="btn-primary w-full text-lg">
              Apply Now
            </button>
          </div>
        )}

        {/* Application Form */}
        <div ref={formRef}>
          {showForm && (
            <div className="border-t border-gray-100 pt-12">
              <div className="mb-8">
                <span className="overline">APPLY NOW</span>
                <h2 className="text-3xl font-medium text-gray-900 mt-3" style={{ letterSpacing: '-0.02em' }}>
                  Application Form
                </h2>
                <p className="text-gray-500 mt-2">
                  Applying for <strong>{job.title}</strong> at {company}
                </p>
              </div>
              <ApplicationForm job={job} onClose={() => setShowForm(false)} />
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

/* ─── Info cell helper ────── */
function InfoCell({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-xs text-gray-400 uppercase tracking-wider font-medium">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-800">{value}</div>
    </div>
  )
}


/* ═══════════════════════════════════════════════════════════════
   APPLICATION FORM
═══════════════════════════════════════════════════════════════ */
const NOTICE_OPTIONS = ['0 Days', '1 Week', '15 Days', '30 Days', '60 Days', '90 Days', 'Currently Serving Notice Period']
const WORK_MODE_OPTIONS = ['On-site', 'Remote', 'Hybrid']

function ApplicationForm({ job, onClose }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    fullName: '', email: '', countryCode: '+91', phone: '',
    gender: '', maritalStatus: '', linkedinUrl: '',
    experience: '', currentlyWorking: '',
    currentCompany: '', noticePeriod: '', earliestJoinDate: '',
    currentCTC: '', lastCompany: '', lastCTC: '',
    expectedCTC: '', currentCity: '', workMode: '', jobProfile: ''
  })
  const [cvFile, setCvFile] = useState(null)
  const [cvError, setCvError] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const set = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    setCvError('')
    if (!file) return
    const allowed = /\.(pdf|doc|docx)$/i.test(file.name)
    if (!allowed) { setCvError('Only PDF, DOC, DOCX files allowed'); return }
    if (file.size > 10 * 1024 * 1024) { setCvError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 10MB.`); return }
    setCvFile(file)
  }

  const validateStep = (currentStep) => {
    const e = {}
    if (currentStep === 0) {
      if (!String(form.fullName || '').trim()) e.fullName = 'Full name is required'
      if (!String(form.email || '').trim()) e.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(form.email || '').trim())) e.email = 'Enter a valid email address'
      if (!String(form.phone || '').trim()) e.phone = 'Phone number is required'
      else { const d = String(form.phone || '').replace(/\D/g,''); if (d.length < 7 || d.length > 15) e.phone = 'Enter a valid phone number'; }
      if (form.linkedinUrl && String(form.linkedinUrl || '').trim() !== '' && !/^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/i.test(String(form.linkedinUrl || '').trim())) {
        e.linkedinUrl = 'Enter a valid LinkedIn URL'
      }
    } else if (currentStep === 1) {
      if (!form.experience) e.experience = 'Experience is required'
      if (!form.currentlyWorking) e.currentlyWorking = 'Please select employment status'
      if (form.currentlyWorking === 'yes') {
        if (!String(form.currentCompany || '').trim()) e.currentCompany = 'Current company is required'
        if (!form.noticePeriod) e.noticePeriod = 'Notice period is required'
      }
      if (!String(form.earliestJoinDate || '').trim()) e.earliestJoinDate = 'Earliest join date is required'
      if (!String(form.expectedCTC || '').trim()) e.expectedCTC = 'Expected CTC is required'
      if (!String(form.currentCity || '').trim()) e.currentCity = 'City is required'
      if (!form.workMode) e.workMode = 'Work mode preference is required'
    } else if (currentStep === 2) {
      if (!cvFile) e.cv = 'Please upload your CV / Resume'
    }
    return e
  }

  const calculateProgress = () => {
    let required = ['fullName', 'email', 'phone', 'experience', 'currentlyWorking', 'earliestJoinDate', 'expectedCTC', 'currentCity', 'workMode']
    if (form.currentlyWorking === 'yes') required.push('currentCompany')
    
    let filled = required.filter(f => form[f] && form[f].trim() !== '').length
    if (cvFile) filled += 1
    const total = required.length + 1
    return Math.max(5, (filled / total) * 100) // Minimum 5% so it's visible at start
  }

  const handleNext = () => {
    const errs = validateStep(step)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStep(s => s + 1)
  }

  const handlePrev = () => {
    setStep(s => Math.max(0, s - 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateStep(step)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('submitting')
    setServerError('')

    try {
      const fd = new FormData()
      fd.append('jobId', job.id)
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v))
      if (cvFile) fd.append('cv', cvFile)
      const urlParams = new URLSearchParams(window.location.search)
      const ref = urlParams.get('ref')
      let source = urlParams.get('source')
      
      if (!source) {
        const referrer = document.referrer.toLowerCase()
        if (referrer.includes('linkedin.com')) {
          source = 'LinkedIn'
        } else if (referrer.includes('indeed.com')) {
          source = 'Indeed'
        } else if (referrer.includes('naukri.com')) {
          source = 'Naukri.com'
        } else if (referrer && !referrer.includes(window.location.hostname)) {
          try {
            const refUrl = new URL(referrer)
            source = refUrl.hostname.replace('www.', '')
          } catch (e) {
            source = 'Other'
          }
        } else {
          source = 'Direct'
        }
      }
      
      if (ref) fd.append('referredBy', ref)
      if (source) fd.append('source', source)

      const result = await submitApplication(fd)

      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setServerError(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-medium text-gray-900 mb-3">Application Submitted!</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-2">
          Thanks for applying for <strong>{job.title}</strong>. We've received your application and sent you a confirmation email.
        </p>
        <p className="text-gray-500 text-sm mb-10">Our team will review your profile and reach out if there's a match.</p>
        <Link to="/careers" className="btn-primary">
          View More Openings
        </Link>
      </div>
    )
  }

  const steps = [
    { id: 0, title: 'Personal Info' },
    { id: 1, title: 'Professional Background' },
    { id: 2, title: 'Resume Upload' }
  ]

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.2 }
    })
  }

  return (
    <div className="w-full">
      {/* Progress indicators */}
      <div className="flex items-start justify-between mb-8 relative">
        <div className="absolute left-[20px] right-[20px] top-5 -translate-y-1/2 h-1 bg-gray-200 rounded-full z-0">
           <div 
             className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" 
             style={{ width: `${calculateProgress()}%` }} 
           />
        </div>
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-2 relative z-10 flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${step > i || calculateProgress() >= ((i) / (steps.length - 1)) * 100 ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>
              {step > i ? <CheckCircle className="w-5 h-5" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${step >= i ? 'text-blue-700' : 'text-gray-400'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={e => e.preventDefault()} noValidate className="relative">
        <AnimatePresence mode="wait" custom={step}>
          
          {step === 0 && (
            <motion.div
              key="step0"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <FormSection title="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Full Name *" error={errors.fullName}>
                    <Input icon={<User className="w-4 h-4" />} placeholder="Your full name" value={form.fullName} onChange={v => set('fullName', v)} />
                  </Field>
                  <Field label="Email Address *" error={errors.email}>
                    <Input icon={<Mail className="w-4 h-4" />} type="email" placeholder="you@example.com" value={form.email} onChange={v => set('email', v)} />
                  </Field>
                  <Field label="Phone Number *" error={errors.phone}>
                    <div className="flex gap-2">
                      <CountryCodeSelect value={form.countryCode} onChange={v => set('countryCode', v)} />
                      <div className="flex-1 min-w-0">
                        <Input icon={<Phone className="w-4 h-4" />} type="tel" placeholder="Phone number" value={form.phone} onChange={v => set('phone', v)} />
                      </div>
                    </div>
                  </Field>
                  <Field label="LinkedIn URL" error={errors.linkedinUrl}>
                    <Input placeholder="https://linkedin.com/in/yourprofile" value={form.linkedinUrl} onChange={v => set('linkedinUrl', v)} />
                  </Field>
                  <Field label="Gender">
                    <CustomSelect value={form.gender} onChange={v => set('gender', v)} options={['Male', 'Female', 'Non-binary', 'Prefer not to say']} placeholder="Select gender" />
                  </Field>
                  <Field label="Marital Status">
                    <CustomSelect value={form.maritalStatus} onChange={v => set('maritalStatus', v)} options={['Single', 'Married', 'Divorced', 'Widowed']} placeholder="Select status" />
                  </Field>
                </div>
              </FormSection>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <FormSection title="Professional Background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Total Experience (Years) *" error={errors.experience}>
                    <Input type="number" placeholder="e.g. 3.5" min="0" max="50" step="0.5" value={form.experience} onChange={v => set('experience', v)} />
                  </Field>
                  <Field label="Current Employment Status *" error={errors.currentlyWorking}>
                    <CustomSelect value={form.currentlyWorking} onChange={v => set('currentlyWorking', v)} options={[{v:'yes', l:'Currently Employed'},{v:'no', l:'Not Currently Employed'}]} placeholder="Select status" />
                  </Field>

                  {form.currentlyWorking === 'yes' && <>
                    <Field label="Current Company *" error={errors.currentCompany}>
                      <Input icon={<Building2 className="w-4 h-4" />} placeholder="Company name" value={form.currentCompany} onChange={v => set('currentCompany', v)} />
                    </Field>
                    <Field label="What is your notice period with the current organisation? *" error={errors.noticePeriod}>
                      <CustomSelect value={form.noticePeriod} onChange={v => set('noticePeriod', v)} options={NOTICE_OPTIONS} placeholder="Select notice period" />
                    </Field>
                    <CTCField label="Current CTC (Annual)" value={form.currentCTC} onChange={v => set('currentCTC', v)} />
                  </>}

                  {form.currentlyWorking === 'no' && <>
                    <Field label="Last Company">
                      <Input icon={<Building2 className="w-4 h-4" />} placeholder="Previous company name" value={form.lastCompany} onChange={v => set('lastCompany', v)} />
                    </Field>
                    <CTCField label="Last CTC (Annual)" value={form.lastCTC} onChange={v => set('lastCTC', v)} />
                  </>}

                  <Field label="Earliest Join Date *" error={errors.earliestJoinDate}>
                    <Input icon={<Calendar className="w-4 h-4" />} type="date" value={form.earliestJoinDate} onChange={v => set('earliestJoinDate', v)} />
                  </Field>
                  <CTCField label="Expected CTC (Annual) *" error={errors.expectedCTC} value={form.expectedCTC} onChange={v => set('expectedCTC', v)} />

                  <Field label="Current City *" error={errors.currentCity}>
                    <LocationAutocomplete value={form.currentCity} onChange={v => set('currentCity', v)} />
                  </Field>
                  <Field label="Work Mode Preference *" error={errors.workMode}>
                    <CustomSelect value={form.workMode} onChange={v => set('workMode', v)} options={WORK_MODE_OPTIONS} placeholder="Select preference" />
                  </Field>
                </div>
              </FormSection>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <FormSection title="Resume / CV *">
                <Field error={errors.cv || cvError}>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors duration-200 cursor-pointer
                      ${cvFile ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}
                    onClick={() => document.getElementById('cv-upload').click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { const fe = { target: { files: [f] } }; handleFile(fe) } }}
                  >
                    {cvFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium text-green-800">{cvFile.name}</p>
                          <p className="text-sm text-green-600">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); setCvFile(null); setCvError('') }}
                          className="ml-auto p-1 rounded-full hover:bg-green-100 text-green-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-700 font-medium mb-1">Click to upload or drag & drop</p>
                        <p className="text-sm text-gray-400">PDF, DOC, DOCX · Max 10MB</p>
                      </>
                    )}
                    <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                  </div>
                </Field>
              </FormSection>
            </motion.div>
          )}

        </AnimatePresence>
      </form>

      {/* Server error */}
      {status === 'error' && serverError && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mt-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
        {step > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        )}
        
        <div className="flex-1"></div>
        
        {step < 2 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary flex items-center gap-2"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'submitting'}
            className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
            ) : (
              <>Submit Application <CheckCircle className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
      <datalist id="indian-cities">
        <option value="Mumbai, Maharashtra" />
        <option value="Delhi, NCR" />
        <option value="Bangalore, Karnataka" />
        <option value="Hyderabad, Telangana" />
        <option value="Pune, Maharashtra" />
        <option value="Chennai, Tamil Nadu" />
        <option value="Kolkata, West Bengal" />
        <option value="Ahmedabad, Gujarat" />
        <option value="Jaipur, Rajasthan" />
        <option value="Surat, Gujarat" />
        <option value="Lucknow, Uttar Pradesh" />
        <option value="Kanpur, Uttar Pradesh" />
        <option value="Nagpur, Maharashtra" />
        <option value="Indore, Madhya Pradesh" />
        <option value="Thane, Maharashtra" />
        <option value="Bhopal, Madhya Pradesh" />
        <option value="Visakhapatnam, Andhra Pradesh" />
        <option value="Pimpri-Chinchwad, Maharashtra" />
        <option value="Patna, Bihar" />
        <option value="Vadodara, Gujarat" />
        <option value="Ghaziabad, Uttar Pradesh" />
        <option value="Ludhiana, Punjab" />
        <option value="Agra, Uttar Pradesh" />
        <option value="Nashik, Maharashtra" />
        <option value="Ranchi, Jharkhand" />
        <option value="Faridabad, Haryana" />
        <option value="Meerut, Uttar Pradesh" />
        <option value="Rajkot, Gujarat" />
        <option value="Kalyan-Dombivli, Maharashtra" />
        <option value="Vasai-Virar, Maharashtra" />
        <option value="Varanasi, Uttar Pradesh" />
        <option value="Srinagar, Jammu and Kashmir" />
        <option value="Aurangabad, Maharashtra" />
        <option value="Dhanbad, Jharkhand" />
        <option value="Amritsar, Punjab" />
        <option value="Navi Mumbai, Maharashtra" />
        <option value="Allahabad, Uttar Pradesh" />
        <option value="Howrah, West Bengal" />
        <option value="Gwalior, Madhya Pradesh" />
        <option value="Jabalpur, Madhya Pradesh" />
        <option value="Coimbatore, Tamil Nadu" />
        <option value="Vijayawada, Andhra Pradesh" />
        <option value="Jodhpur, Rajasthan" />
        <option value="Madurai, Tamil Nadu" />
        <option value="Raipur, Chhattisgarh" />
        <option value="Kota, Rajasthan" />
        <option value="Guwahati, Assam" />
        <option value="Chandigarh" />
        <option value="Gurgaon, Haryana" />
        <option value="Noida, Uttar Pradesh" />
      </datalist>
    </div>
  )
}

/* ─── Tiny form helper components ────── */
function FormSection({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 space-y-5 shadow-sm">
      <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      {children}
      {error && <motion.p initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</motion.p>}
    </div>
  )
}

function Input({ icon, type = 'text', placeholder, value, onChange, ...rest }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all duration-200 ${icon ? '' : ''}`}>
      {icon && <span className="text-gray-400 flex-shrink-0">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 min-w-0"
        {...rest}
      />
    </div>
  )
}

function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = value
    ? (typeof options[0] === 'string' ? value : options.find(o => o.v === value)?.l)
    : placeholder

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className={`flex items-center justify-between px-4 py-3 bg-white border rounded-xl cursor-pointer transition-all duration-200 ${isOpen ? 'border-blue-400 ring-2 ring-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${value ? 'text-gray-900' : 'text-gray-400'}`}>{selectedLabel}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2">
              {options.map((o, idx) => {
                const val = typeof o === 'string' ? o : o.v
                const label = typeof o === 'string' ? o : o.l
                const isSelected = value === val
                return (
                  <div
                    key={idx}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                    onClick={() => {
                      onChange(val)
                      setIsOpen(false)
                    }}
                  >
                    {label}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CTCField({ label, error, value, onChange }) {
  const formatNumber = (val) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    let x = digits.toString();
    let lastThree = x.substring(x.length-3);
    let otherNumbers = x.substring(0, x.length-3);
    if(otherNumbers !== '') lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  }

  const handleChange = (e) => {
    onChange(formatNumber(e.target.value));
  }

  const words = numberToWords(value);

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <span className="text-xs text-gray-400 italic -mt-1 mb-1">
        full value CTC per year in ₹ Rupees e.g. 3,50,000 | Do not write 3.5
      </span>
      <div className={`flex items-center gap-2 px-4 py-3 bg-white border ${error ? 'border-red-300' : 'border-gray-200'} rounded-xl focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all duration-200`}>
        <span className="text-gray-500 font-medium text-lg flex-shrink-0 pl-1 pr-0.5">₹</span>
        <input
          type="text"
          placeholder="e.g. 8,00,000"
          value={value}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 min-w-0"
        />
      </div>
      {words && <p className="text-xs text-blue-600 font-medium mt-0.5">{words}</p>}
      {error && <motion.p initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="text-xs text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</motion.p>}
    </div>
  )
}

function numberToWords(num) {
  if (!num) return '';
  let n = parseInt(num.toString().replace(/,/g, ''), 10);
  if (isNaN(n) || n === 0) return '';
  
  const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const formatTenth = (digit, prev) => {
    if (digit === 0) return single[prev];
    if (digit === 1) return double[prev];
    return tens[digit] + (prev !== 0 ? ' ' + single[prev] : '');
  };

  let word = '';
  if (n > 9999999) {
    let crore = Math.floor(n / 10000000);
    word += numberToWords(crore).replace(' Rupees Only', '') + ' Crore ';
    n %= 10000000;
  }
  if (n > 99999) {
    let lakh = Math.floor(n / 100000);
    word += (lakh < 20 ? (lakh < 10 ? single[lakh] : double[lakh - 10]) : formatTenth(Math.floor(lakh / 10), lakh % 10)) + ' Lakh ';
    n %= 100000;
  }
  if (n > 999) {
    let thousand = Math.floor(n / 1000);
    word += (thousand < 20 ? (thousand < 10 ? single[thousand] : double[thousand - 10]) : formatTenth(Math.floor(thousand / 10), thousand % 10)) + ' Thousand ';
    n %= 1000;
  }
  if (n > 99) {
    let hundred = Math.floor(n / 100);
    word += single[hundred] + ' Hundred ';
    n %= 100;
  }
  if (n > 0) {
    word += (n < 20 ? (n < 10 ? single[n] : double[n - 10]) : formatTenth(Math.floor(n / 10), n % 10));
  }
  return word.trim() + ' Rupees Only';
}

/* ─── Country Code Select Component ────── */
const COUNTRY_CODES = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+41', country: 'Switzerland' },
  { code: '+43', country: 'Austria' },
  { code: '+45', country: 'Denmark' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' },
  { code: '+55', country: 'Brazil' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+60', country: 'Malaysia' },
  { code: '+62', country: 'Indonesia' },
  { code: '+65', country: 'Singapore' },
  { code: '+66', country: 'Thailand' },
  { code: '+82', country: 'South Korea' },
  { code: '+84', country: 'Vietnam' },
  { code: '+90', country: 'Turkey' },
  { code: '+92', country: 'Pakistan' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+27', country: 'South Africa' },
  { code: '+234', country: 'Nigeria' },
  { code: '+64', country: 'New Zealand' },
  { code: '+63', country: 'Philippines' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+886', country: 'Taiwan' },
  { code: '+98', country: 'Iran' },
  { code: '+20', country: 'Egypt' },
  { code: '+212', country: 'Morocco' },
]

function CountryCodeSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedCountry = COUNTRY_CODES.find(c => c.code === value)?.country || 'Select'

  return (
    <div className="relative w-24 md:w-32 flex-shrink-0" ref={containerRef}>
      <div 
        className={`flex items-center justify-between px-2 md:px-3 py-3 bg-white border rounded-xl cursor-pointer transition-all duration-200 ${isOpen ? 'border-blue-400 ring-2 ring-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-gray-900">{value}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-48 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-2">
              {COUNTRY_CODES.map((c, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2.5 text-sm cursor-pointer transition-colors duration-150 flex items-center justify-between ${value === c.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                  onClick={() => {
                    onChange(c.code)
                    setIsOpen(false)
                  }}
                >
                  <span>{c.country}</span>
                  <span className="text-xs font-semibold">{c.code}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

