const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('.search-bar-container');
const formBtn = document.querySelector('#login-btn');
const loginForm = document.querySelector('.login-form-container');
const formClose = document.querySelector('#form-close');
const menu = document.querySelector('#menu-bar');
const navbar = document.querySelector('.navbar');

let lastFocusedElement = null;

// Close all menus/forms on scroll
window.onscroll = () => {
  closeSearchBar();
  closeMenu();
  closeLoginForm();
};

// Toggle hamburger menu
menu.addEventListener('click', () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

  const expanded = menu.classList.contains('fa-times');
  menu.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

// Toggle search bar
searchBtn.addEventListener('click', () => {
  searchBtn.classList.toggle('fa-times');
  searchBar.classList.toggle('active');

  const expanded = searchBtn.classList.contains('fa-times');
  searchBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

// Open login form
formBtn.addEventListener('click', () => {
  lastFocusedElement = document.activeElement;

  loginForm.classList.add('active');
  formBtn.setAttribute('aria-expanded', 'true');
  loginForm.setAttribute('aria-hidden', 'false');

  // Focus first input inside login form
  const firstInput = loginForm.querySelector('input.box');
  if (firstInput) firstInput.focus();

  // Trap focus inside login form
  trapFocus(loginForm);
});

// Close login form
formClose.addEventListener('click', () => {
  closeLoginForm();
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close everything if open
    if (loginForm.classList.contains('active')) {
      closeLoginForm();
    }
    if (searchBar.classList.contains('active')) {
      closeSearchBar();
    }
    if (navbar.classList.contains('active')) {
      closeMenu();
    }
  }
});

// Close login form function
function closeLoginForm() {
  if (!loginForm.classList.contains('active')) return;

  loginForm.classList.remove('active');
  formBtn.setAttribute('aria-expanded', 'false');
  loginForm.setAttribute('aria-hidden', 'true');

  // Return focus to last focused element before opening login form
  if (lastFocusedElement) lastFocusedElement.focus();

  // Remove focus trap event listeners
  releaseFocusTrap();
}

// Close search bar function
function closeSearchBar() {
  if (!searchBar.classList.contains('active')) return;

  searchBtn.classList.remove('fa-times');
  searchBar.classList.remove('active');
  searchBtn.setAttribute('aria-expanded', 'false');
}

// Close menu function
function closeMenu() {
  if (!navbar.classList.contains('active')) return;

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  menu.setAttribute('aria-expanded', 'false');
}

// Close search/menu if clicking outside
document.addEventListener('click', (e) => {
  // If search bar is open and click outside searchBtn or searchBar close it
  if (
    searchBar.classList.contains('active') &&
    !searchBar.contains(e.target) &&
    e.target !== searchBtn
  ) {
    closeSearchBar();
  }

  // If menu is open and click outside menu or navbar close it
  if (
    navbar.classList.contains('active') &&
    !navbar.contains(e.target) &&
    e.target !== menu
  ) {
    closeMenu();
  }
});

/* Focus trap inside modal for accessibility */
let focusTrapListener = null;
function trapFocus(element) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  const focusableElements = element.querySelectorAll(focusableSelectors.join(','));
  if (focusableElements.length === 0) return;

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  focusTrapListener = function (e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', focusTrapListener);
}

function releaseFocusTrap() {
  if (focusTrapListener) {
    loginForm.removeEventListener('keydown', focusTrapListener);
    focusTrapListener = null;
  }
}

/* HERO SLIDER */
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.hero .prev');
const nextBtn = document.querySelector('.hero .next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Auto slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);
