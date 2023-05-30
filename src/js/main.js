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

async function setTime() {
	const response = await axios.get('https://worldtimeapi.org/api/ip');
	const data = response.data;
	try {
		const timezone = document.querySelector('.timezone');
		const dayOfWeek = document.querySelector('.day-of-week');
		const dayOfYear = document.querySelector('.day-of-year');
		const week = document.querySelector('.week');
		const periood = document.querySelector('.app__clock-period');

		const currentTime = new Date(data.datetime);

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

		timezone.textContent = data.timezone;
		dayOfWeek.textContent = data.day_of_week;
		dayOfYear.textContent = data.day_of_year;
		week.textContent = data.week_number;
		periood.textContent = data.abbreviation;
	} catch (error) {
		console.error(error);
	}
}

async function setLocation() {
	const response = await axios.get('https://api.ipbase.com/v1/json/');
	const data = response.data;
	try {
		const location = document.querySelector('.app__clock-city span');
		location.textContent = `${data.country_name}, ${data.country_code}`;
	} catch (error) {
		console.error(error);
	}
}

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	handleQuote();
	setTime();
	setLocation();
};

document.addEventListener('DOMContentLoaded', main);
