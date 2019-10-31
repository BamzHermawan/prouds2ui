import Vue from 'vue';
import Buefy from 'buefy';
import api from 'helper-apis';
import { getCookie } from 'helper-tools';

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	data() {
		return {
			hello: "Hi semua 👋, ini Hello World",
			userlog: {
				nama: '',
				nik: '',
				userBU: '',
				avatar: ''
			}
		}
	},
	methods: {
		addFavorite() {
			global.$sidebar.ws.addList('Blank Page', 'http://localhost:5500/blank.html');
		}
	},
	mounted() {
		global.$loader.hide();

		// get user login data
		let self = this;
		api.getUserSession
			.then((response) => {
				self.userlog = response.data;
			})
			.catch((err) => console.log(err));

		let userlog = getCookie('userlog');
		console.log(userlog);
	}
});