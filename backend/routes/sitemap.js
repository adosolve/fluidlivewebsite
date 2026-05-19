import express from 'express';

const router = express.Router();

// GET /api/sitemap - Generate dynamic sitemap XML with blog posts
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    const { rows } = await db.query(
      'SELECT slug, updated_at FROM blog_posts WHERE published = true ORDER BY created_at DESC'
    );

    const siteUrl = 'https://fluid.live';

    const staticPages = [
      { loc: '/', changefreq: 'weekly', priority: '1.0' },
      { loc: '/about', changefreq: 'monthly', priority: '0.8' },
      { loc: '/insights', changefreq: 'daily', priority: '0.9' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
      { loc: '/careers', changefreq: 'weekly', priority: '0.6' },
      { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}${page.loc}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Dynamic blog posts
    for (const post of rows) {
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}/insights/${post.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += '</urlset>';

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Failed to generate sitemap');
  }
});

export default router;
