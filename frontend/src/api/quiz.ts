const API_BASE_URL = 'http://localhost:3000';

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

async function fetchQuestions(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/questions`); // Fetch questions from the backend
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const questions: Question[] = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        const questionsContainer = document.getElementById('questions') as HTMLElement;
        questionsContainer.innerHTML = '<p class="text-danger">Error loading questions. Please try again later.</p>';
    }
}

function displayQuestions(questions: Question[]): void {
    const questionsContainer = document.getElementById('questions') as HTMLElement;
    questionsContainer.innerHTML = ''; // Clear previous questions

    questions.forEach((question) => {
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
    });
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
fetchQuestions();
fetchLeaderboard();