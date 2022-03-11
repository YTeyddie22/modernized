'use strict';

//! Main Items;

const allSections = document.querySelectorAll('.section');
const btnScrollTo = document.querySelector('.btn__scroll-to');
const section1 = document.querySelector('#section__1');
const images = document.querySelectorAll('img[data-src]');
const header = document.querySelector('.header');

///////////////////////////////////////////////////////////

//! Workings Component

const works = document.querySelectorAll('.workings__tab');
const worksContainer = document.querySelector('.workings__containerBtn');
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
