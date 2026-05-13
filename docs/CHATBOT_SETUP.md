# Chatbot Setup Guide

## Overview
The Fluid.Live website includes an AI-powered chatbot that helps visitors understand the business, services, and how to get in touch. The chatbot is powered by Sarvam AI and appears as a floating button in the bottom-right corner.

## Features
- 🤖 AI-powered responses using Sarvam AI
- 💬 Floating chat button with online indicator
- 📱 Fully responsive design (mobile & desktop)
- ⚡ Quick action buttons for common queries
- 🎨 Beautiful animations with Framer Motion
- 🔄 Fallback responses when API is unavailable
- 📚 Pre-loaded with Fluid.Live business context

## Setup Instructions

### 1. Get Sarvam AI API Key
1. Visit [Sarvam AI](https://www.sarvam.ai/)
2. Sign up for an account
3. Navigate to API Keys section
4. Generate a new API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Sarvam AI API key to `.env`:
   ```
   VITE_SARVAM_API_KEY=your_actual_api_key_here
   ```

### 3. Test the Chatbot
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the website in your browser
3. Click the floating chat button in the bottom-right corner
4. Try asking questions like:
   - "What services do you offer?"
   - "How much does it cost?"
   - "Tell me about Fluid.Live"
   - "How can I contact you?"

## Chatbot Capabilities

The chatbot is trained to help with:
- **Services Information**: Explain all 7 AI services offered
- **Pricing Inquiries**: Guide users to contact for custom quotes
- **Company Information**: Share about Fluid.Live's mission and values
- **Process Details**: Explain the 5-stage process (Discover → Design → Build → Deploy → Evolve)
- **Contact Information**: Provide email and guide to contact page
- **General Questions**: Answer questions about the business

## Customization

### Update Business Context
Edit the `businessContext` variable in `src/components/Chatbot.jsx` to update the information the chatbot uses.

### Modify Quick Actions
Edit the `quickActions` array in `src/components/Chatbot.jsx` to change the quick action buttons.

### Styling
The chatbot uses Tailwind CSS classes. Modify the component to match your design preferences.

### Fallback Responses
The chatbot includes intelligent fallback responses when the API is unavailable. Edit the `getFallbackResponse` function to customize these responses.

## API Configuration

### Sarvam AI Model
- **Model**: `sarvam-2b-v0.5`
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 300 (concise responses)

### API Endpoint
```
https://api.sarvam.ai/v1/chat/completions
```

## Troubleshooting

### Chatbot not responding
1. Check if API key is correctly set in `.env`
2. Verify the API key is valid
3. Check browser console for errors
4. Ensure you have internet connection

### Fallback responses showing
- This is normal when API key is not configured
- The chatbot will still work with pre-programmed responses
- Add your API key to enable AI-powered responses

### Styling issues on mobile
- The chatbot is responsive and should work on all screen sizes
- Check if there are any CSS conflicts
- Verify Tailwind CSS is properly configured

## Production Deployment

### Environment Variables
Make sure to set `VITE_SARVAM_API_KEY` in your production environment:

**Vercel/Netlify:**
Add the environment variable in your project settings

**Other platforms:**
Follow their documentation for setting environment variables

### Security Notes
- Never commit `.env` file to version control
- Keep your API key secure
- Consider implementing rate limiting for production
- Monitor API usage to avoid unexpected costs

## Support

For issues or questions:
- Email: hr@fluid.live
- Check Sarvam AI documentation: https://docs.sarvam.ai/

## License
This chatbot component is part of the Fluid.Live website project.
