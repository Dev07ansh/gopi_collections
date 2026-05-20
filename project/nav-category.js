/**
 * nav-category.js
 * Add this script to index.html (and Shop.html) just before </body>
 * It rewrites every dropdown link so clicking a category opens
 * Shop.html with ?gender=Men&category=T-Shirts in the URL.
 */

(function () {

  // Map each dropdown column to a gender label
  const genderMap = {
    'mens-dropdown':  'Men',
    'womens-dropdown':'Women',
    'kids-dropdown':  'Kids',
  };

  // Find every link inside a dropdown column
  document.querySelectorAll(
    '.mens-dropdown a, .womens-dropdown a, .kids-dropdown a'
  ).forEach(function (link) {

    // Skip section-header anchors (they have no text worth navigating to)
    const text = link.textContent.trim();
    if (!text) return;

    // Determine gender from the parent column class
    const parent = link.closest(
      '.mens-dropdown, .womens-dropdown, .kids-dropdown'
    );
    if (!parent) return;

    let gender = 'Men'; // fallback
    for (const [cls, label] of Object.entries(genderMap)) {
      if (parent.classList.contains(cls)) {
        gender = label;
        break;
      }
    }

    // Rewrite href
    link.href =
      'Shop.html?gender=' +
      encodeURIComponent(gender) +
      '&category=' +
      encodeURIComponent(text);
  });

})();
