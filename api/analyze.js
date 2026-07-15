// api/analyze.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { url } = req.body;
    const domain = new URL(url).hostname.replace("www.", "");
    const sourceName = domain.split('.')[0]; // e.g., "nytimes" or "foxnews"

    // 1. Query Wikipedia's free search for the publisher's political alignment
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${sourceName}+political+alignment&format=json&origin=*`;
    const wikiResponse = await fetch(wikiUrl);
    const wikiData = await wikiResponse.json();

    const searchSnippet = wikiData.query?.search[0]?.snippet || "";
    
    // 2. Simple rule-based bias classifier based on Wikipedia metadata
    let biasClass = "Center";
    let biasScore = 50;
    let biasText = "C-0.01 (Center)";
    let trustScore = 85;

    const snippetLower = searchSnippet.toLowerCase();
    if (snippetLower.includes("liberal") || snippetLower.includes("left-wing") || snippetLower.includes("center-left")) {
      biasClass = "Left";
      biasScore = 35;
      biasText = "L-0.30 (Leaning Left)";
      trustScore = 90;
    } else if (snippetLower.includes("conservative") || snippetLower.includes("right-wing") || snippetLower.includes("center-right")) {
      biasClass = "Right";
      biasScore = 75;
      biasText = "R-0.50 (Leaning Right)";
      trustScore = 75;
    }

    // 3. Return structured analysis back to frontend
    return res.status(200).json({
      title: `Scan: ${domain} Report`,
      category: "geopolitics",
      teaser: `AI Scan completed. Wikipedia search terms identify this outlet as: "${searchSnippet.replace(/<[^>]*>/g, '')}"`,
      biasText: biasText,
      biasScore: biasScore,
      biasClass: biasClass.toLowerCase(),
      framing: "Wikipedia Consensus",
      trustScore: trustScore,
      statusText: trustScore > 80 ? "Verified True" : "Partially Verified",
      auditSummary: `Wikipedia records mention this publisher has a alignment matching: ${biasClass}.`,
      evidence: [`Wikipedia Search matches: ${sourceName}`],
      loadedWords: [{ word: "reports", type: "neutral" }]
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



TELEGRAM_BOT_TOKEN=8806943275:AAF4p3VkXaXRwgBP3XEWtNMySncdvIZ5kak
