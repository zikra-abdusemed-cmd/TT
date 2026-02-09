// src/main.ts

// Import functions from auth.ts and question.ts
import { handleRegistration, handleUserLogin, handleAdminLogin } from './api/auth';
import { fetchQuestionById, updateQuestion, deleteQuestionById, createQuestion } from './api/question';

// Set up event listeners for authentication
function setupAuthEventListeners() {
    // Registration
    document.getElementById('registerForm')?.addEventListener('submit', handleRegistration);

    // User login
    document.getElementById('loginUser')?.addEventListener('click', handleUserLogin);

    // Admin login
    document.getElementById('loginAdmin')?.addEventListener('click', handleAdminLogin);
}

// Set up event listeners for question management
function setupQuestionEventListeners() {
    // Fetch a quiz question by ID
    document.getElementById('fetchQuiz')?.addEventListener('click', () => {
        const id = (document.getElementById('id') as HTMLInputElement).value;
        if (id) {
            fetchQuestionById(id);
        } else {
            alert('Please enter a valid Question ID.');
        }
    });

    // Update a question by ID
    document.getElementById('updateQuestion')?.addEventListener('click', () => {
        const id = (document.getElementById('id') as HTMLInputElement).value;
        if (id) {
            updateQuestion(id);
        } else {
            alert('Please enter a valid Question ID.');
        }
    });

    // Delete a question by ID
    document.getElementById('deleteQuestion')?.addEventListener('click', () => {
        const id = (document.getElementById('id') as HTMLInputElement).value;
        if (id) {
            deleteQuestionById(id);
        } else {
            alert('Please enter a valid Question ID.');
        }
    });

    // Event listener for creating a new question
    document.getElementById('submitQuestion')?.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default button action

        const question = (document.getElementById('question') as HTMLInputElement).value;
        const choiceA = (document.getElementById('choice-a') as HTMLInputElement).value;
        const choiceB = (document.getElementById('choice-b') as HTMLInputElement).value;
        const choiceC = (document.getElementById('choice-c') as HTMLInputElement).value;
        const choiceD = (document.getElementById('choice-d') as HTMLInputElement).value;
        const answer = (document.getElementById('answer') as HTMLInputElement).value;

        const payload = {
            question,
            choices: {
                A: choiceA,
                B: choiceB,
                C: choiceC,
                D: choiceD,
            },
            answer,
        };

        createQuestion(payload);
    });
}

// Initialize all event listeners
function init() {
    setupAuthEventListeners();
    setupQuestionEventListeners();
}

// Run the initialization function
init();