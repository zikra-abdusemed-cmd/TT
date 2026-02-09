const form = document.getElementById('loginForm') as HTMLFormElement;

form.addEventListener('submit', (e: Event) => {
    e.preventDefault(); // Prevent the default form submission

    // Determine which button was clicked to set the desired role
    const clickedButton = document.activeElement as HTMLButtonElement;
    let desiredRole: 'user' | 'admin' = 'user'; // Default role

    if (clickedButton.id === 'loginAdmin') {
        desiredRole = 'admin';
    }

    const username = (document.getElementById('loginUsername') as HTMLInputElement).value.trim();
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value.trim();

    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Make a POST request to the deployed backend for login
    fetch('https://tt-production-0f24.up.railway.app/auth/login', {
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
        .then((data: { accessToken: string; role: string }) => {
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