// Function to handle user registration
export async function handleRegistration(event: Event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const payload = { name, email, password };

    try {
        const response = await fetch('https://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            console.log(result);
            // Optionally redirect to login or dashboard
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            alert('Registration failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error. Please try again later.');
    }
}

// Function to handle user login
export async function handleUserLogin(event: Event) {
    event.preventDefault();

    const username = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

    const payload = { username, password };

    try {
        const response = await fetch('https://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            alert('User login successful!');
            console.log(result);
            window.location.href = '/quiz.html'; // Redirect to user quiz page
        } else {
            alert('Login failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error. Please try again later.');
    }
}

// Function to handle admin login
export async function handleAdminLogin(event: Event) {
    event.preventDefault();

    const username = (document.getElementById('loginUsername') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

    const payload = { username, password };

    try {
        const response = await fetch('https://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Admin login successful!');
            console.log(result);
            window.location.href = '/create_quiz.html'; // Redirect to admin dashboard
        } else {
            alert('Login failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error. Please try again later.');
    }
}