const startbtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continuebtn = document.querySelector('.continue-btn');
const quizsection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const resultbox = document.querySelector('.result-box');
const tryagainbtn = document.querySelector('.tryagain-btn');
const homebtn = document.querySelector('.returnhome-btn');




startbtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitbtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continuebtn.onclick = () => {
    quizsection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryagainbtn.onclick = () => {
    quizbox.classList.add('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userscore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();

}

homebtn.onclick = () => {
    quizsection.classList.remove('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userscore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

}


let questionCount = 0;
let questionNumb = 1;
let userscore = 0;

const nextbtn = document.querySelector('.next-btn'); 

nextbtn.onclick = () => {
    if (questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextbtn.classList.remove('active');
    }
    else{
        showResult();
    }
    
}

const optionlist = document.querySelector('.option-list');
//getting questions and option in an array
function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;
    
    optionlist.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }

}

function optionSelected(answer){
    let useranswer = answer.textContent;
    let correctans = questions[questionCount].answer;
    let allOptions = optionlist.children.length;
    
    if(useranswer == correctans){
        answer.classList.add('correct');
        userscore += 1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        //if answer is incorrect auto detect the correct answer
        for(let i = 0; i < allOptions; i++){
            if(optionlist.children[i].textContent == correctans){
                optionlist.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    //if user has selcted disable the other options
    for(let i = 0; i < allOptions; i++){
        optionlist.children[i].classList.add('disabled');
    }

    nextbtn.classList.add('active');
}

function questionCounter(index){
    const questiontotal = document.querySelector('.question-total');
    questiontotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userscore} / ${questions.length}`;

}

function showResult() {
    quizbox.classList.remove('active');
    resultbox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userscore} out of ${questions.length}`;
    
    const circularProgress = document.querySelector('.circular-progress');
    const progressvalue = document.querySelector('.progress-value');
    let progressStartValue=-1;
    let progressEndValue=(userscore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressvalue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#b92424 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}
