// Get the form element
const registerForm = document.getElementById('registerForm') as HTMLFormElement;

// Event listener for form submission
registerForm.addEventListener('submit', function (e: Event) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const username = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Simple client-side validation
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Prepare the data to send to the backend
    const registrationData = {
        username: username,
        email: email,
        password: password
    };

    // Make a POST request to the backend to register the user
    fetch('https://tt-production-0f24.up.railway.app/auth/register', { // Deployed backend URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
        .then((response: Response) => response.json())
        .then((data: { success: boolean; message?: string }) => {
            if (data.success) {
                // If registration is successful, show a success message and redirect
                alert("Registration successful!");
                window.location.href = '/login.html'; // Redirect to login page after successful registration
            } else {
                // If there's an error, show the error message
                alert(data.message || "Something went wrong. Please try again.");
            }
        })
        .catch((error: Error) => {
            console.error('Error:', error);
            alert('An error occurred during the registration process. Please try again.');
        });
});