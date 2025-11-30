import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        console.log('Fetching available models...');
        // Note: listModels is not directly exposed on the main class in some versions, 
        // but usually accessible via the model manager or by just trying to get a model.
        // However, the SDK doesn't always have a simple "listModels" method exposed in the high-level API 
        // without using the underlying API client.

        // Let's try to just use a known model and see if we can get metadata, 
        // or use the fallback method of checking if we can instantiate it.

        // Actually, for debugging, let's try to hit the REST API directly to list models if the SDK fails.
        // But first, let's try a simple generation with "gemini-1.5-flash" and print the FULL error.

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log('Attempting to generate content with gemini-1.5-flash...');
        const result = await model.generateContent("Hello");
        console.log('Success! Response:', await result.response.text());

    } catch (error) {
        console.error('------------------------------------------------');
        console.error('FAILED TO CONNECT.');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Response Status:', error.response.status);
            console.error('Response Body:', await error.response.text());
        }
        console.error('------------------------------------------------');
        console.error('POSSIBLE CAUSES:');
        console.error('1. API Key is invalid or expired.');
        console.error('2. API Key does not have "Generative Language API" enabled in Google Cloud Console.');
        console.error('3. You are in a region where Gemini is not available (e.g. some parts of Europe without billing).');
        console.error('4. You are using a Vertex AI key with the Google AI Studio SDK (incompatible).');
    }
}

listModels();
