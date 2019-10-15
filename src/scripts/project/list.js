import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import DataTable from "../../scripts/vue/components/dataTable.vue";
import Loader from "../loader.js";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, DataTable
	},
	data: {
		projectlist: PROJECTLIST,
		showTable: true,
		form: ""
	},
	methods: {
		setMileStone(val) {
			if (this.showTable) {
				this.showTable = false
				this.form = val
			} else {
				this.showTable = true
				this.form = ""
			}
		}
	},
	mounted() {
		Loader();
	}
});