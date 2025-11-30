import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(process.cwd(), 'src', 'contexts', 'DatosParaArticulos.tsx');
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const BASE_URL = 'https://www.vgoldenjets.com';

// Static routes configuration
const STATIC_ROUTES = [
    {
        loc: '/',
        changefreq: 'weekly',
        priority: '1.0',
        lastmod: new Date().toISOString().split('T')[0] // Default to today for home
    },
    {
        loc: '/jetsmagazine',
        changefreq: 'weekly',
        priority: '0.8',
        alternates: true // Indicates this page has language alternates
    }
];

function parseArticles() {
    if (!fs.existsSync(FILE_PATH)) {
        console.error(`File not found: ${FILE_PATH}`);
        process.exit(1);
    }

    const content = fs.readFileSync(FILE_PATH, 'utf-8');
    const slugRegex = /slug:\s*(["'])([^"']+)\1/g;
    let match;
    const articles = [];

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[2];
        const slugIndex = match.index;
        const chunk = content.substring(slugIndex, slugIndex + 4000);

        const dateMatch = chunk.match(/date:\s*(["'])([^"']+)\1/);
        const date = dateMatch ? dateMatch[2] : '2025-01-01';

        const lastSeoUpdateMatch = chunk.match(/lastSeoUpdate:\s*(["'])([^"']+)\1/);
        const lastSeoUpdate = lastSeoUpdateMatch ? lastSeoUpdateMatch[2] : null;

        // Use lastSeoUpdate if available, otherwise publication date
        const lastmod = lastSeoUpdate || date;

        articles.push({
            slug,
            lastmod
        });
    }
    return articles;
}

function generateSitemap(articles) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

`;

    // Add Static Routes
    STATIC_ROUTES.forEach(route => {
        xml += `  <url>
    <loc>${BASE_URL}${route.loc}</loc>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
`;
        if (route.alternates) {
            xml += `    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${route.loc}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en${route.loc}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${route.loc}"/>
`;
        }
        xml += `  </url>\n\n`;
    });

    // Add Articles
    articles.forEach(article => {
        xml += `  <url>
    <loc>${BASE_URL}/jetsmagazine/${article.slug}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}/jetsmagazine/${article.slug}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/jetsmagazine/${article.slug}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/jetsmagazine/${article.slug}"/>
  </url>\n\n`;
    });

    xml += `</urlset>`;
    return xml;
}

function main() {
    console.log('Generating sitemap...');
    const articles = parseArticles();
    console.log(`Found ${articles.length} articles.`);

    const sitemapXml = generateSitemap(articles);
    fs.writeFileSync(SITEMAP_PATH, sitemapXml);
    console.log(`Sitemap written to ${SITEMAP_PATH}`);
}

main();
