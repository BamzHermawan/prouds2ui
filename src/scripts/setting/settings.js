import Vue from 'vue';
import Buefy from 'buefy';
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
		NavBar,
		SideBar,
		Crud,
		CrudForm,
		CrudInput
	},
	data: {
		props: VAPPS
	},
	mounted() {
		Loader();
	}
});