"use strict";
// src/main.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Import functions from auth.ts and question.ts
import { handleRegistration, handleUserLogin, handleAdminLogin } from "api/auth";
import { fetchQuestionById, updateQuestion, deleteQuestionById, createQuestion } from "api/question";
// Set up event listeners for authentication
function setupAuthEventListeners() {
    var _a, _b, _c;
    // Registration
    (_a = document.getElementById('registerForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleRegistration);
    // User login
    (_b = document.getElementById('loginUser')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', handleUserLogin);
    // Admin login
    (_c = document.getElementById('loginAdmin')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', handleAdminLogin);
}
// Set up event listeners for question management
function setupQuestionEventListeners() {
    var _a, _b, _c, _d;
    (_a = document.getElementById('fetchQuiz')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const id = document.getElementById('id').value;
        if (id) {
            (0, fetchQuestionById)(id);
        }
        else {
            alert('Please enter a valid Question ID.');
        }
    });
    (_b = document.getElementById('updateQuestion')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const id = document.getElementById('id').value;
        if (id) {
            (0, updateQuestion)(id);
        }
        else {
            alert('Please enter a valid Question ID.');
        }
    });
    (_c = document.getElementById('deleteQuestion')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        const id = document.getElementById('id').value;
        if (id) {
            (0, deleteQuestionById)(id);
        }
        else {
            alert('Please enter a valid Question ID.');
        }
    });
    // Event listener for creating a new question
    (_d = document.getElementById('submitQuestion')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default button action
        const question = document.getElementById('question').value;
        const choiceA = document.getElementById('choice-a').value;
        const choiceB = document.getElementById('choice-b').value;
        const choiceC = document.getElementById('choice-c').value;
        const choiceD = document.getElementById('choice-d').value;
        const answer = document.getElementById('answer').value;
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
        (0, createQuestion)(payload);
    });
}
// Initialize all event listeners
function init() {
    setupAuthEventListeners();
    setupQuestionEventListeners();
}
// Run the initialization function
init();
