'use strict';

//! Main Items;

const allSections = document.querySelectorAll('.section');
const btnScrollTo = document.querySelector('.btn__scroll-to');
const section1 = document.querySelector('#section__1');
const images = document.querySelectorAll('img[data-src]');
const header = document.querySelector('.header');

///////////////////////////////////////////////////////////

//! Workings Component

const works = document.querySelectorAll('.workings__btn');
const worksContainerBtns = document.querySelector('.workings__containerBtns');
const worksContent = document.querySelectorAll('.workings__content ');

////////////////////////////////////////////

//! Navigation section selector

const nav = document.querySelector('.nav');

//////////////////////////////////////////////////////////

//! 1. Btn scrolling function
//The Continue btn on click scrolls to the first section
btnScrollTo.addEventListener('click', () => {
	section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////

//! 2. Each Section Navigation

document.querySelector('.nav__links').addEventListener('click', (e) => {
	e.preventDefault();

	const navLink = e.target.classList.contains('nav__link');

	if (navLink) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

/////////////////////////////////////////////////////////////////

//! 3. Sticky Navigation

const navHeight = nav.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
	const [entry] = entries;

	if (!entry.isIntersecting) {
		nav.classList.add('sticky');
	} else {
		nav.classList.remove('sticky');
	}
};

const navObserver = new IntersectionObserver(stickyNavigation, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});
navObserver.observe(header);

///////////////////////////////////////////////////////////////////

//! 4. Show Contents on scroll
//* Observer Function

const revealSections = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	entry.target.classList.remove('section__hidden');

	observer.unobserve(entry.target);
};

//* Observer

const sectionObserver = new IntersectionObserver(revealSections, {
	root: null,
	threshold: 0.2,
});

//* For all sections;

allSections.forEach((el) => {
	sectionObserver.observe(el);
	el.classList.add('section__hidden');
});

///////////////////////////////////////////////////////////////////

//! 4. Workings section

const workings = function (e) {
	//* Finding the closest btn that is clicked.

	const clicked = e.target.closest('.workings__btn');

	if (!clicked) return;

	//* Remove all the active Contents

	works.forEach((work) => work.classList.remove('workings__btn--active'));
	worksContent.forEach((content) =>
		content.classList.remove('workings__content--active')
	);

	//* Add selected contents.

	document
		.querySelector(`.workings__content--${clicked.dataset.btn}`)
		.classList.add('workings__content--active');

	clicked.classList.add('workings__btn--active');
};

///////////////////////////////////////////////////////////////////////

//! 5. Slider Section

const sliders = function () {
	const slides = document.querySelectorAll('.slide');
	const leftBtn = document.querySelector('.slider__btn--left');
	const rightBtn = document.querySelector('.slider__btn--right');
	const dotContainer = document.querySelector('.dots');

	//* Finding the maximum and minimum range of items in the slide.

	let currentSlide = 0;
	const maxSlide = slides.length - 1;

	//? Functions involved.

	//* Creating the extra dots
	const createDots = function () {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML(
				'beforeend',
				`<button class="dots__dot" data-slide="${i}"></button>`
			);
		});
	};

	//* Creating the active dot

	const activeDot = function (slide) {
		document.querySelectorAll('.dots__dot').forEach((dot) => {
			return dot.classList.remove('dots__dot--active');
		});

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add('dots__dot--active');
	};

	//* Go to next slide function.

	const goToSlide = function (slide) {
		slides.forEach((el, i) => {
			return (el.style.transform = `translateX(${100 * (i - slide)}%)`);
		});
	};

	const nextSlide = function () {
		currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;
		goToSlide(currentSlide);
		activeDot(currentSlide);
	};

	const prevSlide = function () {
		currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;

		goToSlide(currentSlide);
		activeDot(currentSlide);
	};

	const init = () => {
		goToSlide(0);
		createDots();
		activeDot(0);
	};

	init();

	//* Dots functionalities
	document.addEventListener('keydown', (e) => {
		e.key === '&larr' && prevSlide;
		e.key === '&rarr' && nextSlide;
	});

	dotContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('dots__dot')) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activeDot(slide);
		}
	});

	//* EventListeners buttons.
	rightBtn.addEventListener('click', nextSlide);
	leftBtn.addEventListener('click', prevSlide);
};
sliders();

//! EventListeners

worksContainerBtns.addEventListener('click', workings);
