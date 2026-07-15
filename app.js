// VeriChain News - Application Logic & State Controller

// --- STATE MANAGEMENT ---
let state = {
  walletConnected: false,
  walletAddress: '',
  balances: {
    TON: 0.00,
    USDT: 0.00,
    GRAM: 100.00
  },
  unlockedArticles: [3], // Article IDs that have been unlocked. Article 3 is free/unlocked by default.
  transactions: [
    { id: 'tx_001', type: 'Reward', title: 'Fact-Check Consensus Payout', amount: '15.00 GRAM', time: '1 day ago', hash: 'ton...4d9a' },
    { id: 'tx_002', type: 'Stake', title: 'Staked for Claim #10842', amount: '-10.00 GRAM', time: '2 days ago', hash: 'ton...b20f' },
    { id: 'tx_003', type: 'Tip', title: 'Tip to AP News team', amount: '-0.50 TON', time: '3 days ago', hash: 'ton...31a2' }
  ],
  activeView: 'feed',
  currentArticle: null,
  currentClaim: null,
  autoUnlock: false,
  stakeTier: '1',
  searchQuery: '',
  filterCategory: 'all',
  filterBias: 'all',
  filterStatus: 'all',
  
  // News Articles Database
  articles: [
    {
      id: 1,
      title: "Global Energy Summit Reaches Landmark Accord on Renewable Subsidies",
      category: "geopolitics",
      source: "Reuters",
      time: "2 hours ago",
      teaser: "Delegates from 140 nations have formalized an agreement to phase out fossil fuel credits by 2030 and establish an international regulatory panel to monitor national renewable funds.",
      biasText: "C-0.08 (Center)",
      biasScore: 46, // percentage on Left-Right spectrum (0 Left, 50 Center, 100 Right)
      biasClass: "center",
      framing: "Balanced / Multi-source",
      trustScore: 98,
      status: "verified",
      statusText: "Verified True",
      auditSummary: "Claim: The accord binds member nations to phase out domestic coal subsidies by 2030. Verdict: TRUE. Confirmed by Official Treaty Section 4.2 published by the UNEP on June 29.",
      evidence: [
        "UNEP Renewable Energy Subsidies Treaty Draft (Section 4.2)",
        "Official Joint Declaration: World Energy Council Summit"
      ],
      loadedWords: [
        { word: "landmark", type: "neutral" },
        { word: "accord", type: "neutral" }
      ],
      locked: true
    },
    {
      id: 2,
      title: "Nation X Announces 15% Tariff Hike on Tech Imports Citing Cyber Defense Risks",
      category: "geopolitics",
      source: "Vanguard Daily",
      time: "5 hours ago",
      teaser: "In a sudden decree, the Ministry of Economy announced strict tariffs on hardware parts coming from major continental neighbors, claiming vulnerability to embedded spyware.",
      biasText: "R-0.42 (Leaning Right)",
      biasScore: 71,
      biasClass: "right",
      framing: "Security centric, single-sided quotes",
      trustScore: 76,
      status: "disputed",
      statusText: "Partially Verified",
      auditSummary: "Claim: Tariffs target 100% of continental imports. Verdict: DISPUTED. Official document lists specific exemptions for telecommunications hardware components under Schedule C.",
      evidence: [
        "Ministry of Economy Tariff Decree (Document TG-2026-B)",
        "National Tech Association Chamber of Commerce Audit"
      ],
      loadedWords: [
        { word: "sudden decree", type: "negative" },
        { word: "spyware", type: "negative" },
        { word: "national safety", type: "positive" }
      ],
      locked: true
    },
    {
      id: 3,
      title: "Decentralized Carbon Credit Ledger Launches on Layer 2 Ecosystem",
      category: "tech",
      source: "CryptoChronicle",
      time: "1 day ago",
      teaser: "Developers have deployed an open-source validation protocol for corporate carbon offsets. Transactions will be logged on an EVM-compatible chain to prevent double-spending.",
      biasText: "C-0.01 (Neutral)",
      biasScore: 50,
      biasClass: "center",
      framing: "Descriptive / Technical",
      trustScore: 95,
      status: "verified",
      statusText: "Verified True",
      auditSummary: "Claim: The smart contract successfully deploys audits automatically. Verdict: TRUE. Checked smart contract address on chain explorer, verifying block hashes and audit reports.",
      evidence: [
        "Contract Deploy Receipt (TxHash: 0x904a...1102)",
        "Audit Log by CertiK Foundation"
      ],
      loadedWords: [
        { word: "decentralized", type: "neutral" },
        { word: "open-source", type: "positive" }
      ],
      locked: false // Free / unlocked by default
    },
    {
      id: 4,
      title: "Leaked Documents Reveal Secret Subsidies to Multi-National EV Conglomerate",
      category: "economy",
      source: "The Whistleblower",
      time: "2 days ago",
      teaser: "Internal emails suggest the corporation received over $400M in undocumented tax exemptions from municipal leaders, violating regional commerce competition frameworks.",
      biasText: "L-0.35 (Leaning Left)",
      biasScore: 32,
      biasClass: "left",
      framing: "Highly adversarial, emotional framing",
      trustScore: 45,
      status: "unverified",
      statusText: "Unverified / Disputed",
      auditSummary: "Claim: $400M in undocumented exemptions. Verdict: UNVERIFIED. The leaked sheets contain unconfirmed digital signatures and are denied by municipal finance supervisors.",
      evidence: [
        "Shared PDF Archive: EV-Corp Funding Logs (Authentication pending)",
        "Regional Comptroller Public Press Release (Denial)"
      ],
      loadedWords: [
        { word: "secret", type: "negative" },
        { word: "conglomerate", type: "negative" },
        { word: "undocumented", type: "negative" }
      ],
      locked: true
    },
    {
      id: 5,
      title: "State Senator Claims New AI Regulation Bill Will 'Destroy Innovation'",
      category: "tech",
      source: "State Tribune",
      time: "3 days ago",
      teaser: "In an impassioned speech, the Senator argued that the proposed security clearance requirements for LLM training runs would choke startups and concentrate power in tech monopolies.",
      biasText: "R-0.65 (Right-Wing Leaning)",
      biasScore: 83,
      biasClass: "right",
      framing: "Anti-regulation, quotation heavy",
      trustScore: 28,
      status: "false",
      statusText: "Disputed / Misleading",
      auditSummary: "Claim: Proposed bill bans open-source modeling. Verdict: FALSE. Senate Bill SB-409 specifically includes safe-harbor clauses for model training under 10^24 FLOPS.",
      evidence: [
        "Senate Bill SB-409 Complete Text (Pages 14-16)",
        "Alliance of Open-Source Developers Impact Briefing"
      ],
      loadedWords: [
        { word: "destroy", type: "negative" },
        { word: "choke", type: "negative" },
        { word: "monopolies", type: "negative" }
      ],
      locked: true
    }
  ],

  // Fact-Checking Claims Database
  claims: [
    {
      id: 10842,
      title: "National Central Bank announced secret interest rate cut in closed-door session",
      text: "Reports claim that central bank directors slashed rates by 2.5% during an emergency session last Friday. Official transcripts have not been published.",
      category: "economy",
      submitter: "verifier_99",
      pool: "320 USDT",
      votesTrue: 12,
      votesMisleading: 45,
      votesFalse: 98,
      status: "Disputed",
      consensus: "False",
      staked: 15,
      userVoted: false
    },
    {
      id: 10843,
      title: "New study claims satellite solar shields can reverse global warming in 3 years",
      text: "A controversial whitepaper asserts that launching high-reflectivity orbital micro-shields could reduce radiative forcing by 1.8%, cooling Earth quickly.",
      category: "science",
      submitter: "science_advocate",
      pool: "2,400 GRAM",
      votesTrue: 88,
      votesMisleading: 52,
      votesFalse: 14,
      status: "Under Review",
      consensus: "True",
      staked: 25,
      userVoted: false
    },
    {
      id: 10844,
      title: "Autonomous drone logistics company declared full bankruptcy, locking warehouses",
      text: "Viral social feeds allege the drone logistics fleet has been grounded permanently. The company's customer helpline is currently unresponsive.",
      category: "tech",
      submitter: "reporter_pro",
      pool: "140 TON",
      votesTrue: 84,
      votesMisleading: 5,
      votesFalse: 2,
      status: "Under Review",
      consensus: "True",
      staked: 10,
      userVoted: false
    },
    {
      id: 10845,
      title: "Regional health council bans sale of lab-grown synthetic proteins in superstores",
      text: "Social media posts claim health authorities have prohibited all synthetic meat due to unproven health concerns, ordering immediate shelf removals.",
      category: "science",
      submitter: "green_foodie",
      pool: "800 GRAM",
      votesTrue: 3,
      votesMisleading: 9,
      votesFalse: 78,
      status: "Under Review",
      consensus: "False",
      staked: 8,
      userVoted: false
    }
  ]
};

// --- INITIALIZE APPLICATION ---
document.addEventListener("DOMContentLoaded", () => {
  // Load saved state if exists
  const savedState = localStorage.getItem("verichain_news_state");
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state.walletConnected = parsed.walletConnected || false;
      state.walletAddress = parsed.walletAddress || '';
      state.balances = parsed.balances || state.balances;
      state.unlockedArticles = parsed.unlockedArticles || state.unlockedArticles;
      state.transactions = parsed.transactions || state.transactions;
      state.claims = parsed.claims || state.claims;
      state.autoUnlock = parsed.autoUnlock || false;
      state.stakeTier = parsed.stakeTier || '1';
    } catch (e) {
      console.error("Error loading saved local state:", e);
    }
  }

  // Initialize Telegram WebApp SDK if running inside Telegram
  const tg = window.Telegram?.WebApp;
  if (tg) {
    tg.ready();
    tg.expand(); // Full viewport height
    
    const tgUser = tg.initDataUnsafe?.user;
    if (tgUser && !state.walletConnected) {
      // Auto-connect simulated wallet based on Telegram user ID if not already connected
      state.walletConnected = true;
      state.walletAddress = "UQ" + tgUser.id.toString(16).padEnd(42, 'x'); // Generate mock TON address
      addTransaction('Connect', `Auto-connected via Telegram context`, '0.00 TON', 'tg...' + tgUser.id.toString().substring(0,4));
    }
  }

  // Initialize TON Connect UI SDK (Checking both namespaces to prevent load errors)
  let tonConnectUI = null;
  try {
    const TonConnectClass = window.TON_CONNECT_UI?.TonConnectUI || window.TONConnectUI?.TonConnectUI;
    if (TonConnectClass) {
      tonConnectUI = new TonConnectClass({
        manifestUrl: window.location.origin + '/tonconnect-manifest.json',
        buttonRootId: 'ton-connect-btn'
      });
      
      // Subscribe to TON Connect state changes
      tonConnectUI.onStatusChange(async (wallet) => {
        if (wallet) {
          state.walletConnected = true;
          state.walletAddress = wallet.account.address;
          
          // Fetch actual balances using public Tonapi.io RPC nodes
          await fetchRealOnChainBalances(wallet.account.address, wallet.account.chain);
        } else {
          // If disconnected, fallback to Telegram context if available
          const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
          if (tgUser) {
            state.walletConnected = true;
            state.walletAddress = "UQ" + tgUser.id.toString(16).padEnd(42, 'x');
          } else {
            state.walletConnected = false;
            state.walletAddress = '';
            state.balances.TON = 0.00;
            state.balances.USDT = 0.00;
          }
          updateWalletUI();
          saveAppState();
        }
      });
    }
  } catch (e) {
    console.error("Error initializing TON Connect UI:", e);
  }

  // Set initial view navigation
  try { setupNavigation(); } catch (e) { console.error("Error in setupNavigation:", e); }
  
  // Initialize wallet display
  try { updateWalletUI(); } catch (e) { console.error("Error in updateWalletUI:", e); }
  
  // Render News Feed
  try { renderArticles(); } catch (e) { console.error("Error in renderArticles:", e); }
  
  // Render Claims Queue
  try { renderClaims(); } catch (e) { console.error("Error in renderClaims:", e); }
  
  // Render Transaction Ledger
  try { renderLedger(); } catch (e) { console.error("Error in renderLedger:", e); }

  // Attach core UI listeners
  try { attachEventListeners(); console.log("Event listeners attached"); } catch (e) { console.error("Error in attachEventListeners:", e); }
});

// Save current state helper
function saveAppState() {
  localStorage.setItem("verichain_news_state", JSON.stringify({
    walletConnected: state.walletConnected,
    walletAddress: state.walletAddress,
    balances: state.balances,
    unlockedArticles: state.unlockedArticles,
    transactions: state.transactions,
    claims: state.claims,
    autoUnlock: state.autoUnlock,
    stakeTier: state.stakeTier
  }));
}

// --- FETCH REAL ON-CHAIN BALANCES FROM PUBLIC RPC ---
async function fetchRealOnChainBalances(rawAddress, chainId) {
  try {
    // ChainId -239 is Mainnet, -3 is Testnet
    const isTestnet = chainId === -3;
    const baseApi = isTestnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io';
    
    // 1. Fetch native TON balance
    const accountRes = await fetch(`${baseApi}/v2/accounts/${rawAddress}`);
    if (accountRes.ok) {
      const accountData = await accountRes.json();
      // balance is returned in nanotons (1 TON = 10^9 nanotons)
      state.balances.TON = accountData.balance / 1e9;
    }
    
    // 2. Fetch Jettons (for USDT)
    const jettonsRes = await fetch(`${baseApi}/v2/accounts/${rawAddress}/jettons`);
    if (jettonsRes.ok) {
      const jettonsData = await jettonsRes.json();
      // Search for USDT contract balance
      const usdtJetton = jettonsData.balances?.find(b => b.jetton.symbol === 'USDT');
      if (usdtJetton) {
        // USDT usually has 6 decimals on TON
        const decimals = usdtJetton.jetton.decimals || 6;
        state.balances.USDT = Number(usdtJetton.balance) / Math.pow(10, decimals);
      } else {
        state.balances.USDT = 0.00;
      }
    }
    
    updateWalletUI();
    saveAppState();
  } catch (err) {
    console.error("Failed to fetch live TON/USDT balances:", err);
  }
}

// --- VIEW NAVIGATION ---
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".app-view");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const viewName = item.getAttribute("data-view");
      
      // Update nav class
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
      
      // Toggle Views
      views.forEach(v => {
        v.classList.remove("active");
        if (v.id === `view-${viewName}`) {
          v.classList.add("active");
        }
      });
      
      state.activeView = viewName;
      
      // Refresh views if needed
      if (viewName === 'wallet') {
        renderLedger();
      }
    });
  });
}

// --- MOCK WALLET CONNECT FLOW (TON CONNECT INTEGRATION) ---
function updateWalletUI() {
  const profileName = document.getElementById("profile-name");
  const profileInitials = document.getElementById("profile-initials");
  const profileTier = document.getElementById("profile-tier");

  if (state.walletConnected) {
    // Check if we can extract Telegram user information
    let displayName = "Validator Pilot #" + state.walletAddress.substring(state.walletAddress.length - 4);
    let displayInitials = "VP";
    
    const tg = window.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe?.user) {
      const tgUser = tg.initDataUnsafe.user;
      displayName = tgUser.username ? `@${tgUser.username}` : `${tgUser.first_name} ${tgUser.last_name || ''}`;
      displayInitials = tgUser.first_name.substring(0, 2).toUpperCase();
    } else if (state.walletAddress && state.walletAddress.length > 10) {
      // Shortened address display
      displayName = state.walletAddress.substring(0, 6) + "..." + state.walletAddress.substring(state.walletAddress.length - 4);
      displayInitials = "WA";
    }
    
    if (profileName) profileName.textContent = displayName;
    if (profileInitials) profileInitials.textContent = displayInitials;
    if (profileTier) {
      profileTier.textContent = "Tier 2: Fact-Checker";
      profileTier.className = "user-tier-badge text-purple";
      profileTier.style.borderColor = "rgba(157, 78, 221, 0.4)";
      profileTier.style.background = "rgba(157, 78, 221, 0.12)";
    }
  } else {
    if (profileName) profileName.textContent = "Anonymous Pilot";
    if (profileInitials) profileInitials.textContent = "AN";
    if (profileTier) {
      profileTier.textContent = "Tier 1: Reader";
      profileTier.className = "user-tier-badge";
      profileTier.style.borderColor = "";
      profileTier.style.background = "";
    }
  }

  // Update wallet hub views with real/live balance details
  const balTon = document.getElementById("bal-ton");
  const balTonUsd = document.getElementById("bal-ton-usd");
  const balUsdt = document.getElementById("bal-usdt");
  const balVeri = document.getElementById("bal-veri");
  const profileRep = document.getElementById("profile-rep");

  if (balTon) balTon.textContent = state.balances.TON.toFixed(2);
  if (balTonUsd) balTonUsd.textContent = (state.balances.TON * 7.20).toFixed(2); // Mock TON rate $7.20
  if (balUsdt) balUsdt.textContent = state.balances.USDT.toFixed(2);
  if (balVeri) balVeri.textContent = state.balances.GRAM.toFixed(2);
  if (profileRep) profileRep.textContent = state.balances.GRAM.toFixed(2) + " GRAM";
}

// --- NEWS FEED ENGINE ---
function renderArticles() {
  const feed = document.getElementById("articles-feed");
  if (!feed) return;
  feed.innerHTML = '';

  // Get active filters
  const search = state.searchQuery.toLowerCase();
  const category = state.filterCategory;
  const bias = state.filterBias;
  const status = state.filterStatus;

  const filtered = state.articles.filter(article => {
    const matchSearch = article.title.toLowerCase().includes(search) || article.teaser.toLowerCase().includes(search) || article.source.toLowerCase().includes(search);
    const matchCategory = category === 'all' || article.category === category;
    
    let matchBias = true;
    if (bias === 'left') matchBias = article.biasClass === 'left';
    else if (bias === 'right') matchBias = article.biasClass === 'right';
    else if (bias === 'center') matchBias = article.biasClass === 'center';

    let matchStatus = true;
    if (status === 'verified') matchStatus = article.status === 'verified';
    else if (status === 'disputed') matchStatus = article.status === 'disputed' || article.status === 'unverified' || article.status === 'false';

    return matchSearch && matchCategory && matchBias && matchStatus;
  });

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div class="glass-panel" style="padding: 24px; text-align: center; color: var(--text-secondary);">
        <p>No articles found matching search criteria.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(article => {
    const card = document.createElement("div");
    card.className = "article-card";
    
    const isUnlocked = !article.locked || state.unlockedArticles.includes(article.id);
    const lockIconSvg = article.locked && !isUnlocked ? `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 2px;">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>` : '';
      
    const statusClass = `status-${article.status}`;
    
    card.innerHTML = `
      <div class="card-header">
        <div class="source-info">
          <div class="source-logo-mock">${article.source.substring(0, 1)}</div>
          <span class="source-name">${article.source}</span>
        </div>
        <span class="publish-time">${article.time}</span>
      </div>
      
      <h3 class="card-title">${article.title}</h3>
      
      <div class="card-tags">
        <span class="category-tag">${article.category}</span>
        <span class="status-badge ${statusClass}">${article.statusText}</span>
      </div>
      
      <p class="card-teaser">${article.teaser}</p>
      
      <div class="card-actions">
        <button class="btn btn-outline btn-xs" onclick="openArticleDetail(${article.id})">
          ${lockIconSvg}View Detailed Report
        </button>
        <button class="btn btn-secondary btn-xs" onclick="openTipDialog(${article.id})">
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" style="vertical-align: middle;"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 9h6M9 12h6"/></svg>
          Tip
        </button>
      </div>
    `;
    
    feed.appendChild(card);
  });
}

// --- ARTICLE DETAILS DRAWER ---
function openArticleDetail(id) {
  const article = state.articles.find(a => a.id === id);
  if (!article) return;
  
  state.currentArticle = article;
  
  // Populate basic header details (always visible)
  document.getElementById("detail-category").textContent = article.category;
  document.getElementById("detail-category-header").textContent = article.category;
  document.getElementById("detail-source").textContent = article.source;
  document.getElementById("detail-time").textContent = article.time;
  document.getElementById("detail-title").textContent = article.title;
  
  // Fact check status badge (always visible)
  const statusBadge = document.getElementById("detail-status-badge");
  statusBadge.className = `audit-badge status-${article.status}`;
  statusBadge.textContent = article.statusText;

  // Paywall & blur controller
  const isUnlocked = !article.locked || state.unlockedArticles.includes(article.id);
  const premiumGate = document.getElementById("premium-analysis-gate");
  const contentDetails = document.getElementById("premium-locked-details");

  if (!isUnlocked) {
    // Show paywall gate and blur the details
    premiumGate.classList.remove("hidden");
    contentDetails.classList.add("blur-content");
    
    // Set auto-unlock check if auto-unlock settings is active
    if (state.autoUnlock && state.balances.GRAM >= 5.0) {
      executeGramUnlock(article.id);
    }
  } else {
    // Hide paywall gate and show crystal-clear details
    premiumGate.classList.add("hidden");
    contentDetails.classList.remove("blur-content");
    
    // Populate detailed parameters
    document.getElementById("detail-bias-marker").style.left = `${article.biasScore}%`;
    document.getElementById("detail-bias-score").textContent = article.biasText;
    document.getElementById("detail-framing").textContent = article.framing;
    document.getElementById("detail-trust-score").textContent = `${article.trustScore}/100`;
    document.getElementById("detail-audit-desc").textContent = article.auditSummary;
    
    // Render loaded words list
    populatePremiumContent(article);
    
    // Render footnotes evidence list
    const evidenceList = document.getElementById("detail-evidence-list");
    evidenceList.innerHTML = '';
    article.evidence.forEach(ev => {
      const li = document.createElement("li");
      li.textContent = ev;
      evidenceList.appendChild(li);
    });
  }
  
  // Show detailed modal overlay
  document.getElementById("modal-article-detail").classList.remove("hidden");
}

function populatePremiumContent(article) {
  const list = document.getElementById("detail-load-words");
  if (!list) return;
  list.innerHTML = '';
  
  article.loadedWords.forEach(lw => {
    const span = document.createElement("span");
    span.className = `load-word-badge ${lw.type === 'positive' ? 'positive' : ''}`;
    span.textContent = `"${lw.word}" (${lw.type})`;
    list.appendChild(span);
  });
}

function executeGramUnlock(articleId) {
  const article = state.articles.find(a => a.id === articleId);
  if (!article) return;

  if (state.balances.GRAM < 5.0) {
    alert("Insufficient GRAM tokens. You can swap TON or USDT to GRAM in the Wallet tab.");
    return;
  }
  
  // Deduct fee
  state.balances.GRAM -= 5.0;
  state.unlockedArticles.push(articleId);
  
  // Log transaction
  const cleanTitle = article.title.length > 20 ? article.title.substring(0, 20) + '...' : article.title;
  addTransaction('Unlock', `Unlocked report: ${cleanTitle}`, `-5.00 GRAM`, 'ton...gram');
  
  // Save and update
  updateWalletUI();
  saveAppState();
  
  // Redraw modal
  openArticleDetail(articleId);
  
  // Re-render feed list to remove lock icon
  renderArticles();
}

// --- FACT-CHECKING HUB ENGINE ---
function renderClaims() {
  const list = document.getElementById("claims-list");
  if (!list) return;
  list.innerHTML = '';
  
  const disputeCount = document.getElementById("dispute-count");
  if (disputeCount) disputeCount.textContent = `${state.claims.length} Claims Active`;

  state.claims.forEach(claim => {
    const card = document.createElement("div");
    card.className = "claim-card";
    
    // Consensus progress calculations
    const totalVotes = claim.votesTrue + claim.votesMisleading + claim.votesFalse;
    const percentTrue = totalVotes > 0 ? (claim.votesTrue / totalVotes) * 100 : 0;
    const percentMisleading = totalVotes > 0 ? (claim.votesMisleading / totalVotes) * 100 : 0;
    const percentFalse = totalVotes > 0 ? (claim.votesFalse / totalVotes) * 100 : 0;
    
    card.innerHTML = `
      <div class="claim-header">
        <span class="claim-id">Claim ID: #${claim.id}</span>
        <span class="publish-time">Submitter: ${claim.submitter}</span>
      </div>
      
      <h4 class="claim-headline">${claim.title}</h4>
      <p class="claim-summary">${claim.text}</p>
      
      <div class="claim-pool-box">
        <span class="pool-lbl">Consensus Reward Pool:</span>
        <span class="pool-val text-purple">${claim.pool}</span>
      </div>
      
      <div class="claim-footer">
        <div class="consensus-progress">
          <div class="consensus-lbl">Consensus (T/M/F)</div>
          <div class="progress-bar-container">
            <div class="progress-true" style="width: ${percentTrue}%;" title="True: ${percentTrue.toFixed(0)}%"></div>
            <div class="progress-misleading" style="width: ${percentMisleading}%;" title="Misleading: ${percentMisleading.toFixed(0)}%"></div>
            <div class="progress-false" style="width: ${percentFalse}%;" title="False: ${percentFalse.toFixed(0)}%"></div>
          </div>
        </div>
        <button class="btn btn-outline btn-xs" onclick="openVoteDialog(${claim.id})">
          ${claim.userVoted ? 'Adjust Vote' : 'Verify Claim'}
        </button>
      </div>
    `;
    
    list.appendChild(card);
  });
}

function openVoteDialog(id) {
  const claim = state.claims.find(c => c.id === id);
  if (!claim) return;
  
  state.currentClaim = claim;
  
  document.getElementById("vote-claim-meta").textContent = `Claim ID: #${claim.id} | Submitter: ${claim.submitter}`;
  document.getElementById("vote-claim-title").textContent = claim.title;
  document.getElementById("vote-claim-text").textContent = `Context details: ${claim.text}`;
  
  // Set default stake based on settings
  const stakeInput = document.getElementById("vote-stake");
  if (stakeInput) {
    if (state.stakeTier === '1') stakeInput.value = 10;
    else if (state.stakeTier === '2') stakeInput.value = 50;
    else if (state.stakeTier === '3') stakeInput.value = 200;
  }
  
  // Reset statuses
  const statusMsg = document.getElementById("vote-submit-status");
  if (statusMsg) {
    statusMsg.className = "status-msg mt-12 hidden";
    statusMsg.innerHTML = '';
  }
  
  // Reset radio buttons
  const radios = document.getElementsByName("verdict-choice");
  radios.forEach(r => r.checked = false);
  
  const voteEvidence = document.getElementById("vote-evidence");
  const voteNotes = document.getElementById("vote-notes");
  if (voteEvidence) voteEvidence.value = '';
  if (voteNotes) voteNotes.value = '';
  
  // Show Voting drawer modal
  document.getElementById("modal-vote").classList.remove("hidden");
}

function submitVoteVerdict() {
  if (!state.walletConnected) {
    showStatusMsg("vote-submit-status", "Please connect your decentralized wallet first.", "error");
    return;
  }

  const selectedOption = document.querySelector('input[name="verdict-choice"]:checked');
  if (!selectedOption) {
    showStatusMsg("vote-submit-status", "Please select a verdict: True, Misleading, or False.", "error");
    return;
  }
  
  const evidenceUrl = document.getElementById("vote-evidence").value.trim();
  if (!evidenceUrl) {
    showStatusMsg("vote-submit-status", "Supporting evidence URL is mandatory.", "error");
    return;
  }
  
  const stakeVal = parseInt(document.getElementById("vote-stake").value);
  if (isNaN(stakeVal) || stakeVal < 10) {
    showStatusMsg("vote-submit-status", "Minimum stake is 10 GRAM tokens.", "error");
    return;
  }
  
  if (state.balances.GRAM < stakeVal) {
    showStatusMsg("vote-submit-status", "Insufficient GRAM balance. Swap TON/USDT to GRAM in the Wallet tab.", "error");
    return;
  }

  // Process Vote
  const verdict = selectedOption.value;
  const claim = state.currentClaim;
  
  // Adjust vote counts based on verdict selection
  if (verdict === 'TRUE') claim.votesTrue += 1;
  else if (verdict === 'MISLEADING') claim.votesMisleading += 1;
  else if (verdict === 'FALSE') claim.votesFalse += 1;

  claim.userVoted = true;
  claim.staked = stakeVal;
  
  // Deduct stake
  state.balances.GRAM -= stakeVal;
  
  // Log transaction
  addTransaction('Stake', `Consensus vote for Claim #${claim.id}`, `-${stakeVal}.00 GRAM`, 'ton...ff9a');
  
  showStatusMsg("vote-submit-status", `Verdict submitted! Staked ${stakeVal} GRAM to decentralized validator pool.`, "success");
  
  // Re-render components
  updateWalletUI();
  renderClaims();
  saveAppState();
  
  setTimeout(() => {
    document.getElementById("modal-vote").classList.add("hidden");
  }, 1500);
}

function submitNewClaim() {
  if (!state.walletConnected) {
    showStatusMsg("submit-claim-status", "Wallet must be connected to write claims.", "error");
    return;
  }

  const url = document.getElementById("claim-url").value.trim();
  const headline = document.getElementById("claim-title").value.trim();
  const claimText = document.getElementById("claim-text").value.trim();
  const stakeVal = parseInt(document.getElementById("claim-stake").value);

  if (!url || !headline || !claimText) {
    showStatusMsg("submit-claim-status", "Please fill in all form fields.", "error");
    return;
  }

  if (isNaN(stakeVal) || stakeVal < 5) {
    showStatusMsg("submit-claim-status", "Minimum staking threshold is 5 GRAM.", "error");
    return;
  }

  if (state.balances.GRAM < stakeVal) {
    showStatusMsg("submit-claim-status", "Insufficient GRAM tokens to cover priority stake.", "error");
    return;
  }

  // Deduct Stake
  state.balances.GRAM -= stakeVal;
  
  // Register claim
  const newId = 10800 + state.claims.length + 1;
  const newClaim = {
    id: newId,
    title: headline,
    text: claimText,
    category: "geopolitics", // default
    submitter: "anonymous_pilot",
    pool: `${stakeVal * 2} GRAM`, // Mock pool doubled
    votesTrue: 1,
    votesMisleading: 0,
    votesFalse: 0,
    status: "Under Review",
    consensus: "Pending",
    staked: stakeVal,
    userVoted: true
  };
  
  state.claims.unshift(newClaim);
  
  // Add log
  addTransaction('Submit', `Opened dispute Claim #${newId}`, `-${stakeVal}.00 GRAM`, 'ton...a3e9');
  
  showStatusMsg("submit-claim-status", `Dispute claim filed successfully! Staked ${stakeVal} GRAM.`, "success");
  
  updateWalletUI();
  renderClaims();
  saveAppState();
  
  setTimeout(() => {
    document.getElementById("modal-submit-claim").classList.add("hidden");
    // Clear fields
    document.getElementById("claim-url").value = '';
    document.getElementById("claim-title").value = '';
    document.getElementById("claim-text").value = '';
  }, 1500);
}

// --- TRANSACTION LEDGER & SWAP ENGINE ---
function renderLedger() {
  const ledger = document.getElementById("tx-ledger-list");
  if (!ledger) return;
  ledger.innerHTML = '';
  
  state.transactions.forEach(tx => {
    const item = document.createElement("div");
    item.className = "tx-item";
    
    const isNegative = tx.amount.startsWith("-");
    const amountColorClass = isNegative ? 'text-red' : 'text-green';
    
    item.innerHTML = `
      <div class="tx-meta">
        <span class="tx-title">${tx.title}</span>
        <span class="tx-time">${tx.time} | Type: ${tx.type}</span>
      </div>
      <div class="tx-val-col">
        <span class="tx-amount ${amountColorClass}">${tx.amount}</span>
        <span class="tx-hash">${tx.hash}</span>
      </div>
    `;
    
    ledger.appendChild(item);
  });
}

function addTransaction(type, title, amount, hash) {
  const tx = {
    id: 'tx_' + Math.random().toString(36).substring(2, 9),
    type: type,
    title: title,
    amount: amount,
    time: 'Just now',
    hash: hash
  };
  state.transactions.unshift(tx);
  renderLedger();
}

function openTipDialog(articleId) {
  const article = state.articles.find(a => a.id === articleId);
  if (!article) return;
  
  state.currentArticle = article;
  
  // Reset statuses
  const statusMsg = document.getElementById("tip-tx-status");
  if (statusMsg) {
    statusMsg.className = "status-msg mt-12 hidden";
    statusMsg.innerHTML = '';
  }
  
  // Show tip overlay
  document.getElementById("modal-tip").classList.remove("hidden");
}

function submitTip() {
  if (!state.walletConnected) {
    showStatusMsg("tip-tx-status", "Wallet must be connected to send tips.", "error");
    return;
  }

  const activeChip = document.querySelector(".tip-chip.active");
  const asset = activeChip ? activeChip.getAttribute("data-asset") : 'TON';
  const amount = parseFloat(document.getElementById("tip-amount").value);
  
  if (isNaN(amount) || amount <= 0) {
    showStatusMsg("tip-tx-status", "Enter a valid positive tip amount.", "error");
    return;
  }
  
  if (state.balances[asset] < amount) {
    showStatusMsg("tip-tx-status", `Insufficient ${asset} balance to complete payment.`, "error");
    return;
  }

  // Deduct tip
  state.balances[asset] -= amount;
  
  const cleanTitle = state.currentArticle.title.length > 25 ? state.currentArticle.title.substring(0, 25) + '...' : state.currentArticle.title;
  addTransaction('Tip', `Tipped content: ${cleanTitle}`, `-${amount.toFixed(2)} ${asset}`, 'ton...f088');
  
  showStatusMsg("tip-tx-status", `Tip of ${amount} ${asset} sent to authors & validators!`, "success");
  
  updateWalletUI();
  saveAppState();
  
  setTimeout(() => {
    document.getElementById("modal-tip").classList.add("hidden");
  }, 1500);
}

function handleTokenSwap() {
  if (!state.walletConnected) {
    showStatusMsg("swap-tx-status", "Please connect your TON wallet to execute DeFi swap.", "error");
    return;
  }

  const fromAsset = document.getElementById("swap-from-asset").value;
  const toAsset = document.getElementById("swap-to-asset").value;
  const fromAmt = parseFloat(document.getElementById("swap-from-amount").value);
  
  if (fromAsset === toAsset) {
    showStatusMsg("swap-tx-status", "Source and target assets must be different.", "error");
    return;
  }
  
  if (isNaN(fromAmt) || fromAmt <= 0) {
    showStatusMsg("swap-tx-status", "Enter a positive transaction volume.", "error");
    return;
  }
  
  if (state.balances[fromAsset] < fromAmt) {
    showStatusMsg("swap-tx-status", `Insufficient ${fromAsset} balance.`, "error");
    return;
  }

  // Conversion Rates mapping
  // 1 TON = 20 GRAM
  // 1 USDT = 4 GRAM
  // 1 TON = 5 USDT (simulated exchange values)
  
  let toAmt = 0;
  
  if (fromAsset === 'TON' && toAsset === 'GRAM') toAmt = fromAmt * 20;
  else if (fromAsset === 'USDT' && toAsset === 'GRAM') toAmt = fromAmt * 4;
  else if (fromAsset === 'TON' && toAsset === 'USDT') toAmt = fromAmt * 5;
  else if (fromAsset === 'USDT' && toAsset === 'TON') toAmt = fromAmt / 5;
  else if (fromAsset === 'GRAM' && toAsset === 'TON') toAmt = fromAmt / 20;
  else if (fromAsset === 'GRAM' && toAsset === 'USDT') toAmt = fromAmt / 4;
  
  // Execute balances updates
  state.balances[fromAsset] -= fromAmt;
  state.balances[toAsset] += toAmt;
  
  // Ledger log
  addTransaction('Swap', `Swapped ${fromAsset} for ${toAsset}`, `-${fromAmt.toFixed(2)} ${fromAsset}`, 'ton...defi');
  addTransaction('Swap', `Received swap output`, `+${toAmt.toFixed(2)} ${toAsset}`, 'ton...defi');
  
  showStatusMsg("swap-tx-status", `Swapped ${fromAmt} ${fromAsset} for ${toAmt.toFixed(2)} ${toAsset}!`, "success");
  
  // Update UI & save
  updateWalletUI();
  saveAppState();
  
  // Recalculate swap forms
  document.getElementById("swap-from-amount").value = 1;
  calculateSwapOutput();
  
  setTimeout(() => {
    document.getElementById("modal-swap").classList.add("hidden");
  }, 1500);
}

function calculateSwapOutput() {
  const fromAsset = document.getElementById("swap-from-asset").value;
  const toAsset = document.getElementById("swap-to-asset").value;
  const fromAmt = parseFloat(document.getElementById("swap-from-amount").value);
  const toInput = document.getElementById("swap-to-amount");
  const rateLabel = document.getElementById("exchange-rate-val");
  
  if (isNaN(fromAmt) || fromAmt <= 0) {
    if (toInput) toInput.value = 0;
    return;
  }
  
  let multiplier = 0;
  if (fromAsset === 'TON' && toAsset === 'GRAM') { multiplier = 20; if (rateLabel) rateLabel.textContent = "1 TON ≈ 20 GRAM"; }
  else if (fromAsset === 'USDT' && toAsset === 'GRAM') { multiplier = 4; if (rateLabel) rateLabel.textContent = "1 USDT ≈ 4 GRAM"; }
  else if (fromAsset === 'TON' && toAsset === 'USDT') { multiplier = 5; if (rateLabel) rateLabel.textContent = "1 TON ≈ 5 USDT"; }
  else if (fromAsset === 'USDT' && toAsset === 'TON') { multiplier = 0.2; if (rateLabel) rateLabel.textContent = "5 USDT ≈ 1 TON"; }
  else if (fromAsset === 'GRAM' && toAsset === 'TON') { multiplier = 0.05; if (rateLabel) rateLabel.textContent = "20 GRAM ≈ 1 TON"; }
  else if (fromAsset === 'GRAM' && toAsset === 'USDT') { multiplier = 0.25; if (rateLabel) rateLabel.textContent = "4 GRAM ≈ 1 USDT"; }
  else { multiplier = 1; if (rateLabel) rateLabel.textContent = "Rate is parity"; }
  
  if (toInput) toInput.value = (fromAmt * multiplier).toFixed(2);
}

// Deposit / Withdraw helpers
window.depositCrypto = function(asset) {
  if (!state.walletConnected) {
    alert("Please connect your wallet first.");
    return;
  }
  const amt = prompt(`Enter amount of simulated ${asset} to deposit from external wallet:`, "10.0");
  const parseAmt = parseFloat(amt);
  if (!isNaN(parseAmt) && parseAmt > 0) {
    state.balances[asset] += parseAmt;
    addTransaction('Deposit', `Deposited ${asset} to app balance`, `+${parseAmt.toFixed(2)} ${asset}`, 'ton...in03');
    updateWalletUI();
    saveAppState();
  }
};

window.withdrawCrypto = function(asset) {
  if (!state.walletConnected) {
    alert("Connect wallet to execute transfers.");
    return;
  }
  const amt = prompt(`Enter amount of simulated ${asset} to withdraw:`, "5.0");
  const parseAmt = parseFloat(amt);
  if (!isNaN(parseAmt) && parseAmt > 0) {
    if (state.balances[asset] < parseAmt) {
      alert("Insufficient account balance.");
      return;
    }
    state.balances[asset] -= parseAmt;
    addTransaction('Withdraw', `Withdrew ${asset} to external address`, `-${parseAmt.toFixed(2)} ${asset}`, 'ton...out9');
    updateWalletUI();
    saveAppState();
  }
};

// --- URL ANALYSIS ACTION ---
function triggerUrlAnalysis() {
  console.log("triggerUrlAnalysis called");
  const urlInput = document.getElementById("analyze-url-input");
  const feedback = document.getElementById("analyzer-feedback");
  
  if (!urlInput) {
    console.error("urlInput element not found");
    return;
  }
  const urlVal = urlInput.value.trim();

  if (!urlVal) {
    showStatusMsg("analyzer-feedback", "Please enter a valid URL to analyze.", "error");
    return;
  }

  // Basic URL regex check
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  if (!urlRegex.test(urlVal)) {
    showStatusMsg("analyzer-feedback", "Invalid URL format. Please include domain (e.g., https://example.com).", "error");
    return;
  }

  // Hide feedback if any
  if (feedback) feedback.classList.add("hidden");

  // Show progress modal
  const progressModal = document.getElementById("modal-analysis-progress");
  if (progressModal) progressModal.classList.remove("hidden");

  // Reset steps UI
  const steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
    document.getElementById("step-4")
  ];
  
  steps.forEach(s => {
    if (s) s.className = "step-item text-muted";
  });

  const leadText = document.getElementById("analysis-lead-text");
  if (leadText) leadText.textContent = "Initializing AI Analysis...";

  let fetchResult = null;
  let animationDone = false;
  let apiDone = false;

  // 1. Kick off real backend API call
  let cleanUrl = urlVal;
  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }

  fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: cleanUrl })
  })
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    fetchResult = data;
    apiDone = true;
    checkCompletion();
  })
  .catch(err => {
    console.warn("Backend API failed or missing, using local simulation fallback:", err);
    // Fallback: Generate mock data if serverless backend is not deployed/responding yet
    fetchResult = generateMockAnalysis(cleanUrl);
    apiDone = true;
    checkCompletion();
  });

  // 2. Play beautiful neon progress ticker (minimum duration 3.2s)
  setTimeout(() => {
    if (steps[0]) steps[0].className = "step-item active";
    if (leadText) leadText.textContent = "Connecting to source node...";
  }, 100);

  setTimeout(() => {
    if (steps[0]) steps[0].className = "step-item done";
    if (steps[1]) steps[1].className = "step-item active";
    if (leadText) leadText.textContent = "Parsing linguistic metrics...";
  }, 900);

  setTimeout(() => {
    if (steps[1]) steps[1].className = "step-item done";
    if (steps[2]) steps[2].className = "step-item active";
    if (leadText) leadText.textContent = "Calculating bias coefficient...";
  }, 1700);

  setTimeout(() => {
    if (steps[2]) steps[2].className = "step-item done";
    if (steps[3]) steps[3].className = "step-item active";
    if (leadText) leadText.textContent = "Auditing verification history...";
  }, 2500);

  setTimeout(() => {
    if (steps[3]) steps[3].className = "step-item done";
    if (leadText) leadText.textContent = "Compiling report...";
    animationDone = true;
    checkCompletion();
  }, 3300);

  // Synchronizer helper
  function checkCompletion() {
    if (apiDone && animationDone) {
      finalizeReport(fetchResult);
    } else if (animationDone && !apiDone) {
      if (leadText) leadText.textContent = "Waiting for model endpoint response...";
    }
  }

  function finalizeReport(data) {
    if (progressModal) progressModal.classList.add("hidden");
    
    const domainName = new URL(cleanUrl).hostname.replace("www.", "");
    
    // Create new article entry
    const newId = state.articles.length + 1;
    const newArticle = {
      id: newId,
      title: data.title || `Scan: ${domainName} Report`,
      category: data.category || "geopolitics",
      source: domainName,
      time: "Just now",
      teaser: data.teaser || `AI scan completed. The content exhibits a ${data.biasClass}-leaning style.`,
      biasText: data.biasText || `${data.biasClass.toUpperCase()} (${data.biasScore}%)`,
      biasScore: data.biasScore || 50,
      biasClass: data.biasClass || "center",
      framing: data.framing || "Standard Reporting",
      trustScore: data.trustScore || 80,
      status: data.status || (data.trustScore > 80 ? "verified" : data.trustScore > 50 ? "disputed" : "false"),
      statusText: data.statusText || (data.trustScore > 80 ? "Verified True" : "Under Review"),
      auditSummary: data.auditSummary || "Standard automated evaluation complete.",
      evidence: data.evidence || [`Cryptographic check of domain: ${domainName}`],
      loadedWords: data.loadedWords || [],
      locked: true // Paywalled by default!
    };

    // Prepend to database
    state.articles.unshift(newArticle);
    
    // Add transaction log
    addTransaction('AI Scan', `Scanned link: ${domainName}`, '0.00 TON', 'ton...scan');
    
    // Update global stat
    const analyzedCount = document.getElementById("stats-analyzed");
    if (analyzedCount) {
      const currentCount = parseInt(analyzedCount.textContent.replace(/,/g, ''));
      analyzedCount.textContent = (currentCount + 1).toLocaleString();
    }
    
    // Render and show details
    renderArticles();
    saveAppState();
    openArticleDetail(newArticle.id);
    
    // Reset input
    urlInput.value = '';
  }
}

// Fallback simulator if backend is not live
function generateMockAnalysis(cleanUrl) {
  const domainName = new URL(cleanUrl).hostname.replace("www.", "").toLowerCase();
  
  let title = `Scan: ${domainName} Report`;
  let biasScore = 50;
  let biasClass = "center";
  let biasText = "C-0.03 (Center)";
  let framing = "Balanced citations / Data-rich";
  let trustScore = 85;
  let statusText = "Verified True";
  let auditSummary = `Content verified from ${domainName}. Verdict: TRUE. Source maintains editorial neutrality.`;
  let loadedWords = [{ word: "reports", type: "neutral" }];
  
  if (domainName.includes("nytimes.com") || domainName.includes("cnn.com") || domainName.includes("theguardian.com")) {
    biasScore = 33;
    biasClass = "left";
    biasText = "L-0.34 (Leaning Left)";
    framing = "Policy welfare emphasis";
    trustScore = 90;
    auditSummary = "Claim: Policy revisions cited. Verdict: TRUE. Matches official releases.";
    loadedWords = [{ word: "progressive", type: "positive" }, { word: "crisis", type: "negative" }];
  } else if (domainName.includes("foxnews.com") || domainName.includes("nypost.com")) {
    biasScore = 77;
    biasClass = "right";
    biasText = "R-0.54 (Leaning Right)";
    framing = "National security emphasis";
    trustScore = 72;
    statusText = "Partially Verified";
    auditSummary = "Claim: Tariff projection margins. Verdict: DISPUTED. Financial models rely on narrow parameters.";
    loadedWords = [{ word: "overreach", type: "negative" }, { word: "threat", type: "negative" }];
  }
  
  // Create smart title from URL slug
  try {
    const paths = cleanUrl.split('/');
    const slug = paths[paths.length - 1] || paths[paths.length - 2] || '';
    if (slug && slug.length > 5) {
      const cleanSlug = slug.replace(/[-_]/g, ' ').replace(/\.[a-z]{2,4}$/i, '');
      title = cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1);
      if (title.length > 60) title = title.substring(0, 57) + "...";
    }
  } catch (e) {}

  return {
    title: title,
    category: "tech",
    teaser: `AI Scan completed for link. Content exhibits a ${biasClass}-leaning style and references verified data hubs.`,
    biasText: biasText,
    biasScore: biasScore,
    biasClass: biasClass,
    framing: framing,
    trustScore: trustScore,
    statusText: statusText,
    auditSummary: auditSummary,
    evidence: [`Local verification check completed for ${domainName}`],
    loadedWords: loadedWords
  };
}

// --- EVENT CONTROLLERS ---
function attachEventListeners() {
  const safeAddListener = (id, event, callback) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, callback);
  };

  // URL Analyzer Trigger
  safeAddListener("analyze-url-btn", "click", triggerUrlAnalysis);

  // Search bar
  const searchInput = document.getElementById("news-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderArticles();
    });
  }
  
  // Category Chips
  const chips = document.querySelectorAll("#category-chips .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.filterCategory = chip.getAttribute("data-category");
      renderArticles();
    });
  });
  
  // Filter Dropdowns
  safeAddListener("filter-bias", "change", (e) => {
    state.filterBias = e.target.value;
    renderArticles();
  });
  
  safeAddListener("filter-status", "change", (e) => {
    state.filterStatus = e.target.value;
    renderArticles();
  });

  // Modal Closures
  safeAddListener("close-detail-btn", "click", () => {
    document.getElementById("modal-article-detail").classList.add("hidden");
  });
  safeAddListener("detail-close-bottom-btn", "click", () => {
    document.getElementById("modal-article-detail").classList.add("hidden");
  });
  safeAddListener("close-tip-btn", "click", () => {
    document.getElementById("modal-tip").classList.add("hidden");
  });
  safeAddListener("close-submit-claim-btn", "click", () => {
    document.getElementById("modal-submit-claim").classList.add("hidden");
  });
  safeAddListener("cancel-submit-claim-btn", "click", () => {
    document.getElementById("modal-submit-claim").classList.add("hidden");
  });
  safeAddListener("close-vote-btn", "click", () => {
    document.getElementById("modal-vote").classList.add("hidden");
  });
  safeAddListener("cancel-vote-btn", "click", () => {
    document.getElementById("modal-vote").classList.add("hidden");
  });
  safeAddListener("close-swap-btn-x", "click", () => {
    document.getElementById("modal-swap").classList.add("hidden");
  });

  // Unlock Premium Actions
  safeAddListener("unlock-premium-gram-btn", "click", () => {
    if (state.currentArticle) executeGramUnlock(state.currentArticle.id);
  });

  // Tipping Submissions
  safeAddListener("detail-tip-btn", "click", () => {
    if (state.currentArticle) {
      document.getElementById("modal-article-detail").classList.add("hidden");
      openTipDialog(state.currentArticle.id);
    }
  });

  const tipChips = document.querySelectorAll(".tip-chip");
  tipChips.forEach(chip => {
    chip.addEventListener("click", () => {
      tipChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const asset = chip.getAttribute("data-asset");
      const tipDenom = document.getElementById("tip-denom");
      const tipAmount = document.getElementById("tip-amount");
      if (tipDenom) tipDenom.textContent = asset;
      if (tipAmount) tipAmount.value = asset === 'TON' ? 0.2 : 1.0;
    });
  });
  
  safeAddListener("confirm-tip-btn", "click", submitTip);

  // Submit Claim Open
  safeAddListener("open-submit-claim-btn", "click", () => {
    const statusMsg = document.getElementById("submit-claim-status");
    if (statusMsg) {
      statusMsg.className = "status-msg mt-12 hidden";
      statusMsg.innerHTML = '';
    }
    
    const claimUrl = document.getElementById("claim-url");
    const claimTitle = document.getElementById("claim-title");
    const claimText = document.getElementById("claim-text");
    if (claimUrl) claimUrl.value = '';
    if (claimTitle) claimTitle.value = '';
    if (claimText) claimText.value = '';
    
    document.getElementById("modal-submit-claim").classList.remove("hidden");
  });
  
  safeAddListener("confirm-submit-claim-btn", "click", submitNewClaim);
  
  // Dispute Voting Confirm
  safeAddListener("confirm-vote-btn", "click", submitVoteVerdict);

  // Swap opens
  safeAddListener("open-swap-btn", "click", () => {
    const statusMsg = document.getElementById("swap-tx-status");
    if (statusMsg) {
      statusMsg.className = "status-msg mt-12 hidden";
      statusMsg.innerHTML = '';
    }
    
    const swapFrom = document.getElementById("swap-from-amount");
    if (swapFrom) swapFrom.value = 5.0;
    calculateSwapOutput();
    document.getElementById("modal-swap").classList.remove("hidden");
  });
  
  // Swap formulas
  const swapFrom = document.getElementById("swap-from-amount");
  const swapFromAsset = document.getElementById("swap-from-asset");
  const swapToAsset = document.getElementById("swap-to-asset");
  if (swapFrom) swapFrom.addEventListener("input", calculateSwapOutput);
  if (swapFromAsset) swapFromAsset.addEventListener("change", calculateSwapOutput);
  if (swapToAsset) swapToAsset.addEventListener("change", calculateSwapOutput);
  
  safeAddListener("confirm-swap-btn", "click", handleTokenSwap);

  // Rules / Guides
  safeAddListener("view-rules-btn", "click", () => {
    alert("Consensus Audit Rules:\n1. Provide official reference URLs or files.\n2. Staking locks tokens for a 48h resolution window.\n3. Dishonest verdicts are slashed and split among the consensus majority.\n4. GRAM is staked to yield verification fees.");
  });
  
  // Claim rewards
  safeAddListener("claim-rewards-btn", "click", () => {
    alert("No unclaimed validator rewards currently available. Participate in active consensus disputes to earn yield.");
  });

  // Settings Events
  const autoUnlockToggle = document.getElementById("setting-auto-unlock");
  if (autoUnlockToggle) {
    autoUnlockToggle.checked = state.autoUnlock;
    autoUnlockToggle.addEventListener("change", (e) => {
      state.autoUnlock = e.target.checked;
      saveAppState();
    });
  }

  const stakeTierSelect = document.getElementById("setting-stake-tier");
  if (stakeTierSelect) {
    stakeTierSelect.value = state.stakeTier;
    stakeTierSelect.addEventListener("change", (e) => {
      state.stakeTier = e.target.value;
      saveAppState();
    });
  }

  safeAddListener("reset-data-btn", "click", () => {
    if (confirm("Are you sure you want to clear all local data, wallets, and resets?")) {
      localStorage.removeItem("verichain_news_state");
      location.reload();
    }
  });
}

// Preset tip helper
window.setTipPreset = function(val) {
  const tipAmount = document.getElementById("tip-amount");
  if (tipAmount) tipAmount.value = val;
};

// Helper for status message alerts
function showStatusMsg(elementId, text, type) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = text;
    el.className = `status-msg mt-12 status-${type}`;
    el.classList.remove("hidden");
  }
}
