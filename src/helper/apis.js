import $config from '../config.js';
import request from 'axios';
import qs from 'querystring';

let $api = $config.listAPI;
let pack = qs.stringify;

// set up global config if there is none
if (global.$config === undefined) {
	global.$config = $config;
}

// set up baseAPI
request.defaults.baseURL = $config.baseAPI;

//? ----------------------------------------------------------------------------
//? ----------------------------------------------------------------------------

/**
 * getUserSession
 * axios promise for getting user who currently in session
 * 
 * @returns user data. check documentation for more information
 */
module.exports.getUserSession = request.get($api.userLogin);

/**
 * getUserData
 * axios promise for getting user specified user by nik
 * 
 * @param {string} nik
 * @returns user data. check documentation for more information
 */
module.exports.getUserByNIK = (nik) => {
	return request.get($api.userLogin, {
		params: { nik }
	});
}

module.exports.sendBookmark = bundle => {
	// title, link, user_id
	return request.post($api.sendBookmark, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.setInitialBaseline = (bundle) => {
	// project_id
	return request.get($api.setInitialBaseline, {
		params: bundle
	});
}

module.exports.sendInitialBaseline = bundle => {
	// project_id
	return request.post($api.sendInitialBaseline, pack({ bundle }), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.getDuration = (bundle) => {
	// start, finish, workdays
	return request.get($api.getDuration, {
		params: bundle
	});
}

module.exports.uploadFoto = (file) => {
	// file
	return request.post($api.uploadFoto, file);
}

module.exports.getNotification = (bundle) => {
	// user_id
	return request.get($api.getNotification, {
		params: bundle
	});
}