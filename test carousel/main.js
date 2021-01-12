const imageArray = [
	"https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	"https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
	"https://images.unsplash.com/photo-1565612936643-ea2484086bb6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80",
];

const slider = document.querySelector(".slider");
const image = document.querySelectorAll(".image");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
console.log(document.querySelector(`[data-position=""]`));

let sliderMultiplier = 0;

nextBtn.addEventListener("click", function (e) {
	sliderMultiplier++;
	image[sliderMultiplier].style.backgroundImage = `url(${imageArray[sliderMultiplier]})`;

	const offset = document.querySelector(`[data-position="${sliderMultiplier}"]`);

	slider.style.transform = `translateX(-${offset.offsetLeft}px)`;
});
