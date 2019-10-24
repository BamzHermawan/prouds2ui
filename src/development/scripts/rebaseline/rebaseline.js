import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import { mediaLog } from "components";
import { dataTable } from "components";
import Loader from 'helper-loader';
import 'helper-filter'
import Cost from "./cost.vue"
import Milestone from "./milestone.vue"

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		topNavBar, mediaLog, dataTable, Cost, Milestone
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		modal: {
			milestone: false,
			cost: false
		},
		props: DATA,
		milestoneShowAction: false,
		selectedDocument: null,
	},
	methods: {
		editMilestone() {
			this.modal.milestone = !this.modal.milestone
		},
		editCost() {
			this.modal.cost = !this.modal.cost
		}
	},
	mounted() {
		Loader.hide();
	}
});