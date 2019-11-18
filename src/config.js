module.exports = {

	// Use API TESTING
	apiTesting: true,

	// Base URL to prouds API
	baseAPI: 'http://localhost:5501/demo/',

	// list of prouds API
	listAPI: {

		/**
		 * Get User Session [POST]
		 * Send Data: -
		 * Received Data:
		 *  - semua data yang bisa di kasih ke frontend, misal : nama atau nik
		 */
		userLogin: 'userLog.php',

		/**
		 * Set Initial Baseline [POST]
		 * Send Data:
		 * 	- project_id
		 * Received Data:
		 *  - message: pesan kalau ada error atau data tidak lengkap
		 */
		setInitialBaseline: 'getNotifInitial.php',

		/**
		 * Send Initial Baseline [POST]
		 * Send Data: 
		 * 	- project_id
		 * Received Data: -
		 */
		sendInitialBaseline: 'axios_check.php',

		/**
		 * Send Bookmark [POST]
		 * Send Data:
		 * 	- title
		 *  - link
		 *  - user_id
		 * Received Data: -
		 */
		sendBookmark: 'axios_check.php',

		/**
		 * Get Duration [POST]
		 * Send Data:
		 *  - start
		 *  - finish
		 *  - workdays
		 * Received Data: 
		 *  - Duration
		 */
		getDuration: 'getDuration.php',

		/**
		 * Send Photo [POST]
		 * Send Data:
		 * - file
		 * Received Data: -
		 */
		uploadFoto: 'axios_check.php',

		/**
		 * get Notification List [GET]
		 * Send Data: -
		 * Received Data: 
		 *  - list notification
		 */
		getNotification: 'getNotification.php',

		/**
		 * open Notification Log [GET]
		 * Send Data: id
		 * Received Data: 
		 *  - list notification
		 */
		openNotification: 'axios_check.php',

		/**
		 * Delete File [POST]
		 * Send Data:
		 * - file_id
		 * Received Data:
		 *  - success
		 */
		deleteFile: 'axios_check.php'
	}

}