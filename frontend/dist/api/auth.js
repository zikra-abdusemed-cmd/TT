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
// auth.js (Note: No exports object used anymore)
export function authenticateUser(username, password) {
    // Authentication logic here
    console.log('Authenticating user:', username, password);
  }
  
  export function logoutUser(){
      console.log('Logging out user');
  }
// Function to handle user registration
function handleRegistration(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const payload = { name, email, password };
        try {
            const response = yield fetch('https://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = yield response.json();
            if (response.ok) {
                alert('Registration successful!');
                console.log(result);
                // Optionally redirect to login or dashboard
                window.location.href = '/login.html'; // Redirect to login page
            }
            else {
                alert('Registration failed: ' + result.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error. Please try again later.');
        }
    });
}
// Function to handle user login
function handleUserLogin(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const payload = { username, password };
        try {
            const response = yield fetch('https://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = yield response.json();
            if (response.ok) {
                alert('User login successful!');
                console.log(result);
                window.location.href = '/quiz.html'; // Redirect to user quiz page
            }
            else {
                alert('Login failed: ' + result.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error. Please try again later.');
        }
    });
}
// Function to handle admin login
function handleAdminLogin(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const payload = { username, password };
        try {
            const response = yield fetch('https://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = yield response.json();
            if (response.ok) {
                alert('Admin login successful!');
                console.log(result);
                window.location.href = '/create_quiz.html'; // Redirect to admin dashboard
            }
            else {
                alert('Login failed: ' + result.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('There was an error. Please try again later.');
        }
    });
}
