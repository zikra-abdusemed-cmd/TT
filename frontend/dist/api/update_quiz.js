const apiUrl = 'http://tt-production-0f24.up.railway.app/questions'; // http://localhost:3000/questions/2

// Fetch quiz by ID
document.getElementById('fetchQuiz').addEventListener('click', async () => {
    const questionId = document.getElementById('id').value;
    if (!questionId) {
        alert('Please enter a question ID');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${questionId}`);
        if (!response.ok) throw new Error('Question not found');

        const question = await response.json();
        displayQuestion(question);
    } catch (error) {
        console.error('Error fetching question:', error);
        alert('Error fetching question: ' + error.message);
    }
});

// Display the fetched question
function displayQuestion(question) {
    document.getElementById('quizDisplay').innerHTML = `
        <h5>${question.content}</h5>
        <p>Options:</p>
        <ul>                    ${question.options.map((option, index) => `<li>${String.fromCharCode(65 + index)}: ${option}</li>`).join('')}
                </ul>
                <button onclick="deleteQuestion(${question.id})" class="btn btn-danger">Delete</button>
            `;

            // Populate the update form with the fetched question
            document.getElementById('question').value = question.content;
            document.getElementById('choice-a').value = question.options[0];
            document.getElementById('choice-b').value = question.options[1];
            document.getElementById('choice-c').value = question.options[2];
            document.getElementById('choice-d').value = question.options[3];
            document.getElementById('answer').value = question.correctAnswer;

            // Show the update button
            document.getElementById('updateQuestion').style.display = 'block';
        }

        // Delete question
        async function deleteQuestion(id) {
            if (confirm('Are you sure you want to delete this question?')) {
                try {
                    const response = await fetch(`${apiUrl}/${id}`, {
                        method: 'DELETE',
                    });
                    if (!response.ok) throw new Error('Error deleting question');                      alert('Question deleted successfully');
                    document.getElementById('quizDisplay').innerHTML = '';
                    document.getElementById('updateQuestion').style.display = 'none'; // Hide the update button
                } catch (error) {
                    console.error('Error deleting question:', error);
                    alert('Error deleting question: ' + error.message);
                }
            }
        }

        // Update question
        document.getElementById('updateQuestion').addEventListener('click', async () => {
            const questionId = document.getElementById('id').value;
            const updatedQuestion = {
                content: document.getElementById('question').value,
                options: [
                    document.getElementById('choice-a').value,
                    document.getElementById('choice-b').value,
                    document.getElementById('choice-c').value,
                    document.getElementById('choice-d').value,
                ],
                correctAnswer: document.getElementById('answer').value,
            };

            try {
                const response = await fetch(`${apiUrl}/${questionId}`, {

                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'     },
                        body: JSON.stringify(updatedQuestion)
                    });
    
                    if (!response.ok) throw new Error('Error updating question');
    
                    alert('Question updated successfully');
                    displayQuestion(updatedQuestion); // Refresh the displayed question
                } catch (error) {
                    console.error('Error updating question:', error);
                    alert('Error updating question: ' + error.message);
                }
            });
