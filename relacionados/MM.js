const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const manutencaoTerms = [
    "manutenção de máquinas", "mecânica industrial", "manutenção preventiva",
    "manutenção corretiva", "lubrificação industrial", "alinhamento de máquinas",
    "vibração mecânica", "diagnóstico de falhas", "troca de rolamentos",
    "sistemas hidráulicos", "sistemas pneumáticos", "calibração de equipamentos",
    "ferramentas manuais", "equipamentos industriais", "engrenagens",
    "correias e polias", "motores elétricos", "redutores de velocidade",
    "válvulas industriais", "manutenção preditiva", "análise de óleo",
    "termografia", "ultrassom industrial", "gestão de manutenção",
    "TPM", "indicadores de manutenção", "planos de manutenção",
    "NR-12", "segurança em máquinas", "diagramas elétricos"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isManutencao = manutencaoTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isManutencao) {
        showAlert("Por favor, pesquise por temas relacionados à Manutenção de Máquinas.", "info");
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