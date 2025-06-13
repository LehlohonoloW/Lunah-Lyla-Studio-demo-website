// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add body scroll lock when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            let navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            if (navbarHeight > 90) navbarHeight = 90; // Cap max offset if navbar is unusually tall on load
            if (targetId === '#home') navbarHeight = 0; // No offset for home link

            const offsetTop = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active link state
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Add active class to nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50; // Add a little buffer
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Special case for top of page (Home)
    if (pageYOffset < (document.querySelector('#home')?.offsetHeight || window.innerHeight) - navbarHeight - 50 ) {
         navLinks.forEach(link => {
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});

// Enhanced navbar with scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) { // Trigger earlier
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Intersection Observer for creative animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add staggered animation for multiple elements
            if (entry.target.closest('.services-grid') || entry.target.closest('.philosophy-points')) {
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Parallax effect for hero and about sections
const parallaxElements = document.querySelectorAll('.hero::before, .about::before');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .project-card, .philosophy-point, .founder-info, .about-text, .hero-content'
    );
    animateElements.forEach(el => observer.observe(el));
    
    // Add loading animation to hero
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('fade-in');
    }, 300);
});

// Creative hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Philosophy points interactive effects
document.querySelectorAll('.philosophy-point').forEach(point => {
    point.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    point.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const projectType = this.querySelector('input[placeholder="Project Type"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Image lazy loading simulation (for when real images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('.placeholder-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #8b7355;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #8b7355 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .placeholder-image.loaded {
        background: #f0f0f0;
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    .scroll-to-top:hover {
        background: #2c3e50 !important;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Shop Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allProducts = []; // To store all fetched products

    // Check if we are on the shop page
    if (productGrid) {
        fetchProducts();
        setupFilterButtons();
    }

    async function fetchProducts() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allProducts = await response.json();
            displayProducts(allProducts);
        } catch (error) {
            console.error("Could not fetch products:", error);
            if (productGrid) {
                productGrid.innerHTML = '<p class="error-message">Could not load products. Please try again later.</p>';
            }
        }
    }

    function displayProducts(productsToDisplay) {
        if (!productGrid) return;
        productGrid.innerHTML = ''; // Clear existing products or loading message

        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = '<p>No products found matching your criteria.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card'); // Will need CSS for this class

            // Sanitize inputs if they were user-generated, but for now assuming products.json is trusted
            productCard.innerHTML = `
                <img src="${product.imageUrl || 'images/placeholder.jpg'}" alt="${product.name || 'Product Image'}">
                <h3>${product.name || 'Unnamed Product'}</h3>
                <p class="price">${product.price || 'Price not available'}</p>
                <p class="description">${product.description || 'No description available.'}</p>
                ${product.material ? `<p class="meta">Material: ${product.material}</p>` : ''}
                ${product.size ? `<p class="meta">Size: ${product.size}</p>` : ''}
                ${product.dimensions ? `<p class="meta">Dimensions: ${product.dimensions}</p>` : ''}
                <!-- <button class="btn-view-product" data-id="${product.id}">View Details</button> -->
            `;
            productGrid.appendChild(productCard);
        });
    }

    function setupFilterButtons() {
        if (!filterButtons.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

                // Update active state for buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (category === 'all') {
                    displayProducts(allProducts);
                } else {
                    const filteredProducts = allProducts.filter(product => product.category === category);
                    displayProducts(filteredProducts);
                }
            });
        });
    }
});