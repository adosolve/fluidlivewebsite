import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, path, type = 'website', image, article }) {
  const siteUrl = 'https://fluid.live'
  const defaultImage = `${siteUrl}/Rectange-Logo-1500px-White-Transparent.png`
  const fullUrl = `${siteUrl}${path || ''}`

  const fullTitle = title 
    ? `${title} | Fluid.Live` 
    : 'Fluid.Live - AI Solutions & Digital Transformation | Where Art Meets Intelligence'

  const defaultDescription = 'Fluid.Live delivers cutting-edge AI solutions, digital transformation, and intelligent automation for businesses across 50+ industries.'

  // Generate JSON-LD for articles
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'author': {
      '@type': 'Organization',
      'name': 'FluidLive Solutions Pvt Ltd'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'FluidLive Solutions Pvt Ltd',
      'logo': {
        '@type': 'ImageObject',
        'url': defaultImage
      }
    },
    'datePublished': article.createdAt,
    'dateModified': article.updatedAt || article.createdAt,
    'mainEntityOfPage': fullUrl
  } : null

  // Generate BreadcrumbList schema
  const breadcrumbSchema = path && path !== '/' ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
      ...(path.startsWith('/insights/') ? [
        { '@type': 'ListItem', 'position': 2, 'name': 'Insights', 'item': `${siteUrl}/insights` },
        { '@type': 'ListItem', 'position': 3, 'name': title, 'item': fullUrl }
      ] : [
        { '@type': 'ListItem', 'position': 2, 'name': title, 'item': fullUrl }
      ])
    ]
  } : null

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

      {/* Article-specific meta */}
      {article && <meta property="article:published_time" content={article.createdAt} />}
      {article && <meta property="article:author" content="FluidLive Solutions Pvt Ltd" />}
      {article && article.category && <meta property="article:section" content={article.category} />}

      {/* JSON-LD Structured Data */}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
    </Helmet>
  )
}
