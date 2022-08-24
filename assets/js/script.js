// global variables (outside functions, top of page)
var headerEl = document.querySelector('.top-head');
var highscoreBtnEl = document.querySelector('#highscore-btn');
var timerEl = document.querySelector('#timer');
var pageContentEl = document.querySelector('.page-content');
var mainHead = document.querySelector('#main-head');
var mainP = document.querySelector('#main-p');
var startBtn = document.querySelector('#start-btn');

// keeps track of the amount of questions
var questionSoFar = 0;
var questionFocus = {};
// timer
var timeLeft = 0;
timerEl.textContent = 'Time: ' + timeLeft;


var questions = [
    {
        question: 'You can use CSS to alter the _______ of a web page.'
        answer1: 'structure',
        answer2: 'domain',
        answer3: 'style',
        answer4: 'boolean',
    },

    {
        question: 'In javaScript, what symbol represents the “and” operator?'
        answer1: '||',
        answer2: '&+',
        answer3: '##',
        answer4: '&&',
    },

    {
        question: 'In javaScript, what symbol is used to compare if two values are equal in a boolean expression?'
        answer1: '+=',
        answer2: '++',
        answer3: '!-',
        answer4: '==',
    },

    {
        question: 'what type of statement allows you to run a block of code if one condition is true and another block of code if the condition is false?'
        answer1: 'who/what',
        answer2: 'if/then',
        answer3: 'where/when',
        answer4: 'if/else',
    }
];
// creates question and structures in the form of h1 as the question
var questionHead = document.createElement('h1');
questionHead.className = 'question-head';
// structures answers in a list format
var questionOl = document.createElement('ol');
questionOl.className = 'questions-list';
// creates buttons and assigns class name and id
var questionBtn1 = document.createElement('button');
questionBtn1.className = 'question-btn1';
questionBtn1.id = 'question-btns';
// creates buttons and assigns class name and id
var questionBtn2 = document.createElement('button');
questionBtn2.className = 'question-btn2'
questionBtn2.id = 'question-btns';
// creates buttons and assigns class name and id
var questionBtn3 = document.createElement('button');
questionBtn3.className = 'question-btn3';
questionBtn3.id = 'question-btns';
// creates buttons and assigns class name and id
var questionBtn4 = document.createElement('button');
questionBtn4.className = 'question-btn4';
questionBtn4.id = 'question-btns';


// form input and initials input for highscore
var scoreForm = document.createElement('form');
uScore.type = 'text';
uScore.className = 'user-score';
uScore.placeholder = 'enter your initials';
scoreForm.appendChild(userScore);
// submit button for highscore
var scoreBtn = document.createElement('button');
scoreBtn.type = 'submit';
scoreBtn.className = 'submit-btn';
scoreBtn.textContent = 'submit highscore';
scoreForm.appendChild(scoreBtn);
//restart button
var restartBtn = document.createElement('button');
restartBtn.className = 'restart-btn';
restartBtn.textContent = 'restart';
// button to clear highscores
var clearScoreBtn = document.createElement('button');
clearScoreBtn.className = 'clear-score';
clearScoreBtn.textContent = 'clear highscores..'
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// GIVEN I am taking a code quiz
// WHEN I click the start button
// start button gets click function
var startGame = function () {
    timeLeft = 75;
    mainHead.remove();
    mainP.remove();
    startBtnEl.remove();

    timeInt = setInterval(function () {
        timerEl.textContent = (timeLeft >= 0) ? 'Time: ' + timeLeft : (timeLeft = 0) ? 'Time' + timeLeft;

        // if(timeLeft > 0) {
        //     timerEl.textContent = 'Time: ' + timeLeft;
        //     timeLeft--;
        // } else {
        //     timerEl.textContent = '';

        // clears timer
        clearInterval(timeInt);
        // stops game if timer runs out
        stopGame();
    }, 1000);
    generateQuestion();
}


var generateQuestion = function () {
    questionHead.textContent = questions[questionSoFar].question;
    pageContentEl.appendChild(questionHead);
    
    questionOl.textContent = '';
    pageContentEl.appendChild(questionOl);

    questionBtn1.textContent = questions[questionSoFar].answer1;
    questionOl.appendChild(questionBtn1);

    questionBtn2.textContent = questions[questionSoFar].answer2;
    questionOl.appendChild(questionBtn2);

    questionBtn3.textContent = questions[questionSoFar].answer3;
    questionOl.appendChild(questionBtn3);

    questionBtn4.textContent = questions[questionSoFar].answer4;
    questionOl.appendChild(questionBtn4);

    // add.event.listener
    var questionBtn1El = document.querySelector('.question-btn1');
    questionBtn1El.addEventListener('click', nextQuestion);
    var questionBtn2El = document.querySelector('.question-btn2');
    questionBtn2El.addEventListener('click', nextQuestion);
    var questionBtn3El = document.querySelector('.question-btn3');
    questionBtn3El.addEventListener('click', nextQuestion);
    var questionBtn4El = document.querySelector('.question-btn4');
    questionBtn4El.addEventListener('click', nextQuestion);
}

var nextQuestion = function(event) {
    var pressBtn = event.target
    if (pressBtn.className === questions[questionSoFar].solution && questionSoFar < questions.length - 1) {
        questionSoFar++;
        generateQuestion();
        pageContentEl.appendChild(rightAnswer);
    } else if (pressBtn.className !== questions[questionSoFar].solution && questionSoFar < questions.length - 1) {
        timeLeft -=10;
        questionSoFar++;
        generateQuestion();
        pageContentEl.appendChild(wrongAnswer);
    } else if (pressBtn.className === questions[questionSoFar].solution) {
        stopGame();
        pageContentEl.appendChild(rightAnswer);
        return;
    } else {
        timeLeft -= 10;
        stopGame();
        pageContentEl.appendChild(wrongAnswer);
        return;
    }
};

function stopGame() {
    clearInterval(timeInt);
    timerEl.textContent = (timeLeft >= 0) ? 'Time: ' + timeLeft : '';
}
// THEN a timer starts and I am presented with a question
        // once start button gets clicked, the timer starts and a question comes up

// WHEN I answer a question
        // Answer the question, click the button

// THEN I am presented with another question
        // upon clicking the button next, next question comes up

// WHEN I answer a question incorrectly
        // if function for question answered incorectly.

// THEN time is subtracted from the clock
        // if question is answered incorrectly, time is subtracted from clock

// WHEN all questions are answered or the timer reaches 0
        // if function for all question answered or time runs out.

// THEN the game is over
        // if either of the above happens, the game ends

// WHEN the game is over
        // game ends

// THEN I can save my initials and my score
        // ability to save initials and score