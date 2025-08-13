// Menu functionality
const menuButton = document.getElementById('menu-button');
const closeMenuButton = document.getElementById('close-menu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuButton?.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

closeMenuButton?.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

function cartSettings(){
    // Cart functionality
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');

    window.cartButton = cartButton;
    window.cartSidebar = cartSidebar;
    window.closeCartButton = closeCartButton;

    cartButton?.addEventListener('click', () => {
        cartSidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeCartButton?.addEventListener('click', () => {
        cartSidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close sidebars when clicking overlay
    overlay?.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        cartSidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}

cartSettings();

// Carousel navigation functionality
function setupCarousel(prevButton, nextButton, carousel) {
    const scrollAmount = carousel?.clientWidth * 0.75;

    prevButton?.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextButton?.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Setup all carousels
document.addEventListener('DOMContentLoaded', () => {
    // Categories carousel
    setupCarousel(
        document.getElementById('category-prev'),
        document.getElementById('category-next'),
        document.querySelector('.category-carousel')
    );

    // New releases carousel
    setupCarousel(
        document.getElementById('new-releases-prev'),
        document.getElementById('new-releases-next'),
        document.querySelectorAll('.product-carousel')[0]
    );

    // Featured products carousel
    setupCarousel(
        document.getElementById('featured-prev'),
        document.getElementById('featured-next'),
        document.querySelectorAll('.product-carousel')[1]
    );

    // Wholesale carousel
    setupCarousel(
        document.getElementById('wholesale-prev'),
        document.getElementById('wholesale-next'),
        document.querySelectorAll('.product-carousel')[2]
    );

    // Reviews carousel
    setupCarousel(
        document.getElementById('reviews-prev'),
        document.getElementById('reviews-next'),
        document.querySelector('.reviews-carousel')
    );
});

// Add touch swiping for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe(carousel) {
    if (touchStartX - touchEndX > 50) {
        // Swipe left
        carousel.scrollBy({
            left: carousel.clientWidth * 0.5,
            behavior: 'smooth'
        });
    } else if (touchEndX - touchStartX > 50) {
        // Swipe right
        carousel.scrollBy({
            left: -carousel.clientWidth * 0.5,
            behavior: 'smooth'
        });
    }
}

const allCarousels = [
    document.querySelector('.category-carousel'),
    ...document.querySelectorAll('.product-carousel'),
    document.querySelector('.reviews-carousel')
];

allCarousels.forEach(carousel => {
    carousel?.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel?.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(carousel);
    });
});