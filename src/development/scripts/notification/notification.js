import Vue from 'vue';
import Buefy from 'buefy';
import Api from 'helper-apis';
import { checkConnection, getApiTestByKey, notified } from 'helper-tools';
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
			activeId: null,
			onRefresh: false
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
		fetchNotification(shownotif = true){
			let self = this;
			this.onRefresh = true;
			Api.getNotification()
				.then(response => {
					self.logs = response.data;
					let total = global.updateNotifCount(self.logs);
					this.onRefresh = false;
					if (shownotif) notified(self.$notification).info("You have <b>" + total + "<b> unread notification");
				})
				.catch(() => {
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				})
		},
		openNotification(log){
			if(log.isOpen && !log.isRead){
				for (let i = 0; i < this.logs.length; i++) {
					if(this.logs[i].id == log.logId){
						this.logs[i].read = true;
					}
				}

				Api.openNotification({
					id: log.logId,
					subject: log.subject,
					date: log.date,
					time: log.time
				})
					.then(response => {
						console.log('akuh di read, muach 💋');
					})
					.catch(() => {
						console.log('err wadaaw');					
					})
			}
		}
	},
	mounted(){
		this.fetchNotification(false);
		console.log(getApiTestByKey('userLogin'));
		global.$loader.hide();
	}
});