// Subtle parallax scroll effect with enhanced depth
const heroBottle = document.querySelector('.hero-bottle');
const heroContent = document.querySelector('.hero-content');
const siteHeader = document.querySelector('.site-header');

let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  if (scrollY < windowHeight) {
    const opacity = 1 - scrollY / (windowHeight * 0.75);
    const translateY = scrollY * 0.4;

    if (heroBottle) {
      heroBottle.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
      heroBottle.style.opacity = Math.max(0, opacity);
    }

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      heroContent.style.opacity = Math.max(0, opacity);
    }
  }

  // Show nav after scrolling down
  if (siteHeader) {
    if (scrollY > windowHeight * 0.3) {
      siteHeader.classList.add('visible');
    } else {
      siteHeader.classList.remove('visible');
    }
  }

  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick, { passive: true });

// Initial call
updateParallax();

// Meditative scroll-triggered fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements (cinematic lines)
document.querySelectorAll('.fade-in-element').forEach((element) => {
  fadeObserver.observe(element);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

let isMenuOpen = false;

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  mobileMenuToggle.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  body.classList.toggle('menu-open');
  mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking nav links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (isMenuOpen) {
      toggleMobileMenu();
    }
  });
});

// Close menu when clicking overlay background
if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      toggleMobileMenu();
    }
  });
}

// Observe all fade-in sections (story, showcase, gallery, cta)
document.querySelectorAll('.fade-in-section').forEach((element) => {
  fadeObserver.observe(element);
});

// Collection carousel navigation
const collectionGrid = document.querySelector('.collection-grid');
const collectionPrevBtn = document.querySelector('.collection-nav-prev');
const collectionNextBtn = document.querySelector('.collection-nav-next');

if (collectionGrid && collectionPrevBtn && collectionNextBtn) {
  const scrollAmount = () => {
    const item = collectionGrid.querySelector('.collection-item');
    return item ? item.offsetWidth + 24 : 300;
  };

  collectionPrevBtn.addEventListener('click', () => {
    collectionGrid.scrollBy({
      left: -scrollAmount(),
      behavior: 'smooth'
    });
  });

  collectionNextBtn.addEventListener('click', () => {
    collectionGrid.scrollBy({
      left: scrollAmount(),
      behavior: 'smooth'
    });
  });

  // Update button states based on scroll position
  const updateButtonStates = () => {
    const maxScroll = collectionGrid.scrollWidth - collectionGrid.clientWidth;
    const currentScroll = collectionGrid.scrollLeft;

    collectionPrevBtn.style.opacity = currentScroll > 0 ? '1' : '0.4';
    collectionPrevBtn.style.pointerEvents = currentScroll > 0 ? 'auto' : 'none';
    
    collectionNextBtn.style.opacity = currentScroll < maxScroll - 1 ? '1' : '0.4';
    collectionNextBtn.style.pointerEvents = currentScroll < maxScroll - 1 ? 'auto' : 'none';
  };

  collectionGrid.addEventListener('scroll', updateButtonStates, { passive: true });
  window.addEventListener('resize', updateButtonStates);
  updateButtonStates();
}
