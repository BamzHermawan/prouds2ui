import Vue from 'vue';
import Buefy from 'buefy'
import { dataTable } from "components";
import { animate } from 'helper-tools'
import Loader from 'helper-loader';
import 'helper-filter'
import Cost from "./cost.vue"
import Milestone from "./milestone.vue"

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTable, Cost, Milestone
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		modal: {
			milestone: false,
			// cost: false
		},
		props: DATA,
		milestoneShowAction: false,
		selectedDocument: null,
		showTable: true,
		showCost: false,
		showMilestone: false
	},
	methods: {
		editMilestone() {
			if (this.showTable) {
				animate('#tableRebaseline', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.showMilestone = !this.showMilestone

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#milestone').classList.remove('fadeIn', 'faster');
				animate('#milestone', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.showMilestone = !this.showMilestone

					document.querySelector('#tableRebaseline').classList.add('fadeIn faster');
				});
			}
		},
		editCost() {
			if (this.showTable) {
				animate('#tableRebaseline', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.showCost = !this.showCost

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#cost').classList.remove('fadeIn', 'faster');
				animate('#cost', 'fadeOut faster', (el) => {
					this.showTable = !this.showTable
					this.showCost = !this.showCost

					document.querySelector('#tableRebaseline').classList.add('fadeIn faster');
				});
			}
		}
	},
	mounted() {
		Loader.hide();
	}
});