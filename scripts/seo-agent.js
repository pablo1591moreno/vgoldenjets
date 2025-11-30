import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURACIÓN ---
const API_KEY = process.env.GEMINI_API_KEY;
const FILE_PATH = path.join(process.cwd(), 'src', 'contexts', 'DatosParaArticulos.tsx');
const REPORT_PATH = path.join(process.cwd(), 'seo_report.md');
const ARTICLES_TO_PROCESS = 2;

if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// 1. SEGURIDAD: Desactivamos filtros para evitar bloqueos por temas de "lujo"
const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

// 2. LISTA DE MODELOS: Si uno falla (404), probamos el siguiente
const MODEL_CANDIDATES = [
    "gemini-1.5-flash",
    "gemini-pro",           // El estándar más estable
    "gemini-1.5-flash-latest",
    "gemini-1.0-pro",
    "gemini-1.5-pro"
];

// --- FUNCIÓN QUE PRUEBA MODELOS EN BUCLE ---
async function generateWithFallback(prompt) {
    let lastError = null;

    for (const modelName of MODEL_CANDIDATES) {
        try {
            console.log(`📡 Probando conexión con: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName, safetySettings });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            console.log(`✅ ¡Éxito con ${modelName}!`);
            return text; // Si llegamos aquí, funcionó. Retornamos y salimos del bucle.
        } catch (error) {
            console.warn(`⚠️ Falló ${modelName}: ${error.message}`);
            lastError = error;
            // Continuamos al siguiente modelo del array...
        }
    }
    // Si terminamos el bucle y nada funcionó:
    throw new Error(`FATAL: Todos los modelos fallaron. Último error: ${lastError?.message}`);
}

// --- FUNCIÓN DE OPTIMIZACIÓN ---
async function optimizeArticle(article) {
    console.log(`Optimizing article: ${article.slug}`);

    const prompt = `
    You are an SEO expert. Analyze metadata and return ONLY a valid JSON object.
    Current Metadata:
    Title: ${article.title.es}
    Subtitle: ${article.subtitle.es}
    Excerpt: ${article.excerpt.es}

    Return JSON structure:
    {
      "title": { "es": "...", "en": "..." },
      "subtitle": { "es": "...", "en": "..." },
      "excerpt": { "es": "...", "en": "..." }
    }
    `;

    try {
        // Usamos la función tanque que prueba todos los modelos
        let text = await generateWithFallback(prompt);

        // 3. LIMPIEZA DE JSON (Regex para quitar markdown ```json ... ```)
        text = text.replace(/```json/g, '').replace(/```/g, '');
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');

        if (firstBrace === -1 || lastBrace === -1) {
            throw new Error(`La IA no devolvió un JSON válido. Respuesta recibida: ${text.substring(0, 50)}...`);
        }

        text = text.substring(firstBrace, lastBrace + 1);
        return { success: true, data: JSON.parse(text) };

    } catch (error) {
        console.error(`❌ Error procesando ${article.slug}:`, error.message);
        return { success: false, error: error.message };
    }
}

// --- MAIN LOOP ---
async function main() {
    console.log('Starting SEO optimization...');

    if (!fs.existsSync(FILE_PATH)) {
        console.error(`File not found: ${FILE_PATH}`);
        process.exit(1);
    }

    let content = fs.readFileSync(FILE_PATH, 'utf-8');

    // Regex para encontrar artículos
    const slugRegex = /slug:\s*(["'])([^"']+)\1/g;
    let match;
    const articles = [];

    while ((match = slugRegex.exec(content)) !== null) {
        const slug = match[2];
        const slugIndex = match.index;
        // Leemos 4000 caracteres para asegurar que capturamos toda la metadata
        const chunk = content.substring(slugIndex, slugIndex + 4000);

        const dateMatch = chunk.match(/date:\s*(["'])([^"']+)\1/);
        const date = dateMatch ? dateMatch[2] : '1970-01-01';

        const lastSeoUpdateMatch = chunk.match(/lastSeoUpdate:\s*(["'])([^"']+)\1/);
        const lastSeoUpdate = lastSeoUpdateMatch ? lastSeoUpdateMatch[2] : null;

        const extractField = (fieldName) => {
            const regex = new RegExp(`${fieldName}:\\s*\\{([\\s\\S]*?)\\}`, 'm');
            const m = chunk.match(regex);
            if (m) {
                const inner = m[1];
                const esMatch = inner.match(/es:\s*(["'])([\s\S]*?)\1/);
                const enMatch = inner.match(/en:\s*(["'])([\s\S]*?)\1/);
                if (esMatch && enMatch) return { fullMatch: m[0], index: slugIndex + m.index, es: esMatch[2], en: enMatch[2] };
            }
            return null;
        };

        const title = extractField('title');
        const subtitle = extractField('subtitle');
        const excerpt = extractField('excerpt');

        if (title && subtitle && excerpt) {
            articles.push({ slug, date, lastSeoUpdate, title, subtitle, excerpt, slugIndex });
        }
    }

    // Ordenar: Prioridad a los que nunca se han optimizado
    articles.sort((a, b) => {
        if (!a.lastSeoUpdate && !b.lastSeoUpdate) return new Date(a.date) - new Date(b.date);
        if (!a.lastSeoUpdate) return -1;
        if (!b.lastSeoUpdate) return 1;
        return new Date(a.lastSeoUpdate) - new Date(b.lastSeoUpdate);
    });

    const articlesToOptimize = articles.slice(0, ARTICLES_TO_PROCESS);
    console.log(`Found ${articles.length} total. Optimizing top ${articlesToOptimize.length}: ${articlesToOptimize.map(a => a.slug).join(', ')}`);

    const replacements = [];
    let reportMarkdown = `# Weekly SEO Report\n**Date:** ${new Date().toISOString().split('T')[0]}\n\n`;
    const today = new Date().toISOString().split('T')[0];

    for (const article of articlesToOptimize) {
        const result = await optimizeArticle(article);

        if (result.success) {
            const optimized = result.data;
            const esc = (s) => s.replace(/"/g, '\\"').replace(/\n/g, '\\n');

            replacements.push({ start: article.title.index, end: article.title.index + article.title.fullMatch.length, text: `title: { es: "${esc(optimized.title.es)}", en: "${esc(optimized.title.en)}" }` });
            replacements.push({ start: article.subtitle.index, end: article.subtitle.index + article.subtitle.fullMatch.length, text: `subtitle: { es: "${esc(optimized.subtitle.es)}", en: "${esc(optimized.subtitle.en)}" }` });
            replacements.push({ start: article.excerpt.index, end: article.excerpt.index + article.excerpt.fullMatch.length, text: `excerpt: { es: "${esc(optimized.excerpt.es)}", en: "${esc(optimized.excerpt.en)}" }` });

            if (article.lastSeoUpdate) {
                const chunk = content.substring(article.slugIndex, article.slugIndex + 4000);
                const m = chunk.match(/lastSeoUpdate:\s*(["'])([^"']+)\1/);
                if (m) replacements.push({ start: article.slugIndex + m.index, end: article.slugIndex + m.index + m[0].length, text: `lastSeoUpdate: "${today}"` });
            } else {
                const slugLineEnd = content.indexOf('\n', article.slugIndex);
                if (slugLineEnd !== -1) replacements.push({ start: slugLineEnd, end: slugLineEnd, text: `\n    lastSeoUpdate: "${today}",` });
            }

            reportMarkdown += `## ✅ ${article.slug}\n**Old Title:** ${article.title.es}\n**New Title:** ${optimized.title.es}\n\n`;
        } else {
            // Reportamos el error pero NO rompemos el script
            reportMarkdown += `## ❌ Falló: ${article.slug}\n> **Error:** ${result.error}\n\n`;
        }
        // Esperamos un poco para no saturar la API
        await new Promise(r => setTimeout(r, 1000));
    }

    // Aplicar cambios al archivo
    replacements.sort((a, b) => b.start - a.start);
    let newContent = content;
    for (const rep of replacements) newContent = newContent.substring(0, rep.start) + rep.text + newContent.substring(rep.end);

    fs.writeFileSync(FILE_PATH, newContent);
    fs.writeFileSync(REPORT_PATH, reportMarkdown);
    console.log('Done. Report generated.');
}

main().catch(console.error);