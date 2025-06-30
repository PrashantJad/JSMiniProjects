const questions = [
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Display Object Method"],
    answer: "Document Object Model"
  },
  {
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "Both let and const"],
    answer: "Both let and const"
  },
  {
    question: "Which method is used to add an item to an array?",
    options: ["push()", "add()", "append()", "insert()"],
    answer: "push()"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restartBtn");

function startQuiz() {
  renderQuestion();
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

function renderQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  resultEl.textContent = '';

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
    resultEl.textContent = "✅ Correct!";
  } else {
    resultEl.textContent = "❌ Wrong!";
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  questionEl.textContent = `Quiz Over! Your score: ${score}/${questions.length}`;
  answersEl.innerHTML = '';
  resultEl.textContent = '';
  restartBtn.style.display = 'block';
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 30;
  timeEl.textContent = timeLeft;
  restartBtn.style.display = 'none';
  startQuiz();
};

startQuiz();
