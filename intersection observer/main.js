const item2 = document.querySelector(".item2");

const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.5,
};

const observer = new IntersectionObserver(cb, options);

function cb(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			console.log(entry);
			entry.target.querySelector(".menu").classList.add("move");
			// observer.unobserve(entry.target); in case you do not want to observe the target anymore to free up system resources
		} else {
			document.querySelector(".menu").classList.remove("move");
		}
	});
}

observer.observe(item2);
