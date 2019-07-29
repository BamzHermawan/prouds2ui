import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "./../vue/components/topNavBar.vue";
import Dashboard from "./../vue/pages/projects/detailController.vue";

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, Dashboard
	},
	el: '#vapp'
});