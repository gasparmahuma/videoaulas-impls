const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

const linguasTerms = [
    "línguas nacionais angola", "umbundo", "kimbundo", "kikongo", "chokwe",
    "nganguela", "kwanyama", "mbunda", "luvale", "lingala",
    "cultura angolana", "tradição oral", "provérbios angolanos",
    "literatura angolana", "fonética bantu", "gramática bantu",
    "classes nominais", "sintaxe bantu", "morfologia bantu",
    "dicionário umbundo", "aprender kimbundo", "expressões angolanas",
    "história das línguas angolanas", "patrimônio linguístico",
    "línguas bantu", "dialetos angolanos", "multilinguismo em angola",
    "ensino de línguas nacionais", "identidade cultural", "preservação linguística"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    const isLinguas = linguasTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isLinguas) {
        showAlert("Por favor, pesquise por temas relacionados às Línguas Nacionais de Angola.", "info");
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