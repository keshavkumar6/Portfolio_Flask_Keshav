// DOM Elements
const navbar = document.getElementById("navbar")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const themeToggle = document.getElementById("themeToggle")
const scrollProgress = document.getElementById("scrollProgress")
const skillsCarousel = document.getElementById("skillsCarousel")
const skillsTabs = document.querySelectorAll(".skills-tab")
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")
const scrollToTop = document.getElementById("scrollToTop")
const currentYear = document.getElementById("currentYear")

// Set current year in footer
if (currentYear) {
  currentYear.textContent = new Date().getFullYear()
}

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark")
  }
}

initTheme()

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    const isDark = document.body.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  })
}

// Mobile Menu Toggle
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    mobileMenu.classList.toggle("active")
  })
}

// Navbar Scroll Effect
function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Update scroll progress
  if (scrollProgress) {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    scrollProgress.style.width = `${scrollPercentage}%`
  }

  // Update active nav link
  updateActiveNavLink()
}

window.addEventListener("scroll", handleScroll)

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-link")

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
      }
      // Calculate the scroll position with offset
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Update Active Nav Link on Scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })

  mobileNavLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}


// document.addEventListener("DOMContentLoaded", () => {
//   // Initialize skills with default category
//   renderSkills("Languages");

//   // Skills Tab Switching
//   if (skillsTabs) {
//     skillsTabs.forEach((tab) => {
//       tab.addEventListener("click", () => {
//         skillsTabs.forEach((t) => t.classList.remove("active"))
//         tab.classList.add("active")

//         const category = tab.dataset.category
//         renderSkills(category)
//       })
//     })
//   }

//   handleScroll()
//   updateActiveNavLink()
// })

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    contactForm.style.display = "none"
    formSuccess.classList.add("active")

    // Reset form after submission
    contactForm.reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      contactForm.style.display = "flex"
      formSuccess.classList.remove("active")
    }, 5000)
  })
}

// Scroll to Top Button
if (scrollToTop) {
  scrollToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Animated Background Canvas
function initBackgroundCanvas() {
  const canvas = document.getElementById("bgCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  function setCanvasDimensions() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  setCanvasDimensions()
  window.addEventListener("resize", setCanvasDimensions)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 5 + 1
      this.speedX = Math.random() * 1 - 0.5
      this.speedY = Math.random() * 1 - 0.5
      this.color = `rgba(124, 58, 237, ${Math.random() * 0.5 + 0.1})`
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY
      }
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particlesArray = []
  const numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 20))

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle())
  }

  // Connect particles with lines
  function connect() {
    const maxDistance = 150
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
      particlesArray[i].draw()
    }

    connect()
    requestAnimationFrame(animate)
  }

  animate()
}

// Initialize background canvas
initBackgroundCanvas()

// Initialize the page
