const parent = document.body;

const sliderImageURLs = [
	"https://images.unsplash.com/photo-1558393427-8942ece21185?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1603877428925-35c666ea8167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
	"https://images.unsplash.com/flagged/photo-1556483297-b827c2d59c4f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1558393427-950a64bd3063?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1579867907570-2913a10b1623?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
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
});

carousel.prevIcon.addEventListener("click", function (e) {
	carousel.move("previous");
});

carousel.slider.addEventListener("transitionend", function () {
	this.style.opacity = "1";
});

/* ---------------------------- INDICATOR CONTROL --------------------------- */

carousel.initIndicatorsBox.addEventListener("click", function (e) {
	carousel.indicatorFunctionality(e);
});

carousel.carousel.addEventListener("wheel", function (e) {
	if (e.deltaY > 0) {
		carousel.move("next");
	} else {
		carousel.move("previous");
	}
});

carousel.carousel.addEventListener("mousedown", function (e) {
	console.log("click");
});

carousel.slides.forEach(slide => [console.log(slide.offsetWidth)]);
