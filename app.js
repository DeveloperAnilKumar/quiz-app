const express = require("express");
const app = express();
const cors = require("cors");
const quizData = require("./quiz.json");

const PORT = 4000;

app.use(express.json());

app.use(cors());


//default route
app.get("/", (req, res) => {
  res.send("<h1>  quiz application  </h1>");
});


//get the quiz data from quiz.json file
app.get("/quiz", (req, res) => {
  res.json(quizData.questions);
});


app.post("/quiz/submit", (req, res) => {
  const userAnswer = req.body.answers;

  let score = 0;
  const feedback = [];

  quizData.questions.forEach((question, index) => {
    if (userAnswer[index] === question.correctAnswer) {
      score++;
      feedback.push({ question: question.question, correct: true });
    } else {
      feedback.push({
        question: question.question,
        correct: false,
        correctAnswer: question.correctAnswer,
      });
    }
  });

  res.json({ score, feedback });
});

app.listen(PORT, () => {
  console.log(`server listen to port ${PORT}`);
});
