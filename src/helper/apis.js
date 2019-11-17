import { getApiTestByKey, isEmpty } from 'helper-tools';
import $config from '../config.js';
import qs from 'querystring';
import request from 'axios';

let $api = $config.listAPI;
let pack = qs.stringify;

// set up global config if there is none
if (global.$config === undefined) {
	global.$config = $config;
}

if (!$config.apiTesting){
	// set up baseAPI
	request.defaults.baseURL = $config.baseAPI;
} else {
	for (const key in $api) {
		if ($api.hasOwnProperty(key)) {
			let testApi = getApiTestByKey(key)
			if(!isEmpty(testApi)){
				$api[key] = testApi;
			}
		}
	}
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

module.exports.getNotification = () => {
	return request.get($api.getNotification);
}