import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from "path";
import * as fs from 'fs';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const key = process.env.GEMINI_API_KEY;

if (!key) {
    console.error("No API Key found");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

console.log("Querying:", url.replace(key, "HIDDEN_KEY"));

fetch(url)
    .then(r => r.json())
    .then(d => {
        if (d.error) {
            console.error("API Error:", d.error);
        } else {
            console.log("Writing to models_list.json");
            fs.writeFileSync('models_list.json', JSON.stringify(d, null, 2));
        }
    })
    .catch(e => console.error("Fetch Error:", e));
