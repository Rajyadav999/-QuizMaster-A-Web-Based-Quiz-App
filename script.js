// List of questions, options, and answers
const question = [
  {
    question: "What does HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which HTML tag is used to insert an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: "<img>"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<hyperlink>"],
    answer: "<a>"
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<lb>", "<break>", "<br>", "<line>"],
    answer: "<br>"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "How do you add a background color in CSS?",
    options: [
      "background-color: red;",
      "color-background: red;",
      "bgcolor: red;",
      "background: red-color;"
    ],
    answer: "background-color: red;"
  },
  {
    question: "Which value of position makes the element stay in place while scrolling?",
    options: ["relative", "fixed", "static", "absolute"],
    answer: "fixed"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "letvar"],
    answer: "var"
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    options: [
      "<script href='script.js'>",
      "<script name='script.js'>",
      "<script src='script.js'>",
      "<script file='script.js'>"
    ],
    answer: "<script src='script.js'>"
  },
  {
    question: "How do you write a comment in JavaScript?",
    options: ["<!-- comment -->", "// comment", "# comment", "** comment **"],
    answer: "// comment"
  },
  {
    question: "Which method is used to display a message in an alert box?",
    options: ["alert()", "prompt()", "confirm()", "message()"],
    answer: "alert()"
  }
];

// Initial setup
let score = 0;
let index = 0;
let timeLeft = 12;

const que = document.getElementById("question");
const option = document.querySelectorAll(".btn");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const beep = document.getElementById("beep");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

const userAnswers = new Array(question.length).fill(null); // To store user choices
const loadQuestion = () => {
  const data = question[index];
  que.innerText = `${index + 1}. ${data.question}`;

  option.forEach((btn, i) => {
    const opt = data.options[i];
    btn.innerText = opt;
    btn.disabled = false;
    btn.style.backgroundColor = "";
    btn.removeAttribute("data-correct");

    if (opt === data.answer) {
      btn.dataset.correct = "true";
      
    }

    // Restore previously selected answer
    if (userAnswers[index] === btn.innerText) {
      const isCorrect = btn.dataset.correct === "true";
      btn.style.backgroundColor = isCorrect ? "#d4fcd4" : "#ffd6d6";
      btn.disabled = true;
      option.forEach((b) => b.disabled = true); // disable all if one was already selected
    
    }
    
  });

  timeLeft = 12;
};


// Load first question
loadQuestion();

// Next button
next.addEventListener("click", () => {
  index++;
  loadQuestion();
  
});

// Previous button
previous.addEventListener("click", () => {
  index--;
  loadQuestion();
});

// Handle option click
option.forEach((btn) => {
  btn.addEventListener("click", () => {
    option.forEach((b) => b.disabled = true); // Disable all after selection
    userAnswers[index] = btn.innerText;
    const isCorrect = btn.dataset.correct === "true";

    if (isCorrect) {
      btn.style.backgroundColor = "#d4fcd4"; // green
      score++;
      scoreElement.innerText = `Our Score: ${score} /12`;
      
    } else {
      btn.style.backgroundColor = "#ffd6d6"; // red
    }
  });
});

// Timer countdown
let countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    timerElement.innerText = "Time's up!";
    timerElement.style.color = "red";

    option.forEach((btn) => btn.disabled = true); // Disable options
    next.disabled = true;
    previous.disabled = true;

    beep.play(); // Play sound
  } else {
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timeLeft--;
  }
}, 1000);
