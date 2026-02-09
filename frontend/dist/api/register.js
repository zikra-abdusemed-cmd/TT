
// Get the form element
const registerForm = document.getElementById('registerForm');

// Event listener for form submission
registerForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
      fetch('http://localhost:3000/auth/register',{ //http://localhost:3000/auth/register
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If registration is successful, show a success message and redirect
            alert("Registration successful!");
            window.location.href = '/login.html'; // Redirect to login page after successful registration
        } else {
            // If there's an error, show the error message
            alert(data.message ||"successfull");
            window.location.href = '/login.html'; // Redirect to login page after successful registration

            
        }
    })
    .catch(error => {
        console.log('error',error);
        alert('An error occurred during the registration process. Please try again.');
    });
});