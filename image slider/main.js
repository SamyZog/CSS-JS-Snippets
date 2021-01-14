const parent = document.body;

const sliderImageURLs = [
	"https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2040&q=80",
	"https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
	"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
	"https://images.unsplash.com/photo-1574516004150-22724c6b150e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1791&q=80",
];

const controlIconsArray = [
	`<svg height="12px" version="1.1" viewBox="0 0 9 12" width="9px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-218.000000, -90.000000)"><g id="chevron-left" transform="translate(218.500000, 90.000000)"><path d="M7.4,1.4 L6,0 L-8.8817842e-16,6 L6,12 L7.4,10.6 L2.8,6 L7.4,1.4 Z" id="Shape"/></g></g></g></svg>`,
	`<svg height="12px" version="1.1" viewBox="0 0 9 12" width="9px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-260.000000, -90.000000)"><g id="chevron-right" transform="translate(260.500000, 90.000000)"><path d="M1,0 L-0.4,1.4 L4.2,6 L-0.4,10.6 L1,12 L7,6 L1,0 Z" id="Shape"/></g></g></g></svg>`,
];

/* ---------------------------- INITIATE CAROUSEL --------------------------- */

const carousel = new Carousel(parent, sliderImageURLs, controlIconsArray);
carousel.init();

/* -------------------------- DIRECTIONAL BEHAVIOR -------------------------- */

carousel.nextIcon.addEventListener("click", function (e) {
	carousel.move("next");
	carousel.restartAutoMove();
});

carousel.prevIcon.addEventListener("click", function (e) {
	carousel.move("previous");
	carousel.restartAutoMove();
});

carousel.slider.addEventListener("transitionend", function () {
	this.style.opacity = "1";
});

/* ---------------------------- INDICATOR CONTROL --------------------------- */

carousel.initIndicatorsBox.addEventListener("click", function (e) {
	carousel.indicatorFunctionality(e);
	carousel.restartAutoMove();
});

/* ------------------------------ TOUCH CONTROL ----------------------------- */

carousel.carousel.addEventListener("touchstart", function (e) {
	carousel.onTouchDown(e);
	carousel.restartAutoMove();

	this.addEventListener("touchmove", function (e) {
		carousel.onTouchMove(e);
		carousel.restartAutoMove();
	});

	this.addEventListener("touchend", function (e) {
		carousel.onTouchUp(e);
		carousel.restartAutoMove();
	});
});
