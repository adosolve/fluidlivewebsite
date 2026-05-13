import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! 👋 I\'m your Fluid.Live AI assistant. I can help you learn about our AI services, consulting, and how we blend art with intelligence. What would you like to know?'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [remainingMessages, setRemainingMessages] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messageTimestamps = useRef([])
  
  // Rate limit configuration
  const MAX_MESSAGES = 10 // Maximum messages allowed
  const TIME_WINDOW = 15 * 60 * 1000 // 15 minutes in milliseconds

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Check rate limit
  const checkRateLimit = () => {
    const now = Date.now()
    
    // Remove timestamps older than the time window
    messageTimestamps.current = messageTimestamps.current.filter(
      timestamp => now - timestamp < TIME_WINDOW
    )
    
    // Check if user has exceeded the limit
    if (messageTimestamps.current.length >= MAX_MESSAGES) {
      const oldestTimestamp = messageTimestamps.current[0]
      const timeUntilReset = TIME_WINDOW - (now - oldestTimestamp)
      const minutesRemaining = Math.ceil(timeUntilReset / 60000)
      
      setIsRateLimited(true)
      setRemainingMessages(0)
      
      // Show rate limit message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⏱️ You've reached the message limit. Please wait ${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''} before sending more messages. For immediate assistance, contact us at hr@fluid.live`
      }])
      
      // Auto-reset after time window
      setTimeout(() => {
        setIsRateLimited(false)
        messageTimestamps.current = []
      }, timeUntilReset)
      
      return false
    }
    
    // Update remaining messages count
    setRemainingMessages(MAX_MESSAGES - messageTimestamps.current.length)
    return true
  }

  // Reset rate limit check when chat opens
  useEffect(() => {
    if (isOpen) {
      checkRateLimit()
    }
  }, [isOpen])

  const businessContext = `You are an AI assistant for Fluid.Live, a technocreative company that blends art and intelligence. 

About Fluid.Live:
- We provide AI-led consulting, products, and creative solutions for businesses
- Our guiding principle is "Fluid Behaviour and Co-Creation" - we are a trusted partner for the entire business lifecycle
- We combine extreme engineering, wowsome designs, and blended solutions

Our Services:
1. AI Strategy & Consulting - We audit current state, identify AI opportunities, and create transformation plans
2. AI-Powered Products - Design and build bespoke AI agents, chatbots, and automation tools
3. AI-Enhanced Creative - Brand identity, visual design, and content crafted by humans, accelerated by AI
4. AI for Marketing & Sales - AI-powered campaigns, lead generation, and sales automation
5. Custom AI Solutions - End-to-end development of bespoke AI systems

Our Process: Discover → Design → Build → Deploy → Evolve

Our Values:
- Impact-Driven: We measure success by real-world results
- Partnership First: Your success is our success
- Innovation Always: We stay at the forefront of AI advancement

Stats:
- 150+ AI projects delivered
- 25+ industries served
- 98% client retention

Contact: hr@fluid.live

Your role is to help visitors understand our business, answer questions about our services, and guide them to take action (book a call, explore services, contact us). Be friendly, professional, and concise. Keep responses under 100 words unless detailed explanation is needed.`

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isRateLimited) return

    // Check rate limit before sending
    if (!checkRateLimit()) {
      setInputMessage('')
      return
    }

    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Add timestamp for rate limiting
    messageTimestamps.current.push(Date.now())
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Call Sarvam AI API
      const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SARVAM_API_KEY || 'YOUR_SARVAM_API_KEY'}`
        },
        body: JSON.stringify({
          model: 'sarvam-2b-v0.5',
          messages: [
            {
              role: 'system',
              content: businessContext
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message.content

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch (error) {
      console.error('Error calling Sarvam AI:', error)
      
      // Fallback response with business information
      const fallbackResponse = getFallbackResponse(userMessage)
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }])
    } finally {
      setIsLoading(false)
    }
  }

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return 'We offer 5 core AI services: AI Strategy & Consulting, AI-Powered Products, AI-Enhanced Creative, AI for Marketing & Sales, and Custom AI Solutions. Which area interests you most?'
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return 'Our pricing is customized based on your specific needs and project scope. I recommend booking a free consultation call with our team to discuss your requirements and get a tailored quote. Would you like me to guide you to our contact page?'
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
      return 'Great! You can reach us at hr@fluid.live or book a call directly through our Contact page. Our team typically responds within 24 hours. Would you like to know anything else about our services before reaching out?'
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('who are you')) {
      return 'Fluid.Live is where Art meets Intelligence. We\'re a technocreative company providing AI-led consulting, products, and creative solutions. We\'ve delivered 150+ AI projects across 25+ industries with 98% client retention. What would you like to know more about?'
    }
    
    if (lowerMessage.includes('process') || lowerMessage.includes('how do you work')) {
      return 'Our process follows 5 stages: Discover (understanding your vision), Design (crafting solutions), Build (developing with precision), Deploy (launching with confidence), and Evolve (continuous improvement). We\'re your partner throughout the entire journey!'
    }
    
    return 'Thanks for your question! I\'m here to help you learn about Fluid.Live\'s AI services and solutions. You can ask me about our services, process, pricing, or how to get in touch. You can also email us at hr@fluid.live or visit our Contact page to book a call!'
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    { label: 'Our Services', message: 'What services do you offer?' },
    { label: 'Book a Call', message: 'How can I contact you?' },
    { label: 'Pricing', message: 'How much does it cost?' },
    { label: 'About Us', message: 'Tell me about Fluid.Live' }
  ]

  return (
    <>
      {/* Floating AI Bot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Open AI assistant"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            {/* Main button */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white rounded-full p-4">
              <Bot className="w-7 h-7" strokeWidth={2} />
              
              {/* Sparkle effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" fill="currentColor" />
              </motion.div>
              
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 sm:bottom-6 sm:right-6 sm:inset-auto z-50 w-full sm:w-[400px] md:w-[440px] h-full sm:h-[650px] bg-white sm:rounded-3xl flex flex-col overflow-hidden border-0 sm:border sm:border-gray-100"
          >
            {/* Chat Header - Modern AI Design */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white p-5 flex items-center justify-between overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}></div>
              </div>
              
              <div className="relative flex items-center space-x-3">
                {/* AI Bot Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                    <Bot className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  {/* Pulse animation */}
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    Fluid.Live AI
                    <Sparkles className="w-4 h-4 text-yellow-300" fill="currentColor" />
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-xs text-blue-50 font-medium">Online • Ready to help</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="relative hover:bg-white/20 p-2.5 rounded-xl transition-all duration-200 hover:rotate-90"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mr-2 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-medium">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(action.message)
                        setTimeout(() => handleSendMessage(), 100)
                      }}
                      className="text-xs px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 font-medium border border-blue-200/50"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              {/* Rate limit indicator */}
              {remainingMessages !== null && remainingMessages <= 3 && !isRateLimited && (
                <div className="mb-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                  ⚠️ {remainingMessages} message{remainingMessages !== 1 ? 's' : ''} remaining in this 15-minute window
                </div>
              )}
              
              {isRateLimited && (
                <div className="mb-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                  🚫 Rate limit reached. Please wait before sending more messages.
                </div>
              )}
              
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isRateLimited ? "Rate limit reached..." : "Type your message..."}
                    rows="1"
                    disabled={isRateLimited}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    style={{ maxHeight: '100px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || isRateLimited}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 disabled:shadow-none"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
