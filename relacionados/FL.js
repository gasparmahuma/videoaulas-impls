const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const financasTerms = [
    "finanças locais", "orçamento municipal", "gestão fiscal",
    "receitas municipais", "despesas públicas", "tributos locais",
    "IPTU", "ISS", "taxas municipais", "controle interno",
    "licitações públicas", "prestação de contas", "transparência fiscal",
    "Lei de Responsabilidade Fiscal", "contabilidade pública",
    "planejamento orçamentário", "descentralização fiscal",
    "autonomia financeira", "capacidade tributária", "transferências intergovernamentais",
    "endividamento público", "auditoria municipal", "gestão de recursos públicos",
    "controle social", "participação popular", "conselhos municipais",
    "SIAFEM", "SIOP", "gestão democrática", "desenvolvimento local"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isFinancas = financasTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isFinancas) {
        showAlert("Por favor, pesquise por temas relacionados a Finanças Locais.", "info");
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