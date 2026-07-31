// ── 1. FEATURED CATEGORY CARDS (index.html hero section) ─────────────────────

const featuredCards = [
  { img: './images/hoddies.jpg',         alt: 'Hoodies',     title: 'Hoodies & Jackets',     desc: 'Warm, stylish & comfortable', href: 'Shop.html?gender=Men&category=Sweatshirts' },
  { img: './images/blurred-frame 1.png', alt: 'Co-ords',     title: 'Co-ord Sets',           desc: 'Perfect matching outfits',    href: 'Shop.html?gender=Men&category=Co-ord Sets' },
  { img: './images/blurred-frame.png',   alt: 'Tracksuits',  title: 'Super soft Tracksuits', desc: 'Premium Comfort & Fit',       href: 'Shop.html?gender=Men&category=Track pants & Joggers' },
  { img: './images/saree.jpeg',      alt: 'Silk Saree',  title: 'Silk Saree',            desc: 'Lavender Satin Silk Saree',   href: 'Shop.html?gender=Men&category=Sarees' },
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


// ── 5. PRODUCT CATALOGUE ─────────────────────────────────────────────────────

const products = [

  // ── T-Shirts ──────────────────────────────────────────────────────────────
  {
    category: 'T-Shirts', name: 'Graphic Print Oversized Tee', img: '',
    colour: ['Black','White'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Plain Classic Fit T-Shirt', img: './images/Tshirt-men/tshirt-men.png',
    colour: ['White'], size: ['XS','S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Short Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Acid Wash Drop Shoulder Tee', img: './images/Tshirt-men/tshirt-men-1.png',
    colour: ['Taupe','Beige'],  size: ['S','M','L'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Polo Collar Cotton T-Shirt', img: './images/Tshirt-men/tshirt-men-2.png',
    colour: ['White'], size: ['S','M','L','XL','XXL'],
    fit: ['Regular Fit'],             sleeve: ['Short Sleeve'],
    material: ['Cotton'],             quality: ['Premium'],  neckline: ['Polo'],
  },
  {
    category: 'T-Shirts', name: 'Striped Casual T-Shirt', img: './images/Tshirt-men/tshirt-men-3.png',
    colour: ['Navy','Red','White'],  size: ['XS','S','M','L','XL'],
    fit: ['Regular Fit'],            sleeve: ['Short Sleeve'],
    material: ['Cotton'],            quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Solid Crew Neck Everyday Tee', img: './images/Tshirt-men/tshirt-men-4.png',
    colour: ['Black','White','Navy','Green','Mustard','Red'], size: ['XS','S','M','L','XL','XXL','3XL'],
    fit: ['Regular Fit'],                                     sleeve: ['Short Sleeve'],
    material: ['Cotton'],                                     quality: ['Basic'],       neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'Printed Streetwear Tee', img: './images/Tshirt-ment/tshirt-men-5.png',
    colour: ['Black','White'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Cotton'],       quality: ['Basic'],      neckline: ['Crew Neck'],
  },
  {
    category: 'T-Shirts', name: 'V-Neck Essential T-Shirt', img: './images/Tshirt-ment/tshirt-men-6.png',
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
  {
    category: 'Co-ord Sets', name: 'Printed Co-ord Set', img: './images/co-ord_set_3.png',
    colour: ['White'],  size: ['S','M','L','XL'],
    fit: ['Loose Fit'],         sleeve: ['Short Sleeve'],
    material: ['Viscose'],      quality: ['Basic'],    neckline: [],
  },


  // ── Sarees ────────────────────────────────────────────────────────────
  {
    category: 'Sarees', name: 'Rangoli Partywear Saree', imgs: {'Purple':'./images/Sarees/Rangoli/rangoli-saree.png', 
      'Blue':'./images/Sarees/Rangoli/rangoli-saree-2.png','Grey': './images/Sarees/Rangoli/rangoli-saree-3.png'},
    colour: ['Purple','Blue','Grey'], size: ['-Free Size'],
    fit: ['Regular Fit'],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },

  {
    category: 'Sarees', name: 'Anvika Partywear Saree', imgs: {'Purple':'./images/Sarees/Anvika/anvika-saree.png', 
      'Light Purple':'./images/Sarees/Anvika/anvika-saree-1.png','Green': './images/Sarees/Anvika/anvika-saree-2.png',
      'Pink': './images/Sarees/Anvika/anvika-saree-3.png','Red': './images/Sarees/Anvika/anvika-saree-4.png',
      'Blue': './images/Sarees/Anvika/anvika-saree-5.png'},
    colour: ['Purple','Light Purple','Green','Pink','Red','Blue'], size: ['-Free Size'],
    fit: ['Regular Fit'],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },


  // ── Kurta Sets and Salwar Suits ────────────────────────────────────────────────────────────
  // Kala Poshak Kurta Set
  {
    category: 'Kurta Sets and Salwar Suits', name: 'Cotton Kurta Set', imgs: {'Pink':'./images/Suits/kala-poshak/Kala-poshak-suit.jpeg', 
      'Red':'./images/Suits/kala-poshak/Kala-poshak-suit1.jpeg','Green': './images/Suits/kala-poshak/Kala-poshak-suit4.jpeg',
      'Purple':'./images/Suits/kala-poshak/Kala-poshak-suit5.jpeg','Blue':'./images/Suits/kala-poshak/Kala-poshak-suit6.jpeg'},
    colour: ['Pink','Red','Green','Purple','Blue'],  size: ['L','XL','XXL','3XL'],
    fit: ['Regular Fit'],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },

  // Suryajyoti Kurta Set
  {
    category: 'Kurta Sets and Salwar Suits', name: 'Cotton Kurta Set', imgs: {'Red':'./images/Suryajyoti-suit.png', 
      'White':'./images/Suryajyoti-suit-2.png','Green': './images/Suryajyoti-suit-5.png',
      'Purple':'./images/Suryajyoti-suit-6.png','Blue':'./images/Suryajyoti-suit-7.png'},
    colour: ['Red','White','Green','Purple','Blue'],  size: ['L','XL','XXL','3XL'],
    fit: [],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },

  // Batik Queen Kurta Set
  {
    category: 'Kurta Sets and Salwar Suits', name: 'Batik Queen Vol 2 Deeptex Prints Readymade Cotton Pant', imgs: {'Purple':'./images/Suits/batik-queen/batik-suit.jpeg', 
      'Red':'./images/Suits/batik-queen/batik-suit-2.jpeg','Green': './images/Suits/batik-queen/batik-suit-5.jpeg',
      'Peach':'./images/Suits/batik-queen/batik-suit-6.jpeg'},
    colour: ['Purple','Red','Green','Peach'],  size: ['L','XL','XXL','3XL'],
    fit: [],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },
  {
    category: 'Kurta Sets and Salwar Suits', name: 'Batik Queen Vol 2 Deeptex Prints Readymade Cotton Pant', 
    imgs: {'Green':'./images/Suits/batik-queen/batik-suit-3.jpeg', 'Black':'./images/Suits/batik-queen/batik-suit-4.jpeg',
      'Blue': './images/Suits/batik-queen/batik-suit-7.jpeg','Navy':'./images/Suits/batik-queen/batik-suit-8.jpeg'},
    colour: ['Green','Black','Blue','Navy'],  size: ['L','XL','XXL','3XL'],
    fit: [],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },



 // ── Kids Collection ────────────────────────────────────────────────────────────
  {
    category: 'Kids T-Shirts', name: 'Printed Cotton Casual tshirts with Denim Cargo shorts', 
    imgs: {'Peach and Light Blue':'./images/gokidz-tshirt.jpeg', 'Red and Brown':'./images/gokidz-tshirt-2.jpeg',
      'Blue': './images/gokidz-tshirt-3.jpeg', 'Navy':'./images/gokidz-tshirt-4.jpeg',
      'Navy':'./images/gokidz-tshirt-5.jpeg','Navy':'./images/gokidz-tshirt-6.jpeg'},
    colour: ['Peach and Light Blue','Red and Brown','Blue','Navy'],  size: ['S','M','L','XL'],
    fit: [],              sleeve: [],
    material: ['Cotton'],              quality: ['Premium'],  neckline: [],
  },
];
