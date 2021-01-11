const container = document.querySelector(".container");
const height = container.offsetHeight;
const width = container.offsetWidth;

container.addEventListener("mousemove", function (e) {
	this.style.backgroundImage = `radial-gradient(25px at ${Math.round((e.offsetX * 100) / width)}% ${Math.round(
		(e.offsetY * 100) / height,
	)}%, red, green)`;
});
