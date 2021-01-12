const carousel = document.querySelector(".carousel");
const slider = document.querySelector(".slider");

let clicked;
let secondClick;
let initialClickX;
let newClickX;
let currentX = 0;

slider.addEventListener("mousedown", function (e) {
	clicked = true;
	slider.style.cursor = "grabbing";
	initialClickX = currentX - e.pageX;

	slider.addEventListener("mousemove", function (e) {
		if (!clicked) {
			return;
		}
		e.preventDefault();
		this.newClickX = e.pageX + this.initialClickX;
		if (this.newClickX > 0) {
			newClickX = 0;
		} else if (newClickX < -2800) {
			newClickX = -2800;
		}
		slider.style.transform = `translateX(${newClickX}px)`;
	});

	slider.addEventListener("mouseleave", function (e) {
		slider.style.cursor = "default";
		clicked = false;
		currentX = newClickX || 0; // if we click on mousedown and we do not move the element => newClickX will be undefined, so we return it to 0
	});

	slider.addEventListener("mouseup", function (e) {
		slider.style.cursor = "grabbing";
		clicked = false;
		currentX = newClickX || 0; // if we click on mousedown and we do not move the element => newClickX will be undefined, so we return it to 0
	});
});
