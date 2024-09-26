// Load the JSON file using Fetch API
fetch('../../json/reviews.json')
    .then(response => response.json())
    .then(data => generateTable(data))
    .catch(error => console.error('Error loading JSON:', error));

// Function to generate the table based on JSON data
function generateTable(data) {
    const table = document.getElementById("reviewsTable");

    // Create the table header
    const thead = document.createElement("thead");
    const headerRow1 = document.createElement("tr");
    const headerRow2 = document.createElement("tr");

    // Artist and Album headers
    const artistHeader = document.createElement("th");
    artistHeader.colSpan = 2;
    artistHeader.textContent = data.reviews[0].artist;

    const albumHeader = document.createElement("th");
    albumHeader.colSpan = 2;
    albumHeader.textContent = data.reviews[0].album;

    // Append headers to the table
    headerRow1.appendChild(artistHeader);
    headerRow2.appendChild(albumHeader);
    thead.appendChild(headerRow1);
    thead.appendChild(headerRow2);

    // Create the table body
    const tbody = document.createElement("tbody");

    data.reviews.forEach(review => {
        const row = document.createElement("tr");
        const songCell = document.createElement("td");
        const ratingCell = document.createElement("td");

        songCell.textContent = review.song;
        ratingCell.textContent = review.rating;

        row.appendChild(songCell);
        row.appendChild(ratingCell);
        tbody.appendChild(row);
    });

    // Append thead and tbody to the table
    table.appendChild(thead);
    table.appendChild(tbody);
}
