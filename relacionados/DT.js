const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const desenhoTecnicoTerms = [
    "desenho técnico", "perspectiva", "vistas ortogonais", "cotagem",
    "normas ABNT", "esboço técnico", "projeções", "desenho arquitetônico",
    "desenho mecânico", "CAD", "AutoCAD", "SolidWorks", "SketchUp",
    "plantas baixas", "cortes", "elevações", "escalas", "geometria descritiva",
    "axonometria", "isometria", "dimensionamento", "tolerâncias dimensionais",
    "desenho de máquinas", "desenho de estruturas", "leitura de projetos",
    "normas ISO", "representação gráfica", "desenho assistido por computador"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isDesenhoTecnico = desenhoTecnicoTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isDesenhoTecnico) {
        showAlert("Por favor, pesquise por temas relacionados a Desenho Técnico.", "info");
        return;
    }

    // ... (restante do código igual ao exemplo anterior)
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