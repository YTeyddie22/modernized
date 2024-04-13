"use strict";

//! Main Items;

const allSections = document.querySelectorAll(".section");
const btnScrollTo = document.querySelector(".btn__scroll-to");
const section1 = document.querySelector("#section__1");
const images = document.querySelectorAll("img[data-src]");
const header = document.querySelector(".header");
const mobileLinks = document.querySelector(".nav__links");
const burger = document.querySelector(".burger");
const mobileNavLinks = document.querySelectorAll(".nav__item");

///////////////////////////////////////////////////////////

//! Workings Component

const works = document.querySelectorAll(".workings__btn");
const worksContainerBtns = document.querySelector(".workings__containerBtns");
const worksContent = document.querySelectorAll(".workings__content ");

////////////////////////////////////////////

//! Navigation section selector

const nav = document.querySelector(".nav");

//////////////////////////////////////////////////////////

//! 6. Modal section

const modal = document.querySelector(".modal");
const btnOpenModal = document.querySelectorAll(".btn__show-modal");
const btnCloseModal = document.querySelector(".btn__close-modal");
const overlay = document.querySelector(".overlay");

function navSlider() {
	burger.addEventListener("click", () => {
		/*
		mobileNavSection.classList.toggle("navigation-active");
		navSection.classList.toggle("hide_nav");
		burger.classList.toggle("menu");
		burger.closest(".header").classList.toggle("header_opacity_mobile");
		*/
		burger.classList.toggle("line");
		mobileLinks.classList.toggle("hide__nav");
		console.log(mobileLinks);
	});
}

navSlider();

//Mobile Links
/*
//Mobile Links function
mobileLinks.forEach((el, i) => {
	if (el.style.animation) {
		return;
	} else {
		el.style.animation = `navLinksMovement 1.5s ease forwards ${
			i / 7 + 0
		}s`;
	}
	el.addEventListener("click", function (event) {
		event.preventDefault();
		navSection.classList.add("hide_nav");
		burger.classList.toggle("menu");
		burger.closest(".header").classList.toggle("header_opacity_mobile");

		const targetId = event.target.getAttribute("href").substring(1); // Get ID from href
		document
			.getElementById(targetId)
			.scrollIntoView({ behavior: "smooth" });
	});
*/

//* Opening the modal;
const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

//* Closing the modal

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

btnOpenModal.forEach((el) => el.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

/////////////////////////////////////////////////////////////////

//! 7. Navigation section fading

const handleHoverNav = function (e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;

		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector("img");

		siblings.forEach((el) => {
			if (el !== link) {
				el.style.opacity = this;
			}
		});
		logo.style.opacity = this;
	}
};

nav.addEventListener("mouseover", handleHoverNav.bind(0.5));
nav.addEventListener("mouseout", handleHoverNav.bind(1));

////////////////////////////////////////////////////////////////

//! 1. Btn scrolling function
//The Continue btn on click scrolls to the first section
btnScrollTo.addEventListener("click", () => {
	section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////////////////

//! 2. Each Section Navigation

document.querySelector(".nav__links").addEventListener("click", (e) => {
	e.preventDefault();

	const navLink = e.target.classList.contains("nav__link");

	if (navLink) {
		const id = e.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

/////////////////////////////////////////////////////////////////

//! 3. Sticky Navigation

const navHeight = nav.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
	const [entry] = entries;

	if (!entry.isIntersecting) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
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

	entry.target.classList.remove("section__hidden");

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
	el.classList.add("section__hidden");
});

///////////////////////////////////////////////////////////////////

//! 7. Lazy loader

const loader = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener("load", () => {
		entry.target.classList.remove("lazy_img");
	});

	observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loader, {
	root: null,
	rootMargin: "200px",
	threshold: 0,
});

images.forEach((el) => imageObserver.observe(el));

//! 4. Workings section

const workings = function (e) {
	//* Finding the closest btn that is clicked.

	const clicked = e.target.closest(".workings__btn");

	if (!clicked) return;

	//* Remove all the active Contents

	works.forEach((work) => work.classList.remove("workings__btn--active"));
	worksContent.forEach((content) =>
		content.classList.remove("workings__content--active")
	);

	//* Add selected contents.

	document
		.querySelector(`.workings__content--${clicked.dataset.btn}`)
		.classList.add("workings__content--active");

	clicked.classList.add("workings__btn--active");
};

///////////////////////////////////////////////////////////////////////

//! 5. Slider Section

const sliders = function () {
	const slides = document.querySelectorAll(".slide");
	const leftBtn = document.querySelector(".slider__btn--left");
	const rightBtn = document.querySelector(".slider__btn--right");
	const dotContainer = document.querySelector(".dots");

	//* Finding the maximum and minimum range of items in the slide.

	let currentSlide = 0;
	const maxSlide = slides.length - 1;

	//? Functions involved.

	//* Creating the extra dots
	const createDots = function () {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${i}"></button>`
			);
		});
	};

	//* Creating the active dot

	const activeDot = function (slide) {
		document.querySelectorAll(".dots__dot").forEach((dot) => {
			return dot.classList.remove("dots__dot--active");
		});

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
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
	document.addEventListener("keydown", (e) => {
		e.key === "&larr" && prevSlide;
		e.key === "&rarr" && nextSlide;
	});

	dotContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activeDot(slide);
		}
	});

	//* EventListeners buttons.
	rightBtn.addEventListener("click", nextSlide);
	leftBtn.addEventListener("click", prevSlide);
};
sliders();

//! EventListeners

worksContainerBtns.addEventListener("click", workings);
