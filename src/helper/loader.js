const LoaderClass = ".loader-wrapper";

module.exports.hide = function () {
	var el = document.querySelector(LoaderClass);
	el.classList.remove('fadeIn');
	el.classList.add('fadeOut');

	el.addEventListener('animationend', function () {
		el.classList.add('is-hidden');
	})
}

module.exports.show = function () {
	var el = document.querySelector(LoaderClass);
	el.classList.remove('fadeOut');
	el.classList.add('fadeIn');
	el.classList.remove('is-hidden');
}

module.exports.isOpen = function () {
	var el = document.querySelector(LoaderClass);
	if(el !== null) {
		return getComputedStyle(el).display !== 'none';
	} else {
		return false;
	}
}

function getTimeout() {
	var el = document.querySelector(LoaderClass);
	if(el !== null) {
		if(el.dataset !== undefined && el.dataset.hasOwnProperty('timeout')){
			return parseInt(el.dataset.timeout);
		}
	}

	return 3000;
}

module.exports.timeoutCount = getTimeout();