// Seleção dos elementos do DOM
const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

let userMessage = null;
let isResponseGenerating = false;

// Configuração da API OpenAI (substitua pela sua chave)
const API_URL = "https://videoaulas-impls.vercel.app/api/chat";

// Carrega os dados armazenados (tema escuro e chats)
const loadLocalstorageData = () => {
  const savedChats = localStorage.getItem("savedChats");
  const isLightMode = localStorage.getItem("themeColor") === "light_mode";

  // Aplica o tema armazenado
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

  // Restaura os chats armazenados
  chatList.innerHTML = savedChats || "";
  
  document.body.classList.toggle("hide-header", savedChats);
  chatList.scrollTo(0, chatList.scrollHeight);
};

loadLocalstorageData();

// Cria um novo elemento de mensagem
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// Efeito de digitação
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
  const words = text.split(" ");
  let currentWordIndex = 0;
  
  const typingInterval = setInterval(() => {
    textElement.innerHTML += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex++];
    
    if (currentWordIndex === words.length) {
      clearInterval(typingInterval);
      isResponseGenerating = false;
      localStorage.setItem("savedChats", chatList.innerHTML);
      chatList.scrollTo(0, chatList.scrollHeight);
      
      // Adicionar sugestões após conclusão
      const topic = detectTopic(userMessage);
      if (topic) addSuggestions(topic, incomingMessageDiv);
    }
    chatList.scrollTo(0, chatList.scrollHeight);
  }, 50);
};

// Busca a resposta da API OpenAI
const generateAPIResponse = async (incomingMessageDiv) => {
  const textElement = incomingMessageDiv.querySelector(".text");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }]
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }

    const data = await response.json();
    const apiResponse = data.choices[0].message.content;
    showTypingEffect(apiResponse, textElement, incomingMessageDiv);
  } catch (error) {
    isResponseGenerating = false;
    textElement.innerText = "Erro: " + error.message;
    textElement.classList.add("error");
  } finally {
    incomingMessageDiv.classList.remove("loading");
  }
};

// Animação de carregamento
const showLoadingAnimation = () => {
  const html = `
    <div class="message-content">
      <img src="img/sonia.png" alt="Imagem da IA" class="avatar">
      <p class="text"></p>
      <div class="loading-indicator">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
      </div>
    </div>
    <div class="message-icons horizontal">
      <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>
      <span onclick="speakMessage(this)" class="icon material-symbols-rounded" data-playing="false">volume_up</span>
    </div>
  `;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatList.appendChild(incomingMessageDiv);
  generateAPIResponse(incomingMessageDiv);
};

// Funções de utilidade
const copyMessage = (copyIcon) => {
  const messageText = copyIcon.parentElement.parentElement.querySelector(".text").innerText;
  navigator.clipboard.writeText(messageText);
  copyIcon.innerText = "done";
  setTimeout(() => copyIcon.innerText = "content_copy", 1000);
};

const speakMessage = (speakerIcon) => {
  if (!("speechSynthesis" in window)) {
    alert("Desculpa, o seu navegador não suporta a síntese de voz.");
    return;
  }

  if (speakerIcon.dataset.playing === "true") {
    speechSynthesis.cancel();
    speakerIcon.dataset.playing = "false";
    speakerIcon.innerText = "volume_up";
    return;
  }

  const messageText = speakerIcon.parentElement.parentElement.querySelector(".text").innerText;
  const utterance = new SpeechSynthesisUtterance(messageText);

  utterance.onend = () => {
    speakerIcon.dataset.playing = "false";
    speakerIcon.innerText = "volume_up";
  };

  utterance.onerror = () => {
    speakerIcon.dataset.playing = "false";
    speakerIcon.innerText = "volume_up";
  };

  speakerIcon.dataset.playing = "true";
  speakerIcon.innerText = "stop_circle";
  speechSynthesis.speak(utterance);
};

// Sanitização de mensagens para comparação
const sanitizeMessage = (message) => {
  return message
    .toLowerCase()
    .replace(/[.,?!]/g, '')
    .trim();
};

// Envio de mensagens
const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
  if (!userMessage || isResponseGenerating) return;

  isResponseGenerating = true;
  
  // Mensagem do usuário
  const html = `
    <div class="message-content">
      <img src="img/user.png" alt="Imagem do usuário" class="avatar">
      <p class="text"></p>
    </div>
  `;

  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerText = userMessage;
  chatList.appendChild(outgoingMessageDiv);

  typingForm.reset();
  chatList.scrollTo(0, chatList.scrollHeight);
  document.body.classList.add("hide-header");

  // Respostas embutidas
  const embeddedResponses = {
    "ola": "Olá, como posso ajudar você hoje?",
    "oi": "Oi, como posso ajudar você hoje?",
    "qual e o teu nome": "O meu nome é Sónia, agora integrado com a tecnologia OpenAI!",
    "para que voce foi criada": "Fui criada para com o propósito de responder às perguntas que os alunos possam ter durante o seu aprendizado.",
    "quem e voce": "Sou a Sónia, um assistente virtual baseado na tecnologia da OpenAI.",
    "quem criou voce": "Sou a Sónia, Fui criada por um grupo de estudantes dedicados do Instituto Médio Politécnico da Lunda-Sul, com o objetivo de facilitar o processo de aprendizagem dos estudantes deste instituto, citando o nome dos meus criadores, Gaspar Kahanga, Gaury Alfredo, Herguedes Caveto e Victor Filipe.",
    "quem e o actual director do IMPLS": "Atualmente cargo de diretor está na responsabilidade de Kauena Rosa Mufinda.",
    "onde esta localizado o IMPLS": "O Instituto Médio Politécnico da Lunda-Sul está geograficamente localizado na Província da Lunda-Sul, no actual município de Cassengo, no Bairro Txizainga, na Estrada Nacional nº 2030.",
    "quais sao os cursos lecionados no IMPLS": "Os cursos lecionados no Instituto Médio Politécnico da Lunda-Sul são os seguintes: Administração Local e Autarquias (ALA), Contabilidade e Gestão (CG), Energia e Instalações Eléctricas (EIE), Informática (INF), Manutenção Industrial (MI) e Obras de Construção Civil (OCC)",
    "quando foi fundando o IMPLS": "O Instituto Médio Politécnico da Lunda-Sul foi fundado pelo Decreto nº 155/08, inaugurado no dia 11 de Novembro de 2009.",
    "lista para mim cinco professores do curso de informatica do IMPLS": "Alguns dos professores de informática do Instituto Médio Politécnico da Lunda-Sul são: Ângelo Chapuile Paulo, Lourenço Bartolomeu Kénia (que é o atual coordenador de curso), Evaristo Ndondji, Fezamar Gourgel e também Jordão Mbumba"
  };

  const sanitizedUserMessage = sanitizeMessage(userMessage);
  let matchedKey = null;

  // Procura por correspondência nas perguntas embutidas
  for (const key of Object.keys(embeddedResponses)) {
    if (sanitizeMessage(key) === sanitizedUserMessage) {
      matchedKey = key;
      break;
    }
  }

  if (matchedKey) {
    const responseText = embeddedResponses[matchedKey];
    const html = `
      <div class="message-content">
        <img src="img/sonia.png" alt="Imagem da IA" class="avatar">
        <p class="text"></p>
      </div>
      <div class="message-icons horizontal">
        <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>
        <span onclick="speakMessage(this)" class="icon material-symbols-rounded" data-playing="false">volume_up</span>
      </div>
    `;
    const incomingMessageDiv = createMessageElement(html, "incoming");
    chatList.appendChild(incomingMessageDiv);
    const textElement = incomingMessageDiv.querySelector(".text");
    showTypingEffect(responseText, textElement, incomingMessageDiv);
    isResponseGenerating = false;
    localStorage.setItem("savedChats", chatList.innerHTML);
    return;
  }

  setTimeout(showLoadingAnimation, 500);
};

// Sistema de tópicos e sugestões
const detectTopic = (message) => {
  const messageLower = message.toLowerCase();
  const topics = {
    'informática': ['informática', 'computador', 'software', 'programa'],
    'energia': ['energia', 'elétric', 'voltagem', 'corrente'],
    'programação': ['programação', 'código', 'javascript', 'python'],
  };

  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some(keyword => messageLower.includes(keyword))) {
      return topic;
    }
  }
  return null;
};

const addSuggestions = (topic, messageElement) => {
  const suggestionsByTopic = {
    'informática': [
      'Como posso melhorar a segurança do meu computador?',
      'Quais as melhores linguagens para iniciantes?',
      'Como fazer backup dos meus dados?'
    ],
    'energia': [
      'Como economizar energia elétrica?',
      'Quais os cuidados com instalações elétricas?',
      'Como calcular consumo de energia?'
    ],
  };

  const suggestions = suggestionsByTopic[topic]?.slice(0, 3) || [];
  if (suggestions.length === 0) return;

  const container = document.createElement('div');
  container.className = 'suggestions-container';
  
  const title = document.createElement('div');
  title.className = 'suggestions-title';
  title.textContent = 'Talvez você queira saber:';
  container.appendChild(title);

  suggestions.forEach(suggestion => {
    const button = document.createElement('button');
    button.className = 'suggestion';
    button.textContent = suggestion;
    button.addEventListener('click', () => {
      document.querySelector('.typing-input').value = suggestion;
      handleOutgoingChat();
    });
    container.appendChild(button);
  });

  messageElement.appendChild(container);
};

// Event Listeners
suggestions.forEach((suggestion) => {
  suggestion.addEventListener("click", () => {
    userMessage = suggestion.querySelector(".text").innerText;
    handleOutgoingChat();
  });
});

toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

deleteChatButton.addEventListener("click", () => {
  if (confirm("Esta ação irá apagar esta conversa e iniciar uma nova.")) {
    localStorage.removeItem("savedChats");
    loadLocalstorageData();
  }
});

typingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleOutgoingChat();
});