module.exports.hide = function () {
	var el = document.querySelector(".loader-wrapper");
	el.classList.remove('fadeIn');
	el.classList.add('fadeOut');

	el.addEventListener('animationend', function () {
		el.classList.add('is-hidden');
	})
}

module.exports.show = function () {
	var el = document.querySelector(".loader-wrapper");
	el.classList.remove('fadeOut');
	el.classList.add('fadeIn');
	el.classList.remove('is-hidden');
}

module.exports.isOpen = function () {
	var el = document.querySelector(".loader-wrapper");
	if(el !== null) {
		return getComputedStyle(el).display !== 'none';
	} else {
		return false;
	}
}