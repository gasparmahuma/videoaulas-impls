const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const topografiaTerms = [
    "topografia", "levantamento topográfico", "estação total", "teodolito",
    "nivelamento", "altimetria", "planimetria", "coordenadas UTM",
    "curvas de nível", "taqueometria", "GPS topográfico", "cadastro",
    "memorial descritivo", "cálculo de áreas", "cálculo de volumes",
    "desenho topográfico", "maquete digital", "modelagem digital",
    "georreferenciamento", "sistema de posicionamento", "erros topográficos",
    "tolerâncias", "triangulação", "poligonação", "irradiação",
    "interseção", "altura instrumental", "mira falante", "topografia aplicada",
    "normas técnicas", "topografia de minas"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isTopografia = topografiaTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isTopografia) {
        showAlert("Por favor, pesquise por temas relacionados à Topografia.", "info");
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