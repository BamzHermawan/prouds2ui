const TIPE = [
	{ key: "primary", class: 'is-primary', duration: 5000 },
	{ key: "error", class: 'is-danger', duration: 5000 },
	{ key: "success", class: 'is-success', duration: 2500 },
	{ key: "info", class: 'is-info', duration: 5000 },
	{ key: "alert", class: 'is-warning', duration: 5000 },
	{ key: "light", class: 'is-light', duration: 2500 },
	{ key: "dark", class: 'is-dark', duration: 2500 },
	{ key: "white", class: 'is-white', duration: 2500 },
	{ key: "black", class: 'is-black', duration: 2500 }
];

const POSITION = [
	{ pos: "top", value: "is-top" },
	{ pos: "topRight", value: "is-top-right" },
	{ pos: "topLeft", value: "is-top-left" },
	{ pos: "bottom", value: "is-bottom" },
	{ pos: "bottomRight", value: "is-bottom-right" },
	{ pos: "bottomLeft", value: "is-bottom-left" }
];

const notifiedType = (typeIndex, actor, message = undefined) => {
	var option = {};
	if (message === undefined) {
		var bundle = {};
		for (let j = 0; j < POSITION.length; j++) {
			bundle[POSITION[j].pos] = function (lateMessage) {
				option.message = lateMessage;
				option.type = TIPE[typeIndex].class;
				option.duration = TIPE[typeIndex].duration;
				option.position = POSITION[j].value;
				actor.open(option);
			}
		}

		return bundle;
	} else {
		option.message = message;
		option.type = TIPE[typeIndex].class;
		option.duration = TIPE[typeIndex].duration;
		return actor.open(option);
	}
};


/**
 * Notified: Show Notification based on buefy actor
 *
 * @param {Object} actor
 * @param {String} [message=undefined]
 * @returns [error|success|danger] notified type if message is undefined
 */
module.exports.notified = (actor, message = undefined) => {
	if (message == undefined) {
		var bundle = {};
		for (let i = 0; i < TIPE.length; i++) {
			bundle[TIPE[i].key] = function (secondMessage = undefined) {
				return notifiedType(i, actor, secondMessage);
			}
		}

		return bundle;
	} else {
		return actor.open({
			duration: 3000,
			message: message,
			type: 'is-light'
		});
	}
};

/**
 * Get LocalStorage data by key and decode it
 *
 * @param {*} key
 * @returns {Object}
 */
module.exports.loadStorage = function(key) {
	return new Promise(function (resolve, reject) {
		let json = window.localStorage.getItem(key);
		let data = JSON.parse(json);

		if (data !== null) {
			resolve(data);
		}else{
			reject(null);
		}

		reject("Error with loadStorage Helper Tools");
	})
}

/**
 * Save to LocalStorage by encode it to json
 *
 * @param {string} key
 * @param {object} json
 * @returns Boolean result
 */
module.exports.saveStorage = function (key, json) {
	return window.localStorage.setItem(key, JSON.stringify(json));
}

/**
 * Do animate DOM Element
 *
 * @param {String} selector
 * @param {String} classOption
 * @param {Function} [callback=undefined]
 */
module.exports.animate = function(selector, classOption, callback = undefined){
	const el = document.querySelector(selector);
	if (el !== null && el !== undefined) {
		if (!el.classList.contains('animated')) {
			el.classList.add('animated');
		}

		function handleAnimationEnd() {
			let option = classOption.split(" ");
			option.forEach(oneClass => {
				el.classList.remove(oneClass);
			});

			el.removeEventListener('animationend', handleAnimationEnd);
			if (typeof callback === 'function') callback(el);
		}

		el.className += " " + classOption;
		el.addEventListener('animationend', handleAnimationEnd);
	}
}

/**
 * Get Smiley Face!
 *
 * @param {Number} [request=undefined]
 * @returns Smiley Face!
 */
module.exports.randomSmile = function(request = undefined){
	let smiles = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "🙊", "😎", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "🙄", "😏", "🙈", "😣", "😥", "🤐", "😪", "😫", "🥱", "😴", "😤", "😖", "🤑", "😭", "😨", "😵", "🤢", "🙉" ];
	let random = Math.random() * smiles.length;
	let index = Math.floor(Math.random() * random);

	if (request !== undefined) {
		index = request % smiles.length;
	}

	return smiles[index];
}

module.exports.getCookie = (name) => {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

module.exports.checkConnection = (actor) => {
	if (window.navigator.onLine) {
		return true;
	} else {
		this.notified(actor)
			.alert("Sorry we can't connect to server, you sure have internet connection ? 🤔");
		
		return false;
	}
}