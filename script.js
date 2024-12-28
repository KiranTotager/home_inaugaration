document.addEventListener('DOMContentLoaded', () => {
    // Invitation Card Click Effect
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        });
    }
    console.log("Invitation card loaded successfully!");

    // Slideshow Initialization
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    let slideIndex = 0;
    const slideCount = slides.length;

    // Generate dots for each slide
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => showSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dots-container span');

    // Function to display the current slide and highlight the dot
    function showSlide(index) {
        if (index >= slideCount) slideIndex = 0;
        if (index < 0) slideIndex = slideCount - 1;

        // For horizontal sliding
        slidesWrapper.style.transform = `translateX(-${100 * slideIndex}%)`;
        dots.forEach((dot, i) => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
    }

    // Auto change slides every 4 seconds
    function autoShowSlides() {
        slideIndex++;
        if (slideIndex >= slideCount) slideIndex = 0;
        showSlide(slideIndex);
        setTimeout(autoShowSlides, 4000); // Change slide every 4 seconds
    }

    // Initialize slideshow
    showSlide(slideIndex);
    autoShowSlides();

    // Add touch swipe functionality for mobile devices
    let startX, endX;

    document.querySelector('.slideshow-container').addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    document.querySelector('.slideshow-container').addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    // Function to handle swipe gestures
    function handleSwipe() {
        if (startX > endX + 50) { // Swipe left (next slide)
            slideIndex++;
        } else if (startX < endX - 50) { // Swipe right (previous slide)
            slideIndex--;
        }
        showSlide(slideIndex);
    }
});
