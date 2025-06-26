const questions = [
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        answers: [
            { text: "The current object", correct: true },
            { text: "The parent class", correct: false },
            { text: "The global window object always", correct: false },
            { text: "A random object", correct: false },
        ]
    },
    {
        question: "Which SQL command is used to remove a table from a database?",
        answers: [
            { text: "DELETE", correct: false },
            { text: "REMOVE", correct: false },
            { text: "DROP", correct: true },
            { text: "ERASE", correct: false },
        ]
    },
    {
        question: "What is a key characteristic of a stack data structure?",
        answers: [
            { text: "FIFO - First In First Out", correct: false },
            { text: "FILO - First In Last Out", correct: true },
            { text: "Random access", correct: false },
            { text: "Sorted insertion", correct: false },
        ]
    },
    {
        question: "Which layer of the OSI model handles routing and IP addressing?",
        answers: [
            { text: "Transport", correct: false },
            { text: "Network", correct: true },
            { text: "Data Link", correct: false },
            { text: "Application", correct: false },
        ]
    },
    {
        question: "In object-oriented programming, what is polymorphism?",
        answers: [
            { text: "Ability of objects to hide their properties", correct: false },
            { text: "Using multiple inheritance only", correct: false },
            { text: "Objects behaving differently based on context", correct: true },
            { text: "Encapsulating multiple objects", correct: false },
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();