const block = document.querySelector(".block");

let clickOrTouch;

block.addEventListener("mousedown", function (e) {
	clickOrTouch = true;
	let offsetX = block.offsetLeft - e.clientX;
	let offsetY = block.offsetTop - e.clientY;

	window.addEventListener("mousemove", function (e) {
		if (clickOrTouch) {
			block.style.left = `${e.clientX + offsetX}px`;
			block.style.top = `${e.clientY + offsetY}px`;
		}
	});

	window.addEventListener("mouseup", function () {
		clickOrTouch = false;
	});
});

block.addEventListener("touchstart", function (e) {
	clickOrTouch = true;

	let offsetX = block.offsetLeft - e.touches[0].clientX;
	let offsetY = block.offsetTop - e.touches[0].clientY;

	window.addEventListener("touchmove", function (e) {
		if (clickOrTouch) {
			block.style.left = `${e.touches[0].clientX + offsetX}px`;
			block.style.top = `${e.touches[0].clientY + offsetY}px`;
		}
	});

	window.addEventListener("touchend", function () {
		clickOrTouch = false;
	});
});
