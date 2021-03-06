import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "./vue/components/topNavBar.vue";
import Dashboard from "./vue/pages/indexController.vue";
import Loader from "./loader.js";

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, Dashboard
	},
	el: '#vapp',
	data() {
		return {
			hello: 'Hello World'
		}
	},
	computed: {
		sayHi() {
			return this.hello;
		}
	},
	mounted() {
		Loader();
	}
});