const marker = document.querySelector("#marker");
const items = document.querySelectorAll("nav a");

const inidicator = (function () {
	items.forEach(item =>
		item.addEventListener("mouseover", function (e) {
			marker.style.left = `${e.target.offsetLeft}px`;
			marker.style.width = `${e.target.offsetWidth}px`;
		}),
	);
})();
