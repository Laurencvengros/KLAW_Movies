var startQuiz = document.querySelector("#startTriviaQuiz");
var startQuizBtn = document.querySelector("#startGameTrivia");
var quizPage = document.querySelector("#quizPage");
var questionList = document.querySelector("#questionList");
var buttonA = document.querySelector("#A");
var buttonB = document.querySelector("#B");
var buttonC = document.querySelector("#C");
var buttonD = document.querySelector("#D");
var endGame = document.querySelector("#endGame");
var answerChoice = document.querySelector("#rightwrong");
var yourScore = document.querySelector("#yourScore");
var finalScore = document.querySelector("#finalscore");
var restartQuizBtn = document.querySelector("#restartQuiz");
var endQuizBtn = document.querySelector("#endQuiz");

// var rentImage = document.querySelector("#movieImageOne");
// var brothersGrimmImage = document.querySelector("#movieImageTwo");
// var itImage = document.querySelector("#movieImageThree");
// var schindlersListImage = document.querySelector("#movieImageFour");
// var halfBloodPrinceImage = document.querySelector("#movieImageFive");

var myImage = document.getElementById("#movieImageOne");
var questionIndex = 0;
var imageIndex = 1;
var correctAnswer;
var score = 0;
var text = document.createElement("text");

var imageArray = ['./assets/images/rent.png',
 './assets/images/brothersGrimm.png',
 './assets/images/it.png',
 './assets/images/schindlersList.png',
 './assets/images/halfBloodPrince.png'];

 function showImage()  {
    // myImage.setAttribute("src", imageArray[imageIndex]);
    $("#movieImageOne").attr("src", imageArray[questionIndex]);
    // imageIndex++;
 }

var answersI = 0;
var answers = ["A","B","C","D"];

//for (i = 0; i < 4; i++, answersI++){  
    //
//}

$("#A").on("click", function () {
    //console.log(answersI);
    //console.log(i);
    //event.StopProgatation;
    //console.log(answers[i]);
    checkAnswer("A");
    // showImage();
});

$("#B").on("click", function () {
    // console.log(answersI);
    // console.log(i);
    //event.StopProgatation;
    // console.log(answers[i]);
    checkAnswer("B");
    // showImage();
});

$("#C").on("click", function () {
    // console.log(answersI);
    // console.log(i);
    // //event.StopProgatation;
    // console.log(answers[i]);
    checkAnswer("C");
    // showImage();
});

$("#D").on("click", function () {
    // console.log(answersI);
    // console.log(i);
    // //event.StopProgatation;
    // console.log(answers[i]);
    checkAnswer("D");
    // showImage();
});

 
//  buttonB.addEventListener("click", showImage);
//  buttonC.addEventListener("click", showImage);
//  buttonD.addEventListener("click", showImage);

//  function progress(letter) {
//     showImage();
//     checkAnswer(letter);
//  }

    
var quizQuestions = [
    {
        question: "What is the title of this movie?",

        A: "My Girl",
        B: "Rent",
        C: "The Perfect Storm",
        D: "Raising Helen",

        correctChoice: "B"
    },
    {
        question: "What year was 'The Brother's Grimm' released?",

        A: "2005",
        B: "2001",
        C: "1999",
        D: "2007",

        correctChoice: "A"
    },
    {
        question: "Who was the director the movie 'It'?",

        A: "Steven Spielberg",
        B: "Christoper Nolan",
        C: "David Fincher",
        D: "Andrés Muschietti",

        correctChoice: "D"
    },
    {
        question: "What year was 'Schindler's List' released?",

        A: "1994",
        B: "1992",
        C: "2005",
        D: "2000",

        correctChoice: "A"

    },
    {

        question: "Which Harry Potter movie is this?",

        A: "Chamber of Secrets",
        B: "Goblet of Fire",
        C: "Order of the Phoenix",
        D: "Half-Blood Prince",

        correctChoice: "D"

    }
];

var quizLength = quizQuestions.length

function startGame() {
    console.log("startGame");
    // startQuiz.style.display = "none";
    // checkAnswer();
    showImage();
    addQuizQuestions();
    questionIndex++;
    // rentImage.style.display = "block"
    endGame.style.display = "none";
    quizPage.style.display = "block";
    

};

startQuizBtn.addEventListener("click", startGame);

function addQuizQuestions() {
    // showImage();
    console.log(quizQuestions[questionIndex].question);
    var currentQuestion = quizQuestions[questionIndex];
    questionList.textContent = currentQuestion.question;
    buttonA.textContent = currentQuestion.A;
    buttonB.textContent = currentQuestion.B;
    buttonC.textContent = currentQuestion.C;
    buttonD.textContent = currentQuestion.D;
    
};

function checkAnswer (answer) {
    
    //check if trivia is over
    console.log(questionIndex);
    
    
    if (questionIndex-1<4) {
        
        correct = quizQuestions[questionIndex-1].correctChoice;
        if (answer === correct) {
            text.textContent = 'Correct';
            score++;
        } 
        else {
            text.textContent = 'Incorrect';
        }
        rightwrong.setAttribute("style", "display:Block");
        rightwrong.appendChild(text);
        // questionIndex++;
        showImage();
        addQuizQuestions();
        questionIndex++;
        

    }

    else {
        displayScore();
    }   
    

};


function displayScore(){
    $('#quizPage').hide();
    $('#endGame').show();
    finalScore.textContent = score + " out of " + quizLength;   
};

endQuizBtn.addEventListener("click", function(){
    // startQuiz.style.display ="block";
    endGame.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    score=0;
    questionIndex=0;
    text.textContent = "";
   
});

restartQuizBtn.addEventListener("click", function(){
    // startQuiz.style.display ="block";
    endGame.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    score=0;
    questionIndex=0;
    text.textContent = "";
    startGame();
   
});



