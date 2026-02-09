const apiUrl: string = 'https://tt-production-0f24.up.railway.app/questions'; // Base API URL

// Interface for Question type
interface Question {
    id: number;
    content: string;
    options: string[];
    correctAnswer: string;
}

// Fetch quiz by ID
document.getElementById('fetchQuiz')?.addEventListener('click', async () => {
    const questionId = (document.getElementById('id') as HTMLInputElement).value;
    if (!questionId) {
        alert('Please enter a question ID');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${questionId}`);
        if (!response.ok) throw new Error('Question not found');

        const question: Question = await response.json();
        displayQuestion(question);
    } catch (error) {
        console.error('Error fetching question:', error);
        alert('Error fetching question: ' + (error as Error).message);
    }
});

// Display the fetched question
function displayQuestion(question: Question): void {
    document.getElementById('quizDisplay')!.innerHTML = `
        <h5>${question.content}</h5>
        <p>Options:</p>
        <ul>
            ${question.options.map((option, index) => `<li>${String.fromCharCode(65 + index)}: ${option}</li>`).join('')}
        </ul>
        <button onclick="deleteQuestion(${question.id})" class="btn btn-danger">Delete</button>
    `;

    // Populate the update form with the fetched question
    (document.getElementById('question') as HTMLInputElement).value = question.content;
    (document.getElementById('choice-a') as HTMLInputElement).value = question.options[0];
    (document.getElementById('choice-b') as HTMLInputElement).value = question.options[1];
    (document.getElementById('choice-c') as HTMLInputElement).value = question.options[2];
    (document.getElementById('choice-d') as HTMLInputElement).value = question.options[3];
    (document.getElementById('answer') as HTMLInputElement).value = question.correctAnswer;

    // Show the update button
    document.getElementById('updateQuestion')!.style.display = 'block';
}

// Delete question
async function deleteQuestion(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this question?')) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error deleting question');
            alert('Question deleted successfully');
            document.getElementById('quizDisplay')!.innerHTML = '';
            document.getElementById('updateQuestion')!.style.display = 'none'; // Hide the update button
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Error deleting question: ' + (error as Error).message);
        }
    }
}

// Update question
document.getElementById('updateQuestion')?.addEventListener('click', async () => {
    const questionId = (document.getElementById('id') as HTMLInputElement).value;
    const updatedQuestion: Omit<Question, 'id'> = {
        content: (document.getElementById('question') as HTMLInputElement).value,
        options: [
            (document.getElementById('choice-a') as HTMLInputElement).value,
            (document.getElementById('choice-b') as HTMLInputElement).value,
            (document.getElementById('choice-c') as HTMLInputElement).value,
            (document.getElementById('choice-d') as HTMLInputElement).value,
        ],
        correctAnswer: (document.getElementById('answer') as HTMLInputElement).value,
    };

    try {
        const response = await fetch(`${apiUrl}/${questionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedQuestion)
        });

        if (!response.ok) throw new Error('Error updating question');

        alert('Question updated successfully');
        displayQuestion({ ...updatedQuestion, id: Number(questionId) }); // Refresh the displayed question
    } catch (error) {
        console.error('Error updating question:', error);
        alert('Error updating question: ' + (error as Error).message);
    }
});