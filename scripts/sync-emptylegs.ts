
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.resolve(__dirname, '../src/data/emptyLegs.ts');

export interface EmptyLeg {
    id: string;
    origin: string;
    destination: string;
    date: string;
    aircraft: string;
    seats: number;
    price: string;
    available: boolean;
}

// --- UTILS ---

function cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

function parseDateEs(dateStr: string): string {
    // Expected format: "DD MES YYYY" e.g., "09 NOV 2020" or "13 FEB 2026"
    const months: { [key: string]: string } = {
        'ENE': '01', 'FEB': '02', 'MAR': '03', 'ABR': '04', 'MAY': '05', 'JUN': '06',
        'JUL': '07', 'AGO': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DIC': '12'
    };

    const parts = dateStr.toUpperCase().split(' ');
    if (parts.length >= 3) {
        const day = parts[0].padStart(2, '0');
        const month = months[parts[1].substring(0, 3)];
        const year = parts[2];
        if (day && month && year) {
            return `${year}-${month}-${day}`;
        }
    }
    return new Date().toISOString().split('T')[0]; // Fallback
}

// --- SCRAPERS ---

async function scrapeMailchimp(): Promise<EmptyLeg[]> {
    const URL = 'http://eepurl.com/dtMgkb';
    console.log(`📡 Scraping Mailchimp: ${URL}`);
    const flights: EmptyLeg[] = [];

    try {
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);

        // Formatting cleanup
        $('br').replaceWith('\n');
        $('p').after('\n');
        $('div').after('\n');
        $('tr').after('\n');

        const bodyText = $('body').text();
        const lines = bodyText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        let captureMode = false;
        let buffer: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.toLowerCase().includes("empty legs") && !line.toLowerCase().includes("fly zar") && !line.toLowerCase().includes("copyright")) {
                if (line.length < 50) captureMode = true;
                continue;
            }
            if (line.includes("Transient Availability") || line.toLowerCase() === "transient availability") {
                if (captureMode) { captureMode = false; break; }
            }
            if (captureMode) {
                if (line.includes("Subscribe") || line.includes("View this email")) continue;
                buffer.push(line);
            }
        }

        let currentFlight: Partial<EmptyLeg> = {};

        for (const line of buffer) {
            const dualCodes = line.match(/\([A-Z]{4}\).*?\([A-Z]{4}\)/);
            const singleCode = line.match(/\([A-Z]{4}\)$/);

            if (dualCodes) {
                if (currentFlight.origin && currentFlight.destination) {
                    pushFlight(flights, currentFlight);
                    currentFlight = {};
                }
                const airportCodeRegex = /\([A-Z]{4}\)/g;
                const codes = line.match(airportCodeRegex);
                if (codes && codes.length >= 2) {
                    const firstCode = codes[0];
                    const parts = line.split(firstCode);
                    currentFlight.origin = parts[0].trim().replace(/,$/, '');
                    const secondCode = codes[1];
                    const destRaw = parts[1];
                    const destPart = destRaw.split(secondCode)[0];
                    currentFlight.destination = destPart.trim().replace(/,$/, '');
                }
            } else if (singleCode) {
                if (currentFlight.origin && currentFlight.destination) {
                    pushFlight(flights, currentFlight);
                    currentFlight = {};
                    currentFlight.origin = cleanCity(line);
                } else if (currentFlight.origin) {
                    currentFlight.destination = cleanCity(line);
                } else {
                    currentFlight.origin = cleanCity(line);
                }
            } else if (line.includes("PAX")) {
                const parts = line.split(/[–-]/);
                if (parts.length > 0) currentFlight.aircraft = parts[0].trim();
                if (parts.length > 1) {
                    const paxMatch = parts[1].match(/(\d+)/);
                    if (paxMatch) currentFlight.seats = parseInt(paxMatch[1]);
                }
            } else if (line.toLowerCase().includes("available:")) {
                const dateMatch = line.match(/[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4}/);
                if (dateMatch) {
                    const dateObj = new Date(dateMatch[0]);
                    if (!isNaN(dateObj.getTime())) currentFlight.date = dateObj.toISOString().split('T')[0];
                }
            }
        }
        if (currentFlight.origin && currentFlight.destination) pushFlight(flights, currentFlight);

    } catch (error) {
        console.error("❌ Error scraping Mailchimp:", error);
    }
    return flights;
}

async function scrapeArgentinaFly(): Promise<EmptyLeg[]> {
    const URL = 'https://argentina-fly.com/es/empty-legs';
    console.log(`📡 Scraping ArgentinaFly: ${URL}`);
    const flights: EmptyLeg[] = [];

    try {
        const response = await axios.get(URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const $ = cheerio.load(response.data);

        $('.leg').each((_, el) => {
            const $leg = $(el);
            const routeText = $leg.find('.leg-info h2').text().trim();
            if (!routeText) return;

            // Route: "Buenos Aires (SADF) - Santiago de Chile (SCEL)"
            const routeParts = routeText.split('-');
            if (routeParts.length < 2) return;

            // Clean origin/dest handling codes like (SADF)
            const origin = cleanCity(routeParts[0].trim());
            const destination = cleanCity(routeParts[1].trim());

            // Details
            let date = '';
            let aircraft = 'Private Jet';
            let seats = 8;
            let price = 'Consultar';

            $leg.find('.leg-info ul li').each((_, li) => {
                const text = $(li).text();
                if (text.includes("Fecha de vuelo:")) {
                    // "Fecha de vuelo: 09 NOV 2020"
                    // Sometimes the date is inside <b>
                    const dateRaw = $(li).find('b').text().trim() || text.replace('Fecha de vuelo:', '').trim();
                    date = parseDateEs(dateRaw);
                }
                if (text.includes("Aeronave:")) {
                    aircraft = text.replace('Aeronave:', '').trim();
                }
                if (text.includes("Precio") || text.includes("USD")) {
                    // "Precio por persona: USD 899"
                    // "Precio: consultar"
                    const priceRaw = text.split(':')[1];
                    if (priceRaw) price = priceRaw.trim();
                }
                if (text.includes("Capacidad:")) {
                    const seatsMatch = text.match(/(\d+)/);
                    if (seatsMatch) seats = parseInt(seatsMatch[1]);
                }
            });

            // If date is in the past, maybe skip? For now we keep all valid ones.
            // Filter extremely old dates? (Optional, user didn't ask)

            const flight: EmptyLeg = {
                id: Math.random().toString(36).substr(2, 9),
                origin,
                destination,
                date: date || new Date().toISOString().split('T')[0],
                aircraft,
                seats,
                price,
                available: true
            };
            flights.push(flight);
        });

    } catch (error) {
        console.error("❌ Error scraping ArgentinaFly:", error);
    }
    return flights;
}

// --- HELPER FUNCTIONS ---

function cleanCity(line: string): string {
    // Input: "Maldonado, UY (SULS)" -> "Maldonado, UY"
    return line.replace(/\s*\([^\)]+\)$/, '').trim().replace(/,$/, '');
}

function pushFlight(list: EmptyLeg[], current: Partial<EmptyLeg>) {
    if (!current.origin || !current.destination) return;
    const flight: EmptyLeg = {
        id: Math.random().toString(36).substr(2, 9),
        origin: current.origin,
        destination: current.destination,
        date: current.date || new Date().toISOString().split('T')[0],
        aircraft: current.aircraft || "Private Jet",
        seats: current.seats || 8,
        price: current.price || "Consultar",
        available: true
    };
    list.push(flight);
}

function generateFileContent(flights: EmptyLeg[]): string {
    return `export interface EmptyLeg {
    id: string;
    origin: string;
    destination: string;
    date: string;
    aircraft: string;
    seats: number;
    price: string;
    available: boolean;
}

export const emptyLegs: EmptyLeg[] = ${JSON.stringify(flights, null, 4)};
`;
}

// --- MAIN ---

async function main() {
    console.log(`🚀 Starting Multi-Source Empty Legs Sync...`);

    // Run scrapers in parallel
    const [mailchimpFlights, argentinaFlyFlights] = await Promise.all([
        scrapeMailchimp(),
        scrapeArgentinaFly()
    ]);

    console.log(`\n📊 Results:`);
    console.log(`- Mailchimp: ${mailchimpFlights.length} flights`);
    console.log(`- ArgentinaFly: ${argentinaFlyFlights.length} flights`);

    const allFlights = [...mailchimpFlights, ...argentinaFlyFlights];

    // Sort by date
    allFlights.sort((a, b) => a.date.localeCompare(b.date));

    console.log(`\n✅ Total merged flights: ${allFlights.length}`);

    fs.writeFileSync(OUTPUT_FILE, generateFileContent(allFlights));
    console.log(`✅ Data written to ${OUTPUT_FILE}`);
}

main();
