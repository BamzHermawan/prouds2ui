import Vue from 'vue';
import Buefy from 'buefy'
import ContentPage from "./../vue/pages/projects/listRebaseline.vue";
import Loader from "../loader.js";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		ContentPage
	},
	mounted() {
		Loader();
	}
});