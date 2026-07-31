// ─────────────────────────────────────────────────────────────────────────────
//  app.js  —  Gopi Collections
//  Handles: nav links, breadcrumb/title, product catalogue, sidebar filtering
// ─────────────────────────────────────────────────────────────────────────────

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
  ).forEach(function (link) {
    const text = link.textContent.trim();
    if (!text) return;

    const parent = link.closest(
      '.mens-dropdown, .womens-dropdown, .kids-dropdown'
    );
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


/* 2. Read URL params and update Shop page */
(function updateShopPage() {

  const params   = new URLSearchParams(window.location.search);
  const gender   = params.get('gender')   || 'Men';
  const category = params.get('category') || 'T-Shirts';

  /*  Breadcrumb  */
  // <a href="…">Home</a> • <span class="current">Men</span>
  const breadcrumbCurrent = document.querySelector('.breadcrumb .current');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = gender;
  }

  // Add a second breadcrumb segment for the category if not already there
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    // Remove any existing category segment we added before
    const existing = breadcrumb.querySelector('.current-category');
    if (existing) existing.remove();
    const existingArrow = breadcrumb.querySelector('.arrow-cat');
    if (existingArrow) existingArrow.remove();

    const arrow = document.createElement('span');
    arrow.className = 'arrow arrow-cat';
    arrow.textContent = '•';

    const cat = document.createElement('span');
    cat.className = 'current current-category';
    cat.textContent = category;

    breadcrumb.appendChild(arrow);
    breadcrumb.appendChild(cat);
  }

  /*  Page title (h1)  */
  const h1 = document.querySelector('.title-block h1');
  if (h1) h1.textContent = category;

  /*  Document <title>  */
  document.title = category + ' — Gopi Collections';

  /*  Show / hide sidebar filter sections  */
  // Filters that are only relevant for certain categories
  const filterVisibility = {
    // key = filter panel id suffix,  value = array of categories that show it
    'sleeve':   ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sports T-shirts',
                 'Sweatshirts', 'Sweaters', 'Jackets', 'Rain Coats'],
    'neckline': ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sports T-shirts',
                 'Sweatshirts', 'Sweaters'],
    'fit':      ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sports T-shirts',
                 'Jeans', 'Trousers', 'Lowers', 'Track pants & Joggers'],
    'material': ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts',
                 'Sweaters', 'Jackets', 'Rain Coats', 'Jeans', 'Trousers',
                 'Shorts', 'Lowers', 'Track pants & Joggers'],
  };

  for (const [suffix, validCategories] of Object.entries(filterVisibility)) {
    const item = document.getElementById('item-' + suffix);
    if (!item) continue;
    item.style.display = validCategories.includes(category) ? '' : 'none';
  }

  /*  Highlight active nav link  */
  document.querySelectorAll(
    '.mens-dropdown a, .womens-dropdown a, .kids-dropdown a'
  ).forEach(function (link) {
    const url = new URL(link.href, window.location.href);
    const lCat = url.searchParams.get('category');
    const lGen = url.searchParams.get('gender');
    if (lCat === category && lGen === gender) {
      link.style.fontWeight = '700';
      //  link.style.color = '#e63946';  matches your pink/red brand colour
    }
  });

})();


/* 3. Existing sidebar toggle helpers (keep these) */
function toggleFilter(name) {
  const panel = document.getElementById('panel-' + name);
  const arrow = document.querySelector('#item-' + name + ' .arrow');
  if (!panel) return;
  const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';
  panel.style.maxHeight  = isOpen ? '0px'   : panel.scrollHeight + 'px';
  panel.style.overflow   = 'hidden';
  if (arrow) arrow.textContent = isOpen ? '→' : '↓';
}

function toggleSwatch(el) {
  el.classList.toggle('active');
}

function toggleChip(el) {
  el.classList.toggle('active');
}

function clearAll() {
  document.querySelectorAll('.filter-option input[type=checkbox]')
    .forEach(cb => cb.checked = false);
  document.querySelectorAll('.size-chip, .colour-swatch')
    .forEach(el => el.classList.remove('active'));
}

// Card section in Shop page (static for now, will make dynamic later)

const products = [
  { name: "Graphic Print Oversized Tee" ,img: './images/blurred-frame.png'},
  { name: "Plain Classic Fit T-Shirt"},
  { name: "Plain Classic Fit T-Shirt"},
  { name: "Acid Wash Drop Shoulder Tee"},
  { name: "Polo Collar Cotton T-Shirt"},
  { name: "Striped Casual T-Shirt"},
  { name: "Solid Crew Neck Everyday Tee"},
  { name: "Printed Streetwear Tee"},
  { name: "V-Neck Essential T-Shirt"},
];

const grid = document.getElementById('shopGrid');
if (grid) {
  grid.innerHTML = products.map(p => `
      <div class="p-card">
        <div class="p-img">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="p-info">
          <p class="p-name">${p.name}</p>
        </div>
      </div>
  `).join('');
}