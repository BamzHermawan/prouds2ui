import Vue from 'vue';
import Buefy from 'buefy';
import Loader from '../loader.js';
import NavBar from "./../vue/components/topNavBar.vue";
import ContentPage from "./../vue/pages/projects/allocationController.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, ContentPage
	},
	mounted(){
		Loader();
	}
});