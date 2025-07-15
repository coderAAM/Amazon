// Sample product data
const products = [
     {
          id: 1,
          title: 'Wireless Headphones',
          price: 1999,
          image: 'https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_UL320_.jpg',
          category: 'electronics'
     },
     {
          id: 2,
          title: 'Men\'s T-Shirt',
          price: 499,
          image: 'https://m.media-amazon.com/images/I/61wn2jfhBkL._AC_SY355_.jpg',
          category: 'fashion'
     },
     {
          id: 3,
          title: 'Cooking Book',
          price: 299,
          image: 'https://m.media-amazon.com/images/I/81eB+7+CkUL._AC_UL320_.jpg',
          category: 'books'
     },
     {
          id: 4,
          title: 'Home Decor Lamp',
          price: 899,
          image: 'https://m.media-amazon.com/images/I/61Qe0euJJZL._AC_UL320_.jpg',
          category: 'home'
     },
     {
          id: 5,
          title: 'Toy Car',
          price: 349,
          image: 'https://m.media-amazon.com/images/I/71Q0Qb8pQML._AC_UL320_.jpg',
          category: 'toys'
     },
     {
          id: 6,
          title: 'Bluetooth Speaker',
          price: 1299,
          image: 'https://m.media-amazon.com/images/I/71z3kpMAYsL._AC_UL320_.jpg',
          category: 'electronics'
     },
     {
          id: 7,
          title: 'Women\'s Handbag',
          price: 1599,
          image: 'https://m.media-amazon.com/images/I/81fPKd-2AYL._AC_UL320_.jpg',
          category: 'fashion'
     },
     {
          id: 8,
          title: 'Children\'s Story Book',
          price: 199,
          image: 'https://m.media-amazon.com/images/I/81WcnNQ-TBL._AC_UL320_.jpg',
          category: 'books'
     },
     {
          id: 9,
          title: 'Wall Clock',
          price: 599,
          image: 'https://m.media-amazon.com/images/I/61ZbR8b93kL._AC_UL320_.jpg',
          category: 'home'
     },
     {
          id: 10,
          title: 'Building Blocks',
          price: 499,
          image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UL320_.jpg',
          category: 'toys'
     }
];

let cart = [];

// --- Mobile Hamburger Menu ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.querySelector('.sidebar');
if (hamburgerBtn && sidebar) {
     hamburgerBtn.addEventListener('click', () => {
          sidebar.classList.toggle('open');
     });
}

// --- Light/Dark Mode Toggle ---
const themeToggle = document.getElementById('themeToggle');
function setTheme(dark) {
     document.body.classList.toggle('dark', dark);
     themeToggle.textContent = dark ? '☀️' : '🌙';
     localStorage.setItem('theme', dark ? 'dark' : 'light');
}
themeToggle.addEventListener('click', () => {
     setTheme(!document.body.classList.contains('dark'));
});
setTheme(localStorage.getItem('theme') === 'dark');

// --- Cart Modal ---
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
cartBtn.addEventListener('click', () => {
     renderCartModal();
     cartModal.style.display = 'flex';
});
closeCartModal.addEventListener('click', () => {
     cartModal.style.display = 'none';
});
cartModal.addEventListener('click', e => {
     if (e.target === cartModal) cartModal.style.display = 'none';
});

function renderCartModal() {
     const cartItemsDiv = document.getElementById('cartItems');
     if (cart.length === 0) {
          cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
          return;
     }
     cartItemsDiv.innerHTML = '';
     cart.forEach((id, idx) => {
          const product = products.find(p => p.id === id.productId);
          const div = document.createElement('div');
          div.className = 'cart-item';
          div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="cart-item-title">${product.title} <span style="font-size:12px;">(${id.size || 'Default'})</span></div>
      <button class="cart-item-remove" data-idx="${idx}">Cancel</button>
      <button class="cart-item-view" data-idx="${idx}">View</button>
    `;
          div.querySelector('.cart-item-remove').addEventListener('click', () => {
               cart.splice(idx, 1);
               updateCartCount();
               renderCartModal();
          });
          div.querySelector('.cart-item-view').addEventListener('click', () => {
               cartModal.style.display = 'none';
               showProductModal(product, id.size);
          });
          cartItemsDiv.appendChild(div);
     });
}

// --- Product Details Modal ---
const productModal = document.getElementById('productModal');
const productModalContent = document.getElementById('productModalContent');
productModal.addEventListener('click', e => {
     if (e.target === productModal) productModal.style.display = 'none';
});

function showProductModal(product, selectedSize) {
     const images = [product.image,
          'https://m.media-amazon.com/images/I/61Qe0euJJZL._AC_UL320_.jpg',
          'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UL320_.jpg'];
     const sizes = ['S', 'M', 'L', 'XL'];
     let currentImg = 0;
     let currentSize = selectedSize || sizes[0];
     let modalHtml = `
    <button class="modal-close" id="closeProductModal">&times;</button>
    <div class="product-modal-content">
      <div class="product-modal-images">
        <img src="${images[0]}" class="product-modal-mainimg" id="mainProductImg">
        <div class="product-modal-thumbs">
          ${images.map((img, i) => `<img src="${img}" class="product-modal-thumb${i === 0 ? ' selected' : ''}" data-idx="${i}">`).join('')}
        </div>
      </div>
      <div class="product-modal-title">${product.title}</div>
      <div class="product-modal-price">₹${product.price}</div>
      <div class="product-modal-desc">Short description of the product goes here. Lorem ipsum dolor sit amet.</div>
      <div class="product-modal-delivery">Delivery: 2-4 days</div>
      <div class="product-modal-sizes">
        <label>Size:</label>
        ${sizes.map(size => `<label><input type="radio" name="size" value="${size}"${size === currentSize ? ' checked' : ''}> ${size}</label>`).join('')}
      </div>
      <button class="product-modal-orderbtn" id="orderBtn">Order</button>
    </div>
  `;
     productModalContent.innerHTML = modalHtml;
     productModal.style.display = 'flex';
     document.getElementById('closeProductModal').onclick = () => productModal.style.display = 'none';
     productModalContent.querySelectorAll('.product-modal-thumb').forEach(thumb => {
          thumb.onclick = function () {
               currentImg = +this.dataset.idx;
               productModalContent.querySelector('#mainProductImg').src = images[currentImg];
               productModalContent.querySelectorAll('.product-modal-thumb').forEach(t => t.classList.remove('selected'));
               this.classList.add('selected');
          };
     });
     productModalContent.querySelectorAll('input[name="size"]').forEach(radio => {
          radio.onchange = function () { currentSize = this.value; };
     });
     document.getElementById('orderBtn').onclick = function () {
          productModal.style.display = 'none';
          showOrderModal(product, currentSize);
     };
}

// --- Order Form Modal ---
const orderModal = document.getElementById('orderModal');
const orderModalContent = document.getElementById('orderModalContent');
orderModal.addEventListener('click', e => {
     if (e.target === orderModal) orderModal.style.display = 'none';
});
function showOrderModal(product, size) {
     orderModalContent.innerHTML = `
    <button class="modal-close" id="closeOrderModal">&times;</button>
    <form class="order-form" action="https://formspree.io/f/xdkdokbo" method="POST" target="_blank">
      <h2>Order Product</h2>
      <label>Product</label>
      <input type="text" name="product" value="${product.title}" readonly>
      <label>Size</label>
      <input type="text" name="size" value="${size}" readonly>
      <label>Price</label>
      <input type="text" name="price" value="₹${product.price}" readonly>
      <label>Your Name</label>
      <input type="text" name="name" required>
      <label>Location</label>
      <input type="text" name="location" required>
      <label>Country</label>
      <select name="country" required>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Place Order</button>
    </form>
  `;
     orderModal.style.display = 'flex';
     document.getElementById('closeOrderModal').onclick = () => orderModal.style.display = 'none';
     orderModalContent.querySelector('form').onsubmit = function (e) {
          setTimeout(() => {
               alert('Order placed!');
               orderModal.style.display = 'none';
          }, 500);
     };
}

function setupCategoryFilter() {
     const list = document.getElementById('categoryList');
     list.addEventListener('click', e => {
          if (e.target.tagName === 'LI') {
               document.querySelectorAll('#categoryList li').forEach(li => li.classList.remove('active'));
               e.target.classList.add('active');
               renderProducts(e.target.dataset.category, document.getElementById('searchInput').value);
          }
     });
}

// --- Autocomplete Search Bar ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
let searchDropdown;

function createSearchDropdown() {
     if (!searchDropdown) {
          searchDropdown = document.createElement('div');
          searchDropdown.className = 'search-dropdown';
          searchInput.parentNode.appendChild(searchDropdown);
     }
}

searchInput.addEventListener('input', function () {
     createSearchDropdown();
     const val = this.value.trim().toLowerCase();
     if (!val) {
          searchDropdown.style.display = 'none';
          return;
     }
     const matches = products.filter(p => p.title.toLowerCase().startsWith(val));
     if (matches.length === 0) {
          searchDropdown.style.display = 'none';
          return;
     }
     searchDropdown.innerHTML = matches.map(p => `<div class="search-suggestion" data-id="${p.id}">${p.title}</div>`).join('');
     searchDropdown.style.display = 'block';
     searchDropdown.querySelectorAll('.search-suggestion').forEach(item => {
          item.onclick = function () {
               searchInput.value = this.textContent;
               searchDropdown.style.display = 'none';
               renderProducts('all', this.textContent);
          };
     });
});

searchInput.addEventListener('blur', function () {
     setTimeout(() => { if (searchDropdown) searchDropdown.style.display = 'none'; }, 200);
});

searchBtn.addEventListener('click', function () {
     renderProducts('all', searchInput.value);
});

searchInput.addEventListener('keyup', function (e) {
     if (e.key === 'Enter') {
          renderProducts('all', searchInput.value);
          if (searchDropdown) searchDropdown.style.display = 'none';
     }
});

// --- Render products by category ---
function renderProducts(filterCategory = 'all', searchTerm = '') {
     const grid = document.getElementById('productGrid');
     grid.innerHTML = '';
     let filtered = products.filter(p =>
          (filterCategory === 'all' || p.category === filterCategory) &&
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
     );
     if (filtered.length === 0) {
          grid.innerHTML = '<p>No products found.</p>';
          return;
     }
     filtered.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">₹${product.price}</div>
      <button data-id="${product.id}">Add to Cart</button>
    `;
          card.querySelector('button').addEventListener('click', e => {
               e.stopPropagation();
               addToCart(product.id);
          });
          card.addEventListener('click', e => {
               if (e.target.tagName !== 'BUTTON') showProductModal(product);
          });
          grid.appendChild(card);
     });
}

function addToCart(productId, size) {
     let product = products.find(p => p.id === productId);
     let sizes = ['S', 'M', 'L', 'XL'];
     let selectedSize = size || sizes[0];
     if (productModal.style.display === 'flex') {
          let radio = productModalContent.querySelector('input[name="size"]:checked');
          if (radio) selectedSize = radio.value;
     }
     cart.push({ productId, size: selectedSize });
     updateCartCount();
}

function updateCartCount() {
     document.getElementById('cartCount').textContent = cart.length;
}

// --- Banner Carousel ---
const bannerSlides = document.querySelectorAll('.banner-slide');
const bannerDotsContainer = document.getElementById('bannerDots');
let bannerIndex = 0;

function showBanner(idx) {
     bannerSlides.forEach((slide, i) => {
          slide.classList.toggle('active', i === idx);
     });
     if (bannerDotsContainer) {
          bannerDotsContainer.innerHTML = '';
          for (let i = 0; i < bannerSlides.length; i++) {
               const dot = document.createElement('span');
               dot.className = 'banner-dot' + (i === idx ? ' active' : '');
               dot.onclick = () => {
                    bannerIndex = i;
                    showBanner(bannerIndex);
               };
               bannerDotsContainer.appendChild(dot);
          }
     }
}
function nextBanner() {
     bannerIndex = (bannerIndex + 1) % bannerSlides.length;
     showBanner(bannerIndex);
}
showBanner(bannerIndex);
setInterval(nextBanner, 3000);

// --- Scroll To Top Button ---
const scrollTopBtn = document.getElementById('scrollTopBtn');
function checkScrollBtn() {
     if (window.innerWidth <= 600 && window.scrollY > 100) {
          scrollTopBtn.style.display = 'flex';
     } else {
          scrollTopBtn.style.display = 'none';
     }
}
window.addEventListener('scroll', checkScrollBtn);
window.addEventListener('resize', checkScrollBtn);
if (scrollTopBtn) {
     scrollTopBtn.onclick = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
     };
}

document.addEventListener('DOMContentLoaded', () => {
     renderProducts();
     setupCategoryFilter();
});
