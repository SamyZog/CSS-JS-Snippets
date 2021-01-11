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

class Carousel {
	constructor(carouselParent, imageURLs, controlIcons) {
		this.parent = carouselParent;
		this.imageArray = imageURLs;
		this.iconsArray = controlIcons;
		this.imageWidth = 100 / this.imageArray.length;
		this.slideMultiplier = 0;
		this.slideEffect = {
			fading: false,
			sliding: true,
		};
	}

	initCarousel() {
		this.carousel = document.createElement("div");
		this.carousel.classList.add("carousel");
		this.parent.append(this.carousel);
	}

	initSlider() {
		this.slider = document.createElement("div");
		this.slider.classList.add("carousel__slider");
		this.slider.style.width = `${this.imageArray.length * 100}vw`;
		this.carousel.append(this.slider);
		this.sliderImages = [];

		this.imageArray.forEach((url, i) => {
			const slide = document.createElement("div");
			slide.classList.add("carousel__slider-image");
			slide.style.backgroundImage = `url(${url})`;
			slide.style.width = `${100 / this.imageArray.length}%`;
			slide.dataset.position = i;
			this.sliderImages.push(slide);
			this.slider.appendChild(slide);
		});

		this.slides = this.slider.querySelectorAll(":scope > *");
	}

	initControlsBox() {
		this.controlsBox = document.createElement("div");
		this.controlsBox.classList.add("carousel__controls");
		[this.prevButton, this.nextButton] = [document.createElement("div"), document.createElement("div")];
		this.prevButton.classList.add("carousel__prev-button");
		this.nextButton.classList.add("carousel__next-button");
		this.prevIcon = document.createRange().createContextualFragment(this.iconsArray[0]).firstChild;
		this.nextIcon = document.createRange().createContextualFragment(this.iconsArray[1]).firstChild;
		this.prevButton.appendChild(this.prevIcon);
		this.nextButton.appendChild(this.nextIcon);
		this.carousel.appendChild(this.controlsBox);
		this.controlsBox.append(this.prevButton, this.nextButton);
	}

	initIndicators() {
		this.initIndicatorsBox = document.createElement("div");
		this.initIndicatorsBox.classList.add("carousel__indicators");
		this.carousel.appendChild(this.initIndicatorsBox);

		this.imageArray.forEach((image, i) => {
			const indicator = document.createElement("div");
			indicator.classList.add("carousel__position-indicator");
			indicator.dataset.position = i + 1;
			this.initIndicatorsBox.appendChild(indicator);
		});

		this.initIndicatorsBox.querySelector(":nth-child(1)").classList.add("active");
		this.indicatorsArray = this.initIndicatorsBox.childNodes;
	}

	updateImageIndicator() {
		this.indicatorsArray.forEach(indicator => {
			+indicator.dataset.position !== this.slideMultiplier + 1
				? indicator.classList.remove("active")
				: indicator.classList.add("active");
		});
	}

	move(direction, effect) {
		this.injecteffect(effect);

		if (direction === "next") {
			this.slideMultiplier++;
			if (this.slideMultiplier === this.imageArray.length) {
				this.slideMultiplier = 0;
			}
		} else if (direction === "previous") {
			if (this.slideMultiplier === 0) {
				this.slideMultiplier = this.imageArray.length;
			}
			this.slideMultiplier--;
		}

		this.calculateImagePosition();
		this.updateImageIndicator();
	}

	fade() {
		this.slideEffect.fading = true;
		this.slideEffect.sliding = false;
		this.slider.style.opacity = "0";
		this.slider.style.transition = `opacity 500ms, transform 0ms 250ms`;
	}

	slide() {
		this.slideEffect.sliding = true;
		this.slideEffect.fading = false;
		this.slider.style.transition = `transform 500ms`;
	}

	injecteffect(effect) {
		switch (effect) {
			case "fade":
				this.fade();
				break;
			case "slide":
				this.slide();
				break;
		}
	}

	indicatorFunctionality(e, effect) {
		if (e === this.initIndicatorsBox || e.classList.contains("active")) {
			return;
		}

		this.injecteffect(effect);

		this.slideMultiplier = e.dataset.position - 1;
		this.calculateImagePosition();
		this.updateImageIndicator();
	}

	calculateImagePosition() {
		this.slider.style.transform = `translateX(-${this.slideMultiplier * this.imageWidth}%)`;
	}

	init() {
		this.initCarousel();
		this.initSlider();
		this.initControlsBox();
		this.initIndicators();
	}
}
