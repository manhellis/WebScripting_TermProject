

const url = "https://ifsc.results.info/api/v1/info";

fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br', // Note: 'Accept-Encoding' is typically controlled by the browser
        'Accept-Language': 'en-US,en;q=0.9',
    }
})
    .then((response) => response.json())
    .then((data) => {
        displayData(data);
    })
    .catch((error) => console.error("Error:", error));

function displayData(data) {
    const container = document.getElementById("apiResponse");
    container.innerHTML = JSON.stringify(data, null, 2); // Or format as needed
}
