// Load the JSON file using Fetch API
fetch('../../json/reviews.json')
    .then(response => response.json())
    .then(data => generateTable(data))
    .catch(error => console.error('Error loading JSON:', error));

// Function to generate the table based on filtered JSON data
function generateTable(data) {
    const artist = document.getElementById('artist').dataset.artist;
    const album = document.getElementById('album').dataset.album;
    const table = document.getElementById("reviewsTable");

    // Filter reviews by specified artist and album
    const filteredReviews = data.reviews
        .filter(review => review.artist === artist && review.album === album)
        .sort((a, b) => a.track - b.track); // Sort by track number

    if (filteredReviews.length === 0) {
        table.innerHTML = `<tr><td colspan="2">No songs found for ${artist} - ${album}</td></tr>`;
        return;
    }

    // Create the table header
    const thead = document.createElement("thead");
    const headerRow1 = document.createElement("tr");
    const headerRow2 = document.createElement("tr");

    // Artist and Album headers
    const artistHeader = document.createElement("th");
    artistHeader.colSpan = 2;
    artistHeader.textContent = artist;

    const albumHeader = document.createElement("th");
    albumHeader.colSpan = 2;
    albumHeader.textContent = album;

    // Append headers to the table
    headerRow1.appendChild(artistHeader);
    headerRow2.appendChild(albumHeader);
    thead.appendChild(headerRow1);
    thead.appendChild(headerRow2);

    // Create the table body
    const tbody = document.createElement("tbody");

    // Generate rows for each track in the correct order
    filteredReviews.forEach(review => {
        const row = document.createElement("tr");
        const trackCell = document.createElement("td");
        const songCell = document.createElement("td");
        const ratingCell = document.createElement("td");

        trackCell.textContent = review.track;
        songCell.textContent = review.song;
        ratingCell.textContent = review.rating;

        row.appendChild(trackCell);
        row.appendChild(songCell);
        row.appendChild(ratingCell);
        tbody.appendChild(row);
    });

    // Append thead and tbody to the table
    table.appendChild(thead);
    table.appendChild(tbody);
}
