import Vue from 'vue';
import Buefy from 'buefy'
import NavBar from "../vue/components/topNavBar.vue";
import Loader from "../loader.js";
import "../filters.js"

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar
	},
	mounted() {
		Loader();
	}
});