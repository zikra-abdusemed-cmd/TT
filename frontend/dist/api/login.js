
const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Determine which button was clicked to set the desired role
    const clickedButton = document.activeElement;
    let desiredRole = 'user'; // Default role

    if (clickedButton.id === 'loginAdmin') {
        desiredRole = 'admin';
    }

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Make a POST request to the backend for login
    fetch('https://lm02th78-3000.uks1.devtunnels.ms/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            role: desiredRole // Send the desired role to the backend if necessary
        })
    })
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.accessToken && data.role) {
                // Save the access token and role to localStorage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('role', data.role);
                alert('Login successful!');
                // Redirect based on the user's role
                if (data.role.toLowerCase() === 'user') {
                    window.location.href = 'quiz.html';
                } else if (data.role.toLowerCase() === 'admin') {
                    window.location.href = 'create_quiz.html';
                } else {
                    alert('Unknown role. Please contact support.');
                }
            } else {
                // Handle cases where expected data is missing
                alert('Invalid credentials or server error. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during the login process. Please try again.');
        });
});
