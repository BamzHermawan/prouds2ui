import Vue from 'vue';
import Buefy from 'buefy';
import Axios from 'axios';
import { notified, loadStorage } from '../tools.js';
import NavBar from "./../vue/components/topNavBar.vue";
import searchMenu from "./../vue/pages/projects/resourceSearching.vue";
import filterMenu from "./../vue/pages/projects/resourceFilter.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	methods: {
		cartBtnAction(){
			let self = this;
			this.$refs.stepOne.sendSavedResource()
				.then(() => self.filter.active = true);
		},
		sendSavedResource() {
			let self = this;
			this.loadingBtn = true;
			let apiUrl = this.$refs.stepOne.apiPostSaved;
			
			loadStorage("selectedResource")
				.then(bundle => {
					Axios.post(apiUrl, bundle, {
						headers: {
							"Content-type": "application/x-www-form-urlencoded"
						}
					})
						.then(function (response) {
							console.log(response.data);
							self.filter.active = true;
						})
						.catch(function () {
							notified(self.$notification).error("Mohon maaf, terjadi gangguan koneksi. Mohon ulangi dalam beberapa saat lagi. 🙏");
						});
				})
				.catch(function(){
					notified(self.$snackbar,
						"Kamu belum memilih resource satu pun 😂"
					);
				})
				.finally(() => self.loadingBtn = false);
		}
	},
	components: {
		NavBar, searchMenu, filterMenu
	},
	data: {
		loadingBtn: false,
		filter: {
			active: false
		},
		formProps: {
			email: '',
			password: ''
		},
		filterCat: FILTERCATEGORY
	},
	mounted(){
		let test = {
			hello: "Hello",
			echo(){
				console.log(this.hello + " World");
			}
		}

		test.echo();
	}
});