'use strict';

//! Main Items;

const allSections = document.querySelectorAll('.section');
const btnScrollTo = document.querySelector('.btn__scroll-to');
const section1 = document.querySelector('#section__1');

///////////////////////////////////////////////////////////

//! Navigation section

const nav = document.querySelector('.nav');

//////////////////////////////////////////////////////////

//The Continue btn on click scrolls to the first section
btnScrollTo.addEventListener('click', () => {
	section1.scrollIntoView({ behavior: 'smooth' });
});
