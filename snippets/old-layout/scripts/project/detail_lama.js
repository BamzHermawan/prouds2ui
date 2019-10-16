import Vue from 'vue';
import Buefy from 'buefy';
import Loader from "../loader.js";
import NavBar from "./../vue/components/topNavBar.vue";
import Dashboard from "./../vue/pages/projects/detailController.vue";
import Log from "../../scripts/vue/components/mediaLog.vue";

Vue.use(Buefy);
new Vue({
	components: {
		NavBar, Dashboard, Log
	},
	data() {
		return {
			limit: 5,
			activity: ACTIVITY,
			maxPerPage: 10,
			currentPage: 1,
			showloader: false,
		}
	},
	el: '#vapp',
	mounted() {
		Loader();
		this.scrollTrigger();
	},
	computed: {
		pageCount() {
			return Math.ceil(this.activity.length / this.maxPerPage);
		},
		pageOffset() {
			var a = this.maxPerPage * this.currentPage;
			var b;
			if (this.activity.length > a) {
				b = this.activity.length - a;
				return this.activity.length - b;
			} else {
				b = a - this.activity.length;
				return a - b;
			}
		}
	},
	methods: {
		scrollTrigger() {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (
						entry.intersectionRatio > 0 &&
						this.currentPage < this.pageCount
					) {
						this.showloader = true;
						this.isLoading = true;
						setTimeout(() => {
							this.currentPage += 1;
							this.isLoading = false;
							this.showloader = false;
						}, 2000);
					}
				});
			});
			observer.observe(this.$refs.infinitescrolltrigger);
		}
	}
});