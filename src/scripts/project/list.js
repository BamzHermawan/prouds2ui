import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import DataTable from "../../scripts/vue/components/dataTable.vue";
import Loader from "../loader.js";
import CrudInput from "../vue/components/crud/CrudInput";
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
		selectedStatus: ""
	},
	watch: {
		selectedStatus: function (newQuery, oldQuery) {
			this.filterStatus(newQuery)
		}
	},
	methods: {
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