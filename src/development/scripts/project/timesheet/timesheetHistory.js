import Vue from 'vue';
import Buefy from 'buefy';
import Moment from 'helper-moment';
import { crudInput } from 'components';
import { isEmpty } from 'helper-tools';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { crudInput },
	data: {
		timesheet: TIMESHEET,
		filter: {
			role: '',
			pm_name: '',
			project_name: '',
			task: '',
			status: '',
			date: {
				start: null,
				end: null
			}
		}
	},
	computed: {
		submission() {
			if (this.checkAllEmpty(this.filter)){
				return this.timesheet;
			}

			let self = this;
			let start = Moment(this.filter.date.start);
			let end = Moment(this.filter.date.end);
			let validateStart = this.checkDate('start');
			let validateEnd = this.checkDate('end');

			let unique = [ 'date', 'status' ];
			return this.timesheet.filter(ts => {
				let checker = true;

				for (const key in self.filter) {
					if (self.filter.hasOwnProperty(key) && !unique.includes(key)) {
						const filter = self.filter[key];

						// Filtering Rule
						let query = filter.toString().toLowerCase();
						if (!isEmpty(query)) {
							checker = checker && ts[key].toString().toLowerCase().includes(query);
						}
					}
				}

				let status = self.filter.status;
				if (status != '') {
					status = status === 'approved';
					checker = checker && ts.status === status;
				}

				let tsDate = Moment(ts.timesheet_date, "DD/MM/YYYY");
				if (validateStart && validateEnd) {
					// Filtering by Date range
					if (start.isSame(end)) {
						checker = checker && tsDate.isSame(start);
					} else {
						checker = checker && tsDate.isBetween(start, end);
					}
				} else if (validateStart) {
					checker = checker && tsDate.isAfter(start);
				} else if (validateEnd) {
					checker = checker && tsDate.isBefore(end);
				}

				return checker;
			});
		},
		roleList() {
			let roles = [];
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if (!roles.includes(ts.role)) {
					roles.push(ts.role);
				}
			}
			
			let query = this.filter.role.toLowerCase();
			return roles.filter(role => {
				return role.toLowerCase().includes(query);
			})
		},
		pmList() {
			let names = [];
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if (!names.includes(ts.pm_name)) {
					names.push(ts.pm_name);
				}
			}
			
			let query = this.filter.pm_name.toLowerCase();
			return names.filter(name => {
				return name.toLowerCase().includes(query);
			})
		},
		projectList() {
			let names = [];
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if (!names.includes(ts.project_name)) {
					names.push(ts.project_name);
				}
			}
			
			let query = this.filter.project_name.toLowerCase();
			return names.filter(name => {
				return name.toLowerCase().includes(query);
			})
		},
		taskList() {
			let tasks = [];
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if (!tasks.includes(ts.task)) {
					tasks.push(ts.task);
				}
			}
			
			let query = this.filter.task.toLowerCase();
			return tasks.filter(task => {
				return task.toLowerCase().includes(query);
			})
		},
	},
	methods: {
		moment: Moment,
		checkDate(key) {
			if (!isEmpty(this.filter.date[key])) {
				return Moment(this.filter.date[key]).isValid();
			}

			return false;
		},
		checkAllEmpty(obj){
			let status = true;
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					if(obj[key] instanceof Object) {
						status = status && this.checkAllEmpty(obj[key]);
					} else {
						status = status && isEmpty(obj[key]);
					}
				}
			}

			return status;
		}
	},
	mounted() {
		global.$loader.hide();
	}
});