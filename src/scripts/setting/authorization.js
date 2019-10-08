import Vue from 'vue';
import Buefy from 'buefy';
import DataTable from "../vue/components/dataTable";
import NavBar from "../vue/components/topNavBar.vue";
import SideBar from "../vue/components/settingSidebar.vue";
import Loader from "../loader.js";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { DataTable, NavBar, SideBar },
	data: {
		data: DATA,
		edit: false,
		add: false,
		showTable: true,
		paginated: 5,
		checkboxGroup: [],
		tampung: ""
	},
	methods: {
		addform() {
			if (this.add) {
				this.add = false
				this.showTable = true
			} else {
				this.add = true
				this.showTable = false
			}
		},
		editForm(cok) {
			if (this.edit) {
				this.edit = false
				this.showTable = true
			} else {
				this.tampung = cok
				this.edit = true
				this.showTable = false

			}
		},
		tes() {

		}
	},
	mounted() {
		Loader();
	}
});