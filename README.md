# VeriChain News (Decentralized News Aggregator & Fact-Checking)

🚀 **VeriChain News** is a premium, futuristic Telegram Mini App designed to combat misinformation and provide transparency in the modern media landscape. It combines AI-driven linguistic bias detection with a decentralized, community-driven fact-checking consensus protocol, fully backed by simulated TON Connect wallet integration.

---

## 🌌 Core Features

### 1. Dynamic News Feed & Custom Filters
- Browse curated, real-time news articles covering **Geopolitics, Tech, Economy, and Science**.
- Filter articles by **Category**, **Bias Spectrum** (Left, Center, Right), or **Verification Audit Status** (Verified, Disputed, Unverified).
- High-precision search matching titles, sources, and summaries.

### 2. AI Linguistic Bias Spectrometer
- View a visual bias index mapping where an article lands on the political spectrum (Left to Right).
- Assess source framing structures and structural quote density.
- **Premium Reports**: Unlock detailed linguistic load-word flags and citation network analysis by paying a micro-fee (`0.05 TON` or `0.10 USDT`).

### 3. Community-Driven Fact-Checking (Truth Mining)
- **Review Queue**: Review active disputes on controversial claims, upload official source links, cast your verdict (True, Misleading, or False), and stake your `VERI` reputation tokens to secure your vote.
- **Bounty Pool**: Honest verifiers who align with majority consensus are rewarded with payouts from the claim's staked reward pool. Dishonest/spam voters are slashed.
- **Submit Claims**: Submit any custom news URL and description for verification by staking `VERI` tokens.

### 4. Decentralized Wallet & Staking Hub
- **TON Connect Simulation**: Link your Telegram Wallet in a click to enable transactions.
- **DeFi Swap**: Exchange assets in real-time (`TON`, `USDT`, and `VERI`) to cover staking limits or claim validation returns.
- **Transaction Ledger**: Track all deposits, withdrawals, content unlocks, tips, and staking updates on an immutable ledger.

---

## 🛠️ Tech Stack
- **Structure**: Semantic HTML5.
- **Styling**: Vanilla CSS3 Custom Styling featuring glassmorphic overlay drawers, neon accents, Outfit & Inter typography, and clean tab animations.
- **Logic**: Vanilla ES6 Javascript. Uses local storage state managers to persist wallet connections, transactions, custom dispute submissions, voting, and premium unlocks.

---

## 🚀 Setup & Local Execution

Since this application is built entirely on vanilla front-end tech, it has zero node build dependencies and runs instantly:

1. Clone or navigate to the directory:
   ```bash
   cd C:\Users\bravo\.gemini\antigravity\scratch\verichain-news-app
   ```

2. Run a local static web server to host the project:
   - **Using Python**:
     ```bash
     python -m http.server 8080
     ```
   - **Using Node.js**:
     ```bash
     npx serve .
     ```

3. Open your browser and navigate to `http://localhost:8080` (or the port specified by your server).

---

## 🤖 Launching as a Telegram Mini App
1. Host your project folder on a static hosting service with HTTPS (e.g. GitHub Pages, Vercel, Netlify).
2. Go to **@BotFather** on Telegram.
3. Use the `/newbot` command to register a new bot.
4. Set up a Mini App using the `/newapp` command and link it to your bot.
5. Provide your hosted HTTPS website URL when prompted.
6. Launch your Mini App inside Telegram to begin fact-checking!
