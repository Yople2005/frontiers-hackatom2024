const quizData = [
    {
        question: "What is the main fuel used in most nuclear reactors?",
        options: ["Uranium", "Thorium", "Plutonium", "Radon"],
        answer: "Uranium"
    },
    {
        question: "What does SMR stand for in the context of nuclear energy?",
        options: ["Small Modular Reactor", "Single Modular Reactor", "Standard Modular Reactor", "Safe Modular Reactor"],
        answer: "Small Modular Reactor"
    },
    {
        question: "Which of the following is a benefit of SMRs?",
        options: ["Smaller footprint", "Higher waste production", "Complexity in operation", "Higher costs"],
        answer: "Smaller footprint"
    },
    {
        question: "What is the primary advantage of nuclear power?",
        options: ["Low greenhouse gas emissions", "High fuel cost", "High water usage", "High waste production"],
        answer: "Low greenhouse gas emissions"
    },
    {
        question: "Which type of reactor is designed to be smaller and more flexible in location?",
        options: ["Pressurized Water Reactor", "Boiling Water Reactor", "Small Modular Reactor", "CANDU Reactor"],
        answer: "Small Modular Reactor"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timerDuration = 10; // Timer duration in seconds

function startQuiz() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('restart-btn').style.display = 'none';
    loadQuiz();
    startTimer();
}

function startTimer() {
    clearInterval(timer); // Clear any existing timer interval
    
    let timeLeft = timerDuration;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Automatically proceed to the next question when time is up
        }
    }, 1000);
}

function loadQuiz() {
    const quizContainer = document.getElementById('quiz');
    const currentQuestion = quizData[currentQuestionIndex];
    
    const questionHtml = `
        <div class="question">${currentQuestion.question}</div>
        <div class="options">
            ${currentQuestion.options.map((option, index) => `
                <div>
                    <input type="radio" id="option${index}" name="option" value="${option}">
                    <label for="option${index}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
    
    quizContainer.innerHTML = questionHtml;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestionIndex].answer) {
            score++;
        }
    }
}

function nextQuestion() {
    submitAnswer();

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuiz();
        startTimer();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('result').innerText = `Your score: ${score} / ${quizData.length}`;
    document.getElementById('restart-btn').style.display = 'inline-block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('result').innerText = '';
    document.getElementById('restart-btn').style.display = 'none';
    startQuiz();
}

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);
