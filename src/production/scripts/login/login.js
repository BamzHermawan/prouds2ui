import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '../../../styles/main.scss';
import "../../../styles/login.scss";
import loginForm from "./form";
import { notified } from "helper-tools";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		loginForm
	},
	data: {
		iconn: true
	},
	methods: {
		checkConnection() {
			this.iconn = window.navigator.onLine;
			if(!this.iconn){
				notified(this.$toast)
					.alert().topLeft('😢 Looks like you loss your connection, please connect to stable connection. Thank you 👍');
			} else {
				notified(this.$toast)
					.info().topLeft('Looks like you are back online, nice 👍');
			}
		}
	},
	mounted() {
		this.iconn = window.navigator.onLine;
		window.addEventListener("online", this.checkConnection);
		window.addEventListener("offline", this.checkConnection);
	}
});