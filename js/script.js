


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
    setupGitHubIntegration(); 
})

// GitHub API Integration for Assignment 3
async function fetchGitHubRepos() {
    const reposContainer = document.getElementById('github-repos');
    const username = 'aboalisaleem'; // Replace with your actual GitHub username
    
    try {
        reposContainer.innerHTML = '<div class="loading-message">Loading repositories...</div>';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) throw new Error('User not found or API limit exceeded');
        
        const repos = await response.json();
        displayGitHubRepos(repos);
    } catch (error) {
        reposContainer.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
    }
}

function displayGitHubRepos(repos) {
    const reposContainer = document.getElementById('github-repos');
    
    if (repos.length === 0) {
        reposContainer.innerHTML = '<div class="error-message">No repositories found</div>';
        return;
    }

    const reposHTML = repos.map(repo => `
        <div class="repo-card">
            <div class="repo-header">
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <span class="repo-language">${repo.language || 'Not specified'}</span>
            </div>
            <p class="repo-description">${repo.description || 'No description available'}</p>
            <div class="repo-stats">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                <span>📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');

    reposContainer.innerHTML = reposHTML;
}

function setupGitHubIntegration() {
    const fetchButton = document.getElementById('fetch-repos');
    fetchButton.addEventListener('click', fetchGitHubRepos);
}