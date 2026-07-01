// ─────────────────────────────────────────────────────────────────────────────
//  search.js  —  Gopi Collections
//  Builds a searchable index from `products` (nav-category.js), wires up the
//  navbar search bar with live autocomplete suggestions, and navigates to
//  Shop.html with the right gender/category/search params.
//  Must be loaded AFTER nav-category.js (needs the `products` array).
// ─────────────────────────────────────────────────────────────────────────────

(function () {

  if (typeof products === 'undefined') return; // safety: nav-category.js must load first

  // ── 1. CATEGORY → GENDER(S) MAP ──────────────────────────────────────────
  // Mirrors the navbar dropdown structure (Men / Women / Kids ▾). A category
  // can belong to more than one gender (e.g. "T-Shirts" → Men & Women,
  // "Casual Shirts" → Men, Women & Kids).

  const CATEGORY_GENDERS = {
    'T-Shirts':                    ['Men', 'Women'],
    'Casual Shirts':                ['Men', 'Women', 'Kids'],
    'Formal Shirts':                ['Men', 'Women', 'Kids'],
    'Sweatshirts':                   ['Men'],
    'Sweaters':                      ['Men'],
    'Sports T-shirts':               ['Men'],
    'Jackets':                       ['Men'],
    'Rain Coats':                    ['Men'],
    'Jeans':                         ['Men', 'Women', 'Kids'],
    'Trousers':                      ['Men', 'Women', 'Kids'],
    'Shorts':                        ['Men', 'Women', 'Kids'],
    'Lowers':                        ['Men'],
    'Track pants & Joggers':         ['Men'],
    'Kurta-Pajama':                  ['Men'],
    'Dhoti':                         ['Men'],
    'Caps':                          ['Men', 'Women', 'Kids'],
    'Sarees':                        ['Women'],
    'Kurtis and Tops':               ['Women'],
    'Kurta Sets and Salwar Suits':   ['Women'],
    'Co-ord Sets':                   ['Women'],
    'Kids T-Shirts':                 ['Kids'],
  };

  // ── 2. BUILD SEARCH INDEX ────────────────────────────────────────────────
  // One entry per (category, gender) pair that actually has products, plus
  // one entry per individual product name (deduplicated).

  function buildIndex() {
    const categoriesPresent = new Set(products.map(p => p.category));
    const index = [];
    const seenCategoryGender = new Set();

    categoriesPresent.forEach(cat => {
      const genders = CATEGORY_GENDERS[cat] || [];
      genders.forEach(gender => {
        const key = cat + '|' + gender;
        if (seenCategoryGender.has(key)) return;
        seenCategoryGender.add(key);
        index.push({
          type: 'category',
          label: cat + (genders.length > 1 ? ' for ' + gender : ''),
          category: cat,
          gender: gender,
          searchText: (cat + ' ' + gender + ' for ' + gender).toLowerCase(),
        });
      });
      // Fallback: category with no mapped gender still gets one generic entry
      if (genders.length === 0) {
        index.push({
          type: 'category',
          label: cat,
          category: cat,
          gender: 'Men',
          searchText: cat.toLowerCase(),
        });
      }
    });

    // Individual product names (deduplicated by name+category)
    const seenProducts = new Set();
    products.forEach(p => {
      const key = p.name + '|' + p.category;
      if (seenProducts.has(key)) return;
      seenProducts.add(key);
      const genders = CATEGORY_GENDERS[p.category] || ['Men'];
      index.push({
        type: 'product',
        label: p.name,
        category: p.category,
        gender: genders[0],
        searchText: (p.name + ' ' + p.category).toLowerCase(),
      });
    });

    return index;
  }

  const SEARCH_INDEX = buildIndex();

  // ── 3. COMMON-TERM GROUPING ──────────────────────────────────────────────
  // When the query closely matches a category name shared by multiple
  // genders (e.g. "tshirt" → T-Shirts in Men + Women), show one suggestion
  // per gender ("T-Shirts for Men", "T-Shirts for Women") instead of every
  // individual product. This mirrors the reference screenshot's behaviour.

  function normalise(str) {
    return str.toLowerCase().replace(/[\s\-]/g, '');
  }

  // Tokenised match: true if `query` matches the start of the category name,
  // OR matches the start of any individual word within it. This avoids false
  // positives like "tshirt" incorrectly matching inside "Sweatshirts".
  function tokenMatch(categoryName, query) {
    const qNorm = normalise(query);
    if (normalise(categoryName).startsWith(qNorm)) return true;
    const words = categoryName.split(/[\s\-]+/);
    return words.some(w => normalise(w).startsWith(qNorm));
  }

  function getSuggestions(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Categories whose name matches the query (word-start match, normalised)
    const categoryMatches = SEARCH_INDEX.filter(item =>
      item.type === 'category' && tokenMatch(item.category, q)
    );

    if (categoryMatches.length > 0) {
      // De-dupe by label, cap at 8
      const seen = new Set();
      const out = [];
      categoryMatches.forEach(item => {
        if (seen.has(item.label)) return;
        seen.add(item.label);
        out.push(item);
      });
      return out.slice(0, 8);
    }

    // Fall back to individual product name matches
    const productMatches = SEARCH_INDEX.filter(item =>
      item.type === 'product' && item.searchText.includes(q)
    );
    const seen = new Set();
    const out = [];
    productMatches.forEach(item => {
      if (seen.has(item.label)) return;
      seen.add(item.label);
      out.push(item);
    });
    return out.slice(0, 8);
  }

  // ── 4. NAVIGATION ─────────────────────────────────────────────────────────

  function goToSuggestion(item) {
    const url = 'Shop.html?gender=' + encodeURIComponent(item.gender) +
                '&category=' + encodeURIComponent(item.category);
    window.location.href = url;
  }

  function goToFreeTextSearch(query) {
    const q = query.trim();
    if (!q) return;
    window.location.href = 'Shop.html?search=' + encodeURIComponent(q);
  }

  // ── 5. UI WIRING ──────────────────────────────────────────────────────────
  // Wires up every `.nav-search` instance on the page (there's one per page,
  // identical markup, so this works across Index/Shop/Contact).

  function initSearchBar(navSearchEl) {
    const input = navSearchEl.querySelector('.search-input');
    const icon  = navSearchEl.querySelector('.search-icon');
    if (!input) return;

    // Build dropdown container. Appended to <body> (not inside .nav-search)
    // because .nav-search has overflow:hidden (for its rounded corners),
    // which would clip an absolutely-positioned child. Position is synced
    // to the search bar's on-screen location instead.
    const dropdown = document.createElement('div');
    dropdown.className = 'search-suggestions';
    document.body.appendChild(dropdown);

    function positionDropdown() {
      const rect = navSearchEl.getBoundingClientRect();
      dropdown.style.position = 'fixed';
      dropdown.style.top   = rect.bottom + 6 + 'px';
      dropdown.style.left  = rect.left + 'px';
      dropdown.style.width = rect.width + 'px';
    }

    let activeIndex = -1;
    let currentItems = [];

    function render(items) {
      currentItems = items;
      activeIndex = -1;
      if (items.length === 0) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('open');
        return;
      }
      positionDropdown();
      dropdown.innerHTML =
        '<div class="search-suggestions-label">All Others</div>' +
        items.map((item, i) =>
          `<div class="search-suggestion-item" data-idx="${i}">${item.label}</div>`
        ).join('');
      dropdown.classList.add('open');
    }

    function highlight(idx) {
      const els = dropdown.querySelectorAll('.search-suggestion-item');
      els.forEach(el => el.classList.remove('active'));
      if (idx >= 0 && els[idx]) {
        els[idx].classList.add('active');
        els[idx].scrollIntoView({ block: 'nearest' });
      }
    }

    input.addEventListener('input', () => {
      const items = getSuggestions(input.value);
      render(items);
    });

    input.addEventListener('focus', () => {
      if (input.value.trim()) render(getSuggestions(input.value));
    });

    input.addEventListener('keydown', (e) => {
      if (!dropdown.classList.contains('open')) {
        if (e.key === 'Enter') goToFreeTextSearch(input.value);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, currentItems.length - 1);
        highlight(activeIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, -1);
        highlight(activeIndex);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && currentItems[activeIndex]) {
          goToSuggestion(currentItems[activeIndex]);
        } else {
          goToFreeTextSearch(input.value);
        }
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('open');
      }
    });

    dropdown.addEventListener('mousedown', (e) => {
      // mousedown (not click) fires before input blur closes the dropdown
      const itemEl = e.target.closest('.search-suggestion-item');
      if (!itemEl) return;
      e.preventDefault();
      const idx = parseInt(itemEl.getAttribute('data-idx'), 10);
      if (currentItems[idx]) goToSuggestion(currentItems[idx]);
    });

    window.addEventListener('resize', () => {
      if (dropdown.classList.contains('open')) positionDropdown();
    });
    window.addEventListener('scroll', () => {
      if (dropdown.classList.contains('open')) positionDropdown();
    }, true);

    icon?.addEventListener('click', () => goToFreeTextSearch(input.value));

    document.addEventListener('click', (e) => {
      if (!navSearchEl.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-search').forEach(initSearchBar);
  });

  // Expose for Shop.html to read ?search= param against the index
  window.GopiSearch = { SEARCH_INDEX, getSuggestions };

})();