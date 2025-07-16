
// Enhanced Portfolio Animations and Interactions

// Global variables
let tl = gsap.timeline();
let portfolioData = {};

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            initHeroAnimations();
        }, 500);
    }, 2000);
}

// Initialize Hero Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const socialLinks = document.querySelector('.social-links');
    const heroImage = document.querySelector('.hero-image');

    // Reset animations
    gsap.set([heroTitle, heroSubtitle, heroDescription, heroButtons, socialLinks, heroImage], {
        opacity: 0,
        y: 50
    });

    // Animate elements in sequence
    tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(heroSubtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(heroDescription, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .to(heroButtons, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .to(socialLinks, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .to(heroImage, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // Start typing animation after hero animation
    setTimeout(() => {
        initTypingAnimation();
    }, 1000);
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    
    // Fetch typing texts from Flask API
    fetch('/api/typing-text')
        .then(response => response.json())
        .then(texts => {
            let currentIndex = 0;
            let currentText = '';
            let isDeleting = false;
            
            function typeText() {
                const fullText = texts[currentIndex];
                
                if (isDeleting) {
                    currentText = fullText.substring(0, currentText.length - 1);
                } else {
                    currentText = fullText.substring(0, currentText.length + 1);
                }
                
                typingElement.textContent = currentText;
                
                let typeSpeed = isDeleting ? 50 : 100;
                
                if (!isDeleting && currentText === fullText) {
                    typeSpeed = 2000; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && currentText === '') {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % texts.length;
                    typeSpeed = 500; // Pause before starting new word
                }
                
                setTimeout(typeText, typeSpeed);
            }
            
            typeText();
        })
        .catch(error => {
            console.error('Error fetching typing texts:', error);
            typingElement.textContent = 'Data Analyst';
        });
}

// Scroll Animations
function initScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            }
        );
    });
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        
        const updateCounter = () => {
            const increment = target / 100;
            
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ff5252"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff5252",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Enhanced Skills Animation
function initSkillsAnimation() {
    const skillsContainer = document.getElementById('skillsCarousel');
    const skillsTrack = document.getElementById('skillsTrack');
    const skillsTabs = document.querySelectorAll('.skills-tab');
    
    // Fetch skills data from Flask API
    fetch('/api/skills')
        .then(response => response.json())
        .then(skills => {
            portfolioData.skills = skills;
            
            // Initialize first category
            const firstCategory = Object.keys(skills)[0];
            renderSkills(firstCategory, skills[firstCategory]);
            
            // Add tab click listeners
            skillsTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const category = tab.getAttribute('data-category');
                    
                    // Update active tab
                    skillsTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Render skills for selected category
                    renderSkills(category, skills[category]);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching skills:', error);
        });
}

// Render Skills with Animation
function renderSkills(category, skills) {
    const skillsTrack = document.getElementById('skillsTrack');
    
    // Clear existing skills
    skillsTrack.innerHTML = '';
    
    // Create skill cards
    skills.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="fab fa-${skill.name.toLowerCase().replace(/[^a-z]/g, '')}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-progress">
                <div class="skill-progress-fill" style="--skill-level: ${skill.level * 10}%"></div>
            </div>
        `;
        
        skillsTrack.appendChild(skillCard);
        
        // Animate skill card
        gsap.fromTo(skillCard,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: index * 0.1
            }
        );
    });
}

// Enhanced Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                contactForm.style.display = 'none';
                formSuccess.classList.add('active');
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    formSuccess.classList.remove('active');
                    contactForm.reset();
                }, 3000);
            } else {
                alert('Error sending message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        }
    });
}

// Parallax Effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced Project Cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Initialize all animations
function initAllAnimations() {
    initLoadingScreen();
    initScrollAnimations();
    initCounterAnimation();
    initParticles();
    initSkillsAnimation();
    initContactForm();
    initParallaxEffect();
    initProjectCards();
    initSmoothScrolling();
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initAllAnimations();
    const gradients = [
        'linear-gradient(120deg, #7c3aed, #764ba2, #667eea, #f8f8ff)', // purple
        'linear-gradient(120deg, #e53935, #ff5252, #fff8f7, #ffe0e0)', // red
        'linear-gradient(120deg, #2193b0, #6dd5ed, #f8f8ff)', // blue
        'linear-gradient(120deg, #43e97b, #38f9d7, #f8f8ff)', // green
        'linear-gradient(120deg, #f7971e, #ffd200, #f8f8ff)', // orange/yellow
    ];
    let currentGradient = 0;
    const bgDiv = document.querySelector('.animated-gradient-bg');
    const cycleBtn = document.getElementById('cycleBgBtn');
    const colorPicker = document.getElementById('bgColorPicker');
    let customColor = null;

    if (cycleBtn && bgDiv) {
        cycleBtn.addEventListener('click', function() {
            customColor = null;
            currentGradient = (currentGradient + 1) % gradients.length;
            bgDiv.style.background = gradients[currentGradient];
            bgDiv.style.backgroundSize = '400% 400%';
            bgDiv.style.animation = 'gradientBGmove 12s ease-in-out infinite';
        });
    }
    if (colorPicker && bgDiv) {
        colorPicker.addEventListener('input', function(e) {
            customColor = e.target.value;
            bgDiv.style.background = customColor;
            bgDiv.style.backgroundSize = '';
            bgDiv.style.animation = '';
        });
    }
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
        });
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
});

// Add some utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for potential use in other scripts
window.PortfolioAnimations = {
    initLoadingScreen,
    initTypingAnimation,
    initScrollAnimations,
    initCounterAnimation,
    initParticles,
    initSkillsAnimation,
    initContactForm
};

function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll, .section-title');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Animated counter for stats
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    if (counter.classList.contains('visible')) {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 60);
      function updateCounter() {
        count += increment;
        if (count > target) count = target;
        counter.textContent = count + (counter.dataset.suffix || '');
        if (count < target) {
          requestAnimationFrame(updateCounter);
        }
      }
      if (!counter.dataset.animated) {
        counter.dataset.animated = 'true';
        updateCounter();
      }
    }
  });
}
window.addEventListener('scroll', animateCounters);
window.addEventListener('DOMContentLoaded', animateCounters);
