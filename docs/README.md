# Fluid.Live - Where Art Meets Intelligence

A modern, responsive website built with React, Vite, and Tailwind CSS. Technocreative fluid blend of AI-powered solutions.

## Features

- 🎨 Modern, gradient-rich design with smooth animations
- 📱 Fully responsive across all devices
- ⚡ Fast performance with Vite
- 🎯 Multiple pages: Home, Services, About, Insights, Contact, Careers
- 🔄 Smooth page transitions with React Router
- 💫 Interactive UI components and hover effects
- 📊 Animated statistics counters
- 🌐 Service detail pages with comprehensive information

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **PostCSS** - CSS processing

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
studio-luxe/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceDetail.jsx
│   │   ├── Insights.jsx
│   │   ├── Contact.jsx
│   │   └── Careers.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Pages

- **Home** - Hero section, services overview, process, stats, testimonials, insights preview
- **Services** - Complete list of all services with features
- **Service Detail** - Detailed information about each service
- **About** - Company mission, vision, and values
- **Insights** - Blog/articles about AI and technology
- **Contact** - Contact form and company information
- **Careers** - Open positions and company culture

## Customization

### Colors

Edit the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Content

Update the content in each page component located in `src/pages/`.

### Styling

Global styles are in `src/index.css`. Component-specific styles use Tailwind utility classes.

## License

© 2026 FluidLive Solutions Private Limited. All rights reserved.
