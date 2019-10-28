import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import { dataTableNoCard } from "components";
import Loader from 'helper-loader';
import { crudInput } from 'components';
import { notified } from 'helper-tools'
import Axios from 'axios'
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
		setInitialBaseline(val) {

			// this.isLoading = true;
			let self = this;
			return Axios.get('http://localhost:5501/demo/getNotification.php', {
				params: { project_id: val.project_id }
			})
				.then(function (response) {
					let msg = response.data;
					if (msg.name != "") {
						self.$dialog.alert({
							message: msg.name,
							type: 'is-warning'
						});
					} else {
						self.$dialog.confirm({
							title: 'Confirm Changes',
							message: 'Are you sure you want ?',
							confirmText: 'Oke',
							type: 'is-danger',
							hasIcon: true,
							onConfirm: () => {
								return Axios.post('http://localhost:5501/demo/post_detect.php', {
									project_id: val.project_id
								},
									{
										headers: {
											"Content-Type": "application/x-www-form-urlencoded"
										}
									})
									.then(function (response) {
										self.$dialog.alert({
											message: "Success",
											type: 'is-warning'
										});
										// location.reload();
									})
									.catch(function (error) {
										console.log("ACB Error Fetching: 629");
										console.log(error);
										Tools.notified(self.$toast).error(
											"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
										);
									});
							}
						})
					}
				})
				.catch(function (error) {
					notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
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