let showBtn;

const prepareDOMElements = () => {
	showBtn = document.querySelector('.app__clock-btn');
};

const prepareDOMEvents = () => {
	showBtn.addEventListener('click', handleInfo);
};

const handleInfo = () => {
	showBtn.classList.toggle('btn-active');
	if (showBtn.classList.contains('btn-active')) {
		showDetails();
	} else {
		hideDetails();
	}
};

const showDetails = () => {
	console.log('ok');
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

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

document.addEventListener('DOMContentLoaded', main);
