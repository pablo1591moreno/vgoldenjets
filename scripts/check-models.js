const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set.');
    process.exit(1);
}

async function checkModels() {
    console.log('------------------------------------------------');
    console.log('DIAGNOSTIC TOOL: Checking Gemini API Access');
    console.log('------------------------------------------------');
    console.log(`API Key: ${API_KEY.substring(0, 5)}...${API_KEY.substring(API_KEY.length - 5)}`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        console.log(`Fetching models from: ${url.replace(API_KEY, 'HIDDEN_KEY')}`);
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`❌ HTTP Error: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error('Response Body:', text);

            if (response.status === 404) {
                console.error('\n[DIAGNOSIS]: 404 Not Found usually means:');
                console.error('1. The "Generative Language API" is NOT enabled in your Google Cloud Project.');
                console.error('2. Your API Key is for Vertex AI, not AI Studio.');
                console.error('3. You are in a restricted region without billing.');
            } else if (response.status === 400) {
                console.error('\n[DIAGNOSIS]: 400 Bad Request usually means invalid API Key format.');
            }
            return;
        }

        const data = await response.json();
        console.log('✅ Connection Successful!');
        console.log(`Found ${data.models ? data.models.length : 0} models.`);

        if (data.models) {
            console.log('Available Models:');
            data.models.forEach(m => console.log(` - ${m.name} (${m.supportedGenerationMethods.join(', ')})`));
        } else {
            console.warn('⚠️ No models returned in the list.');
        }

    } catch (error) {
        console.error('❌ Network/Fetch Error:', error.message);
    }
}

checkModels();
