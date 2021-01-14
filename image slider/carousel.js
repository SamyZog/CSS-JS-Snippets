class Carousel {
	constructor(carouselParent, imageURLs, controlIcons) {
		this.parent = carouselParent;
		this.imageArray = imageURLs;
		this.iconsArray = controlIcons;
		this.imageWidth = 100 / this.imageArray.length;
		this.slideMultiplier = 0;
		this.activeIndicatorClass = "active";
		this.currentSlide;
		this.touched;
		this.transitionDuration = 500;
		this.direction;
		this.intervalDuration = 2000;
		this.timeoutDuration = 4000;
	}

	/* ----------------------- CREATE AND INJECT CAROUSEL ----------------------- */

	initCarousel() {
		this.carousel = document.createElement("div");
		this.carousel.classList.add("carousel");
		this.parent.append(this.carousel);
	}

	initSlider() {
		this.slider = document.createElement("div");
		this.slider.classList.add("carousel__slider");
		this.slider.style.width = `${this.imageArray.length * 100}%`;
		this.carousel.append(this.slider);
		this.sliderImages = [];

		this.imageArray.forEach((url, i) => {
			const slide = document.createElement("div");
			slide.classList.add(`carousel__slider-image`);
			slide.classList.add(`carousel__slider-image--image${i}`);
			slide.style.backgroundImage = `url(${url})`;
			slide.style.width = `${100 / this.imageArray.length}%`;
			slide.dataset.position = i;
			this.sliderImages.push(slide);
			this.slider.appendChild(slide);
		});

		this.slides = this.slider.querySelectorAll(":scope > *");
		this.currentSlide = this.slider.firstChild;
	}

	initControlsBox() {
		[this.prevButton, this.nextButton] = [document.createElement("div"), document.createElement("div")];
		this.prevButton.classList.add("carousel__prev-button");
		this.nextButton.classList.add("carousel__next-button");
		this.prevIcon = document.createRange().createContextualFragment(this.iconsArray[0]).firstChild;
		this.nextIcon = document.createRange().createContextualFragment(this.iconsArray[1]).firstChild;
		this.prevButton.appendChild(this.prevIcon);
		this.nextButton.appendChild(this.nextIcon);
		this.carousel.append(this.prevButton, this.nextButton);
	}

	initIndicators() {
		this.initIndicatorsBox = document.createElement("div");
		this.initIndicatorsBox.classList.add("carousel__indicators");
		this.carousel.appendChild(this.initIndicatorsBox);

		this.imageArray.forEach((imageURL, i) => {
			const indicator = document.createElement("div");
			indicator.classList.add("carousel__position-indicator");
			indicator.dataset.position = i;
			this.initIndicatorsBox.appendChild(indicator);
		});

		this.initIndicatorsBox.querySelector(":nth-child(1)").classList.add(this.activeIndicatorClass);
		this.indicatorsArray = this.initIndicatorsBox.childNodes;
	}

	/* ----------------------------- SLIDER MOVEMENT ---------------------------- */

	move(direction) {
		this.updateDirection(direction);
		this.multiplierUpdate();
		this.currentVisibleSlide();
		this.updateImagePosition();
		this.updateImageIndicator();
	}

	updateDirection(direction) {
		this.direction = direction;
	}

	multiplierUpdate() {
		switch (this.direction) {
			case "next":
				this.slideMultiplier++;
				break;
			case "previous":
				this.slideMultiplier--;
				break;
		}

		if (this.slideMultiplier === this.imageArray.length) {
			this.slideMultiplier = 0;
		}

		if (this.slideMultiplier === -1) {
			this.slideMultiplier = this.imageArray.length - 1;
		}
	}

	indicatorFunctionality(e) {
		if (e.target === this.initIndicatorsBox || e.target.classList.contains(this.activeIndicatorClass)) {
			return;
		}

		this.slideMultiplier = e.target.dataset.position;
		this.currentVisibleSlide();
		this.updateImagePosition();
		this.updateImageIndicator();
	}

	updateImageIndicator() {
		this.indicatorsArray.forEach(indicator => {
			indicator.classList.remove(this.activeIndicatorClass);
		});
		document
			.querySelector(`.carousel__indicators [data-position="${this.slideMultiplier}"]`)
			.classList.add("active");
	}

	currentVisibleSlide() {
		this.currentSlide = document.querySelector(`.carousel__slider [data-position="${this.slideMultiplier}"]`);
	}

	updateImagePosition() {
		this.slider.style.transform = `translateX(-${this.currentSlide.offsetLeft}px)`;
	}

	/* ----------------------- SLIDER TOUCH FUNCTIONALITY ----------------------- */

	onTouchDown(e) {
		this.slider.style.transition = "none";
		this.touched = true;
		this.initialX = -e.targetTouches[0].pageX;
	}

	onTouchMove(e) {
		if (!this.touched) {
			return;
		}
		e.preventDefault();
		this.delta = this.initialX + e.targetTouches[0].pageX;
		this.translate = this.delta - this.currentSlide.offsetLeft;

		if (
			(this.delta > 0 && this.currentSlide.offsetLeft === 0) ||
			(this.delta < 0 && this.currentSlide.offsetLeft >= this.slider.offsetWidth - this.currentSlide.offsetWidth)
		) {
			this.delta = 0;
			return;
		}

		this.slider.style.transform = `translateX(${this.translate}px)`;
	}

	onTouchUp() {
		this.slider.style.transition = `${this.transitionDuration}ms`;
		this.touchMove();
		this.touched = false;
	}

	touchMove() {
		if (this.delta < -this.currentSlide.offsetWidth / 6) {
			this.move("next");
		} else if (this.delta > this.currentSlide.offsetWidth / 6) {
			this.move("previous");
		} else {
			this.slider.style.transform = `translateX(-${this.currentSlide.offsetLeft}px)`;
		}

		this.delta = 0;
	}

	autoMove() {
		this.interval = setInterval(() => {
			this.move("next");
		}, this.intervalDuration);
	}

	cancelAutoMove() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	restartInterval() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(() => {
			this.autoMove();
		}, this.timeoutDuration);
	}

	restartAutoMove() {
		this.cancelAutoMove();
		this.restartInterval();
	}

	init() {
		this.initCarousel();
		this.initSlider();
		this.initControlsBox();
		this.initIndicators();
		this.autoMove();
	}
}
