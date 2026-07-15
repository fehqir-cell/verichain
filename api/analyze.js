// api/analyze.js (Runs securely on Vercel's servers, not in the browser)
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { url } = req.body;
    
    // 1. Fetch LLM API key securely from environment variables
    const apiKey = process.env.GEMINI_API_KEY; 
    const ai = new GoogleGenAI({ apiKey });

    // 2. Instruct the LLM to analyze the link and return structured JSON
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `Perform a bias and fact-check assessment on this URL: ${url}. Return JSON with: title, biasScore (0-100), biasClass, trustScore, statusText, auditSummary, and loadedWords.`,
      config: { responseMimeType: "application/json" }
    });

    const result = JSON.parse(response.text);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
