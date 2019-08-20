import Vue from 'vue';
import Buefy from 'buefy';
import DataTable from "../../scripts/vue/components/dataTable.vue";
import NavBar from "../vue/components/topNavBar.vue";
import SideBar from "../vue/components/settingSidebar.vue";
import SettingForm from "../vue/components/SettingForm.vue"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { DataTable, NavBar, SideBar, SettingForm },
	data: {
		userId: "adewiranataputra",
		name: "Ade Wiranata Putra",
		email: "ade.wiranata@sigma.co.id",
		bu: "1",
		profile: "1"

	},
	computed: {
	},
	methods: {
		checkEmpty(value) {
			return value === undefined || value === null || value === "";
		}
	}
});