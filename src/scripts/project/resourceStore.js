import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "./../vue/components/topNavBar.vue";
import searchMenu from "./../vue/pages/projects/resourceSearching.vue";
import filterMenu from "./../vue/pages/projects/resourceFilter.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar, searchMenu, filterMenu
	},
	data: {
		filter: {
			active: false
		},
		formProps: {
			email: '',
			password: ''
		},
		filterCat: FILTERCATEGORY
	}
});