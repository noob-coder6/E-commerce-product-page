# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:
- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Links

- Solution URL: [GitHub Repository](https://github.com/noob-coder6/E-commerce-product-page.git)
- Live Site URL: [Live Site](https://noob-coder6.github.io/E-commerce-product-page/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

This project was a fantastic opportunity to build a core feature of an e-commerce website and focus on creating an interactive, accessible, and responsive user experience.

Some of the major learnings include:

**1. Accessible Lightbox Implementation**

I learned how to create a fully accessible modal lightbox. This involved trapping focus within the modal, closing it with the `Escape` key, and using ARIA attributes to inform screen reader users of the modal's state.

```js
document.addEventListener('keydown', function (e) {
  // Trap focus inside the lightbox
  if (!lightbox.hasAttribute('hidden') && e.key === 'Tab') {
    // ... focus trapping logic ...
  }
});
```

**2. Robust Cart Management with Event Delegation**

I implemented a cart system that correctly handles adding items and updating quantities. A key learning was using event delegation to manage the "delete" button for items added dynamically to the cart. This is more efficient and avoids bugs related to adding multiple event listeners.

```js
cartItemsContainer.addEventListener('click', function (e) {
  const deleteBtn = e.target.closest('.cart-item__delete-btn');
  if (deleteBtn) {
    cart = []; // Clear the cart
    updateCart();
  }
});
```

**3. Styling Inlined SVGs**

To get the desired hover effects on the lightbox controls, I inlined the SVGs directly into the HTML. This allowed me to target their `path` with CSS for color changes on hover, which is not possible when they are loaded as `<img>` tags.

```css
.lightbox__close-btn:hover svg path {
  fill: var(--clr-primary-orange);
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.


## Author

- Frontend Mentor - [@noob-coder6](https://www.frontendmentor.io/profile/noob-coder6)
- Github - [noob-coder6](https://github.com/noob-coder6/)