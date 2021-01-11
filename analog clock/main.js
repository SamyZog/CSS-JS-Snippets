const hour = document.querySelector("#hr");
const minute = document.querySelector("#min");
const second = document.querySelector("#sec");

setInterval(() => {
	let hours = new Date().getHours();
	let minutes = new Date().getMinutes();
	let seconds = new Date().getSeconds();

	hour.style.transform = `rotateZ(${hours * 30}deg)`;
	minute.style.transform = `rotateZ(${minutes * 6}deg)`;
	second.style.transform = `rotateZ(${seconds * 6}deg)`;
}, 200);
