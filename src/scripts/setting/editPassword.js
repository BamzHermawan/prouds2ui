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
		currentPassword: "",
		newPassword: "",
		confirmPasssword: ""

	}
});