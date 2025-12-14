import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Constants
const SHEET_ID = '155MVh2xfz8cnxhK2BeLLSkvzRo1PaNprIn7ThUtv4TQ';
const KEY_FILE = path.join(process.cwd(), 'serviceAccountKey.json');
const ARTICLES_INDEX_PATH = path.join(process.cwd(), 'src/data/articles/index.ts');

// Scopes required for writing to Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Custom Links provided by user to PRESERVE specifically
// Custom Links provided by user to PRESERVE specifically
const PROTECTED_LINKS = [
    "https://vgoldenjets.com/jetsmagazine/empty-legs-argentina-acceso-smart?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=vuelos_tramo_vacio&utm_content=post_linkedin&utm_term=vuelos_tramo_vacio",
    "https://vgoldenjets.com/jetsmagazine/charter-negocios-latam-rutas?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=charter_rutas&utm_content=post_linkedin&utm_term=charter_rutas",
    "https://vgoldenjets.com/jetsmagazine/alquilar-jet-privado-para-8-personas?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=ocho_personas&utm_content=post_linkedin&utm_term=ocho_personas",
    "https://vgoldenjets.com/jetsmagazine/vuelos-privados-eventos-grupos?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=vuelos_eventos&utm_content=post_linkedin&utm_term=vuelos_eventos",
    "https://vgoldenjets.com/jetsmagazine/factores-precio-vuelo-privado-argentina?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=factores_precios&utm_content=post_linkedin&utm_term=factores_precios",
    "https://vgoldenjets.com/jetsmagazine/vuelos-privados-argentina?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=ventajas_accesos_eficiencia&utm_content=post_linkedin&utm_term=ventajas_accesos_eficiencia",
    "https://vgoldenjets.com/jetsmagazine/vuelos-privados-desde-buenos-aires?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=vuelos_buenos_aires&utm_content=post_linkedin&utm_term=vuelos_buenos_aires",
    "https://vgoldenjets.com/jetsmagazine/itinerario-ideal-sedes-mundial-2026-jet-privado?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=mundial2026&utm_content=post_linkedin&utm_term=mundial2026",
    "https://vgoldenjets.com/jetsmagazine/ruta-del-vino-mendoza-jet-privado-gastronomia?utm_source=linkedin&utm_medium=articulo_linkedin&utm_campaign=ruta_mendoza&utm_content=post_linkedin&utm_term=ruta_mendoza"
];

function parseCustomLink(fullUrl: string): string[] {
    const urlObj = new URL(fullUrl);
    const params = urlObj.searchParams;
    const cleanUrl = fullUrl.split('?')[0];

    return [
        cleanUrl,
        params.get('utm_source') || '',
        params.get('utm_medium') || '',
        params.get('utm_campaign') || '',
        params.get('utm_content') || '',
        params.get('utm_term') || ''
    ];
}

async function main() {
    console.log('🚀 Starting Google Sheets Sync...');

    // 1. Authenticate
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE,
        scopes: SCOPES,
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Extract Slugs from index.ts using Regex
    const fileContent = fs.readFileSync(ARTICLES_INDEX_PATH, 'utf-8');
    const slugRegex = /slug:\s*"([^"]+)"/g;

    const slugs: string[] = [];
    let match;
    while ((match = slugRegex.exec(fileContent)) !== null) {
        slugs.push(match[1]);
    }
    console.log(`✅ Found ${slugs.length} articles in codebase.`);

    // 3. Get Existing URLs from Sheet (Column A)
    try {
        const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
        const sheetName = meta.data.sheets?.[0]?.properties?.title || 'Sheet1';
        console.log(`📄 Using Sheet Name: "${sheetName}"`);

        const range = `${sheetName}!A:A`;

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: range,
        });

        const existingUrls = new Set(
            (response.data.values || [])
                .flat()
                .map((val: any) => (typeof val === 'string' ? val.trim() : ''))
                .filter(url => url.length > 0)
        );

        console.log(`📊 Found ${existingUrls.size} existing URLs in Sheet.`);

        const newRows: string[][] = [];
        const processedUrls = new Set<string>();

        // 4a. Process Protected Links FIRST
        console.log("🔒 Processing protected links...");
        for (const link of PROTECTED_LINKS) {
            const row = parseCustomLink(link);
            const cleanUrl = row[0];

            if (!existingUrls.has(cleanUrl)) {
                newRows.push(row);
                processedUrls.add(cleanUrl);
            } else {
                processedUrls.add(cleanUrl);
            }
        }

        // 4b. Process Codebase Articles
        console.log("⚙️  Processing standard articles...");
        for (const slug of slugs) {
            const url = `https://vgoldenjets.com/jetsmagazine/${slug}`;
            const urlWithWWW = `https://www.vgoldenjets.com/jetsmagazine/${slug}`;

            if (existingUrls.has(url) || processedUrls.has(url) ||
                existingUrls.has(urlWithWWW) || processedUrls.has(urlWithWWW)) {
                continue;
            }

            // Standard UTM Logic (Fallback)
            const utm_source = 'linkedin';
            const utm_medium = 'articulo_linkedin';
            const utm_campaign = slug.split('-').slice(0, 6).join('_');
            const utm_content = 'post_linkedin';
            const utm_term = utm_campaign;

            newRows.push([
                url,
                utm_source,
                utm_medium,
                utm_campaign,
                utm_content,
                utm_term
            ]);
        }

        // 5. Append
        if (newRows.length > 0) {
            console.log(`📝 Writing ${newRows.length} new rows to Sheets...`);
            await sheets.spreadsheets.values.append({
                spreadsheetId: SHEET_ID,
                range: `${sheetName}!A:F`,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: newRows
                }
            });
            console.log('✨ Sync complete!');
        } else {
            console.log('👍 Everything is already up to date.');
        }

    } catch (error) {
        console.error("❌ Error syncing with Google Sheets:", error);
    }
}

main().catch(console.error);
