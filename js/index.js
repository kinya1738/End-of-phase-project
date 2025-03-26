const base_url = 'http://localhost:4000/wigs'

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
                    <div>${wig.price}</div>
                `;

                wigContainer.appendChild(wigImages);
            });
        })
        .catch(error => console.error("Error fetching wigs:", error));
});

