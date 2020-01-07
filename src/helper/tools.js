const TIPE = [
	{ key: "primary", class: 'is-primary', duration: 5000 },
	{ key: "error", class: 'is-danger', duration: 5000 },
	{ key: "success", class: 'is-success', duration: 2500 },
	{ key: "info", class: 'is-info', duration: 2500 },
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
	var option = {
		queue: false
	};

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
			type: 'is-light',
			queue: false
		});
	}
};

/**
 * Get LocalStorage data by key and decode it
 *
 * @param {*} key
 * @returns {Object}
 */
module.exports.loadStorage = function (key) {
	let json = window.localStorage.getItem(key);
	let data = JSON.parse(json);

	return data;
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
 * @param {String} selector String Selector
 * @param {String} classOption Example: 'fadeIn faster delay-1s'
 * @param {Function} [callback=undefined]
 */
module.exports.animate = function (selector, classOption, callback = undefined) {
	const el = document.querySelector(selector);
	const option = classOption.split(" ");

	if (el !== null && el !== undefined) {
		if (!el.classList.contains('animated')) {
			el.classList.add('animated');
		}

		function handleAnimationEnd() {
			option.forEach(oneClass => {
				el.classList.remove(oneClass);
			});

			el.removeEventListener('animationend', handleAnimationEnd);
			if (typeof callback === 'function') callback(el);
		}

		option.forEach(oneClass => el.classList.add(oneClass));
		el.addEventListener('animationend', handleAnimationEnd);
	}
}

/**
 * Get Smiley Face!
 *
 * @param {Number} [request=undefined]
 * @returns Smiley Face!
 */
module.exports.randomSmile = function (request = undefined) {
	let smiles = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "🙊", "😎", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "🙄", "😏", "🙈", "😣", "😥", "🤐", "😪", "😫", "🥱", "😴", "😤", "😖", "🤑", "😭", "😨", "😵", "🤢", "🙉"];
	let random = Math.random() * smiles.length;
	let index = Math.floor(Math.random() * random);

	if (request !== undefined) {
		index = request % smiles.length;
	}

	return smiles[index];
}

module.exports.geeg = (callback) => {
	const key = Math.random().toString(36).substring(8);
	const giftKey = document.querySelector('#geeg-key');
	const receiver = document.querySelector('#geeg-receiver');
	const giftEvent = new Event(key);

	if (giftKey === null) return false;
	if (receiver === null) return false;

	giftKey.addEventListener('dblclick', function () {
		giftKey.setAttribute('draggable', true);
	});

	giftKey.addEventListener('dragstart', (e) => {
		e.dataTransfer.setData("giftkey", key);
	});

	giftKey.addEventListener(key, callback);

	receiver.addEventListener('dragover', (e) => {
		e.preventDefault();
	});

	receiver.addEventListener('drop', (e) => {
		e.preventDefault();
		let received = e.dataTransfer.getData("giftkey");
		if (received === key) {
			giftKey.dispatchEvent(giftEvent);
		}
	});

	return key;
}

/**
 * getCookie by name
 *
 * @param {*} name
 * @returns value
 */
module.exports.getCookie = (name) => {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

/**
 * Check Connection Offline / Online
 *
 * @param {*} actor
 * @returns Boolean
 */
module.exports.checkConnection = (actor) => {
	if (window.navigator.onLine) {
		return true;
	} else {
		this.notified(actor)
			.alert("Sorry we can't connect to server, you sure have internet connection ? 🤔");

		return false;
	}
}

module.exports.momentFormatter = (Moment, stringDate, returnJSDate = false) => {
	if (stringDate === undefined) {
		return undefined;
	}

	const format = ['day', 'week', 'month', 'year'];
	var cook = undefined;

	if (stringDate == "today") {
		cook = Moment();
	} else if (stringDate == "tomorrow") {
		cook = Moment().add(1, "days");
	} else if (stringDate == "yesterday") {
		cook = Moment().subtract(1, "days");
	} else if (stringDate.includes('next')) {
		let found = format.find(key => stringDate.includes(key));
		cook = Moment().add(1, found + 's');
	} else if (stringDate.includes('last')) {
		let found = format.find(key => stringDate.includes(key));
		cook = Moment().subtract(1, found + 's');
	} else if (Moment(stringDate).isValid()) {
		cook = Moment(stringDate);
	}

	if (cook !== undefined && returnJSDate) {
		cook = new Date(cook);
	}

	return cook;
}

module.exports.isEmpty = (value) => {
	return !(value !== "" && value !== undefined && value !== null && value !== []);
}

module.exports.parseURLRoute = () => {
	let url = window.location.href;
	let route = url.split('#');

	if (route.length <= 1) {
		return false;
	} else {
		let localRoute = route[route.length - 1];
		let parsedRoute = localRoute.split('/');

		if (parsedRoute <= 1) {
			return {
				route: localRoute,
				args: []
			};
		} else {
			return {
				route: parsedRoute[0],
				args: parsedRoute.slice(1)
			};
		}
	}
}

module.exports.cutShort = (text, length = 7) => {
	let clean = text.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");;
	let words = clean.split(/\s/);

	return words.slice(0, length).join(' ') + " ...";
}

module.exports.getApiTestByKey = (key) => {
	let el = document.querySelector('api-test[key="' + key + '"]');
	if (!this.isEmpty(el)) {
		return el.getAttribute('url');
	}

	return null;
}

module.exports.searchFilter = (data, query) => {
	return data.filter(row => {
		let found = Object.keys(row).find(key => {
			if (typeof row[key] === "string") {
				return row[key]
					.toLowerCase()
					.includes(query.toLowerCase());
			} else {
				let val = row[key];
				if (val instanceof Object) {
					for (const x in val) {
						if (val.hasOwnProperty(x)) {
							const element = val[x];
							return element
								.toString()
								.toLowerCase()
								.includes(query.toLowerCase());
						}
					}
				}

				return false;
			}
		});

		return found;
	});
}

module.exports.searchTree = (data, query) => {
	return data.filter(post => {
		const stack = [];
		stack.push(post);

		while (stack.length > 0) {
			const currentObj = stack.shift();
			if (
				!(currentObj instanceof Object) &&
				currentObj !== null
			) {
				let check = currentObj
					.toString()
					.toLowerCase()
					.includes(query.toLowerCase());

				if (check) {
					return true;
				}
			}

			const keys =
				currentObj instanceof Object
					? Object.keys(currentObj)
					: [];

			for (const key of keys) {
				const objVal = currentObj[key];

				stack.unshift(objVal);
			}
		}

		return false;
	});
}