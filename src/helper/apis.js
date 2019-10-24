import $config from '../config.js';
import axios from 'axios';

let $api = $config.listAPI;

// set up global config if there is none
if(global.$config === undefined){
	global.$config = $config;
}

/**
 * get API end point by API config name
 *
 * @param {string} apiName
 * @returns string api end point
 */
// function api(apiName){
// 	let baseAPI = $config.baseAPI;
// 	if($config.listAPI.hasOwnProperty(apiName)){
// 		return baseAPI + $config.listAPI[apiName];
// 	}

// 	return undefined;
// }

/**
 * Axios Custom Instance for global use
 */
let request = axios.create({
	baseURL: $config.baseAPI,
	headers: {
		post: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
});

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