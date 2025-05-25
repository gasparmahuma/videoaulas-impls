// Interactive Features
document.querySelectorAll('.disciplina-card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // Slider Logic
  const sliders = document.querySelectorAll('.slider-container');
  // Add slider initialization code here