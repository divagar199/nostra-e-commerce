// Navbar Toggle Functionality
var navLinks = document.getElementById("navLinks");

function toggleMenu() {

    if (navLinks.style.right === "0px") {
        navLinks.style.right = "-200px";
    } else {
        navLinks.style.right = "0px";
    }
}

// Collection Page Filtering 
const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const productList = productContainer ? productContainer.querySelectorAll(".product-card") : [];
const checkboxes = document.querySelectorAll("input[type='checkbox']");

// Function to filter products
function filterProducts() {
    const searchValue = searchInput.value.toLowerCase();

    // Get all checked values
    let checkedCategories = [];
    checkboxes.forEach(box => {
        if (box.checked) checkedCategories.push(box.value.toLowerCase());
    });

    productList.forEach(product => {
        const productTags = product.getAttribute("data-tags");
        const productName = product.querySelector("h4").innerText.toLowerCase();


        const matchesSearch = productName.includes(searchValue) || productTags.includes(searchValue);


        const matchesCheckbox = checkedCategories.length === 0 ||
            checkedCategories.some(tag => productTags.includes(tag));

        if (matchesSearch && matchesCheckbox) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Add Event Listeners if elements exist
if (searchInput) {
    searchInput.addEventListener("keyup", filterProducts);
    checkboxes.forEach(box => {
        box.addEventListener("change", filterProducts);
    });
}

// Login Toggle
function toggleAuth() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Toggle hidden class
    if (loginForm && signupForm) {
        loginForm.classList.toggle("hidden");
        signupForm.classList.toggle("hidden");
    }
}

//Horizontal Carousel (Auto-Scroll + Buttons)

const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselWrapper = document.querySelector('.carousel-wrapper');

if (carouselTrack && prevBtn && nextBtn) {

    //  Define Scroll Amount 
    function getScrollAmount() {
        const item = carouselTrack.querySelector('.carousel-item');
        return item.offsetWidth + 30;
    }

    // Button Click Logic
    nextBtn.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        carouselTrack.scrollLeft += scrollAmount;
    });

    prevBtn.addEventListener('click', () => {
        const scrollAmount = getScrollAmount();
        carouselTrack.scrollLeft -= scrollAmount;
    });

    //  Auto-Scroll Logic
    let scrollInterval;
    const autoScrollDelay = 3000;

    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            const scrollAmount = getScrollAmount();


            const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;

            if (carouselTrack.scrollLeft >= maxScroll - 10) { // 

                carouselTrack.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carouselTrack.scrollLeft += scrollAmount;
            }
        }, autoScrollDelay);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    // Start auto-scrolling
    startAutoScroll();
    carouselWrapper.addEventListener('mouseenter', stopAutoScroll);
    carouselWrapper.addEventListener('mouseleave', startAutoScroll);
}
