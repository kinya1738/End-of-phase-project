
const base_url = 'https://end-of-phase-project-server-two.vercel.app/wigs'
document.addEventListener("DOMContentLoaded", () => {
    displayWigs();
    createForm(); 
});

function displayWigs() {
    fetch(base_url)
        .then(response => response.json())
        .then(data => {
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
            });
        })
        .catch(error => console.error("Error fetching wigs:", error));
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

function deleteWig(id) {
    fetch(`${base_url}/${wigId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to delete wig.");
        return response.json();
    })
    .then(() => {
        displayWigs();
    })
    .catch(error => console.error("Error deleting wig:", error));
}