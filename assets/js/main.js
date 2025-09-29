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
];

// Function to create project cards
function createProjectCards() {
  const projectsGrid = document.querySelector(".projects-grid");

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card fade-up";

    card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
                </div>
                <div class="project-links">
                    ${project.links.demo ? `<a href="${project.links.demo}" class="btn" target="_blank">Live Demo</a>` : ""}
                    ${project.links.github ? `<a href="${project.links.github}" class="btn" target="_blank">GitHub</a>` : ""}
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
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all elements with fade-up class
document.querySelectorAll(".fade-up").forEach((element) => {
  observer.observe(element);
});

// Mobile menu toggle
const navLinks = document.querySelector(".nav-links");
document.addEventListener("click", (e) => {
  if (e.target.closest(".nav-toggle")) {
    navLinks.classList.toggle("active");
  }
});

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createProjectCards();

  // Animated typing effect for hero title
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    }
    type();
  }

  // Fade-in animation for section titles and project cards
  document.querySelectorAll(".section-title, .project-card").forEach((el, idx) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.transition = "opacity 0.8s";
      el.style.opacity = 1;
    }, 400 + idx * 180);
  });

  // Button ripple effect
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = e.offsetX + "px";
      ripple.style.top = e.offsetY + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Project card pop effect on click
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousedown", () => {
      card.style.transform = "scale(0.97)";
    });
    card.addEventListener("mouseup", () => {
      card.style.transform = "translateY(-10px) scale(1.03)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(-10px) scale(1.03)";
    });
  });
});
