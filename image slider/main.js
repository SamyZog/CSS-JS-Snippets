const carousel = new Carousel(parent, sliderImageURLs, controlIconsArray);
carousel.init();

/* ------------------------------ EFFECT OPTION ----------------------------- */

const effectsBox = document.querySelector(".carousel__effect-controls");

let effect;

effectsBox.addEventListener("click", function (e) {
	effect = e.target.innerText.toLowerCase();
});

/* -------------------------- DIRECTIONAL BEHAVIOR -------------------------- */

carousel.nextButton.addEventListener("click", function () {
	carousel.move("next", effect);
});

carousel.prevButton.addEventListener("click", function () {
	carousel.move("previous", effect);
});

/* ---------------------------- INDICATOR CONTROL --------------------------- */

carousel.initIndicatorsBox.addEventListener("click", function (e) {
	carousel.indicatorFunctionality(e.target, effect);
});

carousel.slider.addEventListener("transitionend", function () {
	this.style.opacity = "1";
});
