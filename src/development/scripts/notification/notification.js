import Vue from 'vue';
import Buefy from 'buefy';
import Api from 'helper-apis';
import { checkConnection, getApiTestByKey } from 'helper-tools';
import { notificationLog as nLog } from 'components';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { nLog },
	data(){
		return {
			logs: [],
			currentPage: 1,
			perPage: 10,
			activeId: null
		}
	},
	computed: {
		getListLog(){
			let start = (this.currentPage - 1) * this.perPage;
			let limit = this.currentPage * this.perPage;

			return this.logs.slice(start, limit);
		}
	},
	methods:{
		scrollToTop(){
			document.querySelector('.contentPage').scrollTop = 0;
			global.psContent.update();
		},
		getActiveLog(log){
			if(this.activeId !== null && log.index !== this.activeId){
				if(this.$refs.hasOwnProperty(this.activeId)){
					return this.$refs[this.activeId][0];
				}
			}

			return null;
		},
		fetchNotification(){
			let self = this;
			Api.getNotification()
				.then(response => {
					self.logs = response.data;
				})
				.catch(() => {
					if (checkConnection(self.notification)) {
						if (showAlert) {
							if (showAlert) {
								notified(self.$notification).error(
									"Sorry we are encountering a problem, please try again later. 🙏"
								);
							}
						}
					}
				})
		}
	},
	mounted(){
		this.fetchNotification();
		console.log(getApiTestByKey('userLogin'));
		global.$loader.hide();
	}
});