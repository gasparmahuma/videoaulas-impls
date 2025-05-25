const apiKey = "AIzaSyA3120GvJ4UrTeARUh470AvxCIRZWlgS9E";

// Lista de termos relacionados a informática (podem ser expandidos)
const informaticaTerms = [
    "informática", "programação", "computador", "software", "hardware",
    "javascript", "html", "css", "python", "java", "c++", "algoritmo",
    "banco de dados", "rede de computadores", "ciência da computação",
    "inteligência artificial", "machine learning", "desenvolvimento web",
    "aplicativos móveis", "segurança da informação", "sistema operacional",
    "windows", "linux", "macos", "frontend", "backend", "fullstack",
    "react", "angular", "vue", "node.js", "php", "sql", "nosql",
    "devops", "cloud computing", "ia", "big data", "iot", "robótica"
];

async function searchYouTube() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!query) {
        showAlert("Digite algo para pesquisar!", "warning");
        return;
    }

    // Verifica se a consulta contém termos de informática
    const isInformatica = informaticaTerms.some(term => query.includes(term.toLowerCase()));
    
    if (!isInformatica) {
        showAlert("O conteúdo que procuras não pode ser encontrado aqui. Por favor, pesquise por temas de informática.", "info");
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
            showAlert("Nenhum vídeo encontrado sobre este tema de informática.", "info");
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