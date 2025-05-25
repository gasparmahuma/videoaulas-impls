function playVideo(element) {
    const videoId = element.getAttribute('data-video-id');
    const title = element.getAttribute('data-title');
    const description = element.getAttribute('data-description');
    
    const mainVideo = document.getElementById('mainVideo');
    mainVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    
    document.querySelector('.video-title').textContent = title;
    document.querySelector('.video-description').textContent = description;
    
    // Atualizar estado ativo
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
    
    // Rolagem suave para o item ativo
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Opcional: Controle de finalização de vídeo usando YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('mainVideo', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        const nextItem = document.querySelector('.playlist-item.active').nextElementSibling;
        if (nextItem) playVideo(nextItem);
    }
}