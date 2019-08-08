import Vue from 'vue';
import Buefy from 'buefy';
import Tools from "./../tools.js";
import Booking from "./../vue/pages/projects/resourceBooking.vue";
import Detail from "./../vue/pages/projects/bookingDetail.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { 
		Booking, Detail 
	},
	data: {
		userBook: BOOKING,
		showDetail: false,
		batchDetail: {}
	},
	methods: {
		toggleDetail(){
			let self = this;

			if (self.showDetail){
				Tools.animate("#detail-menu", "fadeOut faster", function(){
					self.showDetail = false;
					Tools.animate("#booking-menu", "fadeIn faster");
				});
			}else{
				Tools.animate("#booking-menu", "fadeOut faster", function(){
					self.showDetail = true;
					Tools.animate("#detail-menu", "fadeIn faster");
				});
			}
		},
		shutDetail(){
			let self = this;
			Tools.animate("#detail-menu", "fadeOut faster", function () {
				self.showDetail = false;
				Tools.animate("#booking-menu", "fadeIn faster");
			});
		},
		openDetail(batch){
			let self = this;
			self.batchDetail = batch;
			this.$refs.detil.doReload(batch);
			Tools.animate("#booking-menu", "fadeOut faster", function () {
				self.showDetail = true;
				Tools.animate("#detail-menu", "fadeIn faster");
			});
		}
	},
});