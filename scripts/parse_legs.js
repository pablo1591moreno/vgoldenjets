import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.resolve(__dirname, '../temp_legs.txt');
const outputFile = path.resolve(__dirname, '../src/data/emptyLegs.ts');

const content = fs.readFileSync(inputFile, 'utf-8');

// Normalize line endings
const cleanContent = content.replace(/\r\n/g, '\n');
const linesRaw = cleanContent.split('\n');

const blocks = [];
let currentBlock = [];

for (const line of linesRaw) {
    if (line.trim() === "") {
        if (currentBlock.length > 0) {
            blocks.push(currentBlock);
            currentBlock = [];
        }
    } else {
        currentBlock.push(line.trim());
    }
}
if (currentBlock.length > 0) blocks.push(currentBlock);

console.log(`Found ${blocks.length} blocks.`);

const months = {
    "ene": "01", "feb": "02", "mar": "03", "abr": "04", "may": "05", "jun": "06",
    "jul": "07", "ago": "08", "sep": "09", "oct": "10", "nov": "11", "dic": "12",
    "diciembre": "12", "enero": "01", "febrero": "02", "marzo": "03", "abril": "04", "mayo": "05", "junio": "06",
    "julio": "07", "agosto": "08", "septiembre": "09", "octubre": "10", "noviembre": "11"
};

function parseDate(dateStr) {
    try {
        let clean = dateStr.replace(/^(Dom\.|Dom|Lun\.|Lun|Mar\.|Mar|Mié\.|Mié|Jue\.|Jue|Vie\.|Vie|Sáb\.|Sáb|Domingo|Lunes|Martes|Miércoles|Jueves|Viernes|Sábado),?\s+/i, "");
        const yearMatch = clean.match(/202[5-9]/);
        if (!yearMatch) return new Date().toISOString().split('T')[0];
        const year = yearMatch[0];
        const dayMatch = clean.match(/\b\d{1,2}\b/);
        const day = dayMatch ? dayMatch[0].padStart(2, '0') : "01";
        let month = "01";
        const lowercaseClean = clean.toLowerCase();
        for (const [mName, mVal] of Object.entries(months)) {
            if (lowercaseClean.includes(mName)) {
                month = mVal;
                break;
            }
        }
        return `${year}-${month}-${day}`;
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
}

const legs = blocks.map((lines, idx) => {
    // Expected at least 3-4 lines.
    // Line 0: Aircraft (sometimes)
    // Find line with " ( " for route

    let routeLine = lines.find(l => l.includes("(") && l.includes(")"));
    let detailsLine = lines.find(l => l.includes("pasajeros") || l.includes("personas"));
    let availLine = lines.find(l => l.toLowerCase().startsWith("disponible:"));

    // Fallback if aircraft is just the first line
    let aircraft = lines[0];

    if (!routeLine || !detailsLine || !availLine) {
        console.log(`Skipping block ${idx + 1}: Missing fields.`, lines);
        return null;
    }

    // Parse Route: "City1 (CODE1) City2 (CODE2)"
    // Regex: Start, capture until (, capture code, capture until (, capture code
    const routeRegex = /^(.*?)\s*\(\s*([A-Z]{3,4})\s*\)\s*(.*?)\s*\(\s*([A-Z]{3,4})\s*\)$/;
    const routeMatch = routeLine.match(routeRegex);

    let from = "Unknown";
    let to = "Unknown";

    if (routeMatch) {
        // 1: From City, 2: From Code, 3: To City, 4: To Code
        const fromCity = routeMatch[1].replace(/,$/, '').trim(); // remove trailing comma
        const fromCode = routeMatch[2];
        const toCity = routeMatch[3].replace(/,$/, '').trim();
        const toCode = routeMatch[4];

        from = `${fromCity} (${fromCode})`;
        to = `${toCity} (${toCode})`;
    } else {
        // Fallback simple split if regex fails (e.g. slight format diff)
        const parts = routeLine.split(" ) ");
        if (parts.length >= 2) {
            from = parts[0] + " )";
            to = parts[1];
        } else {
            from = routeLine;
        }
    }

    const availText = availLine.replace("Disponible: ", "").split("–")[0].trim();
    const date = parseDate(availText);

    const seatsMatch = detailsLine.match(/(\d+)\s*(pasajeros|personas)/);
    const seats = seatsMatch ? parseInt(seatsMatch[1]) : 8;

    const basePrice = 2000;
    const pricePerSeat = 300;
    const price = basePrice + (seats * pricePerSeat) + Math.floor(Math.random() * 1000);
    const originalPrice = Math.floor(price * 1.5);

    const aircraftLower = aircraft.toLowerCase();
    let imageVar = "img3"; // default

    if (aircraftLower.includes("learjet 60")) imageVar = "imgLear60";
    else if (aircraftLower.includes("learjet 40")) imageVar = "imgLear60";
    else if (aircraftLower.includes("gulfstream")) imageVar = "imgGulfstream";
    else if (aircraftLower.includes("global")) imageVar = "imgGlobal";
    else if (aircraftLower.includes("challenger")) imageVar = "imgChallenger";
    else if (aircraftLower.includes("phenom")) imageVar = "img3";
    else if (aircraftLower.includes("hawker")) imageVar = "imgHawker";
    else if (aircraftLower.includes("falcon")) imageVar = "imgFalcon";

    return {
        id: `el-${String(idx + 1).padStart(3, '0')}`,
        from,
        to,
        date,
        aircraft,
        seats,
        price,
        currency: "USD",
        originalPrice,
        imageVar // Temporary field
    };
}).filter(l => l);

const imports = `import img3 from '@/img/img 3.webp';
import imgLear60 from '@/img/Lear60.webp';
import imgGulfstream from '@/img/Gulfstream.webp';
import imgGlobal from '@/img/BombardierGlobal.webp';
import imgChallenger from '@/img/Challenger601.webp';
import imgFalcon from '@/img/DassaultFalcon.webp';
import imgHawker from '@/img/Hawker 800.webp';
`;

let legsJson = JSON.stringify(legs, null, 4);

// Replace "imageVar": "xyz" with image: xyz
// Regex to replace: "imageVar": "([^"]+)" -> image: $1
legsJson = legsJson.replace(/"imageVar":\s*"([^"]+)"/g, 'image: $1');

const outputContent = `import { EmptyLeg } from './types'; // Or define interface here if needed, but usually kept separate. Assuming inline for now as before.
${imports}

export interface EmptyLeg {
    id: string;
    from: string;
    to: string;
    date: string; // ISO string YYYY-MM-DD
    aircraft: string;
    seats: number;
    price: number;
    currency: string;
    originalPrice: number;
    image?: string;
}

export const emptyLegs: EmptyLeg[] = ${legsJson};
`;


fs.writeFileSync(outputFile, outputContent);
console.log(`Parsed ${legs.length} legs.`);
