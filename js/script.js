


function setGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good Morning!";
    } else if (hour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    document.getElementById('greeting').textContent = greeting;

}


function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
}

function setupToggleButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-btn')) {
            const targetId = e.target.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const isHidden = targetElement.style.display === 'none';
                targetElement.style.display = isHidden ? 'block' : 'none';
                e.target.textContent = isHidden ? 'Hide Details' : 'Show More About Me';
            }
        }
    });
}
function setupProjectSearch() {
    const searchInput = document.getElementById('project-search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    setupThemeToggle();
    setupToggleButtons();
    setupProjectSearch();
})
