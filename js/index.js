// const base_url = 'http://localhost:3000/wigs'

// document.addEventListener("DOMContentLoaded", () => {
//     fetch(base_url) 
//         .then(response => response.json())
//         .then(data => {
//             const wigContainer = document.getElementById("wig-images"); 

//             data.forEach(wig => {
//                 const wigImages = document.createElement("div");
    
//              wigImages.innerHTML = `
//                     <img src="${wig.image}" alt="${wig.title}">
//                     <h3>${wig.title}</h3>
//                     <p>${wig.description}</p>
//                     <div class="price">${wig.price}</div>
//                     <div class="rating">Rating: ${wig.reviews?.rating ?? 'No rating available'}</div>
//                     `;

//                 wigContainer.appendChild(wigImages);
//             });
//         })
//         .catch(error => console.error("Error fetching wigs:", error));
// });

// document.addEventListener("DOMContentLoaded", () => {
//     createForm();
// });

// function createForm() {
//     const formContainer = document.createElement("div");
//     formContainer.innerHTML = `
//         <form id="simpleForm">
//             <h2>Sign Up</h2>
//             <input type="text" id="name" placeholder="Enter your name" required>
//             <input type="email" id="email" placeholder="Enter your email" required>
//             <button type="submit">Submit</button>
//             <button type="reset">Reset</button>
//         </form>
        
//     `;

//     document.body.appendChild(formContainer);

//     document.getElementById("simpleForm").addEventListener("submit", submitForm);
//     document.getElementById("simpleForm").addEventListener("reset", resetForm);
// }

// async function submitForm(event) {
//     event.preventDefault(); 

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const message = document.getElementById("message");

//     const formData = { name, email };

//     try {
//         const response = await fetch(base_url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });
  
//         if (!response.ok) throw new Error("Failed to submit");

//         const result = await response.json();
//         message.textContent = `Thank you, ${name}!`;
//         console.log("response:", result);
//     } catch (error) {
//         message.textContent = "Error submitting the form.";
//         console.error("Error:", error);
//     }
// }

// function resetForm() {
//     document.getElementById("message").textContent = ""; 
// }


const base_url = 'http://localhost:3000/wigs'
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
    fetch(`${base_url}/${id}`, {
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