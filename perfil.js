document.addEventListener('DOMContentLoaded', function() {
  // Elementos da UI
  const editBtn = document.querySelector('.edit-profile-btn');
  const modal = document.getElementById('editModal');
  const closeModal = document.querySelector('.close-modal');
  const profileForm = document.getElementById('profileForm');
  const imageInput = document.getElementById('imageInput');
  const cameraIcon = document.querySelector('.camera-icon');
  const eyeIcon = document.querySelector('.eye-icon[data-target="editSenha"]');

  // Banco de dados simulado
  const database = {
    users: JSON.parse(localStorage.getItem('usersDB')) || [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
    
    saveUsers: function() {
      localStorage.setItem('usersDB', JSON.stringify(this.users));
    },
    
    updateUser: function(updatedUser) {
      const index = this.users.findIndex(u => u.username === this.currentUser.username);
      if (index !== -1) {
        this.users[index] = updatedUser;
        this.currentUser = updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        this.saveUsers();
      }
    }
  };

  // Funções auxiliares
  const updateProfileDisplay = (userData) => {
    document.getElementById('userName').textContent = userData.username;
    document.getElementById('userPhone').textContent = userData.telephone;
    document.getElementById('userCourse').textContent = userData.course;
    document.getElementById('userClass').textContent = userData.class;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('profileImage').src = userData.profileImage;
  };

  const loadProfileData = () => {
    if (!database.currentUser) {
      window.location.href = 'index.html';
      return;
    }
    return database.currentUser;
  };

  // Mostrar/esconder senha
  if (eyeIcon) {
    eyeIcon.addEventListener('click', () => {
      const passwordInput = document.getElementById('editSenha');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = 'visibility_off';
      } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = 'visibility';
      }
    });
  }

  // Inicialização
  const initProfile = () => {
    const userData = loadProfileData();
    updateProfileDisplay(userData);
  };

  // Event Listeners
  cameraIcon.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const currentData = loadProfileData();
        const updatedUser = { ...currentData, profileImage: event.target.result };
        database.updateUser(updatedUser);
        updateProfileDisplay(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  });

  editBtn.addEventListener('click', () => {
    const currentData = loadProfileData();
    document.getElementById('editName').value = currentData.username;
    document.getElementById('editCourse').value = currentData.course;
    document.getElementById('editClass').value = currentData.class;
    document.getElementById('editEmail').value = currentData.email;
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => modal.style.display = 'none');

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const saveButton = e.target.querySelector('button[type="submit"]');
    const statusIndicator = saveButton.querySelector('.status-indicator');
    const buttonText = saveButton.querySelector('.button-text');
    const loader = statusIndicator.querySelector('.loading-spinner');
    const successIcon = statusIndicator.querySelector('.success-icon');

    // Mostrar estado de carregamento
    buttonText.style.opacity = '0.5';
    statusIndicator.style.display = 'block';
    loader.style.display = 'block';
    successIcon.style.display = 'none';

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Atualizar dados
    const currentData = loadProfileData();
    const updatedUser = {
      ...currentData,
      username: document.getElementById('editName').value,
      course: document.getElementById('editCourse').value,
      class: document.getElementById('editClass').value,
      email: document.getElementById('editEmail').value,
      senha: document.getElementById('editSenha').value
    };

    database.updateUser(updatedUser);

    // Mostrar estado de sucesso
    loader.style.display = 'none';
    successIcon.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Resetar UI
    buttonText.style.opacity = '1';
    statusIndicator.style.display = 'none';
    modal.style.display = 'none';
    updateProfileDisplay(updatedUser);
  });

  initProfile();
});

// Elementos do logout
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

// Mostrar modal de logout
logoutBtn.addEventListener('click', () => {
  logoutModal.style.display = 'flex';
});

// Confirmar logout
confirmLogout.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});

// Cancelar logout
cancelLogout.addEventListener('click', () => {
  logoutModal.style.display = 'none';
});

// Fechar modal clicando fora
window.addEventListener('click', (e) => {
  if (e.target === logoutModal) {
    logoutModal.style.display = 'none';
  }
});