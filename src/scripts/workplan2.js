import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "./vue/components/topNavBar.vue";
import ContentPage from "./vue/pages/workplan2.vue";
import Loader from "./loader.js";
import Chart from './vue/components/ganttchart2.vue';

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, ContentPage, Chart
	},
	el: '#vapp',
	mounted() {
		Loader();
	}
});