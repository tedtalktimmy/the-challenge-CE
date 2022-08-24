// global variables (outside functions, top of page)
var headerEl = document.querySelector('.top-head');
var startBtnEl = document.querySelector('#startBtn');
var mainHead = document.querySelector('#main-head');
var pageContentEl = document.querySelector('.page-content');
var highscoreBtnEl = document.querySelector('.highscore-btn');
var timerEl = document.querySelector('#timer');
var mainP = document.querySelector('#main-p');
// keeps track of the amount of questions
var questionSoFar = 0;
var questionNum = {};

// timer
var timeLeft = 0;
timerEl.textContent = 'Time: ' + timeLeft;

// msgs for if user gets answers right or wrong
var rightAnswer = document.createElement('div');
rightAnswer.className = 'player-answer';
rightAnswer.textContent = 'CORRECT';
var wrongAnswer = document.createElement('div');
wrongAnswer.className = 'player-answer';
wrongAnswer.textContent = 'INCORRECT';



var questions = [
    {
        question: "You can use CSS to alter the _______ of a web page.",
        answer1: "structure",
        answer2: "domain",
        answer3: "style",
        answer4: "boolean",
        solution: "question-btn3"
    },
    {
        question: 'In javaScript, what symbol represents the “and” operator?',
        answer1: '||',
        answer2: '&+',
        answer3: '##',
        answer4: '&&',
        solution: 'question-btn4'
    },

    {
        question: 'In javaScript, what symbol is used to compare if two values are equal in a boolean expression?',
        answer1: '+=',
        answer2: '++',
        answer3: '!-',
        answer4: '==',
        solution: 'question-btn4'
    },

    {
        question: 'what type of statement allows you to run a block of code if one condition is true and another block of code if the condition is false?',
        answer1: 'who/what',
        answer2: 'if/else',
        answer3: 'where/when',
        answer4: 'if/then',
        solution: 'question-btn2'
    }
];
// creates question and structures in the form of h1 as the question
var questionHead = document.createElement('h1');
questionHead.className = 'question-head';
// structures answers in a list format
var questionDiv = document.createElement('ol');
questionDiv.className = 'questions';
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
playerScore = document.createElement('input');
playerScore.className = 'player-score';
playerScore.type = 'text/plain';
playerScore.placeholder = 'enter your initials';
scoreForm.appendChild(playerScore);
// submit button for highscore
var scoreBtn = document.createElement('button');
scoreBtn.type = 'submit';
scoreBtn.className = 'submit-btn';
scoreBtn.textContent = 'submit highscore';
scoreForm.appendChild(scoreBtn);
//restart button
var btnBack = document.createElement('button');
btnBack.className = 'back';
btnBack.textContent = 'back';
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
        if (timeLeft >= 0) {
            timerEl.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        } else {
            timerEl.textContent = '';

            // clears timer
            clearInterval(timeInt);
            // stops game if timer runs out
            stopGame();
        }
    }, 1000);

    makeQuestion();
}

var makeQuestion = function () {
    questionHead.textContent = questions[questionSoFar].question;
    pageContentEl.appendChild(questionHead);

    questionDiv.textContent = '';
    pageContentEl.appendChild(questionDiv);


    questionBtn1.textContent = questions[questionSoFar].answer1;
    questionDiv.appendChild(questionBtn1);

    questionBtn2.textContent = questions[questionSoFar].answer2;
    questionDiv.appendChild(questionBtn2);

    questionBtn3.textContent = questions[questionSoFar].answer3;
    questionDiv.appendChild(questionBtn3);

    questionBtn4.textContent = questions[questionSoFar].answer4;
    questionDiv.appendChild(questionBtn4);

    // add.event.listener
    var questionBtn1El = document.querySelector('.question-btn1');
    questionBtn1El.addEventListener('click', anotherQuestion);
    var questionBtn2El = document.querySelector('.question-btn2');
    questionBtn2El.addEventListener('click', anotherQuestion);
    var questionBtn3El = document.querySelector('.question-btn3');
    questionBtn3El.addEventListener('click', anotherQuestion);
    var questionBtn4El = document.querySelector('.question-btn4');
    questionBtn4El.addEventListener('click', anotherQuestion);
};

var anotherQuestion = function (event) {
    rightAnswer.remove();
    wrongAnswer.remove();

    var pressedBtn = event.target;
    if (pressedBtn.className == questions[questionSoFar].solution && questionSoFar < questions.length - 1) {
        questionSoFar++;
        generateQuestion();
        pageContentEl.appendChild(rightAnswer);
    } else if (pressedBtn.className != questions[questionSoFar].solution && questionSoFar < questions.length - 1) {
        timeLeft -= 10;
        questionSoFar++;
        generateQuestion();
        pageContentEl.appendChild(wrongAnswer);
    } else if (pressedBtn.className === questions[questionSoFar].solution) {
        stopGame();
        pageContentEl.appendChild(rightAnswer);
        return;
    } else {
        timeLeft -= 10;
        stopGame();
        pageContentEl.appendChild(wrongAnswer);
        return;
    }
}

function stopGame() {
    clearInterval(timeInt);

    if (timeLeft >= 0) {
        timerEl.textContent = 'Time: ' + timeLeft;
    } else {
        timeLeft = 0;
        timerEl.textContent = 'Time: ' + timeLeft;
    }
    questionHead.textContent = 'Complete'
    questionDiv.textContent = 'final score: ' + timeLeft;
    questionDiv.appendChild(scoreForm);
    document.addEventListener('submit', function (event) {
        event.preventDefault();
        localStorage.setItem(userScore.value, timeLeft);

        highScore();
    });
}

var highScore = function () {
    try {
        clearInterval(timeInt);
    } catch { }
    headerEl.remove();
    mainHead.remove();
    mainP.remove();
    startBtnEl.remove();
    rightAnswer.remove()
    wrongAnswer.remove();

    pageContentEl.appendChild(questionHead);
    pageContentEl.appendChild(questionDiv);

    questionHead.textContent = 'high scores'
    questionDiv.textContent = ''
    var highScoreList = [];
    for (var i = 0; i < localStorage.length; i++) {
        highScoreList.push(localStorage.getItem(localStorage.key(i)) + ' - ' + localStorage.key(i));
        highScoreList.sort().reverse();
    }
    for (var i = 0; i < highScoreList.length; i++) {
        var highScoreListItem = document.createElement('li');
        highScoreListItems.className = 'score-list';
        highScoreListItem.textContent = highScoreList[i];
        questionDiv.append(highScoreListItem);
    };

    pageContentEl.appendChild(btnBack);
    pageContentEl.appendChild(clearScoreBtn);

    btnBack.addEventListener('click', btnBack);
    clearScoreBtn.addEventListener('click', clearScore);
};

var btnBack = function () {
    window.location.reload();
};

var clearScore = function () {
    localStorage.clear();
    alert('high scores have been reset');
    window.location.reload();
}

startBtnEl.addEventListener('click', startGame);
highscoreBtnEl.addEventListener('click', highScore);

debugger;