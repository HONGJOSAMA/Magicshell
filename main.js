document.addEventListener('DOMContentLoaded', () => {
    const askButton = document.getElementById('askButton');
    const answerDiv = document.getElementById('answer');
    const themeToggle = document.getElementById('theme-toggle');
    const questionInput = document.getElementById('question');
    const starButtonContainer = document.getElementById('star-button-container');
    const starIcon = document.getElementById('star-icon');
    const starCountSpan = document.getElementById('star-count');
    const body = document.body; // body is always present

    const answers = ["Sure", "Pass", "Go", "Wait"];

    // --- Utility for UUID generation ---
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Get or create unique user ID
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = generateUUID();
        localStorage.setItem('userId', userId);
    }

    // --- Firebase Setup ---
    // IMPORTANT: Replace with your actual Firebase project configuration
    // The databaseURL and projectId have been updated.
    // You still need to fill in apiKey, authDomain, storageBucket, messagingSenderId, and appId.
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY", // FILL THIS IN
        authDomain: "YOUR_AUTH_DOMAIN", // FILL THIS IN
        databaseURL: "https://second-golden-bat-149961-b0854-default-rtdb.firebaseio.com/",
        projectId: "second-golden-bat-149961-b0854",
        storageBucket: "YOUR_STORAGE_BUCKET", // FILL THIS IN
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // FILL THIS IN
        appId: "YOUR_APP_ID" // FILL THIS IN
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    const likesRef = database.ref('likes');
    const userLikesRef = database.ref('users/' + userId + '/clickedStar');

    let userHasClicked = false; // Flag to track if the current user has clicked

    // Check user's click status on load
    userLikesRef.once('value', (snapshot) => {
        if (snapshot.val() === true) {
            userHasClicked = true;
            starButtonContainer.classList.add('disabled');
        }
    });

    // Real-time synchronization of global likes count
    likesRef.on('value', (snapshot) => {
        const currentLikes = snapshot.val();
        if (currentLikes !== null) {
            starCountSpan.textContent = currentLikes;
            // Trigger pop-up animation
            starCountSpan.classList.remove('pop-up'); // Reset animation
            void starCountSpan.offsetWidth; // Trigger reflow
            starCountSpan.classList.add('pop-up');
        } else {
            starCountSpan.textContent = 0; // Default to 0 if no likes yet
        }
    });
    // --- End Firebase Setup ---

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

    if (starButtonContainer && starIcon && starCountSpan) {
        starButtonContainer.addEventListener('click', () => {
            if (userHasClicked) {
                return; // Do nothing if user has already clicked
            }

            // Use Firebase transaction to increment global likes
            likesRef.transaction((currentLikes) => {
                return (currentLikes || 0) + 1;
            }).then(() => {
                // Update user's click status after successful global increment
                userLikesRef.set(true);
                userHasClicked = true;
                starButtonContainer.classList.add('disabled');
            });

            // Add twinkle animation
            starIcon.classList.add('twinkle');
            starIcon.addEventListener('animationend', () => {
                starIcon.classList.remove('twinkle');
            }, { once: true });
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

    const menuToggleButton = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu ul li a');

    if (menuToggleButton && mobileMenu) {
        menuToggleButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('menu-open');
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking outside of it
        document.addEventListener('click', (event) => {
            if (!mobileMenu.contains(event.target) && !hamburgerButton.contains(event.target) && mobileMenu.classList.contains('menu-open')) {
                mobileMenu.classList.remove('menu-open');
            }
        });
    }

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
