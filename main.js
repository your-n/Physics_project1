(function(){
  
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide" >
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }
  

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    document.getElementById("circuitimage").src = images[currentSlide];

    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }
  
  var images = ["level1.png","level2.png","level3.png", "level4.png", "level5.png"];
  function showNextSlide() {
    showSlide(currentSlide + 1);
    console.log("::::"+currentSlide +"::image:::" +images[currentSlide+1])
  
  // document.getElementById("circuitimage").src = images[currentSlide+1];

  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
    //document.getElementById("circuitimage").src = images[currentSlide-1];
  }

  // Variables


  ////
  


  ////
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Level 1: Is this a parallel circuit, series circuit or neither?",
      answers: {
        a: "Series circuit",
        b: "Parallel circuit",
        c: "Neither"
      },
      correctAnswer: "b"
    },
    {
      question: "Attach the missing wire in such a way that only when the push button is pressed the light bulb will switch on?",
      answers: {
        a: "Attach the wire from terminal 2b to the second terminal of the bulb",
        b: "Attach the wire from terminal 1a to the second terminal of the bulb",
        c: "Attach the wire from terminal 1b to the second terminal of the bulb"
      },
      correctAnswer: "a"
    },
    {
      question: "Do you need to connect the wires differently to make this circuit a parallel circuit?",
      answers: {
        a: "You do not need to change the circuit as it is already a parallel circuit",
        b: "You need to place the bulbs one above the other and not change the wiring",
        c: "You need to change the wiring so that the bulbs are directly connected to the battery"
      },
      correctAnswer: "c"
    },
    
    {
      question: "Where should the switch be added in the circuit?",
      answers: {
        a: "Terminal 2 of bulb A --> terminal 1 of switch, Terminal 2 of bulb B --> common of switch and Positive of battery --> terminal 2 of switch",
        b: "Terminal 2 of bulb A --> common of switch, Terminal 2 of bulb B --> terminal 1 of switch and Negative of battery --> terminal 2 of switch",
        c: "Terminal 2 of bulb A --> terminal 2 of switch, Terminal 2 of bulb B --> terminal 1 of switch and Negative of battery --> common of switch "
      },
      correctAnswer: "c"
    },
    {
      question: "Where should the pushbutton/pushbuttons be added in the circuit to make the bulbs switch on only when the pushbutton is/ pushbuttons are pressed?",
      answers: {
        a: "Terminal 2 of bulb A --> 1b of one pushbutton, Negative of battery --> 2b of one pushbutton, Terminal 2 of bulb A --> 1a of another pushbutton and Negative of battery --> 2a of another pushbutton",
        b: "Terminal 2 of bulb A --> 1b of one pushbutton, Negative of battery --> 1a of one pushbutton, Terminal 2 of bulb A --> 2a of another pushbutton and Negative of battery --> 2b of another pushbutton",
        c: "Terminal 2 of bulb A --> 2b of a pushbutton, Negative of battery --> 2a of a pushbutton, Terminal 2 of bulb A --> 1a of same pushbutton and Negative of battery --> 2b of same pushbutton"
      },
      correctAnswer: "a"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
