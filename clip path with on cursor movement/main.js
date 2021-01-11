const section = document.querySelector("section");

window.addEventListener("mousemove", function (e) {
	section.style.clipPath = `circle(150px at ${e.pageX}px ${e.pageY}px)`;
});
