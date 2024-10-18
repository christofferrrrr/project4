// Toggle burger menu visibility
const burgerMenu = document.getElementById("burger-menu");
const navMenuContainer = document.querySelector(".nav-menu-container");

if (burgerMenu && navMenuContainer) {
    burgerMenu.addEventListener("click", function () {
        navMenuContainer.classList.toggle("active");
    });
}

// Form handling for card search
const form = document.getElementById('card-search-form');
const searchInput = document.getElementById('search-input');
const cardContainer = document.getElementById('card-container');
const typeSelect = document.getElementById('type-select');
const attributeSelect = document.getElementById('attribute-select');
const raceSelect = document.getElementById('race-select');
const archetypeSelect = document.getElementById('archetype-select');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        const filters = {
            type: typeSelect.value,
            attribute: attributeSelect.value,
            race: raceSelect.value,
            archetype: archetypeSelect.value,
        };
        searchCards(query, filters);
    });
}

// Fetch and filter card data
async function searchCards(query, filters) {
    try {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${query}`);
        const data = await response.json();
        const cards = data.data;

        const filteredCards = cards.filter(card => {
            const cardArchetype = (card.archetype || '').toLowerCase();
            const filterArchetype = filters.archetype.toLowerCase();

            return (filters.type === "Select Type" || card.type === filters.type) &&
                (filters.attribute === "Select Attribute" || card.attribute === filters.attribute) &&
                (filters.race === "Select Race" || card.race === filters.race) &&
                (filters.archetype === "Select Archetype" || cardArchetype === filterArchetype);
        });

        displayCards(filteredCards);
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
}

// Display filtered cards
function displayCards(cards) {
    cardContainer.innerHTML = '';
    if (cards.length === 0) {
        cardContainer.innerHTML = '<p>No cards found.</p>';
        return;
    }

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <img src="${card.card_images[0].image_url}" alt="${card.name}">
            <h3>${card.name}</h3>
            <p>${card.type}</p>
            <p>Attribute: ${card.attribute}</p>
            <p>Level: ${card.level}</p>
            <p>ATK: ${card.atk} / DEF: ${card.def}</p>
            <p>Description: ${card.desc}</p>
        `;
        cardContainer.appendChild(cardElement);
    });
}

// Filter archetype options based on input
document.getElementById("archetype-select").addEventListener("input", function() {
    const filterValue = this.value.toLowerCase();
    const options = document.querySelectorAll("#archetype-select option");

    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(filterValue)) {
            option.classList.remove('hidden');
        } else {
            option.classList.add('hidden');
        }
    });
});

// Download file utility function
window.downloadFile = function(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

// Random card and deck buttons
const randomCardBtn = document.getElementById('random-card');
const randomDeckBtn = document.getElementById('random-deck');

if (randomCardBtn) {
    randomCardBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        await displayRandomCard();
    });
}

if (randomDeckBtn) {
    randomDeckBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        await displayRandomDeck();
    });
}

// Fetch and display a random card
async function displayRandomCard() {
    try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        const data = await response.json();
        const cards = data.data;
        const randomIndex = Math.floor(Math.random() * cards.length);
        displayCards([cards[randomIndex]]);
    } catch (error) {
        console.error('Error fetching random card:', error);
    }
}

// Fetch and display a random deck
async function displayRandomDeck() {
    try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/archetypes.php');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch archetypes. Status: ${response.status}`);
        }
        
        const archetypesData = await response.json();
        console.log('Archetypes API response:', archetypesData);

        if (!Array.isArray(archetypesData) || archetypesData.length === 0) {
            throw new Error('No archetypes found or unexpected response format.');
        }

        const randomIndex = Math.floor(Math.random() * archetypesData.length);
        const randomArchetype = archetypesData[randomIndex].archetype_name;
        console.log('Selected random archetype:', randomArchetype);

        if (!randomArchetype) {
            throw new Error('Random archetype is undefined or null.');
        }
        
        const cardsResponse = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${encodeURIComponent(randomArchetype)}`);
        
        if (!cardsResponse.ok) {
            throw new Error(`Failed to fetch cards for archetype ${randomArchetype}. Status: ${cardsResponse.status}`);
        }
        
        const cardsData = await cardsResponse.json();
        const cards = cardsData.data;

        if (!Array.isArray(cards)) {
            throw new Error('Unexpected response format: Expected an array of cards.');
        }
        
        const filteredCards = cards.filter(card => card.archetype === randomArchetype);

        cardContainer.innerHTML = `<p>Deck Type: ${randomArchetype}</p>`;
        displayCards(filteredCards);
    } catch (error) {
        console.error('Error fetching random deck:', error);
    }
}
