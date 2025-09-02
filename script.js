class QuizApp {
    constructor() {
        this.questions = [
            {
                question: "What is the time complexity of a binary search algorithm?",
                options: [
                    "O(1)",
                    "O(log n)",
                    "O(n)",
                    "O(n log n)"
                ],
                correct: 1
            },
            {
                question: "Which HTTP status code indicates 'Not Found'?",
                options: [
                    "200",
                    "301",
                    "404",
                    "500"
                ],
                correct: 2
            },
            {
                question: "What is the purpose of an index in a database?",
                options: [
                    "To store backup data",
                    "To improve query performance",
                    "To enforce data types",
                    "To create relationships between tables"
                ],
                correct: 1
            },
            {
                question: "Which of these is NOT a NoSQL database?",
                options: [
                    "MongoDB",
                    "Cassandra",
                    "Redis",
                    "PostgreSQL"
                ],
                correct: 3
            },
            {
                question: "What does the 'SOLID' principle in OOP stand for?",
                options: [
                    "Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion",
                    "Structured, Organized, Logical, Integrated, Decoupled",
                    "Secure, Optimized, Layered, Inherited, Dynamic",
                    "Standard, Object-oriented, Linked, Iterative, Distributed"
                ],
                correct: 0
            },
            {
                question: "What is the main difference between TCP and UDP?",
                options: [
                    "TCP is faster but less reliable than UDP",
                    "UDP is connection-oriented while TCP is connectionless",
                    "TCP provides error checking and guarantees delivery, UDP does not",
                    "UDP is used for HTTP while TCP is used for FTP"
                ],
                correct: 2
            },
            {
                question: "What is a closure in JavaScript?",
                options: [
                    "A function that has access to its own scope, the outer function's variables, and global variables",
                    "A way to close a web page programmatically",
                    "A method to terminate a loop",
                    "A built-in JavaScript object"
                ],
                correct: 0
            },
            {
                question: "Which of these is NOT a valid REST API method?",
                options: [
                    "GET",
                    "POST",
                    "UPDATE",
                    "DELETE"
                ],
                correct: 2
            },
            {
                question: "What is the purpose of the virtual DOM in React?",
                options: [
                    "To create 3D visualizations",
                    "To improve performance by minimizing direct DOM manipulation",
                    "To enable virtual reality applications",
                    "To store backup copies of components"
                ],
                correct: 1
            },
            {
                question: "What is the CAP theorem in distributed systems?",
                options: [
                    "A system can only guarantee two of Consistency, Availability, and Partition tolerance",
                    "A system must have all three: Consistency, Availability, and Performance",
                    "A system must choose between Cost, Availability, and Performance",
                    "A system can achieve all three: Consistency, Availability, and Partition tolerance"
                ],
                correct: 0
            },
            {
                question: "What is the difference between '==' and '===' in JavaScript?",
                options: [
                    "'==' compares values, '===' compares values and types",
                    "'===' is faster than '=='",
                    "'==' is deprecated in modern JavaScript",
                    "There is no difference"
                ],
                correct: 0
            },
            {
                question: "What does ACID stand for in database transactions?",
                options: [
                    "Atomicity, Consistency, Isolation, Durability",
                    "Accuracy, Completeness, Integrity, Durability",
                    "Atomicity, Completeness, Integrity, Durability",
                    "Accuracy, Consistency, Isolation, Durability"
                ],
                correct: 0
            },
            {
                question: "What is the purpose of Docker?",
                options: [
                    "To create virtual machines",
                    "To package applications into containers for consistent deployment",
                    "To manage cloud infrastructure",
                    "To monitor network traffic"
                ],
                correct: 1
            },
            {
                question: "Which data structure uses LIFO (Last In First Out) principle?",
                options: [
                    "Queue",
                    "Stack",
                    "Array",
                    "Linked List"
                ],
                correct: 1
            },
            {
                question: "What is the main advantage of using microservices architecture?",
                options: [
                    "Simpler deployment process",
                    "Improved scalability and independent service deployment",
                    "Reduced development time",
                    "Lower hardware requirements"
                ],
                correct: 1
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.isAnswered = false;

        // Get DOM elements
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.nextButton = document.getElementById('next-btn');
        this.feedback = document.getElementById('feedback');
        this.scoreValue = document.getElementById('score-value');
        this.finalScore = document.getElementById('final-score');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');

        // Set up event listeners
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());

        // Initialize total questions display
        this.totalQuestionsSpan.textContent = this.questions.length;
    }

    startQuiz() {
        this.startScreen.classList.add('hide');
        this.quizScreen.classList.remove('hide');
        this.loadQuestion();
    }

    loadQuestion() {
        this.isAnswered = false;
        this.feedback.classList.add('hide');
        this.nextButton.classList.add('hide');
        this.currentQuestionSpan.textContent = this.currentQuestion + 1;

        const question = this.questions[this.currentQuestion];
        this.questionText.textContent = question.question;
        
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index));
            this.optionsContainer.appendChild(button);
        });
    }

    checkAnswer(selectedIndex) {
        if (this.isAnswered) return;
        
        this.isAnswered = true;
        const question = this.questions[this.currentQuestion];
        const buttons = this.optionsContainer.getElementsByClassName('option-btn');

        buttons[question.correct].classList.add('correct');
        if (selectedIndex !== question.correct) {
            buttons[selectedIndex].classList.add('incorrect');
        }

        if (selectedIndex === question.correct) {
            this.score++;
            this.scoreValue.textContent = this.score;
            this.feedback.textContent = "Correct!";
            this.feedback.style.backgroundColor = "#d4edda";
        } else {
            this.feedback.textContent = "Incorrect!";
            this.feedback.style.backgroundColor = "#f8d7da";
        }

        this.feedback.classList.remove('hide');
        this.nextButton.classList.remove('hide');
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.quizScreen.classList.add('hide');
        this.resultsScreen.classList.remove('hide');
        this.finalScore.textContent = `${this.score} out of ${this.questions.length}`;
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.scoreValue.textContent = '0';
        this.resultsScreen.classList.add('hide');
        this.startQuiz();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});