export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing from environment variables.");
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // 1. Fetch the content of the URL (basic scraping)
    let pageTitle = url;
    let pageDescription = "";
    
    try {
      const pageResponse = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (VeriChain Analyzer Bot)' }
      });
      const htmlText = await pageResponse.text();
      
      const titleMatch = htmlText.match(/<title>([^<]*)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        pageTitle = titleMatch[1].trim();
      }
      
      const descMatch = htmlText.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
      if (descMatch && descMatch[1]) {
        pageDescription = descMatch[1].trim();
      }
    } catch (scrapeErr) {
      console.warn("Could not scrape URL, analyzing based on URL only:", scrapeErr);
    }

    // 2. Ask Gemini to analyze the content and return a JSON structure
    const prompt = `
You are an expert news analyst and fact checker. Analyze the following article metadata:
URL: ${url}
Title: ${pageTitle}
Description/Excerpt: ${pageDescription}

Output ONLY a valid JSON object with the following schema:
{
  "title": "String (A clean, short version of the article title)",
  "category": "String (One of: tech, finance, geopolitics, science)",
  "teaser": "String (A 1-sentence summary of the bias/framing)",
  "biasText": "String (e.g. 'L-0.34 (Leaning Left)' or 'C-0.01 (Center)' or 'R-0.65 (Leaning Right)')",
  "biasScore": Number (0-100, where 50 is center, 0 is far left, 100 is far right),
  "biasClass": "String (left, right, or center)",
  "framing": "String (2-3 words describing the rhetoric style)",
  "trustScore": Number (0-100, where 100 is perfectly verified and factual, 0 is completely false),
  "statusText": "String (Verified True, Disputed, or False)",
  "status": "String (verified, disputed, or false)",
  "auditSummary": "String (A 1-2 sentence explanation of the verdict)",
  "evidence": ["String (A brief mock cryptographic or domain verification check)", "String (A mock primary source check)"],
  "loadedWords": [
    {"word": "String (a specific biased word from the text)", "type": "String (positive or negative)"}
  ]
}
Do not wrap the JSON in markdown code blocks. Just output raw JSON.`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      })
    });

    const geminiData = await geminiResponse.json();
    
    if (geminiData.error) {
      console.error("Gemini API Error:", geminiData.error);
      return res.status(502).json({ error: 'AI analysis failed' });
    }

    let aiText = geminiData.candidates[0].content.parts[0].text;
    aiText = aiText.replace(/^```json/mi, "").replace(/```$/m, "").trim();
    const resultObj = JSON.parse(aiText);

    res.status(200).json(resultObj);

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
