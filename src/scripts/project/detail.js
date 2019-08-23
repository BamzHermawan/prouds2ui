import Vue from 'vue';
import Buefy from 'buefy';
import Loader from "../loader.js";
import NavBar from "./../vue/components/topNavBar.vue";
import Dashboard from "./../vue/pages/projects/detailController.vue";
import Log from "../../scripts/vue/components/mediaLog.vue";

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, Dashboard, Log
	},
	el: '#vapp',
	mounted(){
		Loader();
	}
});