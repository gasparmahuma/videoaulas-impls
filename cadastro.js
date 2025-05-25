document.addEventListener('DOMContentLoaded', function() {
  // Elementos da UI
  const sign_in_btn = document.querySelector('#sign-in-btn');
  const sign_up_btn = document.querySelector('#sign-up-btn');
  const container = document.querySelector('.container');
  const eyeIcons = document.querySelectorAll('.eye-icon');
  const signUpForm = document.querySelector('.sign-up-form');
  const signInForm = document.querySelector('.sign-in-form');

  // Alternar entre modos
  sign_up_btn.addEventListener('click', () => container.classList.add('sign-up-mode'));
  sign_in_btn.addEventListener('click', () => container.classList.remove('sign-up-mode'));

  // Mostrar/esconder senha
  eyeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const input = document.getElementById(targetId);
      input.type = input.type === 'password' ? 'text' : 'password';
      icon.textContent = input.type === 'password' ? 'visibility' : 'visibility_off';
    });
  });

  // Banco de dados simulado
  const database = {
    users: JSON.parse(localStorage.getItem('usersDB')) || [],
    
    saveUsers: function() {
      localStorage.setItem('usersDB', JSON.stringify(this.users));
    },
    
    addUser: function(user) {
      if (this.users.some(u => u.username === user.username)) {
        throw new Error('Nome de usuário já existe');
      }
      this.users.push(user);
      this.saveUsers();
    },
    
    authenticate: function(username, password) {
      return this.users.find(u => u.username === username && u.password === password);
    }
  };

  // Manipular cadastro
  signUpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.querySelector('input[type="text"]').value;
    const telephone = this.querySelector('input[type="tel"]').value;
    const password = this.querySelector('#signup-password').value;
    const confirmPassword = this.querySelector('#signup-confirm').value;
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    try {
      const newUser = {
        username,
        telephone,
        password,
        course: 'Engenharia de Software',
        class: '2023.1',
        email: `${username.toLowerCase()}@exemplo.com`,
        profileImage: 'img/perfil.jpg'
      };
      
      database.addUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Redireciona para inicio.html após cadastro
      window.location.href = 'inicio.html';
    } catch (error) {
      alert(error.message);
    }
  });

  // Manipular login
  signInForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    const user = database.authenticate(username, password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'inicio.html';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });
});