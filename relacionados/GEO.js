const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const geografiaTerms = [
    "geografia", "cartografia", "climatologia", "geologia", "hidrografia",
    "biogeografia", "geografia humana", "geografia econômica", "urbanização",
    "globalização", "migrações", "população", "indústria", "agricultura",
    "relevo", "solos", "vegetação", "bacias hidrográficas", "coordenadas geográficas",
    "fusos horários", "escala cartográfica", "projeções cartográficas",
    "geopolítica", "regionalização", "desenvolvimento sustentável",
    "problemas ambientais", "recursos naturais", "geografia de Angola",
    "clima tropical", "ecossistemas", "geografia urbana"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isGeografia = geografiaTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isGeografia) {
        showAlert("Por favor, pesquise por temas relacionados à Geografia.", "info");
        return;
    }

    // ... (restante do código igual aos exemplos anteriores)
}

function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";

    card.innerHTML = `
        <img src="${video.snippet.thumbnails.medium.url}" class="thumbnail" alt="Thumbnail">
        <div class="video-info">
            <h3 class="video-title">${video.snippet.title}</h3>
            <p class="video-channel">${video.snippet.channelTitle}</p>
        </div>
    `;

    card.addEventListener("click", () => {
        window.open(`https://youtube.com/watch?v=${video.id.videoId}`, "_blank");
    });

    return card;
}

function createLoader() {
    return `
        <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
}

function showAlert(message, type) {
    // Remove alertas anteriores
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => alert.remove(), 3000);
}