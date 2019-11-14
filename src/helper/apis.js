import $config from '../config.js';
import request from 'axios';
import qs from 'querystring';
import { resolve, reject } from 'q';

let $api = $config.listAPI;
let pack = qs.stringify;

// set up global config if there is none
if (global.$config === undefined) {
	global.$config = $config;
}

// set up baseAPI
request.defaults.baseURL = $config.baseAPI;

const dummy = bundle => {
	return new Promise(function (resolve, reject) {
		resolve()
	});
}

//? ----------------------------------------------------------------------------
//? ----------------------------------------------------------------------------

/**
 * getUserSession
 * axios promise for getting user who currently in session
 * 
 * @returns user data. check documentation for more information
 */
// module.exports.getUserSession = request.get($api.userLogin);
module.exports.getUserSession = request.post($api.userLogin);

/**
 * getUserData
 * axios promise for getting user specified user by nik
 * 
 * @param {string} nik
 * @returns user data. check documentation for more information
 */

module.exports.sendBookmark = bundle => {
	return request.post($api.sendBookmark, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.setInitialBaseline = bundle => {
	return request.post($api.setInitialBaseline, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.sendInitialBaseline = bundle => {
	return request.post($api.sendInitialBaseline, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.getDuration = bundle => {
	return request.post($api.getDuration, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.uploadFoto = (file) => {
	return request.post($api.uploadFoto, file);
}

// module.exports.getNotification = bundle => {
// 	return request.post($api.getNotification, pack(bundle), {
// 		headers: {
// 			"Content-Type": 'application/x-www-form-urlencoded'
// 		}
// 	});
// }

module.exports.getNotification = dummy;

// module.exports.deleteFile = bundle => {
// 	return request.post($api.deleteFile, pack(bundle), {
// 		headers: {
// 			"Content-Type": 'application/x-www-form-urlencoded'
// 		}
// 	});
// }

module.exports.deleteFile = dummy;