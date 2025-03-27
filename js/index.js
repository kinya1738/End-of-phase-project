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
    createForm();
});

function createForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
        <form id="simpleForm">
            <h2>Sign Up</h2>
            <input type="text" id="name" placeholder="Enter your name" required>
            <input type="email" id="email" placeholder="Enter your email" required>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </form>
        <p id="message"></p>
    `;

    document.body.appendChild(formContainer);

    document.getElementById("simpleForm").addEventListener("submit", submitForm);
    document.getElementById("simpleForm").addEventListener("reset", resetForm);
}

async function submitForm(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    const formData = { name, email };

    try {
        const response = await fetch(base_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Failed to submit");

        const result = await response.json();
        message.textContent = `Thank you, ${name}!`;
        console.log("response:", result);
    } catch (error) {
        message.textContent = "Error submitting the form.";
        console.error("Error:", error);
    }
}

function resetForm() {
    document.getElementById("message").textContent = ""; 
}
