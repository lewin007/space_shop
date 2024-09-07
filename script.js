document.addEventListener("DOMContentLoaded", function () {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const submitBtn = document.getElementById('submit-btn');
    const selectedStickersLabel = document.getElementById('selected-stickers-label');
    const paginationContainer = document.getElementById('pagination-container');
    const categorySelect = document.getElementById('categorySelect');

    const stickersPerPage = 10;  // Number of stickers per page
    let currentPage = 1;  // Current page number
    let selectedStickers = [];  // Global array to store selected stickers

    // Categories and their corresponding image counts
    const stickerCategories = {
        'basketball': 6,
        'one-piece': 22, // Use lowercase and hyphenated format
        'anesthesie':18,
        'meme': 22,
        "arcane":6,
        "architecture":5,
        "art":9,
        "attackOnTitins":5,
        "avatar":3,
        "avenger":9,
        "batman":2,
        "berserk":5,
        "blackClover":2,
        "bleatch":4,
        "box":1,
        "fightClub":2,
        "breakingBad":4,
        "classroomOfElits":2,
        "dark":1,
        "deadpool":4,
        "deathnote":3,
        "demonSlayer":6,
        "dragonBall":2,
        "fightClub":2,
        "animefilms":2,
        "football":20,
        "forestGump":1,
        "freinds":2,
        "games":11,
        "godFather":1,
        "gta":5,
        "gumbull":2,
        "harryPotter":6,
        "howIMetYourMother":1,
        "howToTrainYourDragon":2,
        "hxh":2,
        "info":20,
        "intersteller":1,
        "invincible":2,
        "jjk":34,
        "jojo":1,
        "joker":2,
        "klem":27,
        "kongfuPanda":1,
        "lacasadelpaper":2,
        "lalaland":1,
        "love":5,
        "loveIsWar":1,
        "matrix":1,
        "miyamora":1,
        "monsters":1,
        "moonNight":1,
        "mrRobot":1,
        "mushukutensai":1,
        "myHeroAcademy":1,
        "naruto":20,
        "nimo":1,
        "nurse":25,
        "oiretsOfKaribian":1,
        "onePenchman":1,
        "openhaimer":1,
        "palastine":5,
        "peakyBlinders":7,
        "prisonBreak":2,
        "rapanzul":2,
        "ratatoille":1,
        "rickAndMorty":7,
        "science":2,
        "sialentVoice":2,
        "simson":1,
        "soloLeveling":4,
        "songsAndSingers":6,
        "spacetoon":12,
        "spiderman":2,
        "spongbob":5,
        "strangerThings":1,
        "the100":1,
        "topGun":1,
        "toyStory":1,
        "villandSaga":5,
        "wednesday":1,
        "zatla":3,    
        "kaijono8":5,
        // (rest of your categories here)
    };

    // Function to render stickers based on the current page and category
    function renderStickers(page, category = 'all') {
        thumbnailsContainer.innerHTML = ''; // Clear current stickers

        const start = (page - 1) * stickersPerPage;
        const end = start + stickersPerPage;
        let stickerIndex = 0;
        let displayedStickers = 0;

        Object.keys(stickerCategories).forEach(cat => {
            const imageCount = stickerCategories[cat];
            for (let i = 1; i <= imageCount; i++) {
                if (category === 'all' || cat === category) {
                    if (category === 'all' && (stickerIndex >= start && stickerIndex < end)) {
                        createStickerElement(cat, i);
                    } else if (category !== 'all') {
                        createStickerElement(cat, i);
                        displayedStickers++;
                    }
                    stickerIndex++;
                }
            }
        });

            // Scroll to the top of the page when a new page is rendered
            window.scrollTo({ top: 0, behavior: 'smooth' });

        if (category === 'all') {
            updatePagination();
        } else {
            paginationContainer.innerHTML = ''; // Clear pagination when not viewing "all"
        }
    }

// Helper function to create and append a sticker element
function createStickerElement(category, index) {
    const img = document.createElement('img');
    img.src = `${category}/${category} (${index}).JPG`;
    img.alt = `${category} Sticker ${index}`;
    img.classList.add('sticker');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = `${category} Sticker ${index}`;
    checkbox.name = `sticker${index}`;
    checkbox.classList.add(category, 'sticker-checkbox'); // Add a class for easier styling

    // Check if this sticker is already selected
    if (selectedStickers.includes(checkbox.value)) {
        checkbox.checked = true;  // Keep it checked if it was selected
    }

    // Event listener to handle checkbox selection/deselection
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            // Add to the array if checked and not already present
            if (!selectedStickers.includes(checkbox.value)) {
                selectedStickers.push(checkbox.value);
            }
        } else {
            // Remove from the array if unchecked
            selectedStickers = selectedStickers.filter(item => item !== checkbox.value);
        }

        // Update form input and label
        updateStickerSelectionUI();
    });

    // Add click event listener to the image to toggle the checkbox
    img.addEventListener('click', function () {
        checkbox.checked = !checkbox.checked; // Toggle the checkbox state
        checkbox.dispatchEvent(new Event('change')); // Manually trigger the change event
    });

    const stickerDiv = document.createElement('div');
    stickerDiv.classList.add('sticker-container'); // Add a class for styling
    stickerDiv.appendChild(img);
    stickerDiv.appendChild(checkbox);

    thumbnailsContainer.appendChild(stickerDiv);
}


    // Function to update the form input and label based on the current selected stickers
    function updateStickerSelectionUI() {
        const stickerInput = document.getElementById('sticker');
        if (selectedStickers.length > 0) {
            selectedStickersLabel.textContent = selectedStickers.join(', ');
            stickerInput.value = selectedStickers.join(', '); // Populate input field
        } else {
            selectedStickersLabel.textContent = 'No stickers selected';
            stickerInput.value = ''; // Clear input field if no stickers are selected
        }
    }

// Function to update pagination controls
function updatePagination() {
    paginationContainer.innerHTML = ''; // Clear existing pagination buttons
    const totalStickers = Object.values(stickerCategories).reduce((a, b) => a + b, 0);
    const totalPages = Math.ceil(totalStickers / stickersPerPage);

    const maxVisiblePages = 3; // Number of pages to show before "..."
    const lastPage = totalPages; // The last page number

    // Helper to create pagination buttons
    function createButton(pageNumber) {
        const button = document.createElement('button');
        button.textContent = pageNumber;
        button.classList.add('pagination-button');
        if (pageNumber === currentPage) button.classList.add('active');
        
        button.addEventListener('click', function () {
            currentPage = pageNumber;
            renderStickers(currentPage, categorySelect.value);
        });
        
        paginationContainer.appendChild(button);
    }

    // Always display the first page
    createButton(1);

    // Show the first few pages (1, 2, 3...)
    if (currentPage > maxVisiblePages + 1) {
        paginationContainer.appendChild(document.createTextNode("..."));
    }

    // Show the surrounding pages (current page, previous, and next)
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, lastPage - 1); i++) {
        createButton(i);
    }

    // Show the last page with "..." if necessary
    if (currentPage < lastPage - maxVisiblePages) {
        paginationContainer.appendChild(document.createTextNode("..."));
    }
    
    // Always display the last page
    if (lastPage > 1) createButton(lastPage);
}


    // Initial render for "all" category
    renderStickers(currentPage);

// Function to unselect all stickers
function unselectAllStickers() {
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('.thumbnails input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Uncheck each checkbox
    });

    // Clear the selected stickers array
    selectedStickers = [];

    // Update the form input and label to reflect that no stickers are selected
    updateStickerSelectionUI();
}

// Attach event listener to the unselect button
document.getElementById('unselect-btn').addEventListener('click', unselectAllStickers);


    // Attach event listeners
    document.getElementById('unselect-btn').addEventListener('click', unselectAllStickers);

// Pricing rules
const pricingRules = [
    { count: 32, price: 26 },
    { count: 25, price: 22 },
    { count: 20, price: 17 },
    { count: 15, price: 13 },
    { count: 12, price: 10 },
    { count: 1, price: 1 } // Price for a single sticker
];

// Function to calculate the cost based on the number of stickers
function calculateCost(numStickers) {
    let totalCost = 0;
    let remainingStickers = numStickers;

    // Apply pricing rules from highest to lowest
    for (let rule of pricingRules) {
        if (remainingStickers >= rule.count) {
            const numOfSets = Math.floor(remainingStickers / rule.count);
            totalCost += numOfSets * rule.price;
            remainingStickers -= numOfSets * rule.count;
        }
    }

    // Add cost for any remaining stickers (use the smallest rule price for leftovers)
    if (remainingStickers > 0) {
        totalCost += remainingStickers * pricingRules[pricingRules.length - 1].price;
    }

    return totalCost;
}

// Submit button functionality
submitBtn.addEventListener('click', function () {
    const numSelectedStickers = selectedStickers.length;
    const totalCost = calculateCost(numSelectedStickers);
    
    if (numSelectedStickers > 0) {
        alert(`Submission successful! Total cost: ${totalCost} DT`);
    } else {
        alert("No stickers selected!");
    }
});


    // Filter stickers based on selected category
    categorySelect.addEventListener('change', function () {
        currentPage = 1;  // Reset to first page on category change
        renderStickers(currentPage, categorySelect.value);
    });

        // Set default value of the category select dropdown to "all" on page load
        categorySelect.value = 'all';

        // Initial render for "all" category
        renderStickers(currentPage);
});

document.addEventListener("scroll", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 600) {
        scrollToTopBtn.classList.add("visible");
    } else {
        scrollToTopBtn.classList.remove("visible");
    }
});

document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener("scroll", function() {
    const scrollTodownBtn = document.getElementById("scrollTodownBtn");
    if (window.scrollY > 600) {
        scrollTodownBtn.classList.add("visible");
    } else {
        scrollTodownBtn.classList.remove("visible");
    }
});

document.getElementById("scrollTodownBtn").addEventListener("click", function() {
    const scrollAmount = window.innerHeight * 2; // You can adjust this value as needed
    window.scrollTo({
        top: window.scrollY + scrollAmount,
        behavior: "smooth"
    });
});
