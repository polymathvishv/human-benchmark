import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── Static Core Routes ──────────────────────────────────────────────────────
const CORE_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/leaderboard', priority: '0.9', changefreq: 'hourly' },
  { path: '/reaction-time', priority: '0.9', changefreq: 'weekly' },
  { path: '/sequence-memory', priority: '0.9', changefreq: 'weekly' },
  { path: '/aim-trainer', priority: '0.9', changefreq: 'weekly' },
  { path: '/number-memory', priority: '0.9', changefreq: 'weekly' },
  { path: '/verbal-memory', priority: '0.9', changefreq: 'weekly' },
  { path: '/chimp-test', priority: '0.9', changefreq: 'weekly' },
  { path: '/visual-memory', priority: '0.9', changefreq: 'weekly' },
  { path: '/typing', priority: '0.9', changefreq: 'weekly' },
  { path: '/mobile-typing', priority: '0.9', changefreq: 'weekly' },
  { path: '/battle', priority: '0.8', changefreq: 'daily' },
  { path: '/science', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/dashboard', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

/**
 * Extract science article metadata dynamically from scienceArticles.ts
 */
function getScienceArticles() {
  const articlesFile = path.resolve(ROOT, 'src/data/scienceArticles.ts');
  if (!fs.existsSync(articlesFile)) {
    console.warn('⚠️ scienceArticles.ts not found.');
    return [];
  }

  const content = fs.readFileSync(articlesFile, 'utf-8');
  // Match slug and publishedDate
  const articleRegex = /"slug":\s*"([^"]+)"[\s\S]*?"publishedDate":\s*"([^"]+)"/g;
  const articles = [];
  let match;

  while ((match = articleRegex.exec(content)) !== null) {
    articles.push({
      slug: match[1],
      publishedDate: match[2] || new Date().toISOString().split('T')[0],
    });
  }

  return articles;
}

export function generateSitemap() {
  console.log('🗺️ Generating dynamic sitemap.xml...');

  const today = new Date().toISOString().split('T')[0];
  const scienceArticles = getScienceArticles();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Add Core Pages
  for (const route of CORE_ROUTES) {
    const url = `https://humanbenchmark.in${route.path === '/' ? '/' : route.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Add All Science Articles Dynamically
  for (const article of scienceArticles) {
    const url = `https://humanbenchmark.in/science/${article.slug}`;
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${article.publishedDate || today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  // Write to public/sitemap.xml
  const publicPath = path.resolve(ROOT, 'public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');

  // Also write to dist/client/sitemap.xml if dist exists
  const distClientPath = path.resolve(ROOT, 'dist/client/sitemap.xml');
  const distClientDir = path.resolve(ROOT, 'dist/client');
  if (fs.existsSync(distClientDir)) {
    fs.writeFileSync(distClientPath, xml, 'utf-8');
  }

  const totalUrls = CORE_ROUTES.length + scienceArticles.length;
  console.log(`✅ Generated sitemap with ${totalUrls} total URLs (${scienceArticles.length} science articles).`);
  return totalUrls;
}

// Run standalone if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}
