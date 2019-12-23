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

if (!$config.apiTesting) {
	// set up baseAPI
	request.defaults.baseURL = $config.baseAPI;
} else {
	let base = document.querySelector('.api-testing[base]');
	if (!isEmpty(base)) {
		request.defaults.baseURL = base.getAttribute('base');
	}

	let checkAll = false;
	for (const key in $api) {
		if ($api.hasOwnProperty(key)) {
			let testApi = getApiTestByKey(key)
			if (!isEmpty(testApi)) {
				$api[key] = testApi;
				checkAll = true;
			}
		}
	}

	if (!checkAll) {
		request.defaults.baseURL = $config.baseAPI;
	}
}

const parseURL = (key, bundle) => {
	let link = $api[key];
	return link.replace(/\{\w*\}/g, function (prop) {
		let val = prop.replace(/\{|\}/g, "");
		return bundle[val];
	});
}

module.exports.parsedURL = parseURL;
module.exports.rawURL = $api;

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

module.exports.getTeamWorkplan = task_id => {
	return request.get(parseURL("getTeamWorkplan", { task_id }));
}

module.exports.getResourceWorkplan = task_id => {
	return request.get(parseURL("getResourceWorkplan", { task_id }));
}

module.exports.uploadFoto = (file) => {
	return request.post($api.uploadFoto, file);
}

/**
 * Get List of Notification
 * with expected notification Object
 * 
 * "id"			 {String},
 * "subject"	 {String},
 * "content"	 {HTML String},
 * "dateStamp"	 {Date String with format DD/MM/YYYY},
 * "timeStamp"	 {Time String with format H:i},
 * "read"		 {Boolean}
 *
 * @returns
 */
module.exports.getNotification = () => {
	return request.get($api.getNotification);
}

/**
 * send list of Notification that rendered read by user
 *
 * @param {*} IDs: Array of Notification ID
 * @returns Axios Promise Instance
 */
module.exports.openNotification = (IDs) => {
	return request.post($api.openNotification, pack(IDs), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

/**
 * Get List of Filled Timesheet Date
 *
 * @param {*} id: Assignment ID
 * @param {*} start: Task Start Date (DD/MM/YYYY)
 * @param {*} end: Task End Date (DD/MM/YYYY)
 * @returns Axios Promise Instance
 */
module.exports.filledTimesheet = (id, start, end) => {
	return request.post($api.filledTimesheet, pack({
		id, start, end
	}), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.setComplete = bundle => {
	return request.post($api.setComplete, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

module.exports.deleteFile = bundle => {
	return request.post($api.deleteFile, pack(bundle), {
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
	});
}

/**
 * Get Performance Index Table Data
 *
 * @param {*} project_id: Project ID
 * @returns Axios Promise Instance
 */
module.exports.getPIndexTable = project_id => {
	return request.get(parseURL("getPIndexTable", { project_id }))
		.then(response => {
			let prep = {
				project_id: project_id,
				total_weekly_progress: [],
				sigma_progress: [],
				delta_progress: [],
				week_count: 5,
				task: []
			};

			if(!isEmpty(response.data)){
				prep = response.data
			}

			return prep;
		})
}

/**
 * Get Performance Index Table Data
 *
 * @param {*} project_id: Project ID
 * @returns Axios Promise Instance
 */
module.exports.projectTasks = project_id => {
	return request.get(parseURL("getProjectTasks", { project_id }));
}

/**
 * Get Performance Index Chart Data
 *
 * @param {*} project_id: Project ID
 * @param {*} task_id: task ID
 * @returns Axios Promise Instance
 */
module.exports.getPIndexChart = (project_id, task_id) => {
	const bundle = { project_id, task_id };

	return request.get(parseURL("getPIndexChart", bundle))
		.then(response => {
			if (isEmpty(response.data)) {
				return {
					"plan": [],
					"actual": [],
					"sigma_plan": [],
					"sigma_actual": [],
					"gap": []
				};
			}

			return response.data;
		})
}

/**
 * Get Performance Index Falling Task Data
 *
 * @param {*} project_id: Project ID
 * @param {*} task_id: task ID
 * @returns Axios Promise Instance
 */
module.exports.getPIndexFalling = (project_id, task_id, week) => {
	const bundle = { project_id, task_id, week };
	return request.get(parseURL("getPIndexFalling", bundle));
}