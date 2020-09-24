const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote'); //'quote' is the id used on the <span>
const authorText = document.getElementById('author');   //'author' is the id used on the <span>
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const Loader = document.getElementById('loader');

function showLoadingSpinner() {
    Loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!Loader.hidden) {
        quoteContainer.hidden = false;
        Loader.hidden = true;
    }
}

// Get Quote from API
// http://quotes.stormconsultancy.co.uk/api

async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'http://quotes.stormconsultancy.co.uk/quotes/random.json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // data.author comes from the API's outcome
        // If Author is blank, add 'Unknown'
        if (data.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.author
        }   
        // Reduce font size for long quotes
        if (data.quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quote;   // data.quote comes from the API's outcome
        console.log(data);
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
        console.log('Ups, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;  // denote template string
    window.open(twitterUrl, '_blank');
}

// Event Listeners    (1 listener for each button)
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();