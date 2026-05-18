import { Link } from 'react-router-dom';
import Counter from '../components/Counter';

export default function About() {
  return (
    <div className="pt-4">
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="overline">WHO WE ARE</span>
            <h1 className="text-5xl md:text-6xl font-medium mt-6 mb-8" style={{letterSpacing: '-0.02em'}}>
              About <span className="gradient-text">Fluid.Live</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're a team of technologists, designers, and strategists united by one mission: 
              to help businesses harness the power of AI without losing the human touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-10 card">
              <h2 className="text-3xl font-medium mb-4 gradient-text" style={{letterSpacing: '-0.02em'}}>Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To bridge the gap between cutting-edge AI technology and real-world business impact. 
                We believe AI should amplify human creativity, not replace it. Every solution we build 
                is designed to empower people, streamline operations, and unlock new possibilities.
              </p>
            </div>

            <div className="p-10 card">
              <h2 className="text-3xl font-medium mb-4 gradient-text" style={{letterSpacing: '-0.02em'}}>Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where every business, regardless of size, can leverage AI to compete, 
                innovate, and thrive. We're building the future where technology and creativity 
                flow together seamlessly — where art truly meets intelligence.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-medium text-center mb-12 text-gray-900" style={{letterSpacing: '-0.02em'}}>Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">Impact-Driven</h3>
                <p className="text-gray-600 leading-relaxed">
                  We measure success by the real-world results we deliver, not just the technology we deploy.
                </p>
              </div>
              <div className="text-center p-8">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">Partnership First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your success is our success. We're in it for the long haul, not just the project.
                </p>
              </div>
              <div className="text-center p-8">
                <div className="text-5xl mb-4">💡</div>
                <h3 className="text-xl font-medium mb-3 text-gray-900">Innovation Always</h3>
                <p className="text-gray-600 leading-relaxed">
                  We stay at the forefront of AI advancement to bring you tomorrow's solutions today.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="overline">THE FOUNDING TEAM</span>
              <h2 className="text-4xl md:text-5xl font-medium mt-6 text-gray-900" style={{letterSpacing: '-0.02em'}}>
                The people you'll actually work with.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Deepesh Sodhi */}
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <img 
                    src="/Deepesh Sodhi.webp" 
                    alt="Deepesh Sodhi" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">Deepesh Sodhi</h3>
                <p className="text-sm font-medium text-blue-600 mb-4">FOUNDER, CEO</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Technology consultant and business leader. Seeks to build a strong team and create systems that enable sustainable success.
                </p>
                <a href="https://www.linkedin.com/in/dsodhi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  LINKEDIN →
                </a>
              </div>

              {/* Rahul Khandelwal */}
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <img 
                    src="/Rahul Khandelwal.webp" 
                    alt="Rahul Khandelwal" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">Rahul Khandelwal</h3>
                <p className="text-sm font-medium text-blue-600 mb-4">FOUNDER, CFO</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Focuses on finances and international growth. Partner at Felix Advisory — Venture Investment, Startup Advisory, M&A.
                </p>
                <a href="https://www.linkedin.com/in/rahul-khandelwal-04b8497/" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  LINKEDIN →
                </a>
              </div>

              {/* Anshuman Sen */}
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <img 
                    src="/Anshuman Sen.webp" 
                    alt="Anshuman Sen" 
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-1">Anshuman Sen</h3>
                <p className="text-sm font-medium text-blue-600 mb-4">CHIEF INNOVATION OFFICER</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Focuses on Customer Experience and Corporate Communication. Heads DevOps and Cloud-Native Security Practices.
                </p>
                <a href="https://www.linkedin.com/in/anshuman-sen/" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  LINKEDIN →
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <Counter end="50" suffix="+" duration={2000} />
              <p className="text-gray-700 font-medium">AI Projects Delivered</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <Counter end="25" suffix="+" duration={2000} />
              <p className="text-gray-700 font-medium">Industries Served</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <Counter end="98" suffix="%" duration={2000} />
              <p className="text-gray-700 font-medium">Client Retention</p>
            </div>
          </div>

          <div className="text-center p-12 bg-blue-50 rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-medium mb-4 text-gray-900" style={{letterSpacing: '-0.02em'}}>Ready to work together?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Let's explore how we can help transform your business with AI.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
