const answers = ["Do It", "Don't Do It", "Yes", "No"];
const askButton = document.getElementById("askButton");
const answerDiv = document.getElementById("answer");
const questionInput = document.getElementById("question");
const themeToggleButton = document.getElementById("theme-toggle");
const walkieTalkieToggleButton = document.getElementById("walkie-talkie-toggle");
const body = document.body;

const mainTitle = document.getElementById("main-title");
const descriptionText = document.getElementById("description-text");

function updateTextContent() {
    if (body.classList.contains("walkie-talkie-mode")) {
        mainTitle.textContent = "Report.";
        descriptionText.textContent = "I will give you an order. Over.";
    } else {
        mainTitle.textContent = "Do It or Not?";
        descriptionText.textContent = "Ask a question and get a random answer.";
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
}
updateTextContent(); // Call on page load to set initial text

themeToggleButton.addEventListener("click", () => {
    body.classList.remove("walkie-talkie-mode");
    body.classList.toggle("dark-mode");
    // Save theme preference
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark-mode");
    } else {
        localStorage.setItem("theme", "light");
    }
    updateTextContent(); // Update text content after theme change
});

walkieTalkieToggleButton.addEventListener("click", () => {
    body.classList.remove("dark-mode");
    body.classList.toggle("walkie-talkie-mode");
    // Save theme preference
    if (body.classList.contains("walkie-talkie-mode")) {
        localStorage.setItem("theme", "walkie-talkie-mode");
    } else {
        localStorage.setItem("theme", "light");
    }
    updateTextContent(); // Update text content after theme change
});

askButton.addEventListener("click", () => {
  const question = questionInput.value;
  if (question) {
    const randomIndex = Math.floor(Math.random() * answers.length);
    answerDiv.textContent = answers[randomIndex];
  } else {
    answerDiv.textContent = "Please ask a question first.";
  }
});
