import Vue from 'vue';
import Buefy from 'buefy';
import Booking from "./../vue/pages/projects/resourceBooking.vue";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	data: {
		userBook: BOOKING
	},
	components: { Booking }
});