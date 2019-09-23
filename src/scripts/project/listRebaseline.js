import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import Mandays from "./../vue/pages/projects/rebaseline/mandaysRecalculation.vue";
import Milestone from "./../vue/pages/projects/rebaseline/rescheduleMilestone.vue";
import Cost from "./../vue/pages/projects/rebaseline/costReallocation.vue";
import Loader from "../loader.js";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, Mandays, Milestone, Cost
	},
	data: {
		modal: {
			mandays: false,
			milestone: false,
			cost: false
		},

		selectedDocument: null,
	},
	methods: {
		editMandays() {
			this.modal.mandays = true
		},
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