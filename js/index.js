const base_url = 'http://localhost:3000/wigs'

document.addEventListener("DOMContentLoaded", () => {
    fetch(base_url) 
        .then(response => response.json())
        .then(data => {
            const wigContainer = document.getElementById("wig-images"); 

            data.forEach(wig => {
                const wigImages = document.createElement("div");
    
             wigImages.innerHTML = `
                    <img src="${wig.image}" alt="${wig.title}">
                    <h3>${wig.title}</h3>
                    <p>${wig.description}</p>
                    <div class="price">${wig.price}</div>
                    <div class="rating">Rating: ${wig.reviews?.rating ?? 'No rating available'}</div>
                    `;

                wigContainer.appendChild(wigImages);
            });
        })
        .catch(error => console.error("Error fetching wigs:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
        <form id="simpleForm">
            <input type="text" id="name" placeholder="Enter your name" required>
            <input type="email" id="email" placeholder="Enter your email" required>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </form>
        <p id="message"></p>
    `;

    document.body.appendChild(formContainer);

    document.getElementById("simpleForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        document.getElementById("message").textContent = `Thank you for signing up`;
    });
});

