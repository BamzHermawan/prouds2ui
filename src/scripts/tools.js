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
	if(message === undefined){
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
	}else{
		option.message = message;
		option.type = TIPE[typeIndex].class;
		option.duration = TIPE[typeIndex].duration;
		return actor.open(option);
	}
};

module.exports.notified = (actor, message = undefined) => {
	if(message == undefined){ 
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

module.exports.loadStorage = function(key) {
	return new Promise(function (resolve, reject) {
		let json = window.localStorage.getItem(key);
		let data = JSON.parse(json);

		if (data !== null) {
			resolve(data);
		}

		reject(false);
	})
}

module.exports.saveStorage = function (key, json) {
	return window.localStorage.setItem(key, JSON.stringify(json));
}