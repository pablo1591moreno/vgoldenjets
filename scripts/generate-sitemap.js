import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://www.vgoldenjets.com";
const ARTICLES_DIR = path.join(__dirname, '../src/data/articles');
const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

// Static routes
const staticRoutes = [
  '',
  '/en',
  '/services',
  '/en/services',
  '/gallery',
  '/en/gallery',
  '/jetsmagazine',
  '/en/jetsmagazine',
  '/contact',
  '/en/contact',
  '/about',
  '/en/about',
  '/landingForm',
  '/en/landingForm',
  '/form',
  '/en/form'
];

function generateSitemap() {
  console.log('Generating sitemap...');

  // Get article slugs from filenames
  const files = fs.readdirSync(ARTICLES_DIR);
  const articles = files
    .filter(file => file.endsWith('.ts') && file !== 'index.ts')
    .map(file => file.replace('.ts', ''));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' || route === '/en' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Add article routes
  articles.forEach(slug => {
    // Spanish
    xml += `
  <url>
    <loc>${SITE_URL}/jetsmagazine/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    // English
    xml += `
  <url>
    <loc>${SITE_URL}/en/jetsmagazine/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Sitemap generated at ${OUTPUT_FILE}`);
}

generateSitemap();
