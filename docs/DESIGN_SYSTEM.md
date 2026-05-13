# Fluid.Live Design System

## ✅ Fixed & Implemented

### Color Palette
- **Background**: Deep Space Navy (#0B0F19 / gray-950)
- **Electric Blue** (#4F8CFF): Primary buttons, Intelligence gradient
- **Soft Gold** (#FBBF24): Secondary buttons, Art gradient  
- **Muted Slate** (#8B9BBA): Body text
- **Pure White** (#FFFFFF): Headings

### Typography
- **Font**: Inter, Plus Jakarta Sans
- **Headings**: Medium weight (500-600), tight tracking (-0.02em)
- **Body**: Regular (400), relaxed line-height (1.6)
- **Overlines**: Uppercase, wide tracking (0.1em)

### Components

#### Buttons
- **Primary (.btn-primary)**: Electric Blue, pill-shaped, glowing hover
- **Secondary (.btn-secondary)**: Gold border, transparent bg, pill-shaped

#### Cards
- **Base (.card)**: Semi-transparent white bg (3% opacity), subtle border
- **Hover (.card-hover)**: Increased opacity, electric blue glow

#### Text Effects
- **gradient-text**: Blue to Gold gradient
- **gradient-text-intelligence**: Blue gradient with glow
- **gradient-text-art**: Gold gradient with glow

### Visual Effects
- **Background Grid**: Subtle geometric pattern
- **Floating Elements**: Animated glow orbs
- **Generous Spacing**: 128px (py-32) between sections

### Layout
- **Navigation**: Fixed, backdrop blur, 80px height
- **Sections**: Alternating solid/transparent backgrounds
- **Max Width**: 7xl (1280px)

## Usage

### Custom Classes
```jsx
// Buttons
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>

// Text
<h1 className="gradient-text">Gradient Heading</h1>
<span className="overline">SECTION LABEL</span>
<p className="text-slate-muted">Body text</p>

// Cards
<div className="card card-hover">Card content</div>

// Backgrounds
<section className="bg-grid">Grid background</section>
<section className="section-spacing">Proper spacing</section>
```

### Inline Styles (for precise colors)
```jsx
// When you need exact design system colors
style={{
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  color: '#4F8CFF',
  letterSpacing: '-0.02em'
}}
```

## Pages Structure
- **Home**: Hero, Principles, Services, Process, Stats, Testimonials, Insights, CTA
- **Services**: Service grid with details
- **Service Detail**: Individual service pages
- **About**: Mission, vision, values
- **Insights**: Blog/articles grid
- **Contact**: Form + info
- **Careers**: Open positions

## Development
```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run preview # Preview production build
```

**Live URL**: http://localhost:5174/
