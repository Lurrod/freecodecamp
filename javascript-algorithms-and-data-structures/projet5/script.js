const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokedex = document.getElementById("pokedex");

// Type colors mapping
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC"
};

// Create loading spinner
const createLoadingSpinner = () => {
  const spinner = document.createElement("div");
  spinner.id = "loading-spinner";
  spinner.innerHTML = `
    <div class="spinner">
      <div class="pokeball"></div>
      <p>Loading...</p>
    </div>
  `;
  return spinner;
};

// Format stat name
const formatStatName = (statName) => {
  return statName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Update stats with animation
const updateStats = (stats) => {
  stats.forEach(stat => {
    const statElement = document.getElementById(stat.stat.name);
    if (statElement) {
      const maxStat = 255; // Maximum possible stat value
      const percentage = (stat.base_stat / maxStat) * 100;
      
      statElement.innerHTML = `
        <div class="stat-name">${formatStatName(stat.stat.name)}</div>
        <div class="stat-bar">
          <div class="stat-fill" style="width: ${percentage}%"></div>
          <div class="stat-value">${stat.base_stat}</div>
        </div>
      `;
    }
  });
};

// Display error message
const showError = (message) => {
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;
  pokedex.appendChild(error);
  setTimeout(() => error.remove(), 3000);
};

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  // Show loading spinner
  pokedex.style.opacity = "0.5";
  document.body.appendChild(createLoadingSpinner());

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) throw new Error("Pokémon not found!");

    const data = await response.json();

    // Update Pokemon info with fade effect
    document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${String(data.id).padStart(3, '0')}`;
    document.getElementById("weight").textContent = `Weight: ${(data.weight / 10).toFixed(1)} kg`;
    document.getElementById("height").textContent = `Height: ${(data.height / 10).toFixed(1)} m`;

    // Update types with colors
    const typesContainer = document.getElementById("types");
    typesContainer.innerHTML = "";
    data.types.forEach(typeInfo => {
      const typeElement = document.createElement("p");
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      typeElement.style.backgroundColor = typeColors[typeInfo.type.name] || "#999999";
      typesContainer.appendChild(typeElement);
    });

    // Update stats with animation
    updateStats(data.stats);

    // Update sprite with fade effect
    const sprite = document.getElementById("sprite");
    sprite.style.opacity = "0";
    sprite.src = data.sprites.front_default;
    sprite.onload = () => sprite.style.opacity = "1";

  } catch (error) {
    showError(error.message);
  } finally {
    // Remove loading spinner and restore opacity
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.remove();
    pokedex.style.opacity = "1";
  }
});

// Add keyboard support
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchButton.click();
});