const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const portuguesTerms = [
    "língua portuguesa", "gramática", "ortografia", "sintaxe", "morfologia",
    "literatura", "redação", "interpretação de texto", "figuras de linguagem",
    "verbos", "substantivos", "adjetivos", "pronomes", "preposições", 
    "concordância verbal", "concordância nominal", "crase", "pontuação",
    "paralelismo", "coesão", "coerência", "gêneros textuais", "poesia",
    "romance", "conto", "crônica", "dissertação", "narração", "descrição"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isPortugues = portuguesTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isPortugues) {
        showAlert("Por favor, pesquise por temas relacionados à Língua Portuguesa.", "info");
        return;
    }

    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = createLoader();

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=6&key=${apiKey}`
        );
        
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        videoContainer.innerHTML = "";
        
        if (!data.items?.length) {
            showAlert("Nenhum vídeo encontrado sobre este tema de Língua Portuguesa.", "info");
            return;
        }

        data.items.forEach(video => {
            videoContainer.appendChild(createVideoCard(video));
        });

    } catch (error) {
        console.error("Erro:", error);
        showAlert("Erro ao carregar vídeos. Tente novamente.", "error");
    }
}

// ... (mantenha as funções createVideoCard, createLoader e showAlert iguais ao original)

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