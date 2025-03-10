// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

// Project Data
const projects = [
    {
        title: "Project One",
        category: "UI Design",
        image: "project1.jpg"
    },
    // Add more projects
];

// Load Projects
function loadProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.category}</p>
            </div>
        `;
        projectGrid.appendChild(projectCard);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Magnetic Effect on Buttons
document.querySelectorAll('.submit-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const position = button.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translate(0px, 0px)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});
  // Header scroll effect
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Active link handling
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
      let current = '';
    
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
        
          if (scrollY >= (sectionTop - sectionHeight/3)) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  });

  // Smooth scroll
  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          document.querySelector(targetId).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Form Submission
  document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form submission logic here
  });

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
});

// Project section animations
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate tech stack tags
                const tags = entry.target.querySelectorAll('.project-tech span');
                tags.forEach((tag, index) => {
                    tag.style.animationDelay = `${index * 0.1}s`;
                    tag.classList.add('animate');
                });
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => {
        observer.observe(card);
        
        // Enhanced hover interactions
        card.addEventListener('mouseenter', () => {
            const otherCards = Array.from(projectCards).filter(c => c !== card);
            otherCards.forEach(c => {
                c.style.transform = 'scale(0.95)';
                c.style.opacity = '0.7';
            });
        });

        card.addEventListener('mouseleave', () => {
            projectCards.forEach(c => {
                c.style.transform = 'scale(1)';
                c.style.opacity = '1';
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('techBackground');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    // Circuit board parameters
    const nodeSize = 2;
    const nodeSpacing = 30;
    const lineWidth = 1;

    // Create nodes
    let nodes = [];
    function createNodes() {
        nodes = [];
        for (let x = nodeSpacing; x < canvas.width; x += nodeSpacing) {
            for (let y = nodeSpacing; y < canvas.height; y += nodeSpacing) {
                nodes.push({
                    x,
                    y,
                    connections: Math.floor(Math.random() * 3) + 1,
                    angle: Math.random() * Math.PI * 2,
                    pulseOffset: Math.random() * Math.PI * 2
                });
            }
        }
    }
    createNodes();

    // Animation function
    function animate(timestamp) {
        ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(node => {
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 180, 255, ${0.3 + Math.sin(timestamp / 1000 + node.pulseOffset) * 0.2})`;
            ctx.fill();

            // Draw connections
            ctx.strokeStyle = 'rgba(100, 180, 255, 0.15)';
            ctx.lineWidth = lineWidth;
            
            for (let i = 0; i < node.connections; i++) {
                const angle = node.angle + (Math.PI * 2 * i) / node.connections;
                const length = nodeSpacing * (0.8 + Math.sin(timestamp / 1000 + node.pulseOffset) * 0.2);

                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(
                    node.x + Math.cos(angle) * length,
                    node.y + Math.sin(angle) * length
                );
                ctx.stroke();
            }
        });

        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasSize();
        createNodes();
    });

    // Start animation
    requestAnimationFrame(animate);
});

// Rest of your existing JavaScript functionality remains the same

// Add this to your existing script.js
document.querySelectorAll('.box').forEach((box, index) => {
    box.style.animationDelay = `${index * 0.2}s`;
    
    // Add floating animation
    setInterval(() => {
        box.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
    }, 50);
    
    // Add hover effect for neighboring boxes
    box.addEventListener('mouseenter', () => {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((otherBox, otherIndex) => {
            if (otherIndex !== index) {
                otherBox.style.transform = 'scale(0.95)';
            }
        });
    });
    
    box.addEventListener('mouseleave', () => {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(otherBox => {
            otherBox.style.transform = 'none';
        });
    });
});

// education section//
document.querySelectorAll('.education-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
const fadeOptions = {
    threshold: 0.5,
    rootMargin: "0px"
};

const fadeOnScroll = new IntersectionObserver(function(entries, fadeOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            fadeOnScroll.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeOnScroll.observe(element);
});

// Add this to your existing JavaScript
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const filter = this.dataset.filter;
        filterProjects(filter);
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            project.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            project.style.display = 'none';
        }
    });
}

// Add hover effect
const button = document.querySelector('.project-btn');
button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
});

// Smooth scroll for dropdown links
// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(1)';
            }
        });
    });

    skillBars.forEach(bar => {
        bar.style.transform = 'scaleX(0)';
        observer.observe(bar);
    });

    // Hover effect for expertise cards
    const cards = document.querySelectorAll('.expertise-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Smooth scroll for dropdown links
    document.querySelectorAll('.project-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation delay to logos
    document.querySelectorAll('.logo-item').forEach((logo, index) => {
        logo.style.setProperty('--i', index);
    });

    // Optional: Add intersection observer for entrance animation
    const logos = document.querySelectorAll('.logo-item');
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    logos.forEach(logo => {
        logo.style.opacity = 0;
        logo.style.transform = 'translateY(20px)';
        logoObserver.observe(logo);
    });

    // Keep your existing glitch effect code
    // Add smooth reveal animation for education items
    const educationItems = document.querySelectorAll('.timeline-item');

    const revealEducation = () => {
        educationItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };

    document.addEventListener('DOMContentLoaded', revealEducation);
});