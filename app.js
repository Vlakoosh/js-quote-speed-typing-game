const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.querySelector('.quote-display');
const quoteInputElement = document.querySelector('.quote-input');
const timerElement = document.querySelector('.timer');



quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        else if (character === characterSpan.textContent) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }
        else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })
    if (correct) renderNewQuote();
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.textContent = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.textContent = character;
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null;
    startTimer();
}

let startTime;
function startTimer() {
    startTime = new Date();
    timerElement.innerText = 0;
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();