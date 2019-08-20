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
		project_type: PROJECT_TYPE,
		project_category: PROJECT_CATEGORY

	},
	computed: {
	},
	methods: {
		checkEmpty(value) {
			return value === undefined || value === null || value === "";
		}
	}
});