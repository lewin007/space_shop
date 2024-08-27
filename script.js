document.addEventListener("DOMContentLoaded", function() {
    const thumbnailsContainer = document.querySelector('.thumbnails');

    // Categories and their corresponding image counts
    const stickerCategories = {
        'basketball': 6,
        'one-piece': 20, // Use lowercase and hyphenated format
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
        "howToTrainYourDragon":1,
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
        "nurse":10,
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
        "spacetoon":10,
        "spiderman":2,
        "spongbob":5,
        "strangerThings":1,
        "the100":1,
        "topGun":1,
        "toyStory":1,
        "villandSaga":5,
        "wednesday":1,
        "zatla":3,

        // Add other categories and the number of images for each
    };

    Object.keys(stickerCategories).forEach(category => {
        const imageCount = stickerCategories[category];
        for (let i = 1; i <= imageCount; i++) {
            const img = document.createElement('img');
            img.src = `${category}/${category} (${i}).JPG`;  // Load image based on folder and name
            img.alt = `${category} Sticker ${i}`;
            img.classList.add('sticker'); // Add class to image

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = `${category} Sticker ${i}`;
            checkbox.name = `sticker${i}`;
            checkbox.classList.add(category);  // Add category as class

            const label = document.createElement('label');
            label.textContent = `${category} `;

            const stickerDiv = document.createElement('div');
            stickerDiv.appendChild(img);
            stickerDiv.appendChild(checkbox);
            stickerDiv.appendChild(label);

            thumbnailsContainer.appendChild(stickerDiv);
        }
    });
});

// Filter stickers based on category
function filterStickers() {
    const selectedCategory = document.getElementById('categorySelect').value;
    const stickers = document.querySelectorAll('.thumbnails > div');

    stickers.forEach(sticker => {
        const img = sticker.querySelector('img');
        const checkbox = sticker.querySelector('input[type="checkbox"]');

        if (selectedCategory === 'all' || checkbox.classList.contains(selectedCategory)) {
            sticker.style.display = 'block';
        } else {
            sticker.style.display = 'none';
        }
    });
}

// Unselect all stickers
function unselectAllStickers() {
    const checkboxes = document.querySelectorAll('.thumbnails input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

document.addEventListener("scroll", function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 300) {
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

