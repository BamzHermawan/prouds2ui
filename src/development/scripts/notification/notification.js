import Vue from 'vue';
import Buefy from 'buefy';
import Api from 'helper-apis';
import { checkConnection, notified, isEmpty } from 'helper-tools';
import { notificationLog as nLog } from 'components';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { nLog },
	data(){
		return {
			logs: [],
			selected: [],
			currentPage: 1,
			perPage: 10,
			activeId: null,
			onRefresh: false,
			markButton: false,
			allSelected: false
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
		resetLogs(){
			this.selectAll(false);
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
					self.selectAll(false);
					let total = global.updateNotifCount(self.logs);
					this.onRefresh = false;
					if (shownotif) notified(self.$notification).info("You have <b>" + total + "<b> unread notification");
				})
				.catch(() => {
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				})
		},
		setAsRead(log){
			if (!log.isRead) {
				let index = this.logs.findIndex(on => on.id == log.logId);
				this.logs[index].read = true;
				return true;
			}

			return false;
		},
		openNotification(logs){
			let sendAsRead = [];
			if(logs instanceof Array){
				for (let i = 0; i < logs.length; i++) {
					if(this.setAsRead(logs[i])){
						sendAsRead.push(logs[i].logId);
					}
				}
			}else{
				if (this.setAsRead(logs)) {
					sendAsRead.push(logs.logId);
				}
			}

			let self = this;
			if(sendAsRead.length > 0){
				Api.openNotification(sendAsRead)
					.then(response => {
						console.log('akuh di read, muach 💋');
						self.selectAll(false);
					})
					.catch(() => {
						console.log('err wadaaw');
					})
			}
		},
		markAsRead(){
			this.openNotification(this.selected);
		},
		onSelect(log){
			if(log.status){
				this.selected.push(log.vue);
			}else{
				let index = this.selected.findIndex(on => on == log.vue.logId);
				if(index != -1){
					this.selected.splice(index, 1);
					if(this.allSelected) this.allSelected = false;
				}
			}

			this.selected.sort((a, b) => {
				return ('' + a.logId).localeCompare(b.logId);
			});

			this.markButton = this.selected.length > 0;
		},
		selectAll(status = null){
			if(status === null){
				this.allSelected = !this.allSelected;
			}else{
				this.allSelected = status;
			}

			for (const key in this.$refs) {
				if (this.$refs.hasOwnProperty(key) && key.includes('logs-')) {
					const log = this.$refs[key];
					if(!isEmpty(log)){
						if (!log[0].selected && this.allSelected) {
							this.$refs[key][0].selected = true;
							this.onSelect({
								vue: this.$refs[key][0],
								status: true
							});
						}

						if (!this.allSelected) {
							this.$refs[key][0].selected = false;
						}
					}
				}
			}

			if(!this.allSelected){
				this.selected = [];
				this.markButton = false;
			}
		}
	},
	mounted(){
		this.fetchNotification(false);
		global.$loader.hide();
	}
});