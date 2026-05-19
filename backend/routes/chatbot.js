import express from 'express';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiter for chatbot: 20 messages per minute per IP
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many messages. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false
});

const businessContext = `You are the AI assistant for Fluid.Live (FluidLive Solutions Pvt Ltd), an AI-first consulting and product company based in Pune, India.

Key Information:
- Founded by Deepesh Sodhi (CEO), Rahul Khandelwal (CFO), and Anshuman Sen (CIO)
- Location: Bungalow #2, Lane O, 81/1, N Main Rd, Koregaon Park Annexe, Pune, Maharashtra 411036

Services:
1. AI Strategy & Consulting
2. AI-Powered Products (chatbots, agents, automation)
3. AI-Enhanced Creative (brand, design, content)
4. AI for Marketing & Sales
5. Custom AI Solutions

Process: Discover → Design → Build → Deploy → Evolve

Stats:
- 150+ AI projects delivered
- 25+ industries served
- 98% client retention

Contact: hrteam@fluid.live

Your role is to help visitors understand our business, answer questions about our services, and guide them to take action. Be friendly, professional, and concise. Keep responses under 100 words unless detailed explanation is needed.`;

// POST /api/chatbot/message - Proxy to Sarvam AI
router.post('/message', chatLimiter, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      // Return fallback if no API key configured
      return res.json({
        success: true,
        response: getFallbackResponse(message)
      });
    }

    const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'sarvam-2b-v0.5',
        messages: [
          { role: 'system', content: businessContext },
          ...history.map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    res.json({ success: true, response: assistantMessage });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.json({ success: true, response: getFallbackResponse(req.body.message || '') });
  }
});

function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do')) {
    return 'We offer: AI Strategy & Consulting, AI-Powered Products, AI-Enhanced Creative, AI for Marketing & Sales, and Custom AI Solutions. Which area interests you most?';
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
    return 'Our pricing depends on project scope and complexity. We offer flexible engagement models. Contact us at hrteam@fluid.live for a custom quote!';
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('meeting')) {
    return 'You can reach us at hrteam@fluid.live or visit our Contact page. Our team typically responds within 24 hours.';
  }
  if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('team')) {
    return 'Fluid.Live is an AI-first company founded by Deepesh Sodhi, Rahul Khandelwal, and Anshuman Sen. We have delivered 150+ AI projects across 25+ industries with 98% client retention.';
  }
  return 'Thanks for your question! I can help you learn about our AI services, process, pricing, or how to get in touch. What would you like to know?';
}

export default router;
