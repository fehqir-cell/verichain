export default async function handler(req, res) {
  // Telegram sends a POST request with the update object
  if (req.method === 'POST') {
    const { message } = req.body;
    
    // Check if we received a text message that says "/start"
    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const text = "Welcome to VeriChain News! 🌐\n\nClick the button below to launch the decentralized fact-checking Mini App.";
      
      // Get the URL of our deployed Vercel app. 
      let webAppUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
        : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://your-project.vercel.app');
        
      // Add a cache-buster parameter to ensure Telegram ALWAYS loads the newest version
      webAppUrl += `?v=${Date.now()}`;
      
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      
      try {
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            reply_markup: {
              inline_keyboard: [
                [{ text: "Launch VeriChain 🚀", web_app: { url: webAppUrl } }]
              ]
            }
          })
        });
      } catch (error) {
        console.error("Error sending message to Telegram:", error);
      }
    }
    
    // Always return 200 OK so Telegram knows we received the update and doesn't retry
    return res.status(200).json({ message: 'OK' });
  }
  
  // Handle GET requests (useful for quickly testing if the endpoint is live in your browser)
  return res.status(200).send('VeriChain Telegram Bot Webhook is active! 🚀');
}
