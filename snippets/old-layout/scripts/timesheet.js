import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "./vue/components/topNavBar.vue";
import ContentPage from "./vue/pages/timesheet.vue";
import Loader from "./loader.js";

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, ContentPage
	},
	el: '#vapp',
	mounted() {
		Loader();
	}
});