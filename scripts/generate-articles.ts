import { execSync } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GEMINI_API_KEY;
const ARTICLES_DIR = path.resolve(__dirname, "../src/data/articles");
const IMG_DIR = path.resolve(__dirname, "../src/img/Articulos");
const INDEX_FILE = path.join(ARTICLES_DIR, "index.ts");

if (!API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY no está configurado en el archivo .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => rl.question(query, resolve));
};

// --- Helper: Read Existing Slugs ---
function getExistingSlugs(): string[] {
    if (!fs.existsSync(INDEX_FILE)) return [];
    const content = fs.readFileSync(INDEX_FILE, "utf-8");
    const matches = content.match(/slug:\s*"([^"]+)"/g);
    if (!matches) return [];
    return matches.map((m) => m.match(/"([^"]+)"/)![1]);
}

// --- Helper: Get Available Images ---
function getAvailableImages(): string[] {
    if (!fs.existsSync(IMG_DIR)) return [];
    const files = fs.readdirSync(IMG_DIR);
    // Filter for common image extensions
    return files.filter(file => /\.(webp|png|jpg|jpeg)$/i.test(file));
}

// --- Helper: Generate Topics ---
async function generateArticleTopics(count: number, existingSlugs: string[]) {
    console.log(`🧠 Generando ${count} temas únicos...`);

    const prompt = `
    You are an expert editor for "Jet Magazine", a luxury private aviation magazine for VGoldenJets (based in Argentina/Latin America).
    
    Current existing article slugs:
    ${existingSlugs.join(", ")}
    
    Task: Generate ${count} UNIQUE, creative, and SEO-optimized article ideas that are NOT in the list above.
    Focus on:
    - Luxury travel from/to Argentina (Buenos Aires, Patagonia, Mendoza, Punta del Este).
    - Private jet benefits for business (Latam).
    - Lifestyle (Golf, Polo, Fine Dining) connected to private aviation.
    - Technical/Safety aspects explained simply for clients.
    
    Output strictly a JSON array of objects with these fields:
    - slug: URL friendly string (kebab-case).
    - title_es: Title in Spanish.
    - context: Brief description of what the article should be about.
    
    JSON Output:
  `;

    let result;
    try {
        result = await model.generateContent(prompt);
    } catch (error) {
        console.error("Error generating brainstorming:", error);
        return [];
    }
    const response = result.response;
    const text = response.text();

    try {
        const cleanedText = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse topics JSON", text);
        return [];
    }
}

async function generateArticleContent(topic: any, imageFilename: string, imageVarName: string) {
    console.log(`✍️  Escribiendo artículo: ${topic.title_es}...`);

    // Ensure we construct the import path correctly relative to the alias @/img/Articulos
    const imageImportPath = `@/img/Articulos/${imageFilename}`;

    const prompt = `
    Write a complete TypeScript content file for a React-based blog.
    
    Topic: ${topic.title_es}
    Context: ${topic.context}
    Target Audience: High-net-worth individuals, CEOs, luxury travelers in Argentina/Latam.
    Tone: Sophisticated, exclusive, professional, yet inviting.
    
    Structure MUST match this EXACT TypeScript format:
    
    \`\`\`typescript
    import { ArticleView } from "@/types/article";
    import ${imageVarName} from "${imageImportPath}";
    
    const article: ArticleView = {
        slug: "${topic.slug}",
        date: "${new Date().toISOString().split('T')[0]}",
        dateMs: ${Date.now()},
        cover: ${imageVarName},
        title: {
            es: "${topic.title_es}", 
            en: "..." // English translation
        },
        subtitle: {
            es: "...", // Catchy subtitle in Spanish
            en: "..." // English translation
        },
        excerpt: {
            es: "...", // SEO optimized excerpt in Spanish
            en: "..." // English translation
        },
        category: {
            es: "Turismo", 
            en: "Tourism"
        },
        content: [
            { type: "p", text: { es: "...", en: "..." } },
            { type: "h2", text: { es: "...", en: "..." } },
            { type: "p", text: { es: "...", en: "..." } },
            { type: "img", src: ${imageVarName}, alt: { es: "...", en: "..." } }, 
            { type: "h2", text: { es: "...", en: "..." } },
            { type: "p", text: { es: "...", en: "..." } },
            { 
              type: "cta", 
              text: {
                  es: "✈️ ¿Quiere volar a este destino? Cotice su vuelo privado hoy mismo.",
                  en: "✈️ Want to fly to this destination? Quote your private flight today."
              }
            }
        ],
    };
    
    export default article;
    \`\`\`
    
    IMPORTANT Rules:
    1. Content MUST be VALID TypeScript.
    2. Provide BOTH Spanish (es) and English (en) translations for ALL text fields.
    3. Use "h2" for subtitles.
    4. Include at least 3-4 paragraphs ('p') and 2-3 headers ('h2').
    5. Focus on SEO keywords: "Jet privado Argentina", "Vuelos privados", "Alquiler de aviones", etc.
    6. Be specific with real data (flight times, distances in km, popular airports).
    7. Return ONLY the code block, no markdown formatting.
    8. **CRITICAL**: The 'text' fields MUST BE PLAIN TEXT. DO NOT use Markdown (like **bold**, *italic*) or HTML tags (like <strong>, <b>, <i>). Write clean, narrative text only.
  `;

    let result;
    try {
        result = await model.generateContent(prompt);
    } catch (error) {
        console.error("Error generating content:", error);
        return null;
    }
    const text = result.response.text();
    return text.replace(/```typescript|```/g, "").trim();
}

async function updateIndexFile(articleMeta: any, imageVarName: string, imageFilename: string) {
    console.log("📝 Actualizando index.ts...");

    let content = fs.readFileSync(INDEX_FILE, "utf-8");

    // 1. Check if image import exists, if not add it
    // We need a unique variable name for the import to avoid collisions if multiple articles use the same image but different var names
    // Actually, to be safe, let's normalize the var name based on the filename, stripping extension and non-alphanumeric
    // But since we are passing 'imageVarName', let's stick to that.

    // Regex to find existing import: import .* from "@/img/Articulos/filename.ext";
    // Or we can just search for the image path.
    const imageImportRegex = new RegExp(`import\\s+.*\\s+from\\s+"@/img/Articulos/${imageFilename}";?`);

    if (!imageImportRegex.test(content)) {
        // Add import at the top
        // Find the last import line
        const importLines = content.match(/^import.*;/gm);
        // If we can't find imports, just prepend (unlikely).
        // A safer bet is to insert after the last image import or at the top.
        const lastArticulosImport = content.lastIndexOf('@/img/Articulos/');
        let insertPos = 0;

        if (lastArticulosImport !== -1) {
            const endOfLine = content.indexOf('\n', lastArticulosImport);
            insertPos = endOfLine + 1;
        } else {
            // Fallback: after the first block of imports
            const firstDoubleNewline = content.indexOf('\n\n');
            insertPos = firstDoubleNewline !== -1 ? firstDoubleNewline : 0;
        }

        const newImportLine = `import ${imageVarName} from "@/img/Articulos/${imageFilename}";`;
        content = content.slice(0, insertPos) + newImportLine + '\n' + content.slice(insertPos);
    } else {
        // If it exists, we technically should check what variable name is used for it,
        // but for now, we assume the user might want to reuse the var name if they selected it.
        // However, if the file is already imported as 'foo', and we try to import as 'bar', it's valid typescript but redundant.
        // To keep it simple: We just added it if it wasn't there. If it IS there, we have to trust the variable name matches 
        // OR we just add a duplicate import with a new name (TS allows this, though it's messy). 
        // Better: Let's just find the variable name if it exists?
        // Too complex for regex parsing robustly without AST. 
        // We will skip adding the import if the EXACT path is already imported, assuming the existing variable is usable? 
        // No, we don't know the existing variable name.
        // So, checking if the path exists is insufficient because we need the variable name.
        // Let's just add the import if the exact `import ${imageVarName} ...` is missing.

        const exactImportRegex = new RegExp(`import\\s+${imageVarName}\\s+from`);
        if (!exactImportRegex.test(content)) {
            // Path exists but variable different? Or path doesn't exist?
            // Safest: Add our specific import line. If it duplicates the file import, it's just a second reference.
            const newImportLine = `import ${imageVarName} from "@/img/Articulos/${imageFilename}";`;
            // Insert after helpers imports (line 1)
            const firstLineEnd = content.indexOf('\n');
            content = content.slice(0, firstLineEnd + 1) + newImportLine + '\n' + content.slice(firstLineEnd + 1);
        }
    }

    // 2. Add Meta Entry
    const insertMarker = "export const articlesMeta: ArticleMeta[] = [";

    // Parse category from content to use constant
    const catMap: Record<string, string> = {
        "Turismo": "CAT_TURISMO",
        "Negocios": "CAT_NEGOCIOS",
        "Flota": "CAT_FLOTA",
        "Servicios": "CAT_SERVICIOS",
        "Eventos": "CAT_EVENTOS",
        "Precios": "CAT_PRECIOS",
        "Oportunidades": "CAT_OPORTUNIDADES"
    };

    // Default to Turismo if undefined
    let catVar = "CAT_TURISMO";
    if (articleMeta.category && catMap[articleMeta.category]) {
        catVar = catMap[articleMeta.category];
    }

    const newEntry = `    {
        slug: "${articleMeta.slug}",
        date: "${articleMeta.date}",
        dateMs: ${articleMeta.dateMs},
        cover: ${imageVarName},
        title: {
            es: "${articleMeta.title.es}",
            en: "${articleMeta.title.en}" 
        },
        subtitle: {
            es: "${articleMeta.subtitle.es}",
            en: "${articleMeta.subtitle.en}"
        },
        excerpt: {
            es: "${articleMeta.excerpt.es}",
            en: "${articleMeta.excerpt.en}"
        },
        category: ${catVar}
    },`;

    content = content.replace(insertMarker, `${insertMarker}\n${newEntry}`);
    fs.writeFileSync(INDEX_FILE, content);
}


// --- Main Workflow ---
async function main() {
    console.log("\n🚀 Generador de Artículos Jet Magazine (Modo Interactivo)\n");

    const existingSlugs = getExistingSlugs();
    const images = getAvailableImages();

    // --- Step 1: Topic Selection ---
    let topic: any = null;

    while (!topic) {
        console.log("-----------------------------------------");
        console.log("1. 🧠  Generar NUEVOS temas (Auto)");
        console.log("2. ✍️  Ingresar tema/título MANUALMENTE");
        console.log("3. ❌  Salir");
        console.log("-----------------------------------------");

        const choice = await askQuestion("Elige una opción (1-3): ");

        if (choice === "1") {
            const countStr = await askQuestion("¿Cuántas ideas generar? (default 3): ");
            const count = parseInt(countStr) || 3;
            const topics = await generateArticleTopics(count, existingSlugs);

            console.log("\nTemas Generados:");
            topics.forEach((t: any, i: number) => {
                console.log(`[${i + 1}] ${t.title_es} (Slug: ${t.slug})`);
            });

            const selection = await askQuestion("\nSelecciona el número del tema para continuar (o 'r' para reintentar, 'c' para cancelar): ");
            if (selection.toLowerCase() === 'c') continue;
            if (selection.toLowerCase() === 'r') continue;

            const idx = parseInt(selection) - 1;
            if (topics[idx]) {
                topic = topics[idx];
            } else {
                console.log("Selección inválida.");
            }

        } else if (choice === "2") {
            const title = await askQuestion("Ingresa el Título del Artículo (ES): ");
            const context = await askQuestion("Ingresa un breve contexto/instrucciones: ");
            // Normalize slug: lowercase, replace spaces with dashes, remove special chars
            const slug = title.toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
                .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric chars
                .trim()
                .replace(/\s+/g, "-");

            topic = {
                title_es: title,
                context: context,
                slug: slug
            };
        } else if (choice === "3") {
            process.exit(0);
        }
    }

    // --- Step 2: Image Selection ---
    console.log("\n🖼️  Seleccionar Imagen de Portada:");
    images.forEach((img, i) => {
        console.log(`[${i + 1}] ${img}`);
    });
    console.log(`[C] Entrada Personalizada/Manual`);

    let selectedImageFilename = "default.webp";
    let selectedImageVarName = "placeholder";

    const imgChoice = await askQuestion(`Elige una imagen (1-${images.length}) [Default: 1]: `);

    if (imgChoice.toLowerCase() === 'c') {
        selectedImageFilename = await askQuestion("Ingresa el nombre del archivo (debe existir en src/img/Articulos/): ");
    } else {
        const idx = parseInt(imgChoice) - 1;
        if (images[idx]) {
            selectedImageFilename = images[idx];
        } else {
            // If user just pressed enter or invalid, default to first IF exists, else default.webp
            if (images.length > 0) {
                selectedImageFilename = images[0];
                console.log(`Usando por defecto: ${selectedImageFilename}`);
            } else {
                console.log(`No se encontraron imágenes. Usando 'default.webp'`);
            }
        }
    }

    // Generate variable name: remove extension, camelCase
    selectedImageVarName = selectedImageFilename.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "");
    // Ensure starts with letter
    if (/^[^a-zA-Z]/.test(selectedImageVarName)) selectedImageVarName = "img" + selectedImageVarName;


    // --- Step 3: Generation & Verification Loop ---
    let finalContent = null;
    let approved = false;

    while (!approved) {
        finalContent = await generateArticleContent(topic, selectedImageFilename, selectedImageVarName);

        if (!finalContent) {
            console.log("Falló la generación.");
            break;
        }

        // Preview (Extract metadata manually for preview to catch basic errors)
        const titleMatch = finalContent.match(/title:\s*"([^"]+)"/);
        const excerptMatch = finalContent.match(/excerpt:\s*"([^"]+)"/);

        console.log("\n---------------- VISTA PREVIA ----------------");
        console.log(`Título:   ${titleMatch ? titleMatch[1] : "?"}`);
        console.log(`Extracto: ${excerptMatch ? excerptMatch[1] : "?"}`);
        console.log("-----------------------------------------");

        const action = await askQuestion("Opciones: [Y] Sí/Guardar, [R] Regenerar, [N] Cancelar: ");

        if (action.toLowerCase() === 'y') {
            approved = true;
        } else if (action.toLowerCase() === 'n') {
            console.log("Cancelado.");
            process.exit(0);
        } else {
            console.log("Regenerando...");
        }
    }

    // --- Step 4: Save & Publish ---
    if (finalContent && approved) {
        const filePath = path.join(ARTICLES_DIR, `${topic.slug}.ts`);
        fs.writeFileSync(filePath, finalContent);
        console.log(`✅ Archivo Guardado: ${topic.slug}.ts`);

        // Extract bilingual metadata
        const extractField = (field: string) => {
            const esMatch = finalContent.match(new RegExp(`${field}:\\s*\\{\\s*[^}]*es:\\s*"([^"]+)"`));
            const enMatch = finalContent.match(new RegExp(`${field}:\\s*\\{\\s*[^}]*en:\\s*"([^"]+)"`));
            return {
                es: esMatch ? esMatch[1] : "",
                en: enMatch ? enMatch[1] : ""
            };
        };

        const title = extractField("title");
        const subtitle = extractField("subtitle");
        const excerpt = extractField("excerpt");

        // Category is simpler, usually short
        const categoryMatchEs = finalContent.match(/category:\s*\{\s*[^}]*es:\s*"([^"]+)"/);
        const categoryMatchEn = finalContent.match(/category:\s*\{\s*[^}]*en:\s*"([^"]+)"/);
        const category = {
            es: categoryMatchEs ? categoryMatchEs[1] : "Turismo",
            en: categoryMatchEn ? categoryMatchEn[1] : "Tourism"
        };

        // Fallbacks if extraction fails
        if (!title.es) title.es = topic.title_es;
        if (!title.en) title.en = topic.title_es + " (EN)"; // Temporary fallback

        const meta = {
            slug: topic.slug,
            date: new Date().toISOString().split('T')[0],
            dateMs: Date.now(),
            title, subtitle, excerpt, category
        };

        await updateIndexFile(meta, selectedImageVarName, selectedImageFilename);
        console.log("✅ Índice actualizado!");

        // Auto-generate Sitemap
        try {
            console.log("🗺️  Regenerando Sitemap...");
            execSync("node scripts/generate-sitemap.js", { stdio: "inherit" });
            console.log("✅ Sitemap actualizado!");
        } catch (error) {
            console.error("❌ Error actualizando el sitemap:", error);
        }

        console.log("\n✨ Artículo publicado exitosamente!");
    }

    rl.close();
}

main();
