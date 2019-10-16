import Vue from 'vue';
import Buefy from 'buefy';

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	data(){
		return {
			hello: "Hi semua 👋, ini Hello World"
		}
	},
	methods: {
		addFavorite(){
			global.$sidebar.empty.addList('Favorit 1', '#fav1');
		}
	},
	mounted(){
		global.$loader.hide();
	}
});