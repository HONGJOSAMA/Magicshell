document.addEventListener('DOMContentLoaded', () => {
    const askButton = document.getElementById('askButton');
    const answerDiv = document.getElementById('answer');
    const themeToggle = document.getElementById('theme-toggle');
    const questionInput = document.getElementById('question');
    const body = document.body; // body is always present

    const answers = ["Sure", "Pass", "Go", "Wait"];

    // Function to set the theme
    const setTheme = (theme) => {
        body.className = theme + '-theme';
        localStorage.setItem('theme', theme);
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    setTheme(savedTheme);

    if (themeToggle) {
        // Theme toggle event
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    if (askButton && answerDiv) {
        // Ask button event
        askButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * answers.length);
            answerDiv.textContent = answers[randomIndex];
        });
    }

    if (questionInput && askButton) {
        // Trigger askButton on Enter key press in question input
        questionInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                askButton.click();
            }
        });
    }

    // FAQ Toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-item h3');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            if (answer && answer.tagName === 'P') {
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});
