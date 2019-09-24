import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import Milestone from "./../vue/pages/projects/rebaseline/rescheduleMilestone.vue";
import Cost from "./../vue/pages/projects/rebaseline/costReallocation.vue";
import Loader from "../loader.js";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, Milestone, Cost
	},
	data: {
		modal: {
			milestone: false,
			cost: false
		},

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