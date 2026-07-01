const results = [
  { score: "0.912", modality: "SAR", image: "one sar", tags: ["Urban", "Water", "Vegetation"] },
  { score: "0.879", modality: "Optical", image: "two", tags: ["Urban", "Water"] },
  { score: "0.845", modality: "Multispectral", image: "three", tags: ["Urban", "Water", "Vegetation"] },
  { score: "0.823", modality: "SAR", image: "four sar", tags: ["Agriculture", "Water"] },
  { score: "0.801", modality: "Optical", image: "five", tags: ["Urban", "Water", "Agriculture"] },
  { score: "0.781", modality: "Multispectral", image: "one", tags: ["Urban", "Vegetation"] },
  { score: "0.764", modality: "SAR", image: "two sar", tags: ["Water", "Vegetation", "Agriculture"] },
  { score: "0.742", modality: "Optical", image: "three", tags: ["Urban", "Water", "Vegetation"] },
  { score: "0.721", modality: "SAR", image: "four sar", tags: ["Urban", "Water", "Agriculture"] },
  { score: "0.708", modality: "Multispectral", image: "five", tags: ["Agriculture", "Vegetation", "Water"] }
];

const tagClass = {
  Urban: "urban",
  Water: "water",
  Vegetation: "vegetation",
  Agriculture: "agriculture",
  SAR: "sar"
};

const resultsGrid = document.querySelector("#resultsGrid");

function renderResults() {
  resultsGrid.innerHTML = results.map((result, index) => {
    const tags = result.tags
      .map((tag) => `<span class="tag ${tagClass[tag] || ""}">${tag}</span>`)
      .join("");

    return `
      <article class="result-card">
        <span class="rank">${index + 1}</span>
        <div class="thumb ${result.image}"></div>
        <div class="result-info">
          <div class="score-line">Score: <strong>${result.score}</strong></div>
          <div class="modality-line">Modality: <span class="tag ${tagClass[result.modality] || "vegetation"}">${result.modality}</span></div>
          <div class="score-line">Tags:</div>
          <div class="tags">${tags}</div>
        </div>
      </article>
    `;
  }).join("");
}

renderResults();

const runButton = document.querySelector("#runButton");

runButton.addEventListener("click", () => {
  const original = runButton.textContent;
  runButton.textContent = "Retrieving...";
  runButton.disabled = true;

  document.querySelectorAll(".result-card").forEach((card) => {
    card.style.opacity = "0.45";
    card.style.transform = "translateY(2px)";
  });

  window.setTimeout(() => {
    runButton.innerHTML = '<span class="search-icon" aria-hidden="true"></span> Run Retrieval';
    runButton.disabled = false;
    document.querySelectorAll(".result-card").forEach((card, index) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.transition = `opacity 160ms ease ${index * 20}ms, transform 160ms ease ${index * 20}ms`;
    });
  }, 700);
});
