// PRE FETCH compatibility
const initialNodes = document.querySelectorAll(".container__items");

function createEl() {
	const div = document.createElement("div");
	div.classList.add("container__items");
	document.querySelector(".container__body").appendChild(div);
}

function loadPokeNames(urlLimit, array) {
	const req = new XMLHttpRequest();
	let count = 0;
	count += urlLimit;

	req.open("GET", "https://pokeapi.co/api/v2/pokemon?limit=" + count);
	req.onload = function () {
		if (this.status === 200) {
			const pokeArr = JSON.parse(this.responseText).results;

			for (let i = 0; i < array.length; i++) {
				array[i].textContent = `${pokeArr[i].name} ${i + 1}`;
			}
		}
	};

	req.send();
}

loadPokeNames(initialNodes.length, initialNodes);

// Intersection

const foot = document.querySelector(".container__footer");
const loadedElCount = 21;

const options = {
	root: null,
	threshold: 0.5,
	rootMargin: "0px",
};

const observer = new IntersectionObserver(loadMoreNames, options);

function loadMoreNames(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			for (let i = 0; i < loadedElCount; i++) {
				createEl();
			}
		}
	});
}

observer.observe(foot);
