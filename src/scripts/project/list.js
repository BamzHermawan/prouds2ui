import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import DataTable from "../../scripts/vue/components/dataTable.vue";
import Loader from "../loader.js";
import CrudInput from "../vue/components/crud/CrudInput";
import Axios from "axios";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, DataTable, CrudInput
	},
	data: {
		projectlist: PROJECTLIST,
		projectlistOri: PROJECTLIST,
		showTable: true,
		showMilestone: false,
		showEdit: false,
		form: "",
		selectedStatus: "",
		testaja: ['Project Name', 'Project Manager', 'Co Project Manager']
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
							}
						})
					}
				})
				.catch(function (error) {
					notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
				});
			// .finally(() => (self.isLoading = false));
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
		Loader();
	}
});