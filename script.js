document.documentElement.classList.add("js");

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }
);

// Observe all scroll-fade elements
document.querySelectorAll(".scroll-fade").forEach((el) => {
  // Add fade-in class to trigger the animation
  el.classList.add("fade-in");
  observer.observe(el);
});

// Also observe any elements with 'reveal' class
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ==========================================
// PARALLAX SCROLL EFFECTS
// ==========================================
const scrollSections = document.querySelectorAll(".scroll-fade");
const shapes = document.querySelectorAll(".shape");
const orbs = document.querySelectorAll(".orb");

let ticking = false;

const handleScroll = () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Animate scroll sections
  scrollSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = Math.min(
      Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
      1
    );
    
    if (progress > 0.1) {
      section.classList.add("is-active");
    }
  });

  // Animate floating shapes with parallax
  shapes.forEach((shape) => {
    const speed = parseFloat(shape.dataset.speed) || 0.3;
    const offset = scrollY * speed;
    shape.style.transform = `translateY(${offset}px)`;
  });

  // Animate orbs with subtle parallax
  orbs.forEach((orb, index) => {
    const speed = 0.1 + (index * 0.05);
    const offset = scrollY * speed;
    orb.style.transform = `translateY(${offset}px)`;
  });

  ticking = false;
};

// Throttle scroll events with requestAnimationFrame
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});

// Run on page load
window.addEventListener("load", () => {
  handleScroll();
  
  // Trigger initial animation for hero section
  const heroElements = document.querySelectorAll(".hero-new .scroll-fade");
  heroElements.forEach(el => {
    el.classList.add("is-visible");
  });
});

// ==========================================
// BUTTON GLOW EFFECT
// ==========================================
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    button.style.setProperty("--glow-x", `${x}px`);
    button.style.setProperty("--glow-y", `${y}px`);
  });
  
  button.addEventListener("mouseleave", () => {
    button.style.removeProperty("--glow-x");
    button.style.removeProperty("--glow-y");
  });
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Skip if it's just "#"
    if (href === "#") return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for sticky nav
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const nav = document.querySelector(".nav");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow when scrolled
  if (currentScroll > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
  
  lastScroll = currentScroll;
});

// ==========================================
// MOBILE NAV TOGGLE
// ==========================================
const navToggle = document.querySelector(".nav__toggle");
const navLinksContainer = document.querySelector(".nav__links");

const closeMobileNav = () => {
  nav.classList.remove("nav--open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation menu");
};

if (navToggle && navLinksContainer) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinksContainer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("nav--open")) return;
    if (!window.matchMedia("(max-width: 900px)").matches) return;

    const clickedInsideNav = nav.contains(event.target);
    if (!clickedInsideNav) {
      closeMobileNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
      navToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileNav();
    }
  });
}

// ==========================================
// PROJECT CARDS TILT EFFECT (OPTIONAL)
// ==========================================
const projectCards = document.querySelectorAll(".project-new");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(16px)`;
  });
  
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ==========================================
// TECH PILLS SEQUENTIAL ANIMATION ON HOVER
// ==========================================
const techPillContainers = document.querySelectorAll(".tech-pills");

techPillContainers.forEach((container) => {
  const pills = container.querySelectorAll("span");
  
  pills.forEach((pill, index) => {
    pill.style.transitionDelay = `${index * 0.03}s`;
  });
});

// ==========================================
// STAT COUNTER ANIMATION
// ==========================================
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
};

// Trigger counter animation when stats come into view
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const value = entry.target.querySelector(".stat-float__value");
        const targetValue = parseInt(value.textContent.replace(/\D/g, ""));
        
        if (targetValue && !entry.target.classList.contains("animated")) {
          animateCounter(value, targetValue, 1500);
          entry.target.classList.add("animated");
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-float").forEach((stat) => {
  statObserver.observe(stat);
});

// ==========================================
// PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES
// ==========================================
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Disable all animations
  document.documentElement.style.setProperty("--animation-duration", "0s");
}

console.log("🚀 Portfolio initialized successfully!");
