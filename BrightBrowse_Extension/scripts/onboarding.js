let currentSlide = 0;
const slides = document.getElementsByClassName('carousel-item');
const dots = document.getElementsByClassName('dot');

document.addEventListener('DOMContentLoaded', function() {
    showSlides();
    // Set up click events for buttons
    document.getElementById('loginBtn').onclick = function() { navigate('login.html'); };
    document.getElementById('registerBtn').onclick = function() { navigate('register.html'); };
});

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    currentSlide++;
    if (currentSlide > slides.length) { currentSlide = 1 }
    slides[currentSlide-1].style.display = "block";
    dots[currentSlide-1].className += " active";
    setTimeout(showSlides, 4000); // Change slide every 4 seconds
}

function navigate(page) {
    window.location.href = page;
}
