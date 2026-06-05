// ─────────────────────────────────────────────────────────────────────────────
//  app.js  —  Gopi Collections
//  Handles: nav links, breadcrumb/title, product catalogue, sidebar filtering
// ─────────────────────────────────────────────────────────────────────────────


// ── 1. FEATURED CATEGORY CARDS (index.html hero section) ─────────────────────

const featuredCards = [
  { img: './images/hoddies.jpg',         alt: 'Hoodies',     title: 'Hoodies & Jackets',     desc: 'Warm, stylish & comfortable', href: 'Shop.html?gender=Men&category=Sweatshirts' },
  { img: './images/blurred-frame 1.png', alt: 'Co-ords',     title: 'Co-ord Sets',           desc: 'Perfect matching outfits',    href: 'Shop.html?gender=Men&category=Co-ord Sets' },
  { img: './images/blurred-frame.png',   alt: 'Tracksuits',  title: 'Super soft Tracksuits', desc: 'Premium Comfort & Fit',       href: 'Shop.html?gender=Men&category=Track pants & Joggers' },
  { img: './images/travel.jpg',          alt: 'Travel Wear', title: 'Travel Essentials',     desc: 'Comfort for every journey',   href: 'Shop.html?gender=Men&category=T-Shirts' },
];

const cardContainer = document.getElementById('card-container');
if (cardContainer) {
  cardContainer.innerHTML = featuredCards.map(card => `
    <div class="category-card">
      <img src="${card.img}" alt="${card.alt}">
      <div class="overlay">
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
        <a href="${card.href}">Explore Now</a>
      </div>
    </div>
  `).join('');
}


// ── 2. SHOP COLLECTION CARDS (index.html shop section) ───────────────────────

const shopItems = [
  { img: './images/hoddies.jpg',            alt: 'Hoodies',    label: 'Hoodies',       href: 'Shop.html?gender=Men&category=Sweatshirts' },
  { img: './images/blurred-frame.png',      alt: 'Tracksuits', label: 'Tracksuits',    href: 'Shop.html?gender=Men&category=Track pants & Joggers' },
  { img: './images/jeans.png',              alt: 'Jeans',      label: 'Jeans',         href: 'Shop.html?gender=Men&category=Jeans' },
  { img: './images/casual-tshirt-men.webp', alt: 'Shirts',     label: 'Casual Shirts', href: 'Shop.html?gender=Men&category=Casual Shirts' },
  { img: './images/kurta-pajama.png',       alt: 'Kurta',      label: 'Kurta-Pajama',  href: 'Shop.html?gender=Men&category=Kurta-Pajama' },
  { img: './images/jackets.jpg',            alt: 'Jackets',    label: 'Jackets',       href: 'Shop.html?gender=Men&category=Jackets' },
  { img: './images/sweaters.jpg',           alt: 'Sweaters',   label: 'Sweaters',      href: 'Shop.html?gender=Men&category=Sweaters' },
];

const shopContainer = document.getElementById('shop-container');
if (shopContainer) {
  shopContainer.innerHTML = shopItems.map(item => `
    <div class="shop-cards">
      <img src="${item.img}" alt="${item.alt}">
      <div class="underlay">
        <a href="${item.href}">${item.label}</a>
      </div>
    </div>
  `).join('');
}


// ── 3. NAV LINK REWRITER ─────────────────────────────────────────────────────
// Rewrites every bare <a> in the dropdowns to Shop.html?gender=…&category=…

(function rewriteNavLinks() {
  const genderMap = {
    'mens-dropdown':   'Men',
    'womens-dropdown': 'Women',
    'kids-dropdown':   'Kids',
  };

  document.querySelectorAll(
    '.mens-dropdown a, .womens-dropdown a, .kids-dropdown a'
  ).forEach(function(link) {
    const text = link.textContent.trim();
    if (!text) return;

    const parent = link.closest('.mens-dropdown, .womens-dropdown, .kids-dropdown');
    if (!parent) return;

    let gender = 'Men';
    for (const [cls, label] of Object.entries(genderMap)) {
      if (parent.classList.contains(cls)) { gender = label; break; }
    }

    link.href =
      'Shop.html?gender=' + encodeURIComponent(gender) +
      '&category='        + encodeURIComponent(text);
  });
})();


// ── 4. BREADCRUMB + TITLE + FILTER SECTION VISIBILITY ────────────────────────

(function updateShopPage() {
  const params   = new URLSearchParams(window.location.search);
  const gender   = params.get('gender')   || 'Men';
  const category = params.get('category') || 'T-Shirts';

  // Breadcrumb gender segment
  const breadcrumbCurrent = document.querySelector('.breadcrumb .current');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = gender;

  // Breadcrumb category segment (append once)
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    breadcrumb.querySelector('.current-category')?.remove();
    breadcrumb.querySelector('.arrow-cat')?.remove();

    const arrow = document.createElement('span');
    arrow.className   = 'arrow arrow-cat';
    arrow.textContent = '•';

    const cat = document.createElement('span');
    cat.className   = 'current current-category';
    cat.textContent = category;

    breadcrumb.appendChild(arrow);
    breadcrumb.appendChild(cat);
  }

  // Page h1
  const h1 = document.querySelector('.title-block h1');
  if (h1) h1.textContent = category;

  // Browser tab
  document.title = category + ' — Gopi Collections';

  // Show / hide sidebar filter sections by category
  const filterVisibility = {
    'sleeve':   ['T-Shirts','Casual Shirts','Formal Shirts','Sports T-shirts',
                 'Sweatshirts','Sweaters','Jackets','Rain Coats'],
    'neckline': ['T-Shirts','Casual Shirts','Formal Shirts','Sports T-shirts',
                 'Sweatshirts','Sweaters'],
    'fit':      ['T-Shirts','Casual Shirts','Formal Shirts','Sports T-shirts',
                 'Jeans','Trousers','Lowers','Track pants & Joggers'],
    'material': ['T-Shirts','Casual Shirts','Formal Shirts','Sweatshirts',
                 'Sweaters','Jackets','Rain Coats','Jeans','Trousers',
                 'Shorts','Lowers','Track pants & Joggers'],
  };

  for (const [suffix, validCategories] of Object.entries(filterVisibility)) {
    const item = document.getElementById('item-' + suffix);
    if (!item) continue;
    item.style.display = validCategories.includes(category) ? '' : 'none';
  }

  // Highlight active nav link
  document.querySelectorAll('.mens-dropdown a, .womens-dropdown a, .kids-dropdown a')
    .forEach(function(link) {
      try {
        const url  = new URL(link.href, window.location.href);
        const lCat = url.searchParams.get('category');
        const lGen = url.searchParams.get('gender');
        link.style.fontWeight = (lCat === category && lGen === gender) ? '700' : '';
      } catch(e) {}
    });
})();


// ── 5. PRODUCT CATALOGUE ─────────────────────────────────────────────────────
//
//  Each product has these filterable fields:
//    colour   — matches the `title` attribute on colour swatches  (e.g. "Black", "Navy")
//    size     — matches size chip text                             (e.g. "M", "XL")
//    fit      — matches checkbox label text                        (e.g. "Slim Fit")
//    sleeve   — matches checkbox label text                        (e.g. "Short Sleeve")
//    material — matches checkbox label text                        (e.g. "Cotton")
//    quality  — matches checkbox label text                        (e.g. "Premium")
//    neckline — matches checkbox label text                        (e.g. "Crew Neck")
//
//  A product can have multiple values per field (array).
//  Leave a field as [] if not applicable.

const products = [

  // ── T-Shirts ──────────────────────────────────────────────────────────────
  {
    category: 'T-Shirts', name: 'Graphic Print Oversized Tee', img: './images/blurred-frame.png',
    colour: ['Black','White'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Plain Classic Fit T-Shirt', img: './images/tshirt-men.png',
    colour: ['White'], size: ['XS','S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Short Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Acid Wash Drop Shoulder Tee', img: './images/tshirt-men-1.png',
    colour: ['Taupe','Beige'],  size: ['S','M','L'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Polo Collar Cotton T-Shirt', img: './images/tshirt-men-2.png',
    colour: ['White'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Short Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['Polo'],
  },
  {
    category: 'T-Shirts', name: 'Striped Casual T-Shirt', img: './images/tshirt-men-3.png',
    colour: ['Navy','Red','White'],  size: ['XS','S','M','L','XL'],
    fit: ['Regular Fit'],            sleeve: ['Short Sleeve'],
    material: ['Cotton'],            quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Solid Crew Neck Everyday Tee', img: './images/tshirt-men-4.png',
    colour: ['Black','White','Navy','Green','Mustard','Red'], size: ['XS','S','M','L','XL','XXL','3XL'],
    fit: ['Regular Fit'],                                     sleeve: ['Short Sleeve'],
    material: ['Cotton'],                                     quality: ['Basic'],       neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Printed Streetwear Tee', img: './images/tshirt-men-5.png',
    colour: ['Black','White'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'V-Neck Essential T-Shirt', img: './images/tshirt-men-6.png',
    colour: ['White','Black','Navy'], size: ['S','M','L','XL','XXL'],
    fit: ['Slim Fit'],                sleeve: ['Short Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['V-Neck'],
  },
  {
    category: 'T-Shirts', name: 'Henley Cotton T-Shirt', img: '',
    colour: ['Taupe','Black','Navy'], size: ['S','M','L','XL'],
    fit: ['Regular Fit'],             sleeve: ['Long Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['Henley'],
  },
  {
    category: 'T-Shirts', name: 'Sleeveless Vest Tee', img: '',
    colour: ['White','Black','Navy'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Sleeveless'],
    material: ['Jersey'],             quality: ['Basic'],    neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Linen Blend T-Shirt', img: '',
    colour: ['Beige','White','Taupe'], size: ['S','M','L','XL'],
    fit: ['Regular Fit'],              sleeve: ['Short Sleeve'],
    material: ['Linen'],               quality: ['Premium'],  neckline: ['V-Neck'],
  },
  {
    category: 'T-Shirts', name: '3/4 Sleeve Casual Tee', img: '',
    colour: ['Navy','Black','Green'],  size: ['S','M','L','XL'],
    fit: ['Regular Fit'],              sleeve: ['3/4 Sleeve'],
    material: ['Cotton'],              quality: ['Basic'],    neckline: ['Crew Neck'],
  },

  // ── Casual Shirts ──────────────────────────────────────────────────────────
  {
    category: 'Casual Shirts', name: 'Classic Oxford Shirt', img: '',
    colour: ['White','Blue','Navy'],  size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Long Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Casual Shirts', name: 'Linen Casual Shirt', img: '',
    colour: ['Beige','White','Taupe'], size: ['S','M','L','XL'],
    fit: ['Loose Fit'],                sleeve: ['Short Sleeve'],
    material: ['Linen'],               quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Casual Shirts', name: 'Printed Camp Shirt', img: '',
    colour: ['Mustard','Red','Green'], size: ['S','M','L','XL'],
    fit: ['Loose Fit'],                sleeve: ['Short Sleeve'],
    material: ['Viscose'],             quality: ['Basic'],    neckline: [],
  },

  // ── Formal Shirts ──────────────────────────────────────────────────────────
  {
    category: 'Formal Shirts', name: 'White Formal Shirt', img: '',
    colour: ['White'],         size: ['S','M','L','XL','XXL'],
    fit: ['Slim Fit'],         sleeve: ['Long Sleeve'],
    material: ['Cotton'],      quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Formal Shirts', name: 'Slim Fit Formal Shirt', img: '',
    colour: ['White','Navy','Black'], size: ['S','M','L','XL'],
    fit: ['Slim Fit'],                sleeve: ['Long Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: [],
  },

  // ── Sweatshirts ────────────────────────────────────────────────────────────
  {
    category: 'Sweatshirts', name: 'Solid Crew Sweatshirt', img: './images/hoddies.jpg',
    colour: ['Black','Navy','Green','Mustard'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],                       sleeve: ['Long Sleeve'],
    material: ['Cotton'],                       quality: ['Premium'],  neckline: ['Crew Neck'],
  },
  {
    category: 'Sweatshirts', name: 'Graphic Sweatshirt', img: '',
    colour: ['Black','White'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Long Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],    neckline: ['Crew Neck'],
  },
  {
    category: 'Sweatshirts', name: 'Zip-Up Hoodie', img: '',
    colour: ['Black','Navy','Red'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],           sleeve: ['Long Sleeve'],
    material: ['Cotton'],           quality: ['Premium'],  neckline: [],
  },

  // ── Sweaters ───────────────────────────────────────────────────────────────
  {
    category: 'Sweaters', name: 'Knit Pullover Sweater', img: './images/sweaters.jpg',
    colour: ['Navy','Beige','Black'], size: ['S','M','L','XL'],
    fit: ['Regular Fit'],             sleeve: ['Long Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['Crew Neck'],
  },
  {
    category: 'Sweaters', name: 'Cable Knit Sweater', img: '',
    colour: ['Beige','White','Taupe'], size: ['S','M','L','XL'],
    fit: ['Loose Fit'],                sleeve: ['Long Sleeve'],
    material: ['Cotton'],              quality: ['Premium'],  neckline: ['Crew Neck'],
  },

  // ── Sports T-shirts ────────────────────────────────────────────────────────
  {
    category: 'Sports T-shirts', name: 'Dry Fit Sports Tee', img: '',
    colour: ['Black','Red','Navy','White'], size: ['S','M','L','XL','XXL'],
    fit: ['Slim Fit'],                      sleeve: ['Short Sleeve'],
    material: ['Polyester'],                quality: ['Basic'],    neckline: ['Crew Neck'],
  },
  {
    category: 'Sports T-shirts', name: 'Compression T-Shirt', img: '',
    colour: ['Black','Navy'],   size: ['S','M','L','XL'],
    fit: ['Slim Fit'],          sleeve: ['Short Sleeve'],
    material: ['Polyester'],    quality: ['Premium'],  neckline: ['Crew Neck'],
  },

  // ── Jackets ────────────────────────────────────────────────────────────────
  {
    category: 'Jackets', name: 'Bomber Jacket', img: './images/jackets.jpg',
    colour: ['Black','Navy','Green'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Long Sleeve'],
    material: ['Polyester'],          quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Jackets', name: 'Denim Jacket', img: '',
    colour: ['Navy','Black'],   size: ['S','M','L','XL'],
    fit: ['Regular Fit'],       sleeve: ['Long Sleeve'],
    material: ['Cotton'],       quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Jackets', name: 'Windbreaker', img: '',
    colour: ['Black','Red','Navy'], size: ['S','M','L','XL','XXL'],
    fit: ['Loose Fit'],             sleeve: ['Long Sleeve'],
    material: ['Polyester'],        quality: ['Basic'],    neckline: [],
  },

  // ── Rain Coats ─────────────────────────────────────────────────────────────
  {
    category: 'Rain Coats', name: 'Waterproof Rain Coat', img: '',
    colour: ['Black','Navy'],   size: ['S','M','L','XL'],
    fit: ['Regular Fit'],       sleeve: ['Long Sleeve'],
    material: ['Polyester'],    quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Rain Coats', name: 'Packable Rain Jacket', img: '',
    colour: ['Black','Green','Navy'], size: ['S','M','L','XL','XXL'],
    fit: ['Loose Fit'],               sleeve: ['Long Sleeve'],
    material: ['Polyester'],          quality: ['Basic'],    neckline: [],
  },

  // ── Jeans ──────────────────────────────────────────────────────────────────
  {
    category: 'Jeans', name: 'Slim Fit Dark Jeans', img: './images/jeans.png',
    colour: ['Navy','Black'],   size: ['S','M','L','XL','XXL'],
    fit: ['Slim Fit'],          sleeve: [],
    material: ['Cotton'],       quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Jeans', name: 'Relaxed Fit Jeans', img: '',
    colour: ['Navy','Taupe'],   size: ['M','L','XL','XXL','3XL'],
    fit: ['Relaxed Fit'],       sleeve: [],
    material: ['Cotton'],       quality: ['Basic'],    neckline: [],
  },
  {
    category: 'Jeans', name: 'Straight Cut Jeans', img: '',
    colour: ['Black','Navy'],   size: ['S','M','L','XL'],
    fit: ['Regular Fit'],       sleeve: [],
    material: ['Cotton'],       quality: ['Premium'],  neckline: [],
  },

  // ── Trousers ───────────────────────────────────────────────────────────────
  {
    category: 'Trousers', name: 'Formal Slim Trousers', img: '',
    colour: ['Black','Navy','Taupe'], size: ['S','M','L','XL'],
    fit: ['Slim Fit'],                sleeve: [],
    material: ['Polyester'],          quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Trousers', name: 'Chino Trousers', img: '',
    colour: ['Beige','Navy','Taupe'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: [],
    material: ['Cotton'],             quality: ['Premium'],  neckline: [],
  },

  // ── Shorts ─────────────────────────────────────────────────────────────────
  {
    category: 'Shorts', name: 'Cargo Shorts', img: '',
    colour: ['Black','Taupe','Navy'], size: ['S','M','L','XL'],
    fit: ['Regular Fit'],             sleeve: [],
    material: ['Cotton'],             quality: ['Basic'],    neckline: [],
  },
  {
    category: 'Shorts', name: 'Casual Cotton Shorts', img: '',
    colour: ['White','Navy','Black'], size: ['S','M','L','XL','XXL'],
    fit: ['Loose Fit'],               sleeve: [],
    material: ['Cotton'],             quality: ['Basic'],    neckline: [],
  },

  // ── Lowers ─────────────────────────────────────────────────────────────────
  {
    category: 'Lowers', name: 'Pyjama Lowers', img: '',
    colour: ['Navy','Black','White'], size: ['S','M','L','XL','XXL'],
    fit: ['Loose Fit'],               sleeve: [],
    material: ['Cotton'],             quality: ['Basic'],    neckline: [],
  },
  {
    category: 'Lowers', name: 'Lounge Pants', img: '',
    colour: ['Black','Grey','Navy'],  size: ['S','M','L','XL','XXL'],
    fit: ['Relaxed Fit'],             sleeve: [],
    material: ['Cotton'],             quality: ['Basic'],    neckline: [],
  },

  // ── Track pants & Joggers ──────────────────────────────────────────────────
  {
    category: 'Track pants & Joggers', name: 'Slim Fit Joggers', img: './images/blurred-frame.png',
    colour: ['Black','Navy','Green'],   size: ['S','M','L','XL','XXL'],
    fit: ['Slim Fit'],                  sleeve: [],
    material: ['Cotton'],               quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Track pants & Joggers', name: 'Track Pants', img: '',
    colour: ['Black','Navy','Red'],     size: ['M','L','XL','XXL'],
    fit: ['Regular Fit'],               sleeve: [],
    material: ['Polyester'],            quality: ['Basic'],    neckline: [],
  },
  {
    category: 'Track pants & Joggers', name: 'Terry Joggers', img: '',
    colour: ['Black','Beige'],          size: ['S','M','L','XL'],
    fit: ['Relaxed Fit'],               sleeve: [],
    material: ['Cotton'],               quality: ['Premium'],  neckline: [],
  },

  // ── Kurta-Pajama ───────────────────────────────────────────────────────────
  {
    category: 'Kurta-Pajama', name: 'Cotton Kurta Set', img: './images/kurta-pajama.png',
    colour: ['White','Beige','Navy'],  size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Kurta-Pajama', name: 'Printed Kurta Pajama', img: '',
    colour: ['Mustard','Red','Green'], size: ['S','M','L','XL'],
    fit: ['Loose Fit'],                sleeve: [],
    material: ['Cotton'],              quality: ['Basic'],    neckline: [],
  },

  // ── Dhoti ──────────────────────────────────────────────────────────────────
  {
    category: 'Dhoti', name: 'Traditional Cotton Dhoti', img: '',
    colour: ['White','Beige'],  size: ['M','L','XL'],
    fit: [],                    sleeve: [],
    material: ['Cotton'],       quality: ['Premium'],  neckline: [],
  },

  // ── Caps ───────────────────────────────────────────────────────────────────
  {
    category: 'Caps', name: 'Baseball Cap', img: '',
    colour: ['Black','Navy','Red'], size: [],
    fit: [],                        sleeve: [],
    material: ['Cotton'],           quality: ['Basic'],    neckline: [],
  },
  {
    category: 'Caps', name: 'Snapback Cap', img: '',
    colour: ['Black','White'],  size: [],
    fit: [],                    sleeve: [],
    material: ['Cotton'],       quality: ['Basic'],    neckline: [],
  },

  // ── Co-ord Sets ────────────────────────────────────────────────────────────
  {
    category: 'Co-ord Sets', name: 'Casual Co-ord Set', img: './images/co-ord_set.jpg',
    colour: ['Navy','Black'],   size: ['S','M','L','XL'],
    fit: ['Regular Fit'],       sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],    neckline: [],
  },
  {
    category: 'Co-ord Sets', name: 'Formal Co-ord Set', img: './images/co-ord_set_1.jpg',
    colour: ['Black','White'],  size: ['S','M','L','XL','XXL'],
    fit: ['Slim Fit'],          sleeve: ['Short Sleeve'],
    material: ['Polyester'],    quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Co-ord Sets', name: 'Printed Co-ord Set', img: './images/co-ord_set_2.jpg',
    colour: ['Mustard','Red'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Viscose'],      quality: ['Basic'],    neckline: [],
  },
];


// ── 6. SIDEBAR INTERACTIVE HELPERS ───────────────────────────────────────────

// Accordion open/close
function toggleFilter(id) {
  const item = document.getElementById('item-' + id);
  if (item) item.classList.toggle('open');
}

// Colour swatch toggle  →  calls applyFilters() after
function toggleSwatch(el) {
  el.classList.toggle('active');
  applyFilters();
}

// Size chip toggle  →  calls applyFilters() after
function toggleChip(el) {
  el.classList.toggle('active');
  applyFilters();
}

// Checkbox change  →  calls applyFilters() after
// (wired via event delegation below — no inline onclick needed)

// Clear all sidebar selections
function clearAll() {
  document.querySelectorAll('.filter-option input[type=checkbox]')
    .forEach(cb => { cb.checked = false; });
  document.querySelectorAll('.size-chip, .colour-swatch')
    .forEach(el => el.classList.remove('active'));
  applyFilters();
}


// ── 7. CORE FILTER ENGINE ─────────────────────────────────────────────────────
//
//  Reads every active selection from the sidebar and re-renders the grid.
//  Each active filter type is ANDed together.
//  Within one filter type, multiple selections are ORed (e.g. Black OR Navy).

function applyFilters() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  const params   = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'T-Shirts';

  // ── Collect active selections ──────────────────────────────────────────────

  // Colours: read `title` attribute of active swatches
  const activeColours = [...document.querySelectorAll('.colour-swatch.active')]
    .map(el => el.getAttribute('title'))
    .filter(Boolean);

  // Sizes: read text content of active size chips
  const activeSizes = [...document.querySelectorAll('.size-chip.active')]
    .map(el => el.textContent.trim())
    .filter(Boolean);

  // Checkboxes: group by their filter panel parent
  // panel id = "panel-fit", "panel-sleeve", etc.  →  key = "fit", "sleeve"
  const checkboxGroups = {};
  document.querySelectorAll('.filter-panel input[type=checkbox]:checked')
    .forEach(cb => {
      // Walk up to find the panel id
      const panel = cb.closest('.filter-panel');
      if (!panel) return;
      const key = panel.id.replace('panel-', '');   // e.g. "fit", "sleeve"
      const val = cb.parentElement.textContent.trim();
      if (!checkboxGroups[key]) checkboxGroups[key] = [];
      checkboxGroups[key].push(val);
    });

  // ── Filter products ────────────────────────────────────────────────────────

  const filtered = products.filter(p => {
    // Must match current page category
    if (p.category !== category) return false;

    // Colour filter  (OR within, skip if nothing selected)
    if (activeColours.length > 0) {
      const match = activeColours.some(c => p.colour.includes(c));
      if (!match) return false;
    }

    // Size filter
    if (activeSizes.length > 0) {
      const match = activeSizes.some(s => p.size.includes(s));
      if (!match) return false;
    }

    // Checkbox filters (fit, sleeve, material, quality, neckline)
    for (const [key, selected] of Object.entries(checkboxGroups)) {
      if (selected.length === 0) continue;
      const productValues = p[key] || [];
      const match = selected.some(v => productValues.includes(v));
      if (!match) return false;
    }

    return true;
  });

  // ── Update item count ──────────────────────────────────────────────────────
  const countEl = document.querySelector('.title-block .count');
  if (countEl) countEl.textContent = filtered.length + ' items';

  // ── Render ─────────────────────────────────────────────────────────────────
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        No products match the selected filters.<br>
        <button onclick="clearAll()" style="margin-top:12px;padding:8px 20px;cursor:pointer;">Clear Filters</button>
      </div>`;
  } else {
    grid.innerHTML = filtered.map(p => `
      <div class="p-card">
        <div class="p-img">
          ${p.img ? `<img src="${p.img}" alt="${p.name}">` : ''}
        </div>
        <div class="p-info">
          <p class="p-name">${p.name}</p>
        </div>
      </div>
    `).join('');
  }
}


// ── 8. WIRE CHECKBOXES + INITIAL RENDER ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  // Delegate checkbox changes to applyFilters
  document.querySelectorAll('.filter-panel input[type=checkbox]')
    .forEach(cb => cb.addEventListener('change', applyFilters));

  // Initial render (no filters active yet)
  applyFilters();
});