/* =========================================================
   VERDICT — script.js
   All site interactivity: theme, nav, search/filter, product
   rendering, wishlist, share, copy-link, FAQ, reveal, etc.
   ========================================================= */

/* ---------------------------------------------------------
   1. PRODUCT DATA
   ---------------------------------------------------------
   ADMIN NOTE: To add a new product, just add a new object to
   this array. It will automatically appear in every relevant
   section (Shop grid, and Featured/Trending/Deals if tagged)
   with zero HTML changes required.

   Fields:
   - id: unique string/number
   - name: product name
   - category: one of the keys in CATEGORIES below
   - price / oldPrice: numbers (oldPrice optional)
   - rating: 0-5 (supports halves), used for star display
   - score: 0-10 editor score
   - description: short one-line description
   - image: path to product image
   - tags: array including any of "featured", "trending", "deal"
   - link: affiliate URL (placeholder)
--------------------------------------------------------- */

const CATEGORIES = [
  { key: "electronics", label: "Electronics", icon: "💻" },
  { key: "audio",       label: "Audio",       icon: "🎧" },
  { key: "fashion",     label: "Fashion",     icon: "👟" },
  { key: "home",        label: "Home & Living", icon: "🏠" },
  { key: "fitness",     label: "Fitness",     icon: "🏋️" },
  { key: "beauty",      label: "Beauty",      icon: "🌿" },
];

const PRODUCTS = [
  {
    id: "p01", name: "Aura Wireless Headphones", category: "audio",
    price: 179, oldPrice: 229, rating: 4.5, score: 9.2,
    description: "Studio-tuned ANC headphones with 40-hour battery life and plush memory-foam ear cups.",
    image: "images/product-headphones.svg", tags: ["featured", "trending"],
    link: "https://example.com/product/aura-headphones"
  },
  {
    id: "p02", name: "Chronos Steel Watch", category: "electronics",
    price: 249, oldPrice: null, rating: 4.8, score: 9.5,
    description: "Hybrid smartwatch with two-week battery life, sapphire glass and offline GPS.",
    image: "images/product-watch.svg", tags: ["featured", "deal"],
    link: "https://example.com/product/chronos-watch"
  },
  {
    id: "p03", name: "Lumen X Mirrorless Camera", category: "electronics",
    price: 899, oldPrice: null, rating: 4.7, score: 9.0,
    description: "24MP APS-C sensor with in-body stabilization, built for creators who shoot daily.",
    image: "images/product-camera.svg", tags: ["trending"],
    link: "https://example.com/product/lumen-x-camera"
  },
  {
    id: "p04", name: "Ridgeline Trail Sneaker", category: "fashion",
    price: 89, oldPrice: 130, rating: 4.3, score: 8.6,
    description: "Breathable knit trail runner with recycled foam midsole and grippy lugs.",
    image: "images/product-sneaker.svg", tags: ["deal"],
    link: "https://example.com/product/ridgeline-sneaker"
  },
  {
    id: "p05", name: "Nova Compact Blender", category: "home",
    price: 59, oldPrice: 89, rating: 4.4, score: 8.4,
    description: "Single-serve blender with self-cleaning cycle and travel-ready cup.",
    image: "images/product-blender.svg", tags: ["deal"],
    link: "https://example.com/product/nova-blender"
  },
  {
    id: "p06", name: "Voyage Weekender Backpack", category: "fashion",
    price: 119, oldPrice: null, rating: 4.6, score: 9.1,
    description: "Water-resistant 30L pack with a dedicated laptop sleeve and hidden security pocket.",
    image: "images/product-backpack.svg", tags: ["featured"],
    link: "https://example.com/product/voyage-backpack"
  },
  {
    id: "p07", name: "Halo Ambient Desk Lamp", category: "home",
    price: 69, oldPrice: null, rating: 4.5, score: 8.8,
    description: "Tunable warm-to-cool LED lamp with touch dimming and a wireless charging base.",
    image: "images/product-lamp.svg", tags: ["trending"],
    link: "https://example.com/product/halo-lamp"
  },
  {
    id: "p08", name: "Drift Bluetooth Speaker", category: "audio",
    price: 79, oldPrice: 110, rating: 4.2, score: 8.3,
    description: "Pocket-sized speaker rated IP67, with 18-hour battery and surprising bass depth.",
    image: "images/product-speaker.svg", tags: ["deal"],
    link: "https://example.com/product/drift-speaker"
  },
  {
    id: "p09", name: "Skyline Mini Drone", category: "electronics",
    price: 329, oldPrice: null, rating: 4.6, score: 9.0,
    description: "4K stabilized drone under 250g with 34-minute flight time and obstacle sensing.",
    image: "images/product-drone.svg", tags: ["featured"],
    link: "https://example.com/product/skyline-drone"
  },
  {
    id: "p10", name: "Keystroke Mechanical Keyboard", category: "electronics",
    price: 139, oldPrice: 169, rating: 4.7, score: 9.1,
    description: "Hot-swappable low-profile mechanical keyboard tuned for a quiet, precise typing feel.",
    image: "images/product-keyboard.svg", tags: ["trending", "deal"],
    link: "https://example.com/product/keystroke-keyboard"
  },
  {
    id: "p11", name: "Meridian Polarized Sunglasses", category: "fashion",
    price: 65, oldPrice: 95, rating: 4.4, score: 8.5,
    description: "Lightweight bio-acetate frames with polarized, scratch-resistant lenses.",
    image: "images/product-sunglasses.svg", tags: ["deal"],
    link: "https://example.com/product/meridian-sunglasses"
  },
  {
    id: "p12", name: "Ritual No.02 Eau de Parfum", category: "beauty",
    price: 92, oldPrice: null, rating: 4.6, score: 8.9,
    description: "A warm sandalwood-and-amber scent that lasts from morning meetings to dinner.",
    image: "images/product-perfume.svg", tags: ["featured"],
    link: "https://example.com/product/ritual-parfum"
  },
  {
    id: "p13", name: "Groundwork Yoga Mat", category: "fitness",
    price: 55, oldPrice: 72, rating: 4.5, score: 8.7,
    description: "Non-slip natural rubber mat with alignment guides, 5mm cushioning for joints.",
    image: "images/product-yogamat.svg", tags: ["trending", "deal"],
    link: "https://example.com/product/groundwork-yogamat"
  },
  {
    id: "p14", name: "Pulse Insulated Bottle", category: "fitness",
    price: 34, oldPrice: null, rating: 4.8, score: 9.3,
    description: "24-hour cold retention, leakproof lid, and laser-etched volume markers.",
    image: "images/product-bottle.svg", tags: ["featured", "trending"],
    link: "https://example.com/product/pulse-bottle"
  },
];

/* ---------------------------------------------------------
   2. STATE
--------------------------------------------------------- */
const state = {
  search: "",
  category: "all",
  wishlist: JSON.parse(localStorage.getItem("verdict_wishlist") || "[]"),
};

/* ---------------------------------------------------------
   3. UTILITIES
--------------------------------------------------------- */
function formatPrice(n){
  return "$" + n.toFixed(2).replace(/\.00$/, "");
}

function starString(rating){
  const full = Math.round(rating * 2) / 2;
  let out = "";
  for (let i = 1; i <= 5; i++){
    if (full >= i) out += "★";
    else if (full >= i - 0.5) out += "⯨";
    else out += "☆";
  }
  return out;
}

function showToast(message){
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

/* ---------------------------------------------------------
   4. RENDER: CATEGORY GRID
--------------------------------------------------------- */
function renderCategories(){
  const grid = document.getElementById("categoryGrid");
  grid.innerHTML = CATEGORIES.map(cat => `
    <button class="category-card" data-category="${cat.key}" type="button">
      <div class="cat-icon">${cat.icon}</div>
      <span>${cat.label}</span>
      <small>${PRODUCTS.filter(p => p.category === cat.key).length} picks</small>
    </button>
  `).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".category-card");
    if (!card) return;
    const key = card.dataset.category;
    state.category = key;
    // sync chip UI
    document.querySelectorAll(".chip").forEach(c => c.classList.toggle("is-active", c.dataset.filter === key));
    renderShopGrid();
    document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   5. RENDER: FILTER CHIPS
--------------------------------------------------------- */
function renderChips(){
  const wrap = document.getElementById("filterChips");
  const chipsHTML = CATEGORIES.map(cat =>
    `<button class="chip" data-filter="${cat.key}">${cat.label}</button>`
  ).join("");
  wrap.insertAdjacentHTML("beforeend", chipsHTML);

  wrap.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.category = chip.dataset.filter;
    wrap.querySelectorAll(".chip").forEach(c => c.classList.toggle("is-active", c === chip));
    renderShopGrid();
  });
}

/* ---------------------------------------------------------
   6. PRODUCT CARD TEMPLATE
--------------------------------------------------------- */
function productCard(p){
  const isWishlisted = state.wishlist.includes(p.id);
  const badge = p.tags.includes("deal") ? `<span class="card-badge deal">Deal</span>`
              : p.tags.includes("featured") ? `<span class="card-badge">Editor's Pick</span>`
              : p.tags.includes("trending") ? `<span class="card-badge">Trending</span>`
              : "";
  const savings = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;

  return `
  <article class="product-card" data-id="${p.id}">
    <div class="card-media">
      ${badge}
      <button class="card-wishlist ${isWishlisted ? "is-active" : ""}" data-action="wishlist" aria-label="Add to wishlist" aria-pressed="${isWishlisted}">
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.6 2 5 5.6 5c2 0 3.4 1 4.4 2.5C11 6 12.4 5 14.4 5 18 5 19.6 8.6 22 11.9 19.5 16.4 12 21 12 21Z"/></svg>
      </button>
      <img src="${p.image}" alt="${p.name}" loading="lazy" width="300" height="300">
    </div>
    <div class="card-body">
      <p class="card-cat">${CATEGORIES.find(c => c.key === p.category)?.label || p.category}</p>
      <h3 class="card-name">${p.name}</h3>
      <p class="card-desc">${p.description}</p>
      <div class="card-rating">
        <span class="stars">${starString(p.rating)}</span>
        <span class="score">${p.score.toFixed(1)}/10</span>
      </div>
      <div class="card-price">
        <span class="price-now">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span><span class="price-save">-${savings}%</span>` : ""}
      </div>
      <div class="card-actions">
        <a class="btn btn-primary" data-action="buy" href="${p.link}" target="_blank" rel="noopener noreferrer sponsored">Buy Now</a>
        <button class="card-icon-btn" data-action="share" aria-label="Share this product" title="Share">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6 15.4 6.4M8.6 13.4l6.8 4.2"/></svg>
        </button>
        <button class="card-icon-btn" data-action="copy" aria-label="Copy affiliate link" title="Copy link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

/* ---------------------------------------------------------
   7. RENDER: PRODUCT GRIDS
--------------------------------------------------------- */
function renderShopGrid(){
  const grid = document.getElementById("shopGrid");
  const emptyState = document.getElementById("emptyState");
  const resultCount = document.getElementById("resultCount");

  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = state.category === "all" || p.category === state.category;
    const q = state.search.trim().toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(productCard).join("");
  emptyState.hidden = filtered.length !== 0;
  resultCount.textContent = `${filtered.length} product${filtered.length === 1 ? "" : "s"} found`;
}

function renderTaggedGrid(gridId, tag){
  const grid = document.getElementById(gridId);
  const items = PRODUCTS.filter(p => p.tags.includes(tag));
  grid.innerHTML = items.map(productCard).join("");
}

function renderAllGrids(){
  renderShopGrid();
  renderTaggedGrid("featuredGrid", "featured");
  renderTaggedGrid("trendingGrid", "trending");
  renderTaggedGrid("dealsGrid", "deal");
  refreshWishlistCount();
}

/* ---------------------------------------------------------
   8. EVENT DELEGATION: product card actions
   (works across all grids since they're rendered dynamically)
--------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;
  const card = actionBtn.closest(".product-card");
  if (!card) return;
  const id = card.dataset.id;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const action = actionBtn.dataset.action;

  if (action === "wishlist"){
    toggleWishlist(product, actionBtn);
  }
  if (action === "share"){
    sharProduct(product);
  }
  if (action === "copy"){
    copyLink(product);
  }
  if (action === "buy"){
    // Native <a target="_blank"> already opens the placeholder affiliate link in a new tab.
    showToast(`Opening ${product.name} in a new tab…`);
  }
});

function toggleWishlist(product, btn){
  const idx = state.wishlist.indexOf(product.id);
  if (idx === -1){
    state.wishlist.push(product.id);
    showToast(`Added "${product.name}" to your wishlist`);
  } else {
    state.wishlist.splice(idx, 1);
    showToast(`Removed "${product.name}" from your wishlist`);
  }
  localStorage.setItem("verdict_wishlist", JSON.stringify(state.wishlist));

  // Update every instance of this card across all grids (it may appear in multiple sections)
  document.querySelectorAll(`.product-card[data-id="${product.id}"] .card-wishlist`).forEach(el => {
    const active = state.wishlist.includes(product.id);
    el.classList.toggle("is-active", active);
    el.setAttribute("aria-pressed", active);
  });
  refreshWishlistCount();
}

function refreshWishlistCount(){
  document.getElementById("wishlistCount").textContent = state.wishlist.length;
}

function sharProduct(product){
  const shareData = {
    title: product.name,
    text: `Check out ${product.name} on VERDICT — ${product.description}`,
    url: product.link,
  };
  if (navigator.share){
    navigator.share(shareData).catch(() => {});
  } else {
    copyLink(product, "Share link copied to clipboard");
  }
}

function copyLink(product, message){
  navigator.clipboard.writeText(product.link)
    .then(() => showToast(message || "Affiliate link copied to clipboard"))
    .catch(() => showToast("Couldn't copy link — copy it manually"));
}

/* ---------------------------------------------------------
   9. SEARCH INPUT (live filtering)
--------------------------------------------------------- */
function initSearch(){
  const input = document.getElementById("searchInput");
  input.addEventListener("input", (e) => {
    state.search = e.target.value;
    renderShopGrid();
  });
}

/* ---------------------------------------------------------
   10. THEME TOGGLE (persisted)
--------------------------------------------------------- */
function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem("verdict_theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));

  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("verdict_theme", next);
  });
}

/* ---------------------------------------------------------
   11. MOBILE NAV
--------------------------------------------------------- */
function initNav(){
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   12. STICKY HEADER SHADOW ON SCROLL + BACK TO TOP
--------------------------------------------------------- */
function initScrollEffects(){
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");

  function onScroll(){
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    backToTop.classList.toggle("is-visible", y > 500);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   13. SCROLL REVEAL ANIMATIONS
--------------------------------------------------------- */
function initReveal(){
  const targets = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(t => observer.observe(t));
}

/* Product cards are injected after load, so give them the reveal
   treatment too via a lighter, staggered fade using a second observer. */
function initCardReveal(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting){
        entry.target.style.transition = `opacity .5s ease ${(i % 4) * 0.06}s, transform .5s ease ${(i % 4) * 0.06}s`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".product-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    observer.observe(card);
  });
}

/* ---------------------------------------------------------
   14. FAQ ACCORDION
--------------------------------------------------------- */
function initFaq(){
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(open => {
        open.classList.remove("is-open");
        open.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isOpen){
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------------------------------------------------------
   15. CONTACT FORM (front-end only demo)
--------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.hidden = false;
    showToast("Message sent — thanks for reaching out!");
    form.reset();
  });
}

/* ---------------------------------------------------------
   16. PAGE LOADER
--------------------------------------------------------- */
function initLoader(){
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("is-hidden"), 400);
  });
  // Fallback in case 'load' already fired before listener attached
  if (document.readyState === "complete"){
    setTimeout(() => loader.classList.add("is-hidden"), 400);
  }
}

/* ---------------------------------------------------------
   17. INIT
--------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

initLoader();
initTheme();
initNav();
initSearch();
renderCategories();
renderChips();
renderAllGrids();
initScrollEffects();
initReveal();
initCardReveal();
initFaq();
initContactForm();
