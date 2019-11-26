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
		selectedRows: [],
		filter: {
			role: '',
			member: '',
			project: '',
			date: {
				start: null,
				end: null
			}
		}
	},
	computed: {
		submission(){
			if (
				isEmpty(this.filter.role) && 
				isEmpty(this.filter.member) && 
				isEmpty(this.filter.project) && 
				isEmpty(this.filter.date.start) && 
				isEmpty(this.filter.date.end)
			) {
					return this.timesheet;
			}

			let self = this;
			let start = Moment(this.filter.date.start);
			let end = Moment(this.filter.date.end);
			let validateStart = this.checkDate('start');
			let validateEnd = this.checkDate('end');

			return this.timesheet.filter(ts => {
				let checker = true;

				// Filtering by Member Role
				let role = self.filter.role.toLowerCase();
				if (!isEmpty(role)){
					checker = checker && ts.role.toLowerCase().includes(role);
				}

				// Filtering by Member Name
				let member = self.filter.member.toLowerCase();
				if (!isEmpty(member)) {
					checker = checker && ts.member_name.toLowerCase().includes(member);
				}

				// Filtering by Project Name
				let project = self.filter.project.toLowerCase();
				if (!isEmpty(project)) {
					checker = checker && ts.project_name.toLowerCase().includes(project);
				}

				if(checker) {
					let tsDate = Moment(ts.timesheet_date, "DD/MM/YYYY");
					if (validateStart && validateEnd){
						// Filtering by Date range
						if(start.isSame(end)){
							checker = checker && tsDate.isSame(start);
						} else {
							checker = checker && tsDate.isBetween(start, end);
						}
					} else if(validateStart) {
						checker = checker && tsDate.isAfter(start);
					} else if(validateEnd) {
						checker = checker && tsDate.isBefore(end);
					}
				}

				return checker;
			});
		},
		roleList(){
			let roles = [];
			let query = this.filter.role.toLowerCase();
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if(!roles.includes(ts.role)){
					roles.push(ts.role);
				}
			}

			return roles.filter(role => {
				return role.toLowerCase().includes(query);
			})
		},
		memberList(){
			let names = [];
			let query = this.filter.member.toLowerCase();
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if (!names.includes(ts.member_name)) {
					names.push(ts.member_name);
				}
			}

			return names.filter(name => {
				return name.toLowerCase().includes(query);
			})
		},
		projectList() {
			let names = [];
			let query = this.filter.project.toLowerCase();
			for (let i = 0; i < this.submission.length; i++) {
				const ts = this.submission[i];
				if (!names.includes(ts.project_name)) {
					names.push(ts.project_name);
				}
			}

			return names.filter(name => {
				return name.toLowerCase().includes(query);
			})
		},
		total(){
			return this.submission.length;
		},
		disableApprove(){
			return !(this.selectedRows.length > 0);
		}
	},
	methods: {
		moment: Moment,
		checkDate(key){
			if (!isEmpty(this.filter.date[key])){
				return Moment(this.filter.date[key]).isValid();
			}

			return false;
		},
		approveSelected(e) {
			const form = e.target;
			for (let i = 0; i < this.selectedRows.length; i++) {
				let selected = this.selectedRows[i];
				let input = document.createElement('input');
				input.setAttribute('type', 'hidden');
				input.setAttribute('name', 'timesheet_id[]');
				input.value = selected.timesheet_id;

				form.appendChild(input);
			}
		}
	},
	mounted(){
		global.$loader.hide();
	}
});