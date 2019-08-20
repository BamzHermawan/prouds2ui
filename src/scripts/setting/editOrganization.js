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
		org_name: "President Director",
		org_level_id: "1",
		org_code: "",
		leader_id: ""
	},
	computed: {
	},
	methods: {
		checkEmpty(value) {
			return value === undefined || value === null || value === "";
		}
	}
});