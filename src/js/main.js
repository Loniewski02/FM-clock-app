let showBtn;
let appSection;
let refreshQuoteBtn;
let time;
let body;

const URL_QUOTE = `https://api.quotable.io/random`;

const prepareDOMElements = () => {
	showBtn = document.querySelector('.app__clock-btn');
	appSection = document.querySelector('.app');
	refreshQuoteBtn = document.querySelector('.app__quote-btn');
	time = document.querySelector('.app__clock-time');
	body = document.body;
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
		const quoteText = document.querySelector('.app__quote-text span');
		const quoteAuthor = document.querySelector('.app__quote-author');
		quoteText.textContent = response.data.content;
		quoteAuthor.textContent = response.data.author;
	} catch (error) {
		console.error(error);
	}
}

const setTime = () => {
	const currentTime = new Date();

	const hours = String(currentTime.getHours()).padStart(2, '0');
	const minutes = String(currentTime.getMinutes()).padStart(2, '0');

	if (hours > 5 && hours < 19) {
		body.classList.remove('night-theme');
		body.classList.add('morning-theme');
	} else {
		body.classList.remove('morning-theme');
		body.classList.add('night-theme');
	}

	time.textContent = `${hours}:${minutes}`;

	requestAnimationFrame(setTime);
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	handleQuote();
	setTime();
};

document.addEventListener('DOMContentLoaded', main);
