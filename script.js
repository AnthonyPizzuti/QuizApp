let questions = [
  {
    question: "Wann wurde AC Milan gegründet?",
    answer_1: "1502",
    answer_2: "1650",
    answer_3: "1899",
    answer_4: "1995",
    right_answer: 3,
  },
  {
    question: "Wann habe ich angefangen bei Lutz zu arbeiten?",
    answer_1: "01.07.2011",
    answer_2: "01.08.2013",
    answer_3: "01.09.2010",
    answer_4: "15.07.2009",
    right_answer: 1,
  },
  {
    question: "Wer hat das Licht erfunden?",
    answer_1: "Steve Jobs",
    answer_2: "Neil Armstrong",
    answer_3: "Albert Einstein",
    answer_4: "Thomas Alva Edison",
    right_answer: 4,
  },
  {
    question: "Wann fing die erste WM statt?",
    answer_1: "13. August 1940",
    answer_2: "01. Januar 1850",
    answer_3: "11. September 1991",
    answer_4: "13. Juli 1930",
    right_answer: 4,
  },
  {
    question: "Wann fiel die Berliner Mauer?",
    answer_1: "5. Dezember 1982",
    answer_2: "9. November 1989",
    answer_3: "1. Januar 1979",
    answer_4: "18. November 1965",
    right_answer: 2,
  },
];

let rightQuestions = 0;
let currentQuestion = 0;
let audio_success = new Audio("audio/right.mp3");
let audio_fail = new Audio("audio/wrong.mp3");

function init() {
  document.getElementById("all-questions").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById("endScreen").style = ""; // Endscreen zu beginn nicht anzeigen!
  document.getElementById("questionBody").style = "display: none"; // Endscreen wird am Ende angezeigt!
  document.getElementById("amount-of-questions").innerHTML = questions.length; // Die Anzahl an Fragen die du maximal beantwortet hast!
  document.getElementById("amount-of-right-questions").innerHTML =
    rightQuestions;
  document.getElementById("header-image").src = "./img/brain result.png"; // Endscreen Bild ändern
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = percent * 100; //Math.round vor (percent * 100)
  document.getElementById("progress-bar").innerHTML = `${percent} %`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("question-number").innerHTML = currentQuestion + 1; // die Anzahl der Fragen im unteren Bereich verändert sich auf + 1
  document.getElementById("questiontext").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    // Richtige Frage beantwortet!
    document.getElementById(selection).parentNode.classList.add("bg-success");
    audio_success.play();
    rightQuestions++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    audio_fail.play();
  }
  document.getElementById("next-button").disabled = false; // nächste Frage angezeigt nach Klick
}

function nextQuestion() {
  // nächste Frage
  currentQuestion++; // z.B. von 0 auf 1
  document.getElementById("next-button").disabled = true; // Button disabeled
  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
  // resettet alle grünen und rote
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("header-image").src = "./img/brainbg.jpg"; // Das alte Bild wieder angezeigt bekommen!
  document.getElementById("questionBody").style = ""; // QuestionBody wieder anzeigen!
  document.getElementById("endScreen").style = "display: none"; // Endscreen ausblenden!
  rightQuestions = 0;
  currentQuestion = 0;
  init();
}
