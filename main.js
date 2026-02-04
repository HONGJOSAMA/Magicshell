const answers = ["Do It", "Don't Do It", "Yes", "No"];
const askButton = document.getElementById("askButton");
const answerDiv = document.getElementById("answer");
const questionInput = document.getElementById("question");

askButton.addEventListener("click", () => {
  const question = questionInput.value;
  if (question) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    answerDiv.textContent = answers[randomIndex];
  } else {
    answerDiv.textContent = "Please ask a question first.";
  }
});
