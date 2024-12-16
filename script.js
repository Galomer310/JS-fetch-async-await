// Giphy API Key
const API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const gifContainer = document.getElementById("gifContainer");
const gifForm = document.getElementById("gifForm");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Event listener for form submission
gifForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get user input
  const searchTerm = document.getElementById("searchTerm").value.trim();

  // Call the Giphy API
  if (searchTerm) {
    const gifUrl = await fetchRandomGif(searchTerm);
    if (gifUrl) appendGif(gifUrl);
  }
  gifForm.reset();
});

// Fetch a random GIF from Giphy API
async function fetchRandomGif(category) {
  const apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${category}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data?.images?.original?.url || null;
  } catch (error) {
    console.error("Error fetching GIF:", error);
    alert("Could not fetch GIF. Please try again.");
    return null;
  }
}

// Append GIF to the container
function appendGif(gifUrl) {
  const gifItem = document.createElement("div");
  gifItem.classList.add("gif-item");

  // Create image element
  const gifImg = document.createElement("img");
  gifImg.src = gifUrl;
  gifImg.alt = "Random GIF";
  gifImg.style.width = "200px";

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => gifItem.remove());

  // Add image and button to gif item
  gifItem.appendChild(gifImg);
  gifItem.appendChild(deleteBtn);

  // Append gif item to container
  gifContainer.appendChild(gifItem);
}

// Delete all GIFs
deleteAllBtn.addEventListener("click", () => {
  gifContainer.innerHTML = "";
});
