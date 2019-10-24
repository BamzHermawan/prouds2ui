import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import { dataTableNoCard } from "components";
import Loader from 'helper-loader';
import Assign from "./assign.vue"
import SetUnitDelivery from "./unitDelivery.vue"

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		topNavBar, dataTableNoCard, Assign, SetUnitDelivery
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		showUnitDelivery: false,
		showAssignPM: false,
		showAssignCoPM: false,
		showAssignAdm: false,
		showTable: true,
		newproject: NEWPROJECT,
		newprojectOri: NEWPROJECT,
		listpm: LISTPM,
		unitdelivery: UNITDELIVERY,
		selectedProject: [],
		selectedStatus: "",
		toggleForm: {
			PM: false,
			CoPM: false,
			AdmPM: false
		}
	},
	watch: {
		selectedStatus: function (newQuery, oldQuery) {
			this.filterStatus(newQuery)
			console.log(newQuery)
		}
	},
	methods: {
		setUnitDelivery(val = undefined) {
			this.showTable = !this.showTable
			this.showUnitDelivery = !this.showUnitDelivery
			this.selectedProject = val
		},
		assign(idd, val = undefined) {
			this.showTable = !this.showTable
			this.toggleForm[idd] = !this.toggleForm[idd]

			this.selectedProject = val
		},
		filterStatus(val) {
			if (val !== "") {
				this.newproject = this.newprojectOri;
				this.newproject = this.newproject.filter(project =>
					this.selectedStatus.includes(project.status)
				);
			} else {
				this.newproject = this.newprojectOri;
			}
		}
	},
	mounted() {
		Loader.hide();
	}
});