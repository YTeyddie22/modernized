'use strict';

//! Main Items;

const allSections = document.querySelectorAll('.section');
const btnScrollTo = document.querySelector('.btn__scroll-to');
const section1 = document.querySelector('#section__1');

///////////////////////////////////////////////////////////

//! Navigation section selector

const nav = document.querySelector('.nav');

//////////////////////////////////////////////////////////

//The Continue btn on click scrolls to the first section
btnScrollTo.addEventListener('click', () => {
	section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////

//! Each Section Navigation

document.querySelector('.nav__links').addEventListener('click', (e) => {
	e.preventDefault();

	const navLink = e.target.classList.contains('nav__link');

	if (navLink) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});
