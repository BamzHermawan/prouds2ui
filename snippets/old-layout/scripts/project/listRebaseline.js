import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import MediaLog from "../vue/components/mediaLog.vue";
import Milestone from "./../vue/pages/projects/rebaseline/rescheduleMilestone.vue";
import DataTable from "./../vue/components/dataTable.vue";
import Cost from "./../vue/pages/projects/rebaseline/costReallocation.vue";
import Loader from "../loader.js";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, Milestone, Cost, MediaLog, DataTable
	},
	data: {
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
			this.modal.milestone = true
		},
		editCost() {
			this.modal.cost = true
		}
	},
	mounted() {
		Loader();
	}
});