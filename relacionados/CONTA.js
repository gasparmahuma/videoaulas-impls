const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const contabilidadeTerms = [
    "contabilidade analítica", "custos industriais", "rateio de custos",
    "custeio ABC", "custeio por absorção", "custeio variável",
    "margem de contribuição", "ponto de equilíbrio", "centro de custos",
    "departamentalização", "apuração de resultados", "análise de rentabilidade",
    "orçamento base zero", "gestão de custos", "formação de preços",
    "imputação racional", "custos diretos", "custos indiretos",
    "custos fixos", "custos variáveis", "sistema de custeio",
    "análise de viabilidade", "controle orçamentário", "indicadores financeiros",
    "gestão por atividades", "mapa de custos", "análise de desvios",
    "contabilidade gerencial", "tomada de decisão", "relatórios gerenciais"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isContabilidade = contabilidadeTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isContabilidade) {
        showAlert("Por favor, pesquise por temas relacionados a Contabilidade Analítica.", "info");
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