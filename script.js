document.addEventListener('DOMContentLoaded', function() {
  // --- DOM ELEMENTS ---
  const menuOpenBtn = document.querySelector('.header__menu-btn');
  const menuCloseBtn = document.querySelector('.header__menu-close-btn');
  const navMenu = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const cartBtn = document.querySelector('.header__cart-btn');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartContent = document.querySelector('.cart-dropdown__content');
  const cartItemsContainer = document.querySelector('.cart-dropdown__items');
  const cartEmptyMsg = document.querySelector('.cart-dropdown__empty-msg');
  const cartCount = document.querySelector('.header__cart-count');

  const galleryThumbnails = document.querySelectorAll('.product__thumbnail-btn');
  const mainProductImage = document.getElementById('main-product-image');
  const quantityValue = document.querySelector('.product__quantity-value');
  const quantityIncreaseBtn = document.querySelector('.product__quantity-btn[aria-label="Increase quantity"]');
  const quantityDecreaseBtn = document.querySelector('.product__quantity-btn[aria-label="Decrease quantity"]');
  const addToCartBtn = document.querySelector('.product__add-to-cart-btn');

  const lightbox = document.querySelector('.lightbox');
  const lightboxOpenBtn = document.querySelector('.product__image-large-btn');
  const lightboxCloseBtn = document.querySelector('.lightbox__close-btn');
  const lightboxMainImage = document.getElementById('lightbox-main-image');
  const lightboxThumbnails = document.querySelectorAll('.lightbox .product__thumbnail-btn');
  const galleryNavPrev = document.querySelectorAll('.gallery-nav--prev');
  const galleryNavNext = document.querySelectorAll('.gallery-nav--next');

  // --- STATE ---
  let quantity = 1;
  let cart = [];
  let currentImageIndex = 0;
  const productImages = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg',
  ];

  // --- MOBILE NAVIGATION ---
  menuOpenBtn.addEventListener('click', function() {
    navMenu.setAttribute('aria-hidden', 'false');
    navMenu.classList.add('open');
    document.body.classList.add('nav-open');
    menuCloseBtn.focus();
  });

  const closeNavMenu = function() {
    navMenu.setAttribute('aria-hidden', 'true');
    navMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
    menuOpenBtn.focus();
  }

  menuCloseBtn.addEventListener('click', closeNavMenu);

  navLinks.forEach(function(link) {
    link.addEventListener('click', closeNavMenu);
  });

  // --- CART ---
  cartBtn.addEventListener('click', function() {
    const isHidden = cartDropdown.hasAttribute('hidden');
    if (isHidden) {
      cartDropdown.removeAttribute('hidden');
      cartBtn.setAttribute('aria-expanded', 'true');
    } else {
      cartDropdown.setAttribute('hidden', '');
      cartBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', function(e) {
    if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
      cartDropdown.setAttribute('hidden', '');
      cartBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const updateCart = function() {
    if (cart.length === 0) {
      cartEmptyMsg.hidden = false;
      cartItemsContainer.innerHTML = '';
      cartItemsContainer.hidden = true;
      cartCount.style.display = 'none';
      const checkoutBtn = cartContent.querySelector('.cart-dropdown__checkout-btn');
      if (checkoutBtn) checkoutBtn.remove();
    } else {
      cartEmptyMsg.hidden = true;
      cartItemsContainer.innerHTML = '';
      cartItemsContainer.hidden = false;
      let totalItems = 0;
      cart.forEach(function(item, index) {
        totalItems += item.quantity;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <img src="${item.thumbnail}" alt="${item.name}" class="cart-item__img">
          <div class="cart-item__info">
            <p class="cart-item__name">${item.name}</p>
            <p class="cart-item__price">$${item.price.toFixed(2)} x ${item.quantity} <span class="cart-item__price-total">$${(item.price * item.quantity).toFixed(2)}</span></p>
          </div>
          <button class="cart-item__delete-btn" aria-label="Remove ${item.name} from cart">
            <img src="./images/icon-delete.svg" alt="">
          </button>
        `;
        itemElement.querySelector('.cart-item__delete-btn').addEventListener('click', function() {
          cart.splice(index, 1); // Remove this specific item
          updateCart();
        });
        cartItemsContainer.appendChild(itemElement);
      });

      if (!cartContent.querySelector('.cart-dropdown__checkout-btn')) {
        const checkoutBtn = document.createElement('button');
        checkoutBtn.classList.add('cart-dropdown__checkout-btn');
        checkoutBtn.textContent = 'Checkout';
        // Ensure it's appended after the items container
        cartItemsContainer.insertAdjacentElement('afterend', checkoutBtn);
      }

      cartCount.textContent = totalItems;
      cartCount.style.display = 'block';
    }
  }

  // --- QUANTITY SELECTOR ---
  quantityIncreaseBtn.addEventListener('click', function() {
    quantity++;
    quantityValue.textContent = quantity;
  });

  quantityDecreaseBtn.addEventListener('click', function() {
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });

  addToCartBtn.addEventListener('click', function() {
    const product = {
      id: 'fall-sneakers-01',
      name: 'Fall Limited Edition Sneakers',
      price: 125.00,
      thumbnail: './images/image-product-1-thumbnail.jpg',
    };

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // If it exists, just update the quantity
      existingItem.quantity += quantity;
    } else {
      // If not, add the new product with its quantity
      product.quantity = quantity;
      cart.push(product);
    }

    updateCart();
    cartDropdown.removeAttribute('hidden'); // Show cart after adding
    cartBtn.setAttribute('aria-expanded', 'true');
  });

  // --- IMAGE GALLERY & LIGHTBOX ---
  const updateMainImage = function(index) {
    currentImageIndex = index;
    mainProductImage.src = productImages[index];
    mainProductImage.alt = `Product image ${index + 1}`;
    lightboxMainImage.src = productImages[index];
    lightboxMainImage.alt = `Product image ${index + 1}`;

    galleryThumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentImageIndex);
    });
    lightboxThumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentImageIndex);
    });
  }

  galleryThumbnails.forEach(function(thumbnail, index) {
    thumbnail.addEventListener('click', function() { updateMainImage(index); });
  });

  lightboxThumbnails.forEach(function(thumbnail, index) {
    thumbnail.addEventListener('click', function() { updateMainImage(index); });
  });

  const showNextImage = function() {
    const nextIndex = (currentImageIndex + 1) % productImages.length;
    updateMainImage(nextIndex);
  }

  const showPrevImage = function() {
    const prevIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    updateMainImage(prevIndex);
  }

  galleryNavNext.forEach(function(btn) { btn.addEventListener('click', showNextImage); });
  galleryNavPrev.forEach(function(btn) { btn.addEventListener('click', showPrevImage); });

  // Lightbox open/close
  const focusableLightboxElements = lightbox.querySelectorAll('button');
  const firstFocusableEl = focusableLightboxElements[0];
  const lastFocusableEl = focusableLightboxElements[focusableLightboxElements.length - 1];
  
  const openLightbox = function() {
    if (window.innerWidth > 768) {
      lightbox.removeAttribute('hidden');
      // Allow transition to happen before setting opacity
      setTimeout(function() {
        lightbox.style.opacity = '1';
      }, 10);
      firstFocusableEl.focus();
    }
  }

  lightboxOpenBtn.addEventListener('click', openLightbox);

  const closeLightbox = function() {
    lightbox.style.opacity = '0';
    // Wait for transition to finish before hiding
    lightbox.addEventListener('transitionend', function() {
      lightbox.setAttribute('hidden', '');
    }, { once: true });
    lightboxOpenBtn.focus();
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);


  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
      closeLightbox();
    }
  });

  // Close lightbox by clicking the overlay
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation for gallery
  document.addEventListener('keydown', function(e) {
    // Trap focus inside the lightbox
    if (!lightbox.hasAttribute('hidden') && e.key === 'Tab') {
      if (e.shiftKey) { // if shift + tab
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else { // if tab
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }

    if (!lightbox.hasAttribute('hidden')) {
      if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    }
  });

  // Initial cart state
  updateCart();
});