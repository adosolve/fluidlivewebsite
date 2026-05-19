import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, path, type = 'website', image }) {
  const siteUrl = 'https://fluid.live'
  const defaultImage = `${siteUrl}/Rectange-Logo-1500px-White-Transparent.png`
  const fullUrl = `${siteUrl}${path || ''}`

  const fullTitle = title 
    ? `${title} | Fluid.Live` 
    : 'Fluid.Live - AI Solutions & Digital Transformation | Where Art Meets Intelligence'

  const defaultDescription = 'Fluid.Live delivers cutting-edge AI solutions, digital transformation, and intelligent automation for businesses across 25+ industries.'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />
    </Helmet>
  )
}
