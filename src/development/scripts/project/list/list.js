import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import { dataTableNoCard } from "components";
import Loader from 'helper-loader';
import { crudInput } from 'components';
import { notified, checkConnection } from 'helper-tools'
import Axios from 'axios'
import api from 'helper-apis';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		topNavBar, dataTableNoCard, crudInput, Axios, notified
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
			// let bundle = { project_id: val.project }
			api.sendInitialBaseline(val.project_id)
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
				this.showTable = false
				this.showMilestone = true
				this.form = val
			} else {
				this.showTable = true
				this.showMilestone = false
				this.form = ""
			}
		},
		editProject(val) {
			if (this.showTable) {
				this.showTable = false
				this.showEdit = true
				this.form = val
			} else {
				this.showTable = true
				this.showEdit = false
				this.form = ""
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
		Loader.hide();
	}
});