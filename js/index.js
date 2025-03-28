const base_url = 'https://end-of-phase-project-server-two.vercel.app/wigs';
document.addEventListener("DOMContentLoaded", () => {
    displayWigs();
    createForm(); 
    setupSearch();
});

function displayWigs() {
    fetch(base_url)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Wigs:", data);
            const wigContainer = document.getElementById("wig-images");
            wigContainer.innerHTML = ""; 

            data.forEach(wig => {
                const wigDiv = document.createElement("div");
                wigDiv.innerHTML = `
                    <img src="${wig.image}" alt="${wig.title}">
                    <h3>${wig.title}</h3>
                    <p>${wig.description}</p>
                    <div class="price">${wig.price}</div>
                    <div class="rating">Rating: ${wig.reviews?.rating ?? 'No rating available'}</div>
                    <button class="delete-btn" data-id="${wig.id}">Delete</button>
                `;
                wigContainer.appendChild(wigDiv);

                const deleteButton = wigDiv.querySelector(".delete-btn");
                deleteButton.addEventListener("click", () => deleteWig(wig.id, wigDiv)); 
            });
        })
        .catch(error => console.error("Error fetching wigs:", error));
}

function setupSearch() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const searchValue = searchInput.value.toLowerCase().trim();
        console.log("Search Input:", searchValue); 

        if (searchValue === "") {
            console.warn("Search field is empty");
            return;
        }

        fetch(base_url)
            .then(response => response.json())
            .then(data => {
                const filteredWigs = data.filter(wig => 
                    wig.title.toLowerCase().includes(searchValue)
                );
                displaySearchResults(filteredWigs);
            })
            .catch(error => console.error("Error filtering wigs:", error));
    });
}

function displaySearchResults(wigs) {
    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = ""; 

    if (wigs.length === 0) {
        searchResultsContainer.innerHTML = "<p>No wigs found.</p>";
        return;
    }

    wigs.forEach(wig => {
        const wigDiv = document.createElement("div");
        wigDiv.innerHTML = `
            <img src="${wig.image}" alt="${wig.title}">
            <h3>${wig.title}</h3>
            <p>${wig.description}</p>
            <div class="price">${wig.price}</div>
            <div class="rating">Rating: ${wig.reviews?.rating ?? 'No rating available'}</div>
            <button class="delete-btn" data-id="${wig.id}">Delete</button>
        `;
        const deleteButton = wigDiv.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => deleteWig(wig.id, wigDiv));

        searchResultsContainer.appendChild(wigDiv);
    });
}

function deleteWigFromSearch(id, wigDiv) {
    wigDiv.remove(); 
    console.log(`Deleted wig with ID: ${id} from search results`);
}

function createForm() {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = `
        <form id="wigForm">
            <h2>Add a New Wig</h2>
            <input type="text" id="wigTitle" placeholder="Wig Title" required>
            <input type="text" id="wigPrice" placeholder="Price" required>
            <input type="text" id="wigDescription" placeholder="Description" required>
            <input type="text" id="wigImage" placeholder="Image URL" required>
            <button type="submit">Add Wig</button>
        </form>
    `;
    document.getElementById("wigForm").addEventListener("submit", addWig);
}

function addWig(event) {
    event.preventDefault();

    const newWig = {
        title: document.getElementById("wigTitle").value,
        price: document.getElementById("wigPrice").value,
        description: document.getElementById("wigDescription").value,
        image: document.getElementById("wigImage").value,
        reviews: { rating: 0 }
    };

    fetch(base_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWig)
    })
    .then(response => response.json())
    .then(() => {
        displayWigs(); 
        document.getElementById("wigForm").reset(); 
    })
    .catch(error => console.error("Error adding wig:", error));
}

function deleteWig(id, wigDiv) {
    fetch(`${base_url}/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to delete wig.");
        return response.json();
    })
    .then(() => {
        wigDiv.remove(); 
        console.log(`Wig with ID ${id} deleted.`);
    })
    .catch(error => console.error("Error deleting wig:", error));
}
