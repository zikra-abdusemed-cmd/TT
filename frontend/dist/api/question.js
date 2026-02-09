"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestion = createQuestion;
exports.fetchQuestionById = fetchQuestionById;
exports.updateQuestion = updateQuestion;
exports.deleteQuestionById = deleteQuestionById;
// Function to Create a New Question
function createQuestion(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://tt-production-0f24.up.railway.app/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = yield response.json();
            if (response.ok) {
                alert('Question created successfully!');
                console.log(result);
                // Optionally reset the form or handle UI updates
            }
            else {
                alert('Failed to create question: ');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error creating the question. Please try again later.');
        }
    });
}
// Function to Fetch a Question by ID
function fetchQuestionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://tt-production-0f24.up.railway.app/questions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = yield response.json();
            if (response.ok) {
                // Display the fetched question
                document.getElementById('quizDisplay').innerHTML = `
                <h5>Question:</h5>
                <p>${result.question}</p>
                <h6>Choices:</h6>
                <ul>
                    <li>A: ${result.choices.A}</li>
                    <li>B: ${result.choices.B}</li>
                    <li>C: ${result.choices.C}</li>
                    <li>D: ${result.choices.D}</li>
                </ul>
                <p>Correct Answer: ${result.answer}</p>
            `;
            }
            else {
                alert('Failed to fetch question: ');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error fetching the question. Please try again later.');
        }
    });
}
// Function to Update a Question
function updateQuestion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedQuestion = {
            id,
            question: document.getElementById('question').value,
            choices: {
                A: document.getElementById('choice-a').value,
                B: document.getElementById('choice-b').value,
                C: document.getElementById('choice-c').value,
                D: document.getElementById('choice-d').value,
            },
            answer: document.getElementById('answer').value,
        };
        try {
            const response = yield fetch(`https://tt-production-0f24.up.railway.app/questions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedQuestion),
            });
            if (response.ok) {
                alert('Question updated successfully!');
                // Optionally clear fields or redirect
            }
            else {
                const result = yield response.json();
                alert('Failed to update question: ' + result.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error updating the question. Please try again later.');
        }
    });
}
// Function to Delete a Question by ID
function deleteQuestionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://tt-production-0f24.up.railway.app/questions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = yield response.json();
            if (response.ok) {
                alert('Question deleted successfully!');
                document.getElementById('quizDisplay').innerHTML = ''; // Clear displayed question
                document.getElementById('id').value = ''; // Clear input field
            }
            else {
                alert('Failed to delete question: ');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error deleting the question. Please try again later.');
        }
    });
}
