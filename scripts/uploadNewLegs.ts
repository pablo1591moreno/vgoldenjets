import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import * as fs from "fs";
import * as path from "path";

// Auth with Service Account
const serviceAccountPath = path.join(process.cwd(), "serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const FILE_PATH = path.join(process.cwd(), "temp_legs.txt");

const MONTH_MAP: { [key: string]: string } = {
    "Ene": "01", "Feb": "02", "Mar": "03", "Abr": "04", "May": "05", "Jun": "06",
    "Jul": "07", "Ago": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dic": "12",
    "enero": "01", "febrero": "02", "marzo": "03", "abril": "04", "mayo": "05", "junio": "06",
    "julio": "07", "agosto": "08", "septiembre": "09", "octubre": "10", "noviembre": "11", "diciembre": "12",
    "dic": "12", "dic.": "12" // handle variations like "dic."
};

function parseDate(dateStr: string): string {
    // Example formats:
    // "Dom 14 Dic 2025 23:00 ARTE"
    // "martes 16 de diciembre de 2025"
    // "Sáb dic 20 2025"
    // "Dom. 21 dic. 2025"

    try {
        // Normalize: remove dots, extra spaces
        const clean = dateStr.toLowerCase().replace(/\./g, "").replace(/,/g, "").replace(/\s+/g, " ");
        // Try to match basic parts day/month/year
        // Regex for DD Month YYYY or Month DD YYYY is tricky due to variety.
        // Let's look for known month names num year.

        const yearMatch = clean.match(/202[0-9]/);
        if (!yearMatch) return new Date().toISOString().split('T')[0];
        const year = yearMatch[0];

        // Find month
        let month = "01";
        for (const [key, val] of Object.entries(MONTH_MAP)) {
            if (clean.includes(key.toLowerCase())) {
                month = val;
                break;
            }
        }

        // Find day (1 or 2 digits, NOT the year)
        // We can split by spaces and find the first number that isn't the year.
        const parts = clean.split(" ");
        let day = "01";
        for (const p of parts) {
            if (/^\d{1,2}$/.test(p)) {
                day = p.padStart(2, '0');
                break;
            }
        }

        return `${year}-${month}-${day}`;

    } catch (e) {
        console.error("Error parsing date:", dateStr, e);
        return new Date().toISOString().split('T')[0];
    }
}

async function uploadLegs() {
    try {
        const content = fs.readFileSync(FILE_PATH, "utf-8");
        // Split by double newlines as likely delimiters, or verify line by line
        // blocks seem to be separated by an empty line row 5.
        // Let's just split by empty lines.
        const blocks = content.split(/\n\s*\n/).filter(b => b.trim().length > 0);

        console.log(`Found ${blocks.length} blocks to process.`);

        let count = 0;
        for (const block of blocks) {
            const lines = block.split("\n").map(l => l.trim()).filter(l => l.length > 0);
            if (lines.length < 3) continue;

            const aircraft = lines[0]; // Line 1: Aircraft
            const routeLine = lines[1]; // Line 2: Origin (CODE) Dest (CODE)
            const detailsLine = lines[2]; // Line 3: Aircraft - Seats
            const availLine = lines[3] || ""; // Line 4: Availability

            // Parse Route
            // Expected: "Córdoba, AR ( SACO ) San Fernando, AR ( SADF )"
            // Regex:  (Place) ( (Code) ) (Place) ( (Code) )
            const routeRegex = /^(.*)\(\s*([A-Z]{4})\s*\)\s*(.*)\(\s*([A-Z]{4})\s*\)$/;
            const routeMatch = routeLine.match(routeRegex);

            let from = "Unknown";
            let to = "Unknown";

            if (routeMatch) {
                from = routeMatch[1].trim().replace(/,\s*[A-Z]{2}$/, ""); // Remove country code if we want, or keep it. Let's keep distinct place.
                to = routeMatch[3].trim().replace(/,\s*[A-Z]{2}$/, "");
            } else {
                console.warn("Could not parse route line:", routeLine);
                // Fallback splitting by " ) " maybe?
                const parts = routeLine.split(")");
                if (parts.length >= 2) {
                    from = parts[0].replace("(", "").trim();
                    to = parts[1].replace("(", "").trim();
                }
            }

            // Seats
            const seatsMatch = detailsLine.match(/(\d+)\s*pasajeros/i);
            const seats = seatsMatch ? parseInt(seatsMatch[1]) : 0;

            // Date for sorting
            const dateStr = availLine.replace("Disponible:", "").trim().split("–")[0]; // Take start date
            const date = parseDate(dateStr);

            const docData = {
                from,
                to,
                date, // YYYY-MM-DD
                availability: availLine.replace("Disponible:", "").trim(), // Full string
                aircraft,
                seats,
                price: 0, // No price in file, default to 0 or check if needed
                currency: "USD",
                createdAt: FieldValue.serverTimestamp() // Timestamp
            };

            await db.collection("emptyLegs").add(docData);
            console.log(`Uploaded: ${from} -> ${to} [${date}]`);
            count++;
        }

        console.log(`Successfully uploaded ${count} flights.`);

    } catch (e) {
        console.error("Error reading or uploading:", e);
    }
}

uploadLegs();
