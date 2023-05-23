document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startButton');
  const nextButton = document.getElementById('nextButton');
  const questionContainer = document.getElementById('questionContainer');
  let currentQuestionIndex = 0;
  let questions = [];

  // Load questions from JSON file
  async function loadQuestions() {
    try {
      const response = await fetch('questions.json');
      if (!response.ok) {
        throw new Error('Failed to load questions');
      }
      questions = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // Display question
  function displayQuestion() {
    questionContainer.innerHTML = '';

    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h2>${currentQuestion.vraag}</h2>
      <ul class="choices">
        ${currentQuestion.antwoorden.map(choice => `<li>${choice}</li>`).join('')}
      </ul>
    `;
    questionContainer.appendChild(questionElement);

    const choices = questionElement.querySelectorAll('li');
    choices.forEach((choice, index) => {
      choice.addEventListener('click', function() {
        const selectedChoice = this.textContent;
        if (index === currentQuestion.antwoordIndex) {
          this.style.backgroundColor = '#c8e6c9';
        } else {
          this.style.backgroundColor = '#ffcdd2';
        }
      });
    });
  }

  // Event listener for start button click
  startButton.addEventListener('click', function() {
    startButton.style.display = 'none';
    nextButton.style.display = 'block';
    loadQuestions().then(displayQuestion);
  });

  // Event listener for next button click
  nextButton.addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      questionContainer.innerHTML = '<h2>Quiz completed!</h2>';
      nextButton.style.display = 'none';
    }
  });
});
