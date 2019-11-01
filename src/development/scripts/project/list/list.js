import Vue from 'vue';
import Buefy from 'buefy';
import { notified, checkConnection, animate } from 'helper-tools'
import { dataTableNoCard, crudInput, linker } from "components";
import Axios from 'axios'
import api from 'helper-apis';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTableNoCard, crudInput, notified, linker
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		projectlist: PROJECTLIST,
		projectlistOri: PROJECTLIST,
		showTable: true,
		showMilestone: false,
		showEdit: false,
		form: "",
		selectedStatus: ""
	},
	watch: {
		selectedStatus: function (newQuery, oldQuery) {
			this.filterStatus(newQuery)
		}
	},
	methods: {
		sendInitialBaseline(val) {
			let self = this;
			let bundle = { project_id: val.project }
			api.sendInitialBaseline(bundle)
				.then((response) => {
					notified(self.$notification)
						.success("Project <b class='has-text-dark'>" + val.iwo + "</b> baseline has been successfully initiated. 🏃‍");
				})
				.catch(function (error) {
					console.log('error asking for baseline');
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				});
		},
		setInitialBaseline(val) {
			let self = this;
			api.setInitialBaseline(val.project_id)
				.then((response) => {
					let message = response.data;
					if (message != "") {
						self.$dialog.alert({
							message: message,
							type: 'is-warning'
						});
					} else {
						self.$dialog.confirm({
							title: 'Initial Baseline',
							message: 'Project <b>' + val.project_name + '</b> baseline will be initiated, you sure ?',
							confirmText: 'Start Initial Baseline',
							type: 'is-warning',
							onConfirm: () => {
								self.sendInitialBaseline(val)
							}
						})
					}

				})
				.catch(function (error) {
					console.log('error asking for baseline');
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				});
		},
		setMileStone(val) {
			if (this.showTable) {
				this.form = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false;
					this.showMilestone = true;

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#setMilestoneForm').classList.remove('fadeIn', 'faster');
				animate('#setMilestoneForm', 'fadeOut faster', (el) => {
					this.showTable = true;
					this.showMilestone = false;

					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.form = ""
				});
			}
		},
		editProject(val) {
			if (this.showTable) {
				this.form = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false;
					this.showEdit = true;

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#editProjectForm').classList.remove('fadeIn', 'faster');
				animate('#editProjectForm', 'fadeOut faster', (el) => {
					this.showTable = true;
					this.showEdit = false;

					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.form = ""
				});
			}
		},
		filterStatus(val) {
			if (val !== "") {
				this.projectlist = this.projectlistOri;
				this.projectlist = this.projectlist.filter(project =>
					this.selectedStatus.includes(project.status)
				);
			} else {
				this.projectlist = this.projectlistOri
			}
		}
	},
	mounted() {
		global.$loader.hide();
	}
});