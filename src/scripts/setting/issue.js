import Vue from 'vue';
import Buefy from 'buefy';
import DataTable from "../../scripts/vue/components/dataTable.vue";
import NavBar from "../vue/components/topNavBar.vue";
import SideBar from "../vue/components/settingSidebar.vue";
import Crud from "../vue/components/crud/crud.vue";
import CrudForm from "../vue/components/crud/crudForm.vue";
import CrudInput from "../vue/components/crud/crudInput.vue";
import Loader from "../loader.js";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { 
		DataTable,
		NavBar,
		SideBar,
		Crud,
		CrudForm,
		CrudInput
	},
	data: {
		dataIssueStatus: DATA_ISSUE_STATUS,
		dataIssueSeverity: DATA_ISSUE_SEVERITY,
		props: VAPPS
	},
	mounted() {
		Loader();
	}
});