
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error("No API KEY"); process.exit(1); }

async function run() {
    console.log("Starting connectivity test...");
    const genAI = new GoogleGenerativeAI(API_KEY);

    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];

    for (const mName of models) {
        console.log(`Testing model: ${mName}...`);
        try {
            const m = genAI.getGenerativeModel({ model: mName });
            const r = await m.generateContent("Hello");
            console.log(`✅ SUCCESS with ${mName}`);
            console.log("Response:", r.response.text());
            return; // Exit on first success
        } catch (e: any) {
            console.log(`❌ Failed ${mName}: Status ${e.status} - ${e.message}`);
        }
    }
    console.log("All models failed.");
}
run();
