// Project data
const projects = [
  {
    title: "portfolio-drafts",
    description: "A personal portfolio website built with HTML, CSS, and JavaScript featuring a clean, professional design with a monochromatic blue theme.",
    image: "gambar/porto.png",
    tags: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "https://portofolio-eight-phi-87.vercel.app/",
      github: "https://github.com/RazkaFawwazil23/Portofolio",
    },
  },
  {
    title: "Ecommerce Project",
    description: "An online shopping system that I personally designed and developed, created specifically to serve and support the local community in Depok",
    image: "gambar/project2.png",
    tags: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "https://projects-razka-fawwazil.vercel.app/",
      github: "https://github.com/RazkaFawwazil23/Projects_Razka-Fawwazil",
    },
  },
  {
    title: "Tictac Toe Game",
    description: "A game that is played on a 3x3 grid where two players take turns marking Xs and Os, aiming to get three in a row horizontally, vertically, or diagonally.",
    image: "gambar/tictac.png",
    tags: ["HTML", "CSS", "React", "Vite"],
    links: {
      demo: "https://tic-tac-project-react-five.vercel.app/",
      github: "https://github.com/RazkaFawwazil23/TicTacProjectReact",
    },
  },
];

// Typing animation for subtitle
const typingTexts = ["Full-Stack Developer", "Software Engineer", "Problem Solver", "Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  setTimeout(typeText, typingSpeed);
}

// Function to create project cards
function createProjectCards() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (!projectsGrid) return;

  projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card fade-up";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
        </div>
        <div class="project-links">
          ${project.links.demo ? `<a href="${project.links.demo}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ""}
          ${project.links.github ? `<a href="${project.links.github}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> GitHub</a>` : ""}
        </div>
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const navLinks = document.querySelector(".nav-links");

    // Close mobile menu if open
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      document.querySelector(".nav-toggle").classList.remove("active");
    }

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Mobile menu toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Animated counter for stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-count"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + "+";
    }
  };

  updateCounter();
}

// Observe stat numbers
const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((stat) => {
  statsObserver.observe(stat);
});

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.padding = "0.75rem 2rem";
  } else {
    navbar.style.padding = "1rem 2rem";
  }

  lastScroll = currentScroll;
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createProjectCards();

  // Start typing animation
  setTimeout(typeText, 1000);

  // Observe all fade-up elements
  document.querySelectorAll(".fade-up").forEach((element) => {
    observer.observe(element);
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image");
    const heroText = document.querySelector(".hero-text");

    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (heroText && scrolled < window.innerHeight) {
      heroText.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });

  // Add smooth reveal for skills
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Project card hover effect
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });

  // Add loading class removal for smooth initial render
  document.body.classList.add("loaded");
});
