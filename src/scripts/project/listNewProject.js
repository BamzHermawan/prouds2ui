import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import Loader from "../loader.js";
import DataTable from "../../scripts/vue/components/dataTable.vue";
import SetUnitDelivery from "../../scripts/vue/pages/projects/newprojectlist/setUnitDelivery.vue";
import AssignPm from "../../scripts/vue/pages/projects/newprojectlist/assign.vue";
import AssignCoPm from "../../scripts/vue/pages/projects/newprojectlist/assign.vue";
import AssignAdm from "../../scripts/vue/pages/projects/newprojectlist/assign.vue";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, DataTable, SetUnitDelivery, AssignPm, AssignCoPm, AssignAdm
	},
	data: {
		showUnitDelivery: false,
		showAssignPM: false,
		showAssignCoPM: false,
		showAssignAdm: false,
		showTable: true,
		newproject: NEWPROJECT,
		listpm: LISTPM,
		unitdelivery: UNITDELIVERY,
		selectedProject: []
	},
	methods: {
		setUnitDelivery(val) {
			this.showTable = false
			this.showUnitDelivery = true
			this.selectedProject = val
		},
		assignPM(val, idd) {
			if (idd === "PM") {
				this.showTable = false
				this.showAssignPM = true
				this.selectedProject = val
			} else if (idd === "CoPM") {
				this.showTable = false
				this.showAssignCoPM = true
				this.selectedProject = val
			} else {
				this.showTable = false
				this.showAssignAdm = true
				this.selectedProject = val
			}
		}
	},
	mounted() {
		Loader();
	}
});