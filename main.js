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

    // Navigation logic for page sections
    const navLinks = document.querySelectorAll('nav a');
    const pageSections = document.querySelectorAll('.page-section');

    // Show the home section by default (or the section corresponding to the current URL hash)
    const currentHash = window.location.hash || '#home';
    const initialSection = document.querySelector(currentHash);
    if (initialSection) {
        initialSection.classList.add('active-section');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior

            // Remove active-section from all sections
            pageSections.forEach(section => {
                section.classList.remove('active-section');
            });

            // Add active-section to the target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }

            // Optionally, scroll to the top of the section (smoothly)
            // targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

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
