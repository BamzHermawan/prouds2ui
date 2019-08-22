module.exports = function () {
	var el = document.querySelector(".loader-wrapper");
	el.classList.remove('fadeIn');
	el.classList.add('fadeOut');

	el.addEventListener('animationend', function () {
		el.classList.add('is-hidden');
	})
}