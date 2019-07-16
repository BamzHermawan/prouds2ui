import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "./vue/components/topNavBar.vue";
import ContentPage from "./vue/pages/projectController.vue";
// import 'buefy/dist/buefy.css'

import "../styles/main.scss"

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, ContentPage
	},
	el: '#vapp',
	data(){
		return {
			hello: 'Hello World'
		}
	},
	computed: {
		sayHi(){
			return this.hello;
		}
	}
});