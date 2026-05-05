/* ============================================
   Theme Toggle Functionality
   ============================================ */

// Get theme toggle button
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light-mode';

// Apply saved theme on page load
document.body.classList.add(savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    toggleTheme();
});

/**
 * Toggle between light and dark mode
 */
function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
        updateThemeIcon('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        updateThemeIcon('dark-mode');
    }
}

/**
 * Update theme toggle icon based on current theme
 * @param {string} theme - Current theme ('light-mode' or 'dark-mode')
 */
function updateThemeIcon(theme) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (theme === 'dark-mode') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

/* ============================================
   Gallery Filter Functionality
   ============================================ */

// Get all filter buttons and gallery items
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Initial state - show all items
galleryItems.forEach(item => {
    item.classList.remove('hidden');
    item.classList.add('show');
});

// Add click event listeners to filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show item
                item.classList.remove('hidden');
                item.classList.add('show');
            } else {
                // Hide item
                item.classList.add('hidden');
                item.classList.remove('show');
            }
        });
    });
});

/* ============================================
   Smooth Scroll for Navigation Links
   ============================================ */

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add smooth scroll behavior to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only prevent default if it's an anchor link
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll with smooth behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ============================================
   Intersection Observer for Animations
   ============================================ */

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Apply different animations based on element type
            if (element.classList.contains('skill-card')) {
                element.style.animation = `scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s forwards`;
            } else if (element.classList.contains('contact-link')) {
                element.style.animation = `slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s forwards`;
            } else {
                element.style.animation = 'fadeIn 0.7s ease-out forwards';
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe section elements
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe and animate skill cards with stagger effect
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe and animate contact links with stagger effect
document.querySelectorAll('.contact-link').forEach((link, index) => {
    link.style.opacity = '0';
    observer.observe(link);
});

// Add hover ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple effect (optional enhancement)
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

/* ============================================
   Gallery Modal Functions
   ============================================ */

let currentGalleryIndex = 0;
let currentGalleryImages = [];

/**
 * Open gallery modal
 */
function openGalleryModal(element) {
    const modal = document.getElementById('galleryModal');
    const img = element.closest('.gallery-item').querySelector('img');
    
    // Get all visible gallery images
    currentGalleryImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img')).map(
        i => i.getAttribute('src')
    );
    
    // Find current image index
    currentGalleryIndex = currentGalleryImages.indexOf(img.getAttribute('src'));
    
    // Display image
    const modalImage = document.getElementById('galleryModalImage');
    modalImage.setAttribute('src', currentGalleryImages[currentGalleryIndex]);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Close gallery modal
 */
function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Navigate to previous image
 */
function prevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    const modalImage = document.getElementById('galleryModalImage');
    modalImage.setAttribute('src', currentGalleryImages[currentGalleryIndex]);
}

/**
 * Navigate to next image
 */
function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    const modalImage = document.getElementById('galleryModalImage');
    modalImage.setAttribute('src', currentGalleryImages[currentGalleryIndex]);
}

// Close modal when clicking outside image
const modal = document.getElementById('galleryModal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeGalleryModal();
        }
    });
}
