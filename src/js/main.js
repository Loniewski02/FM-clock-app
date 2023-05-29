let showBtn;
let appSection;
let refreshQuoteBtn;

const URL_QUOTE = `https://api.quotable.io/random`;

const prepareDOMElements = () => {
	showBtn = document.querySelector('.app__clock-btn');
	appSection = document.querySelector('.app');
	refreshQuoteBtn = document.querySelector('.app__quote-btn');
};

const prepareDOMEvents = () => {
	showBtn.addEventListener('click', handleInfo);
	refreshQuoteBtn.addEventListener('click', handleQuote);
};

const handleInfo = () => {
	appSection.classList.toggle('app--active');
	const btnText = document.querySelector('.app__clock-btn-text');
	if (appSection.classList.contains('app--active')) {
		showDetails();
		btnText.textContent = 'less';
		gsap.to('.app__clock-btn-circle', {
			duration: 0.3,
			rotate: '180deg',
		});
	} else {
		hideDetails();
		btnText.textContent = 'more';
		gsap.to('.app__clock-btn-circle', {
			duration: 0.3,
			rotate: '0',
		});
	}
};

const showDetails = () => {
	gsap.to('.app-bottom', {
		duration: 0.5,
		y: '-100%',
	});
	gsap.to('.app', {
		y: '-50%',
	});
};

const hideDetails = () => {
	gsap.to('.app-bottom', {
		duration: 0.5,
		y: '100%',
	});
	gsap.to('.app', {
		y: '0%',
	});
};

async function handleQuote() {
	const response = await axios.get(URL_QUOTE);
	try {
		const quoteText = document.querySelector('.app__quote-text');
		const quoteAuthor = document.querySelector('.app__quote-author');
		quoteText.textContent = response.data.content;
		quoteAuthor.textContent = response.data.author;
	} catch (error) {
		console.error(error);
	}
}

async function getTime() {
	const response = await axios.get(URL_QUOTE);
	try {
		const quoteText = document.querySelector('.app__quote-text');
		const quoteAuthor = document.querySelector('.app__quote-author');
		quoteText.textContent = response.data.content;
		quoteAuthor.textContent = response.data.author;
	} catch (error) {
		console.error(error);
	}
}

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	handleQuote();
};

document.addEventListener('DOMContentLoaded', main);
