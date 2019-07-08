import '../styles/main.scss';
import Vue from 'vue'
import App from './vue/app.vue'
import { createRouter } from './router'

export function createApp() {
	const router = createRouter();

	const app = new Vue({
		el: '#app',
		router,
		render: h => h(App),
		components: { app }
	});

	// expose the app and the router
	return { app, router };
}

window.onload = () => createApp();