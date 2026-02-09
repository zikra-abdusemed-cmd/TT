
// Interface Definitions
interface Question {
    id: string;
    question: string;
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: string;
}

interface QuestionPayload {
    question: string;
    choices: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
    answer: string;
}

// Function to Create a New Question
export async function createQuestion(payload: QuestionPayload): Promise<void> {
    try {
        const response = await fetch('https://tt-production-0f24.up.railway.app/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Question created successfully!');
            console.log(result);
            // Optionally reset the form or handle UI updates
        } else {
            alert('Failed to create question: ');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error creating the question. Please try again later.');
    }
}

// Function to Fetch a Question by ID
export async function fetchQuestionById(id: string): Promise<void> {
    try {
        const response = await fetch(`https://tt-production-0f24.up.railway.app/questions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: Question = await response.json();

        if (response.ok) {
            // Display the fetched question
            document.getElementById('quizDisplay')!.innerHTML = `
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
        } else {
            alert('Failed to fetch question: ' );
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error fetching the question. Please try again later.');
    }
}

// Function to Update a Question
export async function updateQuestion(id: string): Promise<void> {
    const updatedQuestion: Question = {
        id,
        question: (document.getElementById('question') as HTMLInputElement).value,
        choices: {
            A: (document.getElementById('choice-a') as HTMLInputElement).value,
            B: (document.getElementById('choice-b') as HTMLInputElement).value,
            C: (document.getElementById('choice-c') as HTMLInputElement).value,
            D: (document.getElementById('choice-d') as HTMLInputElement).value,
        },
        answer: (document.getElementById('answer') as HTMLInputElement).value,
    };

    try {
        const response = await fetch(`https://tt-production-0f24.up.railway.app/questions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuestion),
        });

        if (response.ok) {
            alert('Question updated successfully!');
            // Optionally clear fields or redirect
        } else {
            const result = await response.json();
            alert('Failed to update question: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error updating the question. Please try again later.');
    }
}

// Function to Delete a Question by ID
export async function deleteQuestionById(id: string): Promise<void> {
    try {
        const response = await fetch(`https://tt-production-0f24.up.railway.app/questions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            alert('Question deleted successfully!');
            document.getElementById('quizDisplay')!.innerHTML = ''; // Clear displayed question
            (document.getElementById('id') as HTMLInputElement).value = ''; // Clear input field
        } else {
            alert('Failed to delete question: ');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error deleting the question. Please try again later.');
    }
}