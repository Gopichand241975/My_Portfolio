// --- Typing Effect for Hero Subtitle ---
const typingTextElement = document.getElementById('typing-text');
const subtitles = [
  "B.Tech Computer Science Student",
  "Artificial Intelligence Intern",
  "Machine Learning Developer",
  "Full-Stack Web Programmer"
];
let subtitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentSubtitle = subtitles[subtitleIndex];
  
  if (isDeleting) {
    typingTextElement.textContent = currentSubtitle.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingTextElement.textContent = currentSubtitle.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentSubtitle.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at full text
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    subtitleIndex = (subtitleIndex + 1) % subtitles.length;
    typingSpeed = 500; // Pause before typing next
  }

  setTimeout(typeEffect, typingSpeed);
}

// --- Interactive Console Terminal ---
const consoleInput = document.getElementById('console-input');
const consoleHistory = document.getElementById('console-history');
const consoleBody = document.getElementById('console-body');

const commands = {
  help: `Available commands:
  <span class="console-keyword">about</span>       - Learn more about Gopichand
  <span class="console-keyword">skills</span>      - View technical skills
  <span class="console-keyword">projects</span>    - List portfolio projects
  <span class="console-keyword">certs</span>       - View professional certifications
  <span class="console-keyword">contact</span>     - Display contact information
  <span class="console-keyword">clear</span>       - Clear the terminal history`,
  
  about: `Gopichand Sabbavarapu
  ----------------------
  * B.Tech student in Computer Science & Engineering (2023 - 2027)
  * Current CGPA: <span class="console-keyword">8.0</span> at Central Institute of Technology Kokrajhar
  * AI Intern at Topgrade Innovation (Jun 2026 - Aug 2026)`,
  
  skills: `Technical Skills Matrix:
  ----------------------
  * <span class="console-keyword">Languages:</span> Python, Java, SQL, JavaScript (Basic), HTML, CSS
  * <span class="console-keyword">Frameworks:</span> FastAPI, Streamlit, Flask
  * <span class="console-keyword">Libraries:</span> NumPy, Pandas, Scikit-Learn, OpenCV, YOLOv8
  * <span class="console-keyword">Tools:</span> Git, GitHub, Docker, Postman, VS Code`,
  
  projects: `Featured Projects:
  ----------------------
  1. <span class="console-keyword">Human Detection for SAR:</span> Onboard/Edge/Cloud Inference benchmark using YOLOv8 ONNX.
  2. <span class="console-keyword">Kisan-Alert:</span> Smart crop advisor featuring Gemini AI integrations and weather warnings.
  3. <span class="console-keyword">CarCare:</span> Full-stack Flask application with secure dashboards and booking scheduler.`,
  
  certs: `Professional Credentials:
  ----------------------
  * AWS Solutions Architect
  * JP Morgan Software Job Simulation
  * IBM Generative AI & AI Agent
  * GenAI Powered Data Analytics Job Simulation
  * Anthropic AI Fluency
  * LaTeX Workshop`,
  
  contact: `Contact Details:
  ----------------------
  * <span class="console-keyword">Email:</span> gopichand241975@gmail.com
  * <span class="console-keyword">Phone:</span> +91 6301346749
  * <span class="console-keyword">GitHub:</span> github.com
  * <span class="console-keyword">LinkedIn:</span> linkedin.com`
};

if (consoleBody) {
  consoleBody.addEventListener('click', () => {
    consoleInput.focus();
  });
}

if (consoleInput) {
  consoleInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const inputVal = consoleInput.value.trim();
      const command = inputVal.toLowerCase();
      
      const echoLine = document.createElement('div');
      echoLine.className = 'console-line';
      echoLine.innerHTML = `<span class="console-prompt">guest@gopichand-sh:~$</span> <span>${inputVal}</span>`;
      consoleHistory.appendChild(echoLine);
      
      const outputLine = document.createElement('div');
      outputLine.className = 'console-output';
      
      if (command === 'clear') {
        consoleHistory.innerHTML = '';
        consoleInput.value = '';
        return;
      } else if (command === '') {
        outputLine.innerHTML = '';
      } else if (commands[command]) {
        outputLine.innerHTML = commands[command];
      } else {
        outputLine.innerHTML = `command not found: ${inputVal}. Type <span class="console-keyword">'help'</span> to see available commands.`;
      }
      
      if (inputVal !== '') {
        consoleHistory.appendChild(outputLine);
      }
      
      consoleInput.value = '';
      consoleBody.scrollTop = consoleBody.scrollHeight;
    }
  });
}

// --- Mobile Navigation Toggle ---
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

// --- Navbar Scroll Solidification & Scroll Spy ---
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  // Navbar solidification
  if (scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Back to top visibility
  if (backToTop) {
    if (scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  // Scroll spy
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
    } else {
      document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
    }
  });
});

// Back to top click
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Projects Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const cardTags = card.getAttribute('data-tags').split(' ');
      if (filterValue === 'all' || cardTags.includes(filterValue)) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// --- Contact Form Submission Simulation ---
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const submitBtn = document.getElementById('form-submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Message...";
    formFeedback.textContent = "";
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
      
      formFeedback.className = "form-feedback success";
      formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully (Simulation).`;
      
      contactForm.reset();
    }, 1500);
  });
}

// --- Scroll Reveal (Intersection Observer) ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// --- Animated Skill Progress Bars ---
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  // Store original widths and zero them out
  skillCards.forEach(card => {
    const bars = card.querySelectorAll('.skill-progress span');
    bars.forEach(bar => {
      bar.dataset.width = bar.style.width;
      bar.style.width = '0%';
    });
  });
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('bars-animated');
        const bars = card.querySelectorAll('.skill-progress span');
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, index * 150);
        });
        skillObserver.unobserve(card);
      }
    });
  }, {
    threshold: 0.3
  });
  
  skillCards.forEach(card => skillObserver.observe(card));
}

// --- Stat Counter Animation ---
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.dataset.target, 10);
          const duration = 1500;
          const increment = target / (duration / 30);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              num.textContent = target + '+';
              clearInterval(timer);
            } else {
              num.textContent = Math.floor(current);
            }
          }, 30);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  if (statNumbers.length > 0) {
    counterObserver.observe(statNumbers[0].closest('.hero-stats'));
  }
}

// --- Particle Canvas Background ---
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 50;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(33, 241, 168, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = (1 - distance / 150) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(33, 241, 168, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  animate();
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  initScrollReveal();
  initSkillBars();
  initStatCounters();
  initParticleCanvas();
});
