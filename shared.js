// ===== CRYPTO PULSE — SHARED JS =====

// ===== MOCK DATA =====
const COINS = [
  { id:'btc', name:'Bitcoin', sym:'BTC', price:67465.34, change24:2.35, change7:5.67, mcap:'$1.32T', color:'#f59e0b', avatar:'BT' },
  { id:'eth', name:'Ethereum', sym:'ETH', price:3521.47, change24:-1.23, change7:3.21, mcap:'$423.0B', color:'#6366f1', avatar:'ET' },
  { id:'sol', name:'Solana', sym:'SOL', price:178.92, change24:5.67, change7:12.34, mcap:'$79.6B', color:'#8b5cf6', avatar:'SO' },
  { id:'ada', name:'Cardano', sym:'ADA', price:0.6234, change24:-0.45, change7:-2.12, mcap:'$22.1B', color:'#3b82f6', avatar:'AD' },
  { id:'avax', name:'Avalanche', sym:'AVAX', price:42.78, change24:3.45, change7:9.87, mcap:'$16.5B', color:'#ef4444', avatar:'AV' },
  { id:'dot', name:'Polkadot', sym:'DOT', price:8.45, change24:1.89, change7:7.56, mcap:'$11.2B', color:'#ec4899', avatar:'DO' },
  { id:'link', name:'Chainlink', sym:'LINK', price:18.92, change24:-2.56, change7:1.23, mcap:'$11.1B', color:'#06b6d4', avatar:'LI' },
  { id:'matic', name:'Polygon', sym:'MATIC', price:0.9876, change24:4.12, change7:8.45, mcap:'$9.2B', color:'#a855f7', avatar:'MA' },
];

const PORTFOLIO = [
  { id:'btc', units:1.25, value:84290, pct:29.7, color:'#f59e0b' },
  { id:'eth', units:12.5, value:44018, pct:25.8, color:'#6366f1' },
  { id:'sol', units:85, value:15208, pct:49.1, color:'#8b5cf6' },
  { id:'ada', units:15000, value:9351, pct:38.5, color:'#3b82f6' },
  { id:'dot', units:500, value:4225, pct:30.8, color:'#ec4899' },
  { id:'avax', units:120, value:5134, pct:42.6, color:'#ef4444' },
];

const TRANSACTIONS = [
  { type:'buy', asset:'BTC', amount:0.15, price:66800, total:10020, date:'2026-05-02', status:'completed' },
  { type:'sell', asset:'ETH', amount:3.5, price:3480, total:12180, date:'2026-05-01', status:'completed' },
  { type:'buy', asset:'SOL', amount:25, price:172, total:4300, date:'2026-04-30', status:'completed' },
  { type:'buy', asset:'AVAX', amount:40, price:41.2, total:1648, date:'2026-04-29', status:'pending' },
  { type:'sell', asset:'ADA', amount:5000, price:0.61, total:3050, date:'2026-04-28', status:'completed' },
  { type:'buy', asset:'DOT', amount:100, price:7.9, total:790, date:'2026-04-27', status:'completed' },
  { type:'sell', asset:'LINK', amount:50, price:19.5, total:975, date:'2026-04-26', status:'failed' },
  { type:'buy', asset:'MATIC', amount:2000, price:0.95, total:1900, date:'2026-04-25', status:'completed' },
];

const NEWS = [
  { tag:'market', tagClass:'tag-market', title:'Bitcoin Surges Past $67K as Institutional Demand Grows', desc:'Major financial institutions continue to accumulate Bitcoin, driving prices to new monthly highs amid positive market sentiment.', time:'2h ago', img:'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&q=80' },
  { tag:'defi', tagClass:'tag-defi', title:'Ethereum 2.0 Staking Rewards Reach Record High', desc:'Ethereum staking yields have increased significantly, attracting more validators to the network and strengthening its security model.', time:'4h ago', img:'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80' },
  { tag:'defi', tagClass:'tag-defi', title:'Solana DeFi TVL Crosses $15 Billion Milestone', desc:'The Solana ecosystem continues its rapid growth with total value locked in DeFi protocols reaching unprecedented levels.', time:'6h ago', img:'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=200&q=80' },
  { tag:'regulation', tagClass:'tag-regulation', title:'SEC Approves New Crypto ETF Applications', desc:'Multiple cryptocurrency ETF applications have received regulatory approval, opening doors for mainstream investment.', time:'8h ago', img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80' },
  { tag:'gaming', tagClass:'tag-gaming', title:'Web3 Gaming Sector Sees 300% Growth in Active Users', desc:'Blockchain-based gaming platforms report massive user growth, with play-to-earn models attracting millions of new participants.', time:'12h ago', img:'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=200&q=80' },
  { tag:'regulation', tagClass:'tag-regulation', title:'Central Banks Explore Cross-Border CBDC Partnerships', desc:'Several central banks announce collaborative efforts to develop interoperable digital currency systems for international trade.', time:'1d ago', img:'https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=200&q=80' },
];

// ===== THEME SYSTEM =====
const THEMES = [
  { id:'dark', label:'Dark', swatch:'linear-gradient(135deg,#0a0a0f,#d4af37)' },
  { id:'light', label:'Light', swatch:'linear-gradient(135deg,#f8fafc,#3b82f6)' },
  { id:'emerald', label:'Emerald', swatch:'linear-gradient(135deg,#0a1a0e,#34d399)' },
  { id:'neon', label:'Neon', swatch:'linear-gradient(135deg,#02020f,#00ffff)' },
];

function getSavedTheme() { return localStorage.getItem('cp_theme') || 'dark'; }
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cp_theme', theme);
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });
  // rebuild orbs
  if (typeof buildOrbs === 'function') buildOrbs();
}
function initTheme() { setTheme(getSavedTheme()); }

// ===== NAV HELPERS =====
function buildNav(activePage) {
  const pages = [
    { href:'dashboard.html', label:'Dashboard' },
    { href:'portfolio.html', label:'Portfolio' },
    { href:'watchlist.html', label:'Watchlist' },
    { href:'transactions.html', label:'Transactions' },
    { href:'news.html', label:'News' },
  ];
  return pages.map(p => `<a href="${p.href}" class="nav-link${activePage===p.href?' active':''}">${p.label}</a>`).join('');
}

function buildThemeDropdown() {
  return THEMES.map(t => `
    <button class="theme-option" data-theme="${t.id}" onclick="setTheme('${t.id}');document.querySelector('.theme-dropdown').classList.remove('open')">
      <span class="theme-swatch" style="background:${t.swatch}"></span>${t.label}
    </button>`).join('');
}

function toggleThemeDropdown() {
  document.querySelector('.theme-dropdown').classList.toggle('open');
}

function toggleMobileMenu() {
  document.querySelector('.mobile-menu').classList.toggle('open');
}

// ===== SIMULATED LIVE PRICES =====
function startLivePrices(callback) {
  const live = COINS.map(c => ({...c}));
  setInterval(() => {
    live.forEach(c => {
      const delta = (Math.random() - 0.495) * 0.003;
      c.price = parseFloat((c.price * (1 + delta)).toFixed(c.price > 100 ? 2 : 4));
      c.change24 = parseFloat((c.change24 + (Math.random() - 0.5) * 0.05).toFixed(2));
    });
    if (callback) callback(live);
  }, 2500);
  return live;
}

// ===== TICKER =====
function buildTicker(coins) {
  const items = [...coins, ...coins].map(c => `
    <span class="ticker-item">
      <span class="ticker-name">${c.sym}</span>
      <span class="ticker-price">$${c.price.toLocaleString()}</span>
      <span class="${c.change24>=0?'ticker-up':'ticker-down'}">${c.change24>=0?'▲':'▼'}${Math.abs(c.change24)}%</span>
    </span>`).join('');
  return `<div class="ticker-track">${items}</div>`;
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ===== SKELETON LOADER =====
function showSkeleton(container, rows=4) {
  container.innerHTML = Array(rows).fill(`<div class="skeleton" style="height:48px;margin-bottom:8px;border-radius:10px"></div>`).join('');
}
function removeSkeleton(container, content, delay=800) {
  setTimeout(() => { container.innerHTML = content; }, delay);
}

// ===== FORMAT HELPERS =====
function fmt(n) {
  if (n >= 1e12) return '$' + (n/1e12).toFixed(2) + 'T';
  if (n >= 1e9) return '$' + (n/1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M';
  return '$' + n.toLocaleString();
}
function fmtPrice(p) {
  if (p >= 1000) return '$' + p.toLocaleString(undefined, {minimumFractionDigits:2,maximumFractionDigits:2});
  if (p >= 1) return '$' + p.toFixed(4);
  return '$' + p.toFixed(4);
}

// ===== CLOSE DROPDOWNS ON OUTSIDE CLICK =====
document.addEventListener('click', e => {
  const dd = document.querySelector('.theme-dropdown');
  if (dd && !e.target.closest('.theme-select-wrap')) dd.classList.remove('open');
});

// INIT ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initReveal();
});
