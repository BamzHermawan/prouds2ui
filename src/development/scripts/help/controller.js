import Vue from 'vue';
import Buefy from 'buefy';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	data: {
		userlog: {
			name: 'Zaid Makmur Aamiin'
		}
	},
	mounted() {
		global.$loader.hide();
	}
});