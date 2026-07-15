// VeriChain News - Application Logic & State Controller

// --- STATE MANAGEMENT ---
let state = {
  walletConnected: false,
  walletAddress: '',
  balances: {
    TON: 25.40,
    USDT: 120.00,
    VERI: 120
  },
  unlockedArticles: [3], // Article IDs that have been unlocked. Article 3 is free/unlocked by default.
  transactions: [
    { id: 'tx_001', type: 'Reward', title: 'Fact-Check Consensus Payout', amount: '15.00 VERI', time: '1 day ago', hash: 'ton...4d9a' },
    { id: 'tx_002', type: 'Stake', title: 'Staked for Claim #10842', amount: '-10.00 VERI', time: '2 days ago', hash: 'ton...b20f' },
    { id: 'tx_003', type: 'Tip', title: 'Tip to BBC News team', amount: '-0.50 TON', time: '3 days ago', hash: 'ton...31a2' }
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
      pool: "2,400 VERI",
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
      pool: "800 VERI",
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

  // Set initial view navigation
  setupNavigation();
  
  // Initialize wallet display
  updateWalletUI();
  
  // Render News Feed
  renderArticles();
  
  // Render Claims Queue
  renderClaims();
  
  // Render Transaction Ledger
  renderLedger();

  // Attach core UI listeners
  attachEventListeners();
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

// --- MOCK WALLET CONNECT FLOW (TON CONNECT SIMULATION) ---
function updateWalletUI() {
  const connectBtn = document.getElementById("wallet-connect-btn");
  const connectedBadge = document.getElementById("wallet-connected-badge");
  const addrText = document.getElementById("wallet-addr-text");
  const profileName = document.getElementById("profile-name");
  const profileInitials = document.getElementById("profile-initials");
  const profileTier = document.getElementById("profile-tier");

  if (state.walletConnected) {
    connectBtn.classList.add("hidden");
    connectedBadge.classList.remove("hidden");
    
    // Shorten address format (e.g. UQA1...8x2a)
    addrText.textContent = state.walletAddress.substring(0, 4) + "..." + state.walletAddress.substring(state.walletAddress.length - 4);
    
    profileName.textContent = "Validator Pilot #" + state.walletAddress.substring(state.walletAddress.length - 4);
    profileInitials.textContent = "VP";
    profileTier.textContent = "Tier 2: Fact-Checker";
    profileTier.className = "user-tier-badge text-purple";
    profileTier.style.borderColor = "rgba(157, 78, 221, 0.4)";
    profileTier.style.background = "rgba(157, 78, 221, 0.12)";
  } else {
    connectBtn.classList.remove("hidden");
    connectedBadge.classList.add("hidden");
    
    profileName.textContent = "Anonymous Pilot";
    profileInitials.textContent = "AN";
    profileTier.textContent = "Tier 1: Reader";
    profileTier.className = "user-tier-badge";
    profileTier.style.borderColor = "";
    profileTier.style.background = "";
  }

  // Update wallet hub views
  document.getElementById("bal-ton").textContent = state.balances.TON.toFixed(2);
  document.getElementById("bal-ton-usd").textContent = (state.balances.TON * 7.20).toFixed(2); // Mock TON rate $7.20
  document.getElementById("bal-usdt").textContent = state.balances.USDT.toFixed(2);
  document.getElementById("bal-veri").textContent = state.balances.VERI;
}

function handleWalletConnect() {
  if (state.walletConnected) {
    // Already connected, disconnect
    state.walletConnected = false;
    state.walletAddress = '';
    updateWalletUI();
    saveAppState();
    return;
  }

  // Simulate TON Connect UI Modal trigger and signature
  const mockAddresses = [
    "EQA12n3d7xF82vLp4m9qR7sE8a2z4xY9oP4m7x2w3e1a8b9c",
    "EQB94x2a8m3d7yR5zQ4lP6xY1t8a5e9p7o2k6h4v3m1b9c8d",
    "UQC4m8v2a7x9yP5zT3lH8xK9e2o1n5v7a9b3d4f8h2j6k7l1"
  ];
  
  // Random address selection
  const randAddr = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
  
  // Alert simulated process
  const connectBtnText = document.getElementById("connect-btn-text");
  connectBtnText.textContent = "Authorizing...";
  
  setTimeout(() => {
    state.walletConnected = true;
    state.walletAddress = randAddr;
    connectBtnText.textContent = "Connect Wallet";
    updateWalletUI();
    
    // Add ledger log
    addTransaction('Connect', 'Wallet connected via TON Connect', '0.00 TON', randAddr.substring(0, 4) + '...' + randAddr.substring(randAddr.length - 4));
    
    saveAppState();
  }, 1000);
}

// --- NEWS FEED ENGINE ---
function renderArticles() {
  const feed = document.getElementById("articles-feed");
  feed.innerHTML = '';

  // Get active filters
  const search = state.searchQuery.toLowerCase();
  const category = state.filterCategory;
  const bias = state.filterBias;
  const status = state.filterStatus;

  const filtered = state.articles.filter(article => {
    // Search keyword
    const matchSearch = article.title.toLowerCase().includes(search) || article.teaser.toLowerCase().includes(search) || article.source.toLowerCase().includes(search);
    
    // Category filter
    const matchCategory = category === 'all' || article.category === category;
    
    // Bias filter mapping
    let matchBias = true;
    if (bias === 'left') {
      matchBias = article.biasClass === 'left';
    } else if (bias === 'right') {
      matchBias = article.biasClass === 'right';
    } else if (bias === 'center') {
      matchBias = article.biasClass === 'center';
    }

    // Status filter mapping
    let matchStatus = true;
    if (status === 'verified') {
      matchStatus = article.status === 'verified';
    } else if (status === 'disputed') {
      matchStatus = article.status === 'disputed' || article.status === 'unverified' || article.status === 'false';
    }

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
    
    const isUnlocked = state.unlockedArticles.includes(article.id);
    const lockIconSvg = article.locked && !isUnlocked ? `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 2px;">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>` : '';
      
    const biasWord = article.biasClass.toUpperCase();
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
      
      <div class="card-bias-mini">
        <div class="bias-lbl-row">
          <span>LEFT</span>
          <span style="color: ${article.biasClass === 'center' ? 'var(--text-secondary)' : article.biasClass === 'left' ? 'var(--bias-left-center)' : 'var(--bias-right-center)'}">${article.biasText}</span>
          <span>RIGHT</span>
        </div>
        <div class="bias-spectrum-bar">
          <span class="bias-marker" style="left: ${article.biasScore}%;"></span>
        </div>
      </div>
      
      <p class="card-teaser">${article.teaser}</p>
      
      <div class="card-actions">
        <button class="btn btn-outline btn-xs" onclick="openArticleDetail(${article.id})">
          ${lockIconSvg}View Detailed Analysis
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
  
  // Populate detail UI Elements
  document.getElementById("detail-category").textContent = article.category;
  document.getElementById("detail-source").textContent = article.source;
  document.getElementById("detail-time").textContent = article.time;
  document.getElementById("detail-title").textContent = article.title;
  document.getElementById("detail-teaser").textContent = article.teaser;
  
  // Bias marker position
  document.getElementById("detail-bias-marker").style.left = `${article.biasScore}%`;
  document.getElementById("detail-bias-score").textContent = article.biasText;
  document.getElementById("detail-framing").textContent = article.framing;
  
  // Fact check elements
  const statusBadge = document.getElementById("detail-status-badge");
  statusBadge.className = `audit-badge status-${article.status}`;
  statusBadge.textContent = article.statusText;
  
  document.getElementById("detail-trust-score").textContent = `${article.trustScore}/100`;
  document.getElementById("detail-audit-desc").textContent = article.auditSummary;
  
  // Evidence references
  const evidenceList = document.getElementById("detail-evidence-list");
  evidenceList.innerHTML = '';
  article.evidence.forEach(ev => {
    const li = document.createElement("li");
    li.textContent = ev;
    evidenceList.appendChild(li);
  });
  
  // Premium Content Lock Gate Logic
  const isUnlocked = state.unlockedArticles.includes(article.id);
  const premiumGate = document.getElementById("premium-analysis-gate");
  const premiumContent = document.getElementById("premium-unlocked-content");
  
  if (article.locked && !isUnlocked) {
    // If auto-unlock is toggled and connected, unlock automatically
    if (state.autoUnlock && state.walletConnected && state.balances.TON >= 0.05) {
      executeUnlock(article, 'TON', 0.05);
    } else {
      premiumGate.classList.remove("hidden");
      premiumContent.classList.add("hidden");
    }
  } else {
    premiumGate.classList.add("hidden");
    premiumContent.classList.remove("hidden");
    populatePremiumContent(article);
  }
  
  // Show detailed modal overlay
  document.getElementById("modal-article-detail").classList.remove("hidden");
}

function populatePremiumContent(article) {
  const list = document.getElementById("detail-load-words");
  list.innerHTML = '';
  
  article.loadedWords.forEach(lw => {
    const span = document.createElement("span");
    span.className = `load-word-badge ${lw.type === 'positive' ? 'positive' : ''}`;
    span.textContent = `"${lw.word}" (${lw.type})`;
    list.appendChild(span);
  });
}

function executeUnlock(article, asset, cost) {
  if (!state.walletConnected) {
    alert("Please connect your wallet first via the header button.");
    return;
  }
  
  if (state.balances[asset] < cost) {
    alert(`Insufficient ${asset} balance to unlock this report.`);
    return;
  }
  
  // Deduct
  state.balances[asset] -= cost;
  state.unlockedArticles.push(article.id);
  
  // Add Transaction
  const cleanTitle = article.title.length > 25 ? article.title.substring(0, 25) + '...' : article.title;
  addTransaction('Unlock', `Unlocked report: ${cleanTitle}`, `-${cost.toFixed(2)} ${asset}`, 'ton...ec8b');
  
  // Update view
  updateWalletUI();
  saveAppState();
  
  // UI transition in modal
  document.getElementById("premium-analysis-gate").classList.add("hidden");
  document.getElementById("premium-unlocked-content").classList.remove("hidden");
  populatePremiumContent(article);
  
  // Re-render feed to reflect unlocked state (remove lock icon)
  renderArticles();
}

// --- FACT-CHECKING HUB ENGINE ---
function renderClaims() {
  const list = document.getElementById("claims-list");
  list.innerHTML = '';
  
  document.getElementById("dispute-count").textContent = `${state.claims.length} Claims Active`;

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
  if (state.stakeTier === '1') stakeInput.value = 10;
  else if (state.stakeTier === '2') stakeInput.value = 50;
  else if (state.stakeTier === '3') stakeInput.value = 200;
  
  // Reset statuses
  const statusMsg = document.getElementById("vote-submit-status");
  statusMsg.className = "status-msg mt-12 hidden";
  statusMsg.innerHTML = '';
  
  // Reset radio buttons
  const radios = document.getElementsByName("verdict-choice");
  radios.forEach(r => r.checked = false);
  
  document.getElementById("vote-evidence").value = '';
  document.getElementById("vote-notes").value = '';
  
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
    showStatusMsg("vote-submit-status", "Minimum stake is 10 VERI reputation tokens.", "error");
    return;
  }
  
  if (state.balances.VERI < stakeVal) {
    showStatusMsg("vote-submit-status", "Insufficient VERI balance. Purchase VERI in the Wallet tab.", "error");
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
  state.balances.VERI -= stakeVal;
  
  // Log transaction
  addTransaction('Stake', `Consensus vote for Claim #${claim.id}`, `-${stakeVal}.00 VERI`, 'ton...ff9a');
  
  showStatusMsg("vote-submit-status", `Verdict submitted! Staked ${stakeVal} VERI to decentralized validator pool.`, "success");
  
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
    showStatusMsg("submit-claim-status", "Minimum staking threshold is 5 VERI.", "error");
    return;
  }

  if (state.balances.VERI < stakeVal) {
    showStatusMsg("submit-claim-status", "Insufficient VERI tokens to cover priority stake.", "error");
    return;
  }

  // Deduct Stake
  state.balances.VERI -= stakeVal;
  
  // Register claim
  const newId = 10800 + state.claims.length + 1;
  const newClaim = {
    id: newId,
    title: headline,
    text: claimText,
    category: "geopolitics", // default
    submitter: "anonymous_pilot",
    pool: `${stakeVal * 2} VERI`, // Mock pool doubled
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
  addTransaction('Submit', `Opened dispute Claim #${newId}`, `-${stakeVal}.00 VERI`, 'ton...a3e9');
  
  showStatusMsg("submit-claim-status", `Dispute claim filed successfully! Staked ${stakeVal} VERI.`, "success");
  
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
  statusMsg.className = "status-msg mt-12 hidden";
  statusMsg.innerHTML = '';
  
  // Show tip overlay
  document.getElementById("modal-tip").classList.remove("hidden");
}

function submitTip() {
  if (!state.walletConnected) {
    showStatusMsg("tip-tx-status", "Wallet must be connected to send tips.", "error");
    return;
  }

  const asset = document.querySelector(".tip-chip.active").getAttribute("data-asset");
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
  // 1 TON = 20 VERI
  // 1 USDT = 4 VERI
  // 1 TON = 5 USDT (simulated exchange values)
  
  let toAmt = 0;
  
  if (fromAsset === 'TON' && toAsset === 'VERI') toAmt = fromAmt * 20;
  else if (fromAsset === 'USDT' && toAsset === 'VERI') toAmt = fromAmt * 4;
  else if (fromAsset === 'TON' && toAsset === 'USDT') toAmt = fromAmt * 5;
  else if (fromAsset === 'USDT' && toAsset === 'TON') toAmt = fromAmt / 5;
  else if (fromAsset === 'VERI' && toAsset === 'TON') toAmt = fromAmt / 20;
  else if (fromAsset === 'VERI' && toAsset === 'USDT') toAmt = fromAmt / 4;
  
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
    toInput.value = 0;
    return;
  }
  
  let multiplier = 0;
  if (fromAsset === 'TON' && toAsset === 'VERI') { multiplier = 20; rateLabel.textContent = "1 TON ≈ 20 VERI"; }
  else if (fromAsset === 'USDT' && toAsset === 'VERI') { multiplier = 4; rateLabel.textContent = "1 USDT ≈ 4 VERI"; }
  else if (fromAsset === 'TON' && toAsset === 'USDT') { multiplier = 5; rateLabel.textContent = "1 TON ≈ 5 USDT"; }
  else if (fromAsset === 'USDT' && toAsset === 'TON') { multiplier = 0.2; rateLabel.textContent = "5 USDT ≈ 1 TON"; }
  else if (fromAsset === 'VERI' && toAsset === 'TON') { multiplier = 0.05; rateLabel.textContent = "20 VERI ≈ 1 TON"; }
  else if (fromAsset === 'VERI' && toAsset === 'USDT') { multiplier = 0.25; rateLabel.textContent = "4 VERI ≈ 1 USDT"; }
  else { multiplier = 1; rateLabel.textContent = "Rate is parity"; }
  
  toInput.value = (fromAmt * multiplier).toFixed(2);
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
  const urlInput = document.getElementById("analyze-url-input");
  const feedback = document.getElementById("analyzer-feedback");
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
  feedback.classList.add("hidden");

  // Show progress modal
  const progressModal = document.getElementById("modal-analysis-progress");
  progressModal.classList.remove("hidden");

  // Reset steps
  const steps = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
    document.getElementById("step-4")
  ];
  
  steps.forEach(s => {
    s.className = "step-item text-muted";
  });

  const leadText = document.getElementById("analysis-lead-text");
  leadText.textContent = "AI Analysis Initializing...";

  // Step animations
  setTimeout(() => {
    steps[0].className = "step-item active";
    leadText.textContent = "Connecting to source node...";
  }, 100);

  setTimeout(() => {
    steps[0].className = "step-item done";
    steps[1].className = "step-item active";
    leadText.textContent = "Parsing linguistic metrics...";
  }, 900);

  setTimeout(() => {
    steps[1].className = "step-item done";
    steps[2].className = "step-item active";
    leadText.textContent = "Calculating bias coefficient...";
  }, 1700);

  setTimeout(() => {
    steps[2].className = "step-item done";
    steps[3].className = "step-item active";
    leadText.textContent = "Auditing verification history...";
  }, 2500);

  setTimeout(() => {
    steps[3].className = "step-item done";
    leadText.textContent = "Compiling report...";
  }, 3300);

  // Complete and add article
  setTimeout(() => {
    progressModal.classList.add("hidden");
    
    // Process domain bias mapping
    let domainName = "Unknown Source";
    try {
      let cleanUrl = urlVal;
      if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
        cleanUrl = "https://" + cleanUrl;
      }
      const parsedUrl = new URL(cleanUrl);
      domainName = parsedUrl.hostname.replace("www.", "");
    } catch (e) {
      domainName = "Custom Link";
    }

    const domainLower = domainName.toLowerCase();
    
    // Bias profiles
    let title = `Analysis of report from ${domainName}`;
    let category = "geopolitics";
    let source = domainName;
    let biasText = "C-0.03 (Center)";
    let biasScore = 50;
    let biasClass = "center";
    let framing = "Descriptive / General Reference";
    let trustScore = 85;
    let status = "verified";
    let statusText = "Verified True";
    let auditSummary = `Claim: Content verified from ${domainName}. Verdict: TRUE. Source maintains strong editorial neutrality and references public facts.`;
    let evidence = [`Domain lookup matches registered verified provider: ${domainName}`];
    let loadedWords = [{ word: "reports", type: "neutral" }];
    
    // Left leaning domains
    if (domainLower.includes("nytimes.com") || domainLower.includes("cnn.com") || domainLower.includes("theguardian.com") || domainLower.includes("msnbc.com")) {
      biasText = "L-0.34 (Leaning Left)";
      biasScore = 33;
      biasClass = "left";
      framing = "Policy and social welfare emphasis";
      trustScore = 90;
      status = "verified";
      statusText = "Verified True";
      auditSummary = `Claim: Detailed policy adjustments cited in the article. Verdict: TRUE. Verified against official legislative documents.`;
      evidence = ["Congressional Record section 12", `${domainName} official policy report`];
      loadedWords = [
        { word: "progressive", type: "positive" },
        { word: "crisis", type: "negative" }
      ];
      category = "geopolitics";
    } 
    // Right leaning domains
    else if (domainLower.includes("foxnews.com") || domainLower.includes("nypost.com") || domainLower.includes("dailymail.co.uk") || domainLower.includes("breitbart.com")) {
      biasText = "R-0.54 (Leaning Right)";
      biasScore = 77;
      biasClass = "right";
      framing = "National interest & market security emphasis";
      trustScore = 72;
      status = "disputed";
      statusText = "Partially Verified";
      auditSummary = `Claim: Fiscal damage projections. Verdict: DISPUTED. Mathematical models rely on narrow parameters; wider indices suggest stable margins.`;
      evidence = ["Department of Treasury Quarterly Statement", "Independent Tax Foundation Analysis"];
      loadedWords = [
        { word: "overreach", type: "negative" },
        { word: "imminent threat", type: "negative" }
      ];
      category = "economy";
    }
    // Verified Neutral Center
    else if (domainLower.includes("reuters.com") || domainLower.includes("apnews.com") || domainLower.includes("bloomberg.com") || domainLower.includes("wsj.com")) {
      biasText = "C-0.05 (Center)";
      biasScore = 48;
      biasClass = "center";
      framing = "Direct reporting / Heavy data reference";
      trustScore = 97;
      status = "verified";
      statusText = "Verified True";
      auditSummary = `Claim: Financial rates and quotes. Verdict: TRUE. Data matches public exchange records and ticker history.`;
      evidence = ["Exchange Trade Feed Database", "Federal Reserve Press Release minutes"];
      loadedWords = [
        { word: "indices", type: "neutral" },
        { word: "announced", type: "neutral" }
      ];
      category = "economy";
    }
    // Random profile fallback
    else {
      const randBias = Math.floor(Math.random() * 3);
      if (randBias === 0) {
        biasText = "L-0.28 (Left Leaning)";
        biasScore = 36;
        biasClass = "left";
        framing = "Critical of institutional hierarchy";
        trustScore = 65;
        status = "unverified";
        statusText = "Unverified Link";
        auditSummary = `Claim: Custom assertions. Verdict: UNVERIFIED. Domain ${domainName} is new to the verification protocol; crowdsourced references are pending.`;
        evidence = [`WHOIS lookup details for domain ${domainName}`];
        loadedWords = [{ word: "demands", type: "negative" }];
      } else if (randBias === 1) {
        biasText = "R-0.31 (Right Leaning)";
        biasScore = 65;
        biasClass = "right";
        framing = "Focus on regulatory costs";
        trustScore = 62;
        status = "disputed";
        statusText = "Disputed Claim";
        auditSummary = `Claim: Compliance restrictions. Verdict: DISPUTED. Regional supervisors report no bans; only notification protocols are active.`;
        evidence = [`Official Gazette #4281`];
        loadedWords = [{ word: "burden", type: "negative" }];
      } else {
        biasText = "C-0.02 (Neutral)";
        biasScore = 51;
        biasClass = "center";
        framing = "General press summary";
        trustScore = 80;
        status = "verified";
        statusText = "Verified True";
        auditSummary = `Claim: General reporting. Verdict: TRUE. Consistent with concurrent press publications.`;
        evidence = ["Cross-checked wire reports AP/Reuters"];
        loadedWords = [{ word: "statement", type: "neutral" }];
      }
      category = "tech";
    }

    // Generate smart title from URL
    let articleTitle = `Analytical Scan: ${domainName} Report`;
    try {
      const paths = urlVal.split('/');
      const slug = paths[paths.length - 1] || paths[paths.length - 2] || '';
      if (slug && slug.length > 5) {
        const cleanSlug = slug.replace(/[-_]/g, ' ')
                              .replace(/\.[a-z]{2,4}$/i, '');
        articleTitle = cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1);
        if (articleTitle.length > 60) {
          articleTitle = articleTitle.substring(0, 57) + "...";
        }
      }
    } catch (e) {}

    // Create new article object
    const newId = state.articles.length + 1;
    const newArticle = {
      id: newId,
      title: articleTitle,
      category: category,
      source: source,
      time: "Just now",
      teaser: `AI Scan completed for link: ${urlVal}. The content exhibits a ${biasClass}-leaning style, highlighting specific keywords and referencing verified data hubs.`,
      biasText: biasText,
      biasScore: biasScore,
      biasClass: biasClass,
      framing: framing,
      trustScore: trustScore,
      status: status,
      statusText: statusText,
      auditSummary: auditSummary,
      evidence: evidence,
      loadedWords: loadedWords,
      locked: true // Premium
    };

    // Prepend to database
    state.articles.unshift(newArticle);
    
    // Add ledger log
    addTransaction('AI Scan', `Scanned link: ${domainName}`, '0.00 TON', 'ton...scan');
    
    // Update list analyzed stats
    const analyzedCount = document.getElementById("stats-analyzed");
    if (analyzedCount) {
      const currentCount = parseInt(analyzedCount.textContent.replace(/,/g, ''));
      analyzedCount.textContent = (currentCount + 1).toLocaleString();
    }
    
    // Refresh feed list
    renderArticles();
    saveAppState();
    
    // Automatically open the detail analysis drawer
    openArticleDetail(newArticle.id);
    
    // Clear input
    urlInput.value = '';
    
  }, 4000);
}

// --- EVENT CONTROLLERS ---
function attachEventListeners() {
  // URL Analyzer Trigger
  document.getElementById("analyze-url-btn").addEventListener("click", triggerUrlAnalysis);

  // Wallet Connection
  document.getElementById("wallet-connect-btn").addEventListener("click", handleWalletConnect);
  document.getElementById("wallet-connected-badge").addEventListener("click", handleWalletConnect);
  
  // Search bar
  document.getElementById("news-search").addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderArticles();
  });
  
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
  document.getElementById("filter-bias").addEventListener("change", (e) => {
    state.filterBias = e.target.value;
    renderArticles();
  });
  
  document.getElementById("filter-status").addEventListener("change", (e) => {
    state.filterStatus = e.target.value;
    renderArticles();
  });

  // Modal Closures
  document.getElementById("close-detail-btn").addEventListener("click", () => {
    document.getElementById("modal-article-detail").classList.add("hidden");
  });
  document.getElementById("detail-close-bottom-btn").addEventListener("click", () => {
    document.getElementById("modal-article-detail").classList.add("hidden");
  });
  document.getElementById("close-tip-btn").addEventListener("click", () => {
    document.getElementById("modal-tip").classList.add("hidden");
  });
  document.getElementById("close-submit-claim-btn").addEventListener("click", () => {
    document.getElementById("modal-submit-claim").classList.add("hidden");
  });
  document.getElementById("cancel-submit-claim-btn").addEventListener("click", () => {
    document.getElementById("modal-submit-claim").classList.add("hidden");
  });
  document.getElementById("close-vote-btn").addEventListener("click", () => {
    document.getElementById("modal-vote").classList.add("hidden");
  });
  document.getElementById("cancel-vote-btn").addEventListener("click", () => {
    document.getElementById("modal-vote").classList.add("hidden");
  });
  document.getElementById("close-swap-btn-x").addEventListener("click", () => {
    document.getElementById("modal-swap").classList.add("hidden");
  });

  // Unlock Premium Actions
  document.getElementById("unlock-premium-ton-btn").addEventListener("click", () => {
    if (state.currentArticle) executeUnlock(state.currentArticle, 'TON', 0.05);
  });
  document.getElementById("unlock-premium-usdt-btn").addEventListener("click", () => {
    if (state.currentArticle) executeUnlock(state.currentArticle, 'USDT', 0.1);
  });

  // Tipping Submissions
  document.getElementById("detail-tip-btn").addEventListener("click", () => {
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
      document.getElementById("tip-denom").textContent = asset;
      // adjust value default
      document.getElementById("tip-amount").value = asset === 'TON' ? 0.2 : 1.0;
    });
  });
  
  document.getElementById("confirm-tip-btn").addEventListener("click", submitTip);

  // Submit Claim Open
  document.getElementById("open-submit-claim-btn").addEventListener("click", () => {
    const statusMsg = document.getElementById("submit-claim-status");
    statusMsg.className = "status-msg mt-12 hidden";
    statusMsg.innerHTML = '';
    
    document.getElementById("claim-url").value = '';
    document.getElementById("claim-title").value = '';
    document.getElementById("claim-text").value = '';
    
    document.getElementById("modal-submit-claim").classList.remove("hidden");
  });
  
  document.getElementById("confirm-submit-claim-btn").addEventListener("click", submitNewClaim);
  
  // Dispute Voting Confirm
  document.getElementById("confirm-vote-btn").addEventListener("click", submitVoteVerdict);

  // Swap opens
  document.getElementById("open-swap-btn").addEventListener("click", () => {
    const statusMsg = document.getElementById("swap-tx-status");
    statusMsg.className = "status-msg mt-12 hidden";
    statusMsg.innerHTML = '';
    
    document.getElementById("swap-from-amount").value = 5.0;
    calculateSwapOutput();
    document.getElementById("modal-swap").classList.remove("hidden");
  });
  
  // Swap formulas
  document.getElementById("swap-from-amount").addEventListener("input", calculateSwapOutput);
  document.getElementById("swap-from-asset").addEventListener("change", calculateSwapOutput);
  document.getElementById("swap-to-asset").addEventListener("change", calculateSwapOutput);
  document.getElementById("confirm-swap-btn").addEventListener("click", handleTokenSwap);

  // Rules / Guides
  document.getElementById("view-rules-btn").addEventListener("click", () => {
    alert("Verification Consensus Rules:\n1. Provide official government transcripts or verifiable independent journalism feeds.\n2. Staking locks tokens for a 48h resolution window.\n3. Dishonest verdicts that stray from majority consensus are slashed and redistributed to voters.\n4. VERI is staked to earn consensus yields.");
  });
  
  // Claim rewards
  document.getElementById("claim-rewards-btn").addEventListener("click", () => {
    alert("No unclaimed validator rewards currently available. Participate in active consensus disputes to earn yield.");
  });

  // Settings Events
  const autoUnlockToggle = document.getElementById("setting-auto-unlock");
  autoUnlockToggle.checked = state.autoUnlock;
  autoUnlockToggle.addEventListener("change", (e) => {
    state.autoUnlock = e.target.checked;
    saveAppState();
  });

  const stakeTierSelect = document.getElementById("setting-stake-tier");
  stakeTierSelect.value = state.stakeTier;
  stakeTierSelect.addEventListener("change", (e) => {
    state.stakeTier = e.target.value;
    saveAppState();
  });

  document.getElementById("reset-data-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all local data, wallets, and resets?")) {
      localStorage.removeItem("verichain_news_state");
      location.reload();
    }
  });
}

// Preset tip helper
window.setTipPreset = function(val) {
  document.getElementById("tip-amount").value = val;
};

// Helper for status message alerts
function showStatusMsg(elementId, text, type) {
  const el = document.getElementById(elementId);
  el.textContent = text;
  el.className = `status-msg mt-12 status-${type}`;
  el.classList.remove("hidden");
}
