import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const API_KEY = process.env.GEMINI_API_KEY;
const FILE_PATH = path.join(process.cwd(), 'src', 'contexts', 'DatosParaArticulos.tsx');
const REPORT_PATH = path.join(process.cwd(), 'seo_report.md');
const ARTICLES_TO_PROCESS = 2;

if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
// Use gemini-1.5-flash as it is the most cost-effective and fast model for this task.
// If this fails, it's likely an API Key issue or quota issue, not a model existence issue.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function optimizeArticle(article) {
    console.log(`Optimizing article: ${article.slug}`);
    const prompt = `
    You are an SEO expert for VGoldenJets, a luxury private jet company.
    Analyze the following article metadata and optimize the title, subtitle, and excerpt for better SEO, 
    targeting high-net-worth individuals. Keep the tone exclusive, professional, and inviting.
    
    Current Metadata:
    Title (ES): ${article.title.es}
    Title (EN): ${article.title.en}
    Subtitle (ES): ${article.subtitle.es}
    Subtitle (EN): ${article.subtitle.en}
    Excerpt (ES): ${article.excerpt.es}
    Excerpt (EN): ${article.excerpt.en}

    Return ONLY a valid JSON object with the following structure. Do not include markdown formatting or code blocks.
    {
      "title": { "es": "New Optimized Spanish Title", "en": "New Optimized English Title" },
      "subtitle": { "es": "New Optimized Spanish Subtitle", "en": "New Optimized English Subtitle" },
      "excerpt": { "es": "New Optimized Spanish Excerpt", "en": "New Optimized English Excerpt" }
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        console.error(`Failed to optimize article ${article.slug}:`, error.message);
        if (error.message.includes('404')) {
            console.error("Tip: Check if your API Key has access to 'gemini-1.5-flash'.");
        }
        return null;
    }
}

async function main() {
    console.log('Starting SEO optimization...');

    if (!fs.existsSync(FILE_PATH)) {
        console.error(`File not found: ${FILE_PATH}`);
        process.exit(1);
    }

    let content = fs.readFileSync(FILE_PATH, 'utf-8');

    // Robust regex for slug: handles single or double quotes
    const slugRegex = /slug:\s*(["'])([^"']+)\1/g;
    let match;
    const articles = [];

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[2];
        const slugIndex = match.index;

        // Extract a chunk of text after the slug to parse fields.
        // Increased chunk size to ensure we catch fields even if they are far apart
        const chunk = content.substring(slugIndex, slugIndex + 4000);

        // Robust regex for date
        const dateMatch = chunk.match(/date:\s*(["'])([^"']+)\1/);
        const date = dateMatch ? dateMatch[2] : '1970-01-01';

        // Robust regex for lastSeoUpdate
        const lastSeoUpdateMatch = chunk.match(/lastSeoUpdate:\s*(["'])([^"']+)\1/);
        const lastSeoUpdate = lastSeoUpdateMatch ? lastSeoUpdateMatch[2] : null;

        const extractField = (fieldName) => {
            // Robust regex for object fields: key: { ... }
            const regex = new RegExp(`${fieldName}:\\s*\\{([\\s\\S]*?)\\}`, 'm');
            const m = chunk.match(regex);

            if (m) {
                const inner = m[1];
                // Robust regex for inner fields es/en
                const esMatch = inner.match(/es:\s*(["'])([\s\S]*?)\1/);
                const enMatch = inner.match(/en:\s*(["'])([\s\S]*?)\1/);

                if (esMatch && enMatch) {
                    const absoluteIndex = slugIndex + m.index;
                    return {
                        fullMatch: m[0],
                        index: absoluteIndex,
                        es: esMatch[2],
                        en: enMatch[2]
                    };
                }
            }
            return null;
        };

        const title = extractField('title');
        const subtitle = extractField('subtitle');
        const excerpt = extractField('excerpt');

        if (title && subtitle && excerpt) {
            articles.push({
                slug,
                date,
                lastSeoUpdate,
                title,
                subtitle,
                excerpt,
                slugIndex
            });
        }
    }

    // Sort logic:
    // 1. Articles that have NEVER been optimized (lastSeoUpdate is null) come first.
    // 2. If both have been optimized, sort by lastSeoUpdate ascending (oldest optimization first).
    // 3. If both never optimized, sort by publication date ascending (oldest article first).

    articles.sort((a, b) => {
        if (!a.lastSeoUpdate && !b.lastSeoUpdate) {
            return new Date(a.date) - new Date(b.date);
        }
        if (!a.lastSeoUpdate) return -1;
        if (!b.lastSeoUpdate) return 1;
        return new Date(a.lastSeoUpdate) - new Date(b.lastSeoUpdate);
    });

    // Take top N
    const articlesToOptimize = articles.slice(0, ARTICLES_TO_PROCESS);

    console.log(`Found ${articles.length} total articles.`);
    console.log(`Optimizing ${articlesToOptimize.length} articles: ${articlesToOptimize.map(a => a.slug).join(', ')}`);

    const replacements = [];
    let reportMarkdown = `# Weekly SEO Optimization Report\n\n`;
    reportMarkdown += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    reportMarkdown += `**Articles Processed:** ${articlesToOptimize.length}\n\n`;

    const today = new Date().toISOString().split('T')[0];

    for (const article of articlesToOptimize) {
        const optimized = await optimizeArticle({
            slug: article.slug,
            title: { es: article.title.es, en: article.title.en },
            subtitle: { es: article.subtitle.es, en: article.subtitle.en },
            excerpt: { es: article.excerpt.es, en: article.excerpt.en }
        });

        if (optimized) {
            const esc = (s) => s.replace(/"/g, '\\"').replace(/\n/g, '\\n');

            // Update Content Fields
            replacements.push({
                start: article.title.index,
                end: article.title.index + article.title.fullMatch.length,
                text: `title: { es: "${esc(optimized.title.es)}", en: "${esc(optimized.title.en)}" }`
            });
            replacements.push({
                start: article.subtitle.index,
                end: article.subtitle.index + article.subtitle.fullMatch.length,
                text: `subtitle: { es: "${esc(optimized.subtitle.es)}", en: "${esc(optimized.subtitle.en)}" }`
            });
            replacements.push({
                start: article.excerpt.index,
                end: article.excerpt.index + article.excerpt.fullMatch.length,
                text: `excerpt: { es: "${esc(optimized.excerpt.es)}", en: "${esc(optimized.excerpt.en)}" }`
            });

            // Update or Insert lastSeoUpdate
            if (article.lastSeoUpdate) {
                const chunk = content.substring(article.slugIndex, article.slugIndex + 4000);
                const m = chunk.match(/lastSeoUpdate:\s*(["'])([^"']+)\1/);
                if (m) {
                    replacements.push({
                        start: article.slugIndex + m.index,
                        end: article.slugIndex + m.index + m[0].length,
                        text: `lastSeoUpdate: "${today}"`
                    });
                }
            } else {
                const slugLineEnd = content.indexOf('\n', article.slugIndex);
                if (slugLineEnd !== -1) {
                    replacements.push({
                        start: slugLineEnd,
                        end: slugLineEnd,
                        text: `\n    lastSeoUpdate: "${today}",`
                    });
                }
            }

            // Add to report
            reportMarkdown += `## Article: ${article.slug}\n\n`;
            reportMarkdown += `### Title\n**Before:** ${article.title.es}\n**After:** ${optimized.title.es}\n\n`;
            reportMarkdown += `### Subtitle\n**Before:** ${article.subtitle.es}\n**After:** ${optimized.subtitle.es}\n\n`;
            reportMarkdown += `### Excerpt\n**Before:** ${article.excerpt.es}\n**After:** ${optimized.excerpt.es}\n\n`;
            reportMarkdown += `---\n\n`;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Apply replacements
    replacements.sort((a, b) => b.start - a.start);

    let newContent = content;
    for (const rep of replacements) {
        newContent = newContent.substring(0, rep.start) + rep.text + newContent.substring(rep.end);
    }

    fs.writeFileSync(FILE_PATH, newContent);
    fs.writeFileSync(REPORT_PATH, reportMarkdown);

    console.log('Successfully updated articles and generated report.');
}

main().catch(console.error);