import Vue from 'vue';
import Buefy from 'buefy';
import { dataTableNoCard, linker } from "components";
import { animate } from 'helper-tools'
import Assign from "./assign.vue";
import SetUnitDelivery from "./unitDelivery.vue";
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		linker, dataTableNoCard, Assign, SetUnitDelivery
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
			if (this.showTable) {
				this.selectedProject = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.showUnitDelivery = !this.showUnitDelivery

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#setUnitDelivery').classList.remove('fadeIn', 'faster');
				animate('#setUnitDelivery', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.showUnitDelivery = !this.showUnitDelivery

					document.querySelector('#setUnitDelivery').classList.add('fadeIn faster');
					this.selectedProject = ""
				});
			}


		},
		assign(idd, val = undefined) {
			if (this.showTable) {
				this.selectedProject = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.toggleForm[idd] = !this.toggleForm[idd]

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#' + idd).classList.remove('fadeIn', 'faster');
				animate('#' + idd, 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.toggleForm[idd] = !this.toggleForm[idd]

					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.selectedProject = ""
				});
			}
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
		global.$loader.hide();
	}
});