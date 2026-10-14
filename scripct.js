// Base de dados com o tema "Cultura"
const cardsData = [
  {
    category: "Literatura Brasileira",
    question: "Quem é o autor da famosa obra 'Dom Casmurro'?",
    answer: "Machado de Assis, publicada originalmente em 1899."
  },
  {
    category: "Artes Plásticas",
    question: "Qual pintora brasileira criou a obra 'Abaporu' em 1928?",
    answer: "Tarsila do Amaral, marco do Movimento Antropofágico."
  },
  {
    category: "Patrimônio & História",
    question: "Em qual estado brasileiro fica localizado o Parque Nacional da Serra da Capivara?",
    answer: "No Piauí. O local abriga a maior concentração de arte rupestre das Américas."
  },
  {
    category: "Música & Festivais",
    question: "Qual gênero musical e dança tradicional pernambucana é considerado Patrimônio Imaterial pela UNESCO?",
    answer: "O Frevo, reconhecido em 2012."
  },
  {
    category: "Geografia Cultural",
    question: "Qual é o maior país do mundo em extensão territorial?",
    answer: "A Rússia, cobrindo mais de 17 milhões de quilômetros quadrados."
  }
];

// Estado da aplicação
let currentIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

// Seleção de elementos do DOM
const flashcard = document.getElementById("flashcard");
const cardCategory = document.getElementById("card-category");
const cardQuestion = document.getElementById("card-question");
const cardAnswer = document.getElementById("card-answer");

const correctCountEl = document.getElementById("correct-count");
const wrongCountEl = document.getElementById("wrong-count");
const remainingCountEl = document.getElementById("remaining-count");
const progressBar = document.getElementById("progress-bar");

const btnCorrect = document.getElementById("btn-correct");
const btnWrong = document.getElementById("btn-wrong");
const btnRestart = document.getElementById("btn-restart");

const resultScreen = document.getElementById("result-screen");
const finalScore = document.getElementById("final-score");

// Renderiza o card atual
function loadCard() {
  if (currentIndex >= cardsData.length) {
    showResults();
    return;
  }

  // Desvira o card antes de atualizar o conteúdo
  flashcard.classList.remove("flipped");

  // Garante que os botões só ativem após virar o card
  btnCorrect.disabled = true;
  btnWrong.disabled = true;

  const currentCard = cardsData[currentIndex];
  cardCategory.textContent = currentCard.category;
  cardQuestion.textContent = currentCard.question;
  cardAnswer.textContent = currentCard.answer;

  updateDashboard();
}

// Atualiza placar e barra de progresso
function updateDashboard() {
  correctCountEl.textContent = correctAnswers;
  wrongCountEl.textContent = wrongAnswers;
  remainingCountEl.textContent = cardsData.length - currentIndex;

  const progressPercentage = (currentIndex / cardsData.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Ação de virar o card
flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");

  // Ativa os botões de resposta caso o card esteja virado
  if (flashcard.classList.contains("flipped")) {
    btnCorrect.disabled = false;
    btnWrong.disabled = false;
  }
});

// Processa a resposta do usuário
function handleAnswer(isCorrect) {
  if (isCorrect) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  currentIndex++;
  loadCard();
}

// Exibe tela final de resultados
function showResults() {
  document.querySelector(".card-area").style.display = "none";
  document.querySelector(".controls").style.display = "none";
  document.querySelector(".score-board").style.display = "none";
  
  progressBar.style.width = "100%";
  resultScreen.classList.remove("hidden");

  const total = cardsData.length;
  const percentage = Math.round((correctAnswers / total) * 100);
  finalScore.innerHTML = `Você acertou <strong>${correctAnswers}</strong> de <strong>${total}</strong> perguntas (${percentage}% de aproveitamento).`;
}

// Reinicia o quiz
function restartQuiz() {
  currentIndex = 0;
  correctAnswers = 0;
  wrongAnswers = 0;

  document.querySelector(".card-area").style.display = "block";
  document.querySelector(".controls").style.display = "flex";
  document.querySelector(".score-board").style.display = "flex";
  resultScreen.classList.add("hidden");

  loadCard();
}

// Event Listeners dos botões
btnCorrect.addEventListener("click", () => handleAnswer(true));
btnWrong.addEventListener("click", () => handleAnswer(false));
btnRestart.addEventListener("click", restartQuiz);

// Inicializa o primeiro card
loadCard();

