const API_BASE_URL = 'https://tt-production-0f24.up.railway.app';

interface Question {
    id: number;
    content: string;
    options: string[];
}

interface LeaderboardEntry {
    userId: string;
    username: string;
    totalScore: number;
    gamesPlayed: number;
}

let currentQuestions: Question[] = [];
let currentIndex = 0;
let timerId: number | undefined;
let remainingSeconds = 30;

async function fetchQuestions(): Promise<void> {
    const categorySelect = document.getElementById('categoryFilter') as HTMLSelectElement | null;
    const selectedCategory = categorySelect?.value || '';

    const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : '';

    try {
        const response = await fetch(`${API_BASE_URL}/questions${query}`); // Fetch questions from the backend
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const questions: Question[] = await response.json();
        currentQuestions = questions;
        currentIndex = 0;
        showCurrentQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
        const questionsContainer = document.getElementById('questions') as HTMLElement;
        questionsContainer.innerHTML = '<p class="text-danger">Error loading questions. Please try again later.</p>';
    }
}

function showCurrentQuestion(): void {
    const questionsContainer = document.getElementById('questions') as HTMLElement;
    questionsContainer.innerHTML = ''; // Clear previous questions

    if (!currentQuestions.length) {
        questionsContainer.innerHTML = '<p class="text-muted text-center">No questions for this category.</p>';
        stopTimer();
        updateTimerDisplay();
        return;
    }

    if (currentIndex >= currentQuestions.length) {
        questionsContainer.innerHTML = '<p class="text-center fw-bold">Quiz complete! 🎉</p>';
        stopTimer();
        updateTimerDisplay();
        return;
    }

    const question = currentQuestions[currentIndex];

    const questionDiv = document.createElement('div');
    questionDiv.className = 'border rounded p-3 mb-3 bg-light';

    const questionText = document.createElement('p');
    questionText.className = 'question text-black';
    questionText.innerText = `${question.id}. ${question.content}`;

    const choicesDiv = document.createElement('div');
    choicesDiv.className = 'choices d-flex flex-column mt-2';

    question.options.forEach((option) => {
        const choiceDiv = document.createElement('div');
        choiceDiv.className = 'choice-style text-center rounded shadow-lg p-3 mb-2';
        choiceDiv.innerText = option;
        choicesDiv.appendChild(choiceDiv);
    });

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(choicesDiv);
    questionsContainer.appendChild(questionDiv);

    startTimer();
}

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer');
    if (!timerEl) return;
    if (!currentQuestions.length || currentIndex >= currentQuestions.length) {
        timerEl.textContent = '';
        return;
    }
    timerEl.textContent = `Time left: ${remainingSeconds}s`;
}

function startTimer() {
    stopTimer();
    remainingSeconds = 30;
    updateTimerDisplay();

    timerId = window.setInterval(() => {
        remainingSeconds -= 1;
        if (remainingSeconds <= 0) {
            currentIndex += 1;
            showCurrentQuestion();
        } else {
            updateTimerDisplay();
        }
    }, 1000);
}

function stopTimer() {
    if (timerId !== undefined) {
        clearInterval(timerId);
        timerId = undefined;
    }
}

async function fetchLeaderboard(): Promise<void> {
    const leaderboardContainer = document.getElementById('leaderboard');
    if (!leaderboardContainer) return;

    try {
        const response = await fetch(
            `${API_BASE_URL}/results?leaderboard=true&limit=10`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard');
        }

        const entries: LeaderboardEntry[] = await response.json();
        displayLeaderboard(entries);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        leaderboardContainer.innerHTML =
            '<p class="text-danger">Error loading leaderboard. Please try again later.</p>';
    }
}

function displayLeaderboard(entries: LeaderboardEntry[]): void {
    const leaderboardContainer = document.getElementById('leaderboard') as HTMLElement;
    if (!leaderboardContainer) return;

    if (!entries.length) {
        leaderboardContainer.innerHTML =
            '<p class="text-muted text-center">No scores yet. Play a quiz to appear on the leaderboard!</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-striped table-dark table-bordered mt-3';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th scope="col">Rank</th>
            <th scope="col">Player</th>
            <th scope="col">Total Score</th>
            <th scope="col">Games Played</th>
        </tr>
    `;

    const tbody = document.createElement('tbody');

    entries.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${entry.username || 'Unknown'}</td>
            <td>${entry.totalScore}</td>
            <td>${entry.gamesPlayed}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    leaderboardContainer.innerHTML = '';
    leaderboardContainer.appendChild(table);
}

// Fetch questions and leaderboard on page load
async function initQuizPage() {
    // Load categories into the filter dropdown
    const categorySelect = document.getElementById('categoryFilter') as HTMLSelectElement | null;
    if (categorySelect) {
        try {
            const res = await fetch(`${API_BASE_URL}/categories`);
            if (res.ok) {
                const categories: { name: string }[] = await res.json();
                categories.forEach((cat) => {
                    const opt = document.createElement('option');
                    opt.value = cat.name;
                    opt.textContent = cat.name;
                    categorySelect.appendChild(opt);
                });
            }
        } catch (e) {
            console.error('Error loading categories for filter', e);
        }
    }

    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            currentQuestions = [];
            currentIndex = 0;
            fetchQuestions();
        });
    }

    fetchLeaderboard();
}

initQuizPage();