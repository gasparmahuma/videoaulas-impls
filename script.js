// Inicializa ambos os sliders quando o DOM for carregado
window.addEventListener('DOMContentLoaded', () => {
  createSlider('slider1', slider1Content, 0); // Primeiro slider com conteúdo original
  createSlider('slider2', slider2Content, 0); // Segundo slider com novo conteúdo
});

// Array de conteúdo para os sliders
   // Array de conteúdo para o PRIMEIRO slider
const slider1Content = [
  {
    title: "Informática",
    subtitle: "Programação e Redes",
    text: "Saiba sobre programação web, desktop e redes de computadores.",
    button: "CURSO",
    image: "img/Informática00.png",
    bgColor: "#0062be"
  },
  {
    title: "Energia",
    subtitle: "Instalações Elétricas",
    text: "Aprenda sobre instalações elétricas residenciais e industriais.",
    button: "CURSO",
    image: "img/Energia.png",
    bgColor: "#e60c2c"
  },
  {
    title: "Contabilidade",
    subtitle: "Gestão Financeira",
    text: "Domine técnicas de gestão financeira e contabilidade analítica.",
    button: "CURSO", 
    image: "img/Q2.png",
    bgColor: "#1e1e1e"
  }
];

// Array de conteúdo para o SEGUNDO slider
const slider2Content = [
  {
    title: "Manutenção",
    subtitle: "Industrial e Mecânica",
    text: "Aprenda manutenção de máquinas e sistemas industriais.",
    button: "CURSO",
    image: "img/Q1.png", // Nova imagem
    bgColor: "#005f73"
  },
  {
    title: "Obras de",
    subtitle: "Construção Cívil",
    text: "Técnicas modernas de construção civil e topografia.",
    button: "CURSO",
    image: "img/Q4.png", // Nova imagem
    bgColor: "#FFC308"
  },
  {
    title: "Administração",
    subtitle: "Local e Autarquia",
    text: "Curso completo sobre administração autárquica.",
    button: "CURSO",
    image: "img/Q5.png", // Nova imagem
    bgColor: "#5a55aa"
  }
];
  
      // Função que cria um slider independente
      function createSlider(sliderId, contentData, initialIndex = 0) {
        const sliderEl = document.getElementById(sliderId);
        let currentSlide = initialIndex;
  
        function updateContent(index) {
          const textBox = sliderEl.querySelector('.content .textBox');
          textBox.innerHTML = `
            <h2>${contentData[index].title} <br><span>${contentData[index].subtitle}</span></h2>
            <p>${contentData[index].text}</p>
            <a href="#">${contentData[index].button}</a>
          `;
        }
  
        function changeSlide(index) {
          sliderEl.querySelector('.fundo').src = contentData[index].image;
          sliderEl.style.background = contentData[index].bgColor;
          updateContent(index);
        }
  
        function autoSlide() {
          currentSlide = (currentSlide + 1) % contentData.length;
          changeSlide(currentSlide);
        }
  
        // Configura os eventos para as miniaturas
        const thumbs = sliderEl.querySelectorAll('.thumb li');
        thumbs.forEach((thumb) => {
          thumb.addEventListener('click', function() {
            const index = parseInt(thumb.getAttribute('data-index'));
            currentSlide = index;
            changeSlide(index);
          });
        });
  
        // Inicializa o slider com o slide inicial
        changeSlide(currentSlide);
        // Inicia a transição automática a cada 5 segundos
        setInterval(autoSlide, 5000);
      }
  
      // Inicializa ambos os sliders quando o DOM for carregado
      window.addEventListener('DOMContentLoaded', () => {
        createSlider('slider1', sliderContent, 0);
        createSlider('slider2', sliderContent, 0);
      });
  
      const videoData = [
        {
            src: 'Videos/Crie um projeto de exportação em excel _ ASP.NET Core MVC_ Tutorial Prático!.mp4',
            title: 'Introdução à Informática Profissional',
            description: 'Nesta aula introdutória, vamos explorar os conceitos básicos da informática profissional e suas aplicações no mercado de trabalho atual.',
            thumb: 'img/thumb1.jpg',
            duration: '15:30'
        },    
        {
          src: 'videos/Crie um projeto de exportação em excel _ ASP.NET Core MVC_ Tutorial Prático!.mp4',
          title: 'Redes de Computadores',
          description: 'Entenda os fundamentos de redes de computadores e protocolos de comunicação.',
          thumb: 'img/thumb3.jpg',
          duration: '22:10'
      }
  ]
  
  function playVideo(index) {
    const video = document.getElementById('mainVideo');
    const videoInfo = document.querySelector('.video-info');
    const playlistItems = document.querySelectorAll('.playlist-item');
  
    // Atualizar vídeo principal
    video.src = videoData[index].src;
    video.poster = videoData[index].thumb;
    video.load();
  
    // Atualizar informações
    videoInfo.querySelector('.video-title').textContent = videoData[index].title;
    videoInfo.querySelector('.video-description').textContent = videoData[index].description;
  
    // Atualizar estado ativo na playlist
    playlistItems.forEach(item => item.classList.remove('active'));
    playlistItems[index].classList.add('active');
  
    // Rolagem automática para o item ativo
    playlistItems[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
  }
  
  // Controle de troca automática de vídeo
  document.getElementById('mainVideo').addEventListener('ended', function() {
    const currentIndex = Array.from(document.querySelectorAll('.playlist-item'))
        .findIndex(item => item.classList.contains('active'));
    
    if(currentIndex < videoData.length - 1) {
        playVideo(currentIndex + 1);
    }
  });