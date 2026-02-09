async function fetchQuestions() {
    try {
        const response = await fetch('https://tt-production-0f24.up.railway.app/questions');//http://localhost:3000/questions
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error:', response.status, errorText);
            throw new Error(`Failed to fetch questions: ${response.status} ${errorText}`);
        }
        const questions = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        const questionsContainer = document.getElementById('questions');
        if (questionsContainer) {
            questionsContainer.innerHTML = '<p class="text-danger">Error loading questions. Please check the console for details.</p>';
        }
    }
}

function displayQuestions(questions) {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = ''; // Clear previous questions
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'border rounded p-3 mb-3 bg-light';
        
        const questionText = document.createElement('p');
        questionText.className = 'question text-black';
        questionText.innerText = `${question.id}. ${question.content}`;

        const choicesDiv = document.createElement('div');
        choicesDiv.className = 'choices d-flex flex-column mt-2';

        question.options.forEach(option => {
            const choiceDiv = document.createElement('div');
            choiceDiv.className = 'choice-style text-center rounded shadow-lg p-3 mb-2';
            choiceDiv.innerText = option;
            choicesDiv.appendChild(choiceDiv);
        });

        questionDiv.appendChild(questionText);
        questionDiv.appendChild(choicesDiv);
        questionsContainer.appendChild(questionDiv);
    });
}
        // Fetch questions on page load
        fetchQuestions();