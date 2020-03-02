module.exports = {

	// Use API TESTING
	apiTesting: true,

	// Base URL to prouds API
	baseAPI: 'http://localhost:5501/demo/',

	// timeout is 1 minute
	timeout: 1 * 60 * 1000,

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
         * get Team Workplan List [GET]
         * Send Data: task_id
         * Received Data: 
         *  - list team
         */
		getTeamWorkplan: 'getTeamWorkplan.php?task_id={task_id}',

        /**
         * get Resource Workplan List [GET]
         * Send Data: task_id
         * Received Data: 
         *  - list team
         */
		getResourceWorkplan: 'getResourceWorkplan.php?task_id={task_id}',

        /**
         * open Notification Log [POST]
         * Send Data:  List of id
         * Received Data: -
         */
		openNotification: 'axios_check.php',

        /**
         * Get List of Filled Timesheet Date [POST]
         * Send Data:
         * - Assignment ID
         * - Task Start Date
         * - Task End Date
         * Received Data: 
         * - List of Filled Timesheet Date
         */
		filledTimesheet: 'getTimesheetDate.php',

        /**
         * Delete File [POST]
         * Send Data:
         * - file_id
         * Received Data:
         *  - success
         */
		deleteFile: 'axios_check.php',

        /**
         * Set Complete Assign Resource [POST]
         * Send Data:
         * - user_id
         * Received Data:
         *  - success
         */
		setComplete: 'axios_check.php',

        /**
         * get data performance Index by project id
         * Send Data:
         * - project_id
         */
		getPIndexTable: 'performanceIndex.php?get=table&project_id={project_id}',

        /**
         * get data performance Index chart by project id & task id
         * Send Data:
         * - project_id
         * - task_id
         */
		getPIndexChart: 'performanceIndex.php?get=chart&project_id={project_id}&task_id={task_id}',

        /**
         * get data performance Index chart by project id & task id
         * Send Data:
         * - project_id
         * - task_id
         */
		getPIndexFalling: 'performanceIndex.php?get=falling&project_id={project_id}&task_id={task_id}&week={week}',

        /**
         * [get/post] data tasks by projects
         * Send Data:
         * - project_id [GET]
         * - parent [POST]
         */
		getProjectTasks: 'performanceIndex.php?get=tasks&project_id={project_id}&limit=50',

        /**
         * get data tasks by projects
         * Send Data:
         * - project_id: string project id [GET]
         * - task_id: array of task id [POSt]
         * - week_start: int from 1 [POST]
         * - week_limit: int default 10
         */
		getTasksProgress: 'performanceIndex.php?get=weekly&project_id={project_id}',

		/**
         * get workplan tasks by projects and version
         * Send Data:
         * - project_id: string project id [GET]
         * - version_id: workplan version id [GET]
         */
		workplanTasks: 'http://localhost:5501/demo/getWorkplan.php?project={project_id}&version={version_id}',

        /**
         * Get User list by Unit ID
         * Send Data:
         * - unit_id: string project id [GET]
         */
		userByUnit: 'getUtilMap.php?get=users&total=50&unit={unit_id}',

        /**
         * Get User Utilization Map list by Unit ID
         * Send Data:
         * - unit_id: string project id [GET]
         * - start: start date range (MM/YYYY) or null [POST]
         * - end: end date range (MM/YYYY) or null [POST]
         */
		userMapByUnit: 'getUtilMap.php?get=map&total=50&unit={unit_id}',

        /**
         * Get Timesheet Complience by Unit ID
         * Send Data:
         * - unit_id: string project id [GET]
         * - start: start date range (MM/YYYY) or null [POST]
         * - end: end date range (MM/YYYY) or null [POST]
         */
		timesheetComplience: 'getUtilMap.php?get=complience&total=50&unit={unit_id}',

		/**
         * Get Timesheet Complience Chart by Unit ID
         * Send Data:
         * - start: start date range (DD/MM/YYYY) or null [POST]
         * - end: end date range (DD/MM/YYYY) or null [POST]
         */
		complienceChart: 'getUtilMap.php?get=comChart',

		/**
         * Get Timesheet Complience Week Map by Year
         * Send Data:
         * - year: string year [GET]
         */
		getWeekMonthMapping: 'getUtilMap.php?get=weekMap&year={year}',

        /**
         * Get User Utilization Map Detail list by Nik and date
         * Send Data:
         * - nik: String User NIK [POST]
         * - date: Activity Date with format DD/MM/YYYY [POST]
         */
		userActivityByDate: 'getUtilMap.php?get=detail',

		/**
         * Get Workplan Version Changelog
         * Send Data:
         * - id: String Workplan version id [GET]
         */
		wpChangelog: 'dummy/changelogTable.json?ver={id}',

		/**
         * Get project data by oppty id and year
         * Send Data:
         * - oppty_id: String Opportunity ID [GET]
         * - oppty_year: String Opportunity Year [GET]
         */
		projectByOppty: 'newProjectByOppty.php?id={oppty_id}&year={oppty_year}',

		/**
         * Get detail data of BAST Plan
         * Send Data:
         * - top_id: BAST PLAN TOP ID [GET]
         */
		detailBASTPlan: 'bastPlanDetail.php?id={top_id}',
	}
}