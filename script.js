document.addEventListener("DOMContentLoaded", function() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const submitBtn = document.getElementById('submit-btn');
    const selectedStickersLabel = document.getElementById('selected-stickers-label');
    const paginationContainer = document.getElementById('pagination-container');
    const categorySelect = document.getElementById('categorySelect');
    

    const stickersPerPage = 10;  // Number of stickers per page
    let currentPage = 1;  // Current page number

    // Categories and their corresponding image counts
    const stickerCategories = {
        // ... your categories
        
        'basketball': 6,
        'one-piece': 20, // Use lowercase and hyphenated format
        'anesthesie':18,
        'meme': 20,
        "arcane":2,
        "architecture":5,
        "art":9,
        "attackOnTitins":2,
        "avatar":3,
        "avenger":9,
        "batman":2,
        "berserk":5,
        "blackClover":2,
        "bleatch":4,
        "box":1,
        "fightClub":2,
        "breakingBad":3,
        "classroomOfElits":2,
        "dark":1,
        "deadpool":4,
        "deathnote":3,
        "demonSlayer":2,
        "dragonBall":2,
        "fightClub":2,
        "animefilms":2,
        "football":10,
        "forestGump":1,
        "freinds":2,
        "games":4,
        "godFather":1,
        "gta":5,
        "gumbull":2,
        "harryPotter":6,
        "howIMetYourMother":1,
        "howToTrainYourDragon":2,
        "hxh":1,
        "info":10,
        "intersteller":1,
        "invincible":2,
        "jjk":34,
        "jojo":1,
        "joker":2,
        "klem":27,
        "kongfuPanda":1,
        "lacasadelpaper":1,
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
        "naruto":4,
        "nimo":1,
        "nurse":11,
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

        // Update pagination only for the "all" category
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
        checkbox.classList.add(category);

        const label = document.createElement('label');
        label.textContent = `${category} `;

        const stickerDiv = document.createElement('div');
        stickerDiv.appendChild(img);
        stickerDiv.appendChild(checkbox);
        stickerDiv.appendChild(label);

        thumbnailsContainer.appendChild(stickerDiv);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    

    

    // Function to update pagination controls
    function updatePagination() {
        paginationContainer.innerHTML = ''; // Clear existing pagination buttons
        const totalStickers = Object.values(stickerCategories).reduce((a, b) => a + b, 0);
        const totalPages = Math.ceil(totalStickers / stickersPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-button');
            if (i === currentPage) button.classList.add('active');

            button.addEventListener('click', function() {
                currentPage = i;
                renderStickers(currentPage, categorySelect.value);
            });

            paginationContainer.appendChild(button);
            scrollToTop(); // Scroll to the top when the page changes
        }
    }

    // Initial render for "all" category
    renderStickers(currentPage);

    submitBtn.addEventListener('click', function() {
        const selectedStickers = [];
        const checkboxes = document.querySelectorAll('.thumbnails input[type="checkbox"]:checked');
    
        checkboxes.forEach(checkbox => {
            const category = checkbox.classList[0];
            const index = checkbox.value.match(/\d+$/)[0];  // Extract number from value
            selectedStickers.push(`${category}/${category} (${index})`);
        });
    
        const stickerInput = document.getElementById('sticker');
        if (selectedStickers.length > 0) {
            selectedStickersLabel.textContent = selectedStickers.join(', ');
            stickerInput.value = selectedStickers.join(', '); // Populate input field
    
            // Alert the user
            alert("Submission successfully!");
        } else {
            selectedStickersLabel.textContent = 'No stickers selected';
            stickerInput.value = ''; // Clear the input field if no stickers are selected
    
            // Alert the user
            alert("No stickers selected!");
        }
    });
    

    // Filter stickers based on selected category
    categorySelect.addEventListener('change', function() {
        currentPage = 1;  // Reset to first page on category change
        const selectedCategory = categorySelect.value;
        renderStickers(currentPage, selectedCategory);
    });
});

// Unselect all stickers
function unselectAllStickers() {
    const checkboxes = document.querySelectorAll('.thumbnails input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    // Clear the label
    const selectedStickersLabel = document.getElementById('selected-stickers-label');
    selectedStickersLabel.textContent = ''; // Clear the label text
}

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