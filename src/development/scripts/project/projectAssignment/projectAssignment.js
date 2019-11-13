import Vue from 'vue';
import Buefy from 'buefy';
import { dataTableNoCard, linker } from "components";
import { animate, isEmpty, parseURLRoute } from 'helper-tools'
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
		users: {
			pm: LISTPM,
			copm: LISTCOPM,
			admin: LISTADMIN
		},
		unitdelivery: UNITDELIVERY,
		selectedProject: [],
		selectedStatus: "",
		toggleForm: {
			PM: false,
			Adm: false,
			CoPM: false
		}
	},
	watch: {
		selectedStatus: function (newQuery, oldQuery) {
			this.filterStatus(newQuery)
			console.log(newQuery)
		}
	},
	methods: {
		isEmpty: isEmpty,
		setUnitDelivery(val = undefined) {
			if (this.showTable) {
				this.selectedProject = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					el.classList.add('fadeIn', 'faster');
					this.showTable = !this.showTable
					this.showUnitDelivery = !this.showUnitDelivery

					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document.querySelector('#setUnitDelivery').classList.remove('fadeIn', 'faster');
				animate('#setUnitDelivery', 'fadeOut faster', (el) => {
					el.classList.add('fadeIn', 'faster');
					this.showTable = !this.showTable
					this.showUnitDelivery = !this.showUnitDelivery
					this.selectedProject = ""
				});
			}
		},
		assign(idd, val = undefined) {
			if (this.showTable) {
				this.selectedProject = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					el.classList.add('fadeIn', 'faster');
					this.showTable = !this.showTable
					this.toggleForm[idd] = !this.toggleForm[idd]

					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document.querySelector('#' + idd).classList.remove('fadeIn', 'faster');
				animate('#' + idd, 'fadeOut faster', (el) => {
					el.classList.add('fadeIn', 'faster');
					this.showTable = !this.showTable
					this.toggleForm[idd] = !this.toggleForm[idd]
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
		let routes = parseURLRoute();
		if (routes !== false){
			if(routes.args.length > 0){
				let project = this.newprojectOri.find((row) => row.project_id == routes.args[0]);
				if(project !== undefined){
					switch (routes.route) {
						case 'setpm':
							this.assign('PM', project);
							break;
	
						case 'setcopm':
							this.assign('CoPM', project);
							break;
	
						case 'setadmin':
							this.assign('Adm', project);
							break;
	
						case 'setunit':
							this.setUnitDelivery(project);
							break;
					}
				}
			}
		}

		global.$loader.hide();
	}
});