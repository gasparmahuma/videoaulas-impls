// Animação ao rolar
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if(cardPosition < screenPosition) {
            card.style.opacity = '1';
        }
    });
});

// Efeito de digitação no título
const title = document.querySelector('.hero-section h1');
const originalText = title.innerText;
title.innerText = '';

let i = 0;
function typeWriter() {
    if(i < originalText.length) {
        title.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

typeWriter();

// Interatividade dos cards
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotate(0deg)';
    });
});