// Portfolio Main JavaScript - Ahmed Usman Hussain
// Comprehensive interactive functionality with modern web technologies

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticleSystem();
        this.setupTypewriter();
        this.setupScrollAnimations();
        this.setupProjectFilters();
        this.setupSkillsChart();
        this.setupContactForm();
        this.setupNavigation();
        this.setupSkillBars();
    }

    // Particle System for Hero Background
    setupParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        let particles = [];
        let mouseX = 0;
        let mouseY = 0;

        new p5((p) => {
            p.setup = () => {
                const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.parent('particle-canvas');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        size: p.random(2, 6),
                        speedX: p.random(-0.5, 0.5),
                        speedY: p.random(-0.5, 0.5),
                        opacity: p.random(0.3, 0.8)
                    });
                }
            };

            p.draw = () => {
                p.clear();
                
                // Update and draw particles
                particles.forEach(particle => {
                    // Mouse interaction
                    const distance = p.dist(mouseX, mouseY, particle.x, particle.y);
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        particle.x += (particle.x - mouseX) * force * 0.01;
                        particle.y += (particle.y - mouseY) * force * 0.01;
                    }
                    
                    // Move particles
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(124, 132, 113, particle.opacity * 255);
                    p.noStroke();
                    p.ellipse(particle.x, particle.y, particle.size);
                });
                
                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const distance = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        if (distance < 150) {
                            p.stroke(124, 132, 113, (1 - distance / 150) * 100);
                            p.strokeWeight(1);
                            p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                        }
                    }
                }
            };

            p.mouseMoved = () => {
                mouseX = p.mouseX;
                mouseY = p.mouseY;
            };

            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
            };
        });
    }

    // Typewriter Effect for Hero Section
    setupTypewriter() {
        // Name typewriter
        if (document.getElementById('typed-name')) {
            new Typed('#typed-name', {
                strings: ['Ahmed Usman Hussain'],
                typeSpeed: 80,
                startDelay: 500,
                showCursor: false,
                onComplete: () => {
                    // Start title typewriter after name is complete
                    if (document.getElementById('typed-title')) {
                        new Typed('#typed-title', {
                            strings: ['Software Developer', 'Problem Solver', 'Creative Thinker'],
                            typeSpeed: 60,
                            backSpeed: 40,
                            backDelay: 2000,
                            loop: true,
                            showCursor: true,
                            cursorChar: '|'
                        });
                    }
                }
            });
        }
    }

    // Scroll-triggered Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all reveal elements
        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Animate skill bars
    animateSkillBar(skillItem) {
        const bar = skillItem.querySelector('.skill-bar');
        if (bar && !bar.classList.contains('animated')) {
            bar.classList.add('animated');
            const width = bar.style.width || bar.className.match(/w-\[(\d+)%\]/);
            if (width) {
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width[1] + '%';
                }, 100);
            }
        }
    }

    // Project Filter System
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.project-filter');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                // Filter projects with animation
                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        card.classList.remove('hidden');
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 600,
                            easing: 'easeOutCubic',
                            delay: Math.random() * 200
                        });
                    } else {
                        anime({
                            targets: card,
                            opacity: 0,
                            scale: 0.8,
                            duration: 300,
                            easing: 'easeInCubic',
                            complete: () => {
                                card.classList.add('hidden');
                            }
                        });
                    }
                });
            });
        });
    }

    // Skills Chart with ECharts
    setupSkillsChart() {
        const chartElement = document.getElementById('skills-chart');
        if (!chartElement) return;

        const chart = echarts.init(chartElement);
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['HTML/CSS', 'JavaScript', 'Git/GitHub', 'LaTeX', 'Python/Jupyter', 'Linux Shell']
            },
            series: [
                {
                    name: 'Skills',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 85, name: 'HTML/CSS', itemStyle: {color: '#7c8471'}},
                        {value: 70, name: 'JavaScript', itemStyle: {color: '#c4a484'}},
                        {value: 80, name: 'Git/GitHub', itemStyle: {color: '#d4af37'}},
                        {value: 75, name: 'LaTeX', itemStyle: {color: '#6b7280'}},
                        {value: 65, name: 'Python/Jupyter', itemStyle: {color: '#9ca3af'}},
                        {value: 60, name: 'Linux Shell', itemStyle: {color: '#7c8471'}}
                    ]
                }
            ]
        };

        chart.setOption(option);

        // Animate chart on scroll
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chart.resize();
                    // Add animation delay
                    setTimeout(() => {
                        chart.setOption(option, true);
                    }, 500);
                }
            });
        });

        chartObserver.observe(chartElement);

        // Responsive chart
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    // Contact Form Handling
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (this.validateContactForm(data)) {
                // Simulate form submission
                this.submitContactForm(data);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'text':
                if (field.name === 'name') {
                    isValid = value.length >= 2;
                    message = isValid ? '' : 'Name must be at least 2 characters long';
                } else if (field.name === 'subject') {
                    isValid = value.length >= 3;
                    message = isValid ? '' : 'Subject must be at least 3 characters long';
                }
                break;
            case 'textarea':
                isValid = value.length >= 10;
                message = isValid ? '' : 'Message must be at least 10 characters long';
                break;
        }

        this.showFieldValidation(field, isValid, message);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        // Remove existing validation
        const existingMessage = field.parentNode.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Update field styling
        field.classList.toggle('error', !isValid);
        field.classList.toggle('valid', isValid);

        // Show message if invalid
        if (!isValid && message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'validation-message text-red-500 text-sm mt-1';
            messageElement.textContent = message;
            field.parentNode.appendChild(messageElement);
        }
    }

    validateContactForm(data) {
        const fields = [
            { name: 'name', type: 'text' },
            { name: 'email', type: 'email' },
            { name: 'subject', type: 'text' },
            { name: 'message', type: 'textarea' }
        ];

        let isValid = true;
        
        fields.forEach(field => {
            const input = document.querySelector(`[name="${field.name}"]`);
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    submitContactForm(data) {
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Show success message
            this.showContactSuccess();
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showContactSuccess() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
        successDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Message sent successfully!</span>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Animate in
        anime({
            targets: successDiv,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
        
        // Remove after 5 seconds
        setTimeout(() => {
            anime({
                targets: successDiv,
                translateX: 300,
                opacity: 0,
                duration: 500,
                easing: 'easeInCubic',
                complete: () => {
                    successDiv.remove();
                }
            });
        }, 5000);
    }

    // Navigation Setup
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                // Mobile menu functionality would go here
                console.log('Mobile menu clicked');
            });
        }

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.className.match(/w-\[(\d+)%\]/);
                    if (width && !bar.classList.contains('animated')) {
                        bar.classList.add('animated');
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width[1] + '%';
                        }, 200);
                    }
                }
            });
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
}

// Enhanced hover effects for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                rotateX: 5,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateX: 0,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Button hover effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                translateY: -2,
                scale: 1.02,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                translateY: 0,
                scale: 1,
                duration: 200,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Initialize the portfolio application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Parallax effect for decorative elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    anime({
        targets: '.reveal',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutCubic'
    });
});

// Performance optimization: Debounced resize handler
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

// Optimized resize handler
const handleResize = debounce(() => {
    // Recalculate layouts if needed
    const chart = echarts.getInstanceByDom(document.getElementById('skills-chart'));
    if (chart) {
        chart.resize();
    }
}, 250);

window.addEventListener('resize', handleResize);