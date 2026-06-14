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
    grid.innerHTML = filtered.map(p => {
      const idx = products.indexOf(p);
      // p.imgs is a colour→path object; p.img is a single path. Support both.
      const thumbnail = p.imgs ? Object.values(p.imgs)[0] : (p.img || '');
      return `
        <div class="p-card" role="button" tabindex="0"
             aria-label="View details for ${p.name}"
             onclick="openModal(${idx})"
             onkeydown="if(event.key==='Enter'||event.key===' ')openModal(${idx})">
          <div class="p-img">
            ${thumbnail
              ? `<img src="${thumbnail}" alt="${p.name}"
                      onerror="this.closest('.p-img').style.background='#e8ddd8';this.remove()">`
              : ''}
          </div>
          <div class="p-info">
            <p class="p-name">${p.name}</p>
          </div>
        </div>`;
    }).join('');
  }
}


// ── 8. MODAL ──────────────────────────────────────────────────────────────────

const COLOUR_HEX = {
  'White':  '#ffffff', 'Black': '#222222', 'Navy':    '#5a6e8c',
  'Red':    '#a52a1c', 'Green': '#4a7c59', 'Mustard': '#b8860b',
  'Taupe':  '#7a6e65', 'Beige': '#c0b8b0', 'Blue':    '#4a6fa5',
  'Purple': '#880b5f', 'Grey':  '#9a9a9a', 'Pink':    '#db546b'
};

function openModal(productIndex) {
  const p     = products[productIndex];
  const modal = document.getElementById('productModal');
  if (!p || !modal) return;

  // ── Image ──
  // For multi-colour products (p.imgs), show the first colour's image by default.
  // Clicking a swatch will swap it via swapModalImage().
  const imgEl   = document.getElementById('modalImg');
  const imgWrap = document.getElementById('modalImgWrap');
  const firstImg = p.imgs ? Object.values(p.imgs)[0] : (p.img || '');

  if (firstImg) {
    imgEl.src                = firstImg;
    imgEl.alt                = p.name;
    imgEl.style.display      = '';
    imgWrap.style.background = '';
    imgEl.onerror = () => {
      imgEl.style.display      = 'none';
      imgWrap.style.background = '#e8ddd8';
    };
  } else {
    imgEl.style.display      = 'none';
    imgWrap.style.background = '#e8ddd8';
  }

  // ── Text fields ──
  document.getElementById('modal-title').textContent   = p.name;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalMaterial').textContent = (p.material || []).join(', ') || '—';
  document.getElementById('modalFit').textContent      = (p.fit      || []).join(', ') || '—';
  document.getElementById('modalSleeve').textContent   = (p.sleeve   || []).join(', ') || '—';
  document.getElementById('modalNeckline').textContent = (p.neckline || []).join(', ') || '—';
  document.getElementById('modalQuality').textContent  = (p.quality  || []).join(', ') || '—';

  // ── Sizes ──
  const sizesEl = document.getElementById('modalSizes');
  sizesEl.innerHTML = (p.size || []).length
    ? p.size.map(s =>
        `<button class="modal-size-chip" onclick="toggleModalSize(this)"
                 aria-pressed="false">${s}</button>`
      ).join('')
    : '<span style="font-size:13px;color:var(--text-muted)">One size</span>';

  // ── Colour swatches ──
  // For products with p.imgs, clicking a swatch also swaps the modal image.
  const coloursEl = document.getElementById('modalColours');
  coloursEl.innerHTML = (p.colour || []).map((c, i) => {
    const hex      = COLOUR_HEX[c] || '#ccc';
    const border   = c === 'White' ? 'border:1.5px solid #ccc;' : '';
    // If this product has per-colour images, wire up image swap on click
    const swapCall = p.imgs && p.imgs[c]
      ? `swapModalImage('${p.imgs[c]}');`
      : '';
    const activeClass = i === 0 ? ' active' : '';  // first colour active by default
    return `<span class="modal-swatch${activeClass}"
                 style="background:${hex};${border}"
                 title="${c}" aria-label="${c}"
                 onclick="toggleModalSwatch(this);${swapCall}"></span>`;
  }).join('');

  modal.showModal();
  document.body.style.overflow = 'hidden';
}

// Swap the large modal image when a colour swatch is clicked
function swapModalImage(src) {
  const imgEl   = document.getElementById('modalImg');
  const imgWrap = document.getElementById('modalImgWrap');
  imgEl.style.opacity = '0';
  setTimeout(() => {
    imgEl.src           = src;
    imgEl.style.display = '';
    imgEl.style.opacity = '1';
    imgEl.onerror = () => {
      imgEl.style.display      = 'none';
      imgWrap.style.background = '#e8ddd8';
    };
  }, 150);
}

function closeModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.close();
  document.body.style.overflow = '';
}

function toggleModalSize(el) {
  el.closest('#modalSizes').querySelectorAll('.modal-size-chip').forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
}

function toggleModalSwatch(el) {
  el.closest('#modalColours').querySelectorAll('.modal-swatch')
    .forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}


// ── 9. INIT ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {

  document.querySelectorAll('.filter-panel input[type=checkbox]')
    .forEach(cb => cb.addEventListener('change', applyFilters));

  applyFilters();

  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const modal = document.getElementById('productModal');
  if (modal) {
    modal.addEventListener('click', e => {
      const rect = modal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top  || e.clientY > rect.bottom) closeModal();
    });
    modal.addEventListener('close', () => { document.body.style.overflow = ''; });
  }

  // Smooth image swap transition
  const modalImg = document.getElementById('modalImg');
  if (modalImg) modalImg.style.transition = 'opacity 0.15s ease';
});