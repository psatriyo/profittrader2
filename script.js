// ================================
// Countdown Timer
// ================================

// Set the event date: October 27, 2025, 20:00 WIB (UTC+7)
// Converting to UTC: 20:00 WIB = 13:00 UTC
const eventDate = new Date('2025-10-27T13:00:00Z').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
    if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
    if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
    if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

    // If countdown is over
    if (distance < 0) {
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';

        const countdownTitle = document.querySelector('.countdown-title');
        if (countdownTitle) {
            countdownTitle.textContent = 'Pelatihan Telah Dimulai!';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initialize countdown on page load
updateCountdown();


// ================================
// Smooth Scroll for Navigation
// ================================

document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Get the top navigation height for offset
                const nav = document.querySelector('.top-nav');
                const navHeight = nav ? nav.offsetHeight : 0;

                // Calculate position
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// ================================
// Form Handling
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone) {
                alert('Mohon isi semua field yang diperlukan!');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Mohon masukkan alamat email yang valid!');
                return;
            }

            // Phone validation (basic Indonesian phone number)
            const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                alert('Mohon masukkan nomor WhatsApp yang valid!');
                return;
            }

            // Here you would normally send the data to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', formData);

            // Show success message
            alert('Terima kasih! Pendaftaran Anda berhasil. Kami akan mengirimkan informasi lebih lanjut melalui email dan WhatsApp.');

            // Reset form
            registrationForm.reset();

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


// ================================
// Scroll Animations
// ================================

// Add fade-in animation when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.day-card, .testimonial-card, .growth-card, .included-card, .benefit-column');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});


// ================================
// Sticky Navigation
// ================================

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.top-nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});


// ================================
// Mobile Menu Toggle (if needed in future)
// ================================

// This can be extended if you want to add a hamburger menu for mobile
function initMobileMenu() {
    // Placeholder for future mobile menu functionality
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        console.log('Mobile view');
        // Add mobile-specific behaviors here
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();


// ================================
// WhatsApp Link Helper
// ================================

// Format phone number for WhatsApp links
function formatWhatsAppLink(phoneNumber) {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // If starts with 0, replace with 62 (Indonesia country code)
    if (cleaned.startsWith('0')) {
        return '62' + cleaned.substring(1);
    }

    // If doesn't start with country code, add it
    if (!cleaned.startsWith('62')) {
        return '62' + cleaned;
    }

    return cleaned;
}


// ================================
// Console Welcome Message
// ================================

console.log('%c🎯 Portfolio Makeover Challenge 2025', 'color: #2ea3f2; font-size: 20px; font-weight: bold;');
console.log('%cDaftar sekarang untuk mengikuti pelatihan 5 hari gratis!', 'color: #7be054; font-size: 14px;');
console.log('%c27-31 Oktober 2025 | 20:00-21:00 WIB', 'color: #2d2d2d; font-size: 12px;');
