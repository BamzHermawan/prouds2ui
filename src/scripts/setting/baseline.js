import Vue from 'vue';
import Buefy from 'buefy';
import DataTable from "../../scripts/vue/components/dataTable.vue";
import NavBar from "../vue/components/topNavBar.vue";
import SideBar from "../vue/components/settingSidebar.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { DataTable, NavBar, SideBar },
	data: {
		dataBaselineStatus: DATA_BASELINE_STATUS,
		dataBaselineType: DATA_BASELINE_TYPE

	},
	computed: {
	},
	methods: {
		checkEmpty(value) {
			return value === undefined || value === null || value === "";
		}
	}
});