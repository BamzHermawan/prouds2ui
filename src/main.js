import Vue from 'vue';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import PerfectScrollbar from 'perfect-scrollbar';
import { notified } from 'helper-tools';
import { sideList as SideList, sideItem as SideItem, bookmarkButton, infoFooter } from 'components';

// SIDEBAR TOGGLE SCRIPT
var WRAPPER = document.querySelector('#main-layout');
var SIDEBAR_TOGGLE = false;
window.onload = sidebarToggleAnimation;
document.querySelector('#toggle-sidebar')
	.addEventListener("click", sidebarToggleAnimation);

// Tracking Mouse when entering sidebar area
document.onmousemove = trackMouse;

// Start Perfect Scrollbar
new PerfectScrollbar('.contentPage');
new PerfectScrollbar('#side-main');

// GLOBAL VAR FOR LOADER
global.$loader = Loader;
global.$sidebar = {};

Vue.use(Buefy);
new Vue({
	name: 'Sidebar',
	el: '#side-main',
	components: { SideList, SideItem },
	data: {
		notifCount: 0,
		userlog: {
			user_id: '1'
		}
	},
	methods: {
		checkNotification(showAlert = true) {
			let self = this;
			let bundle = { user_id: this.userlog.user_id }
			api.getNotification(bundle)
				.then((response) => {
					let notif = response.data
					let check = ""
					let a = ""
					if (notif.length > self.notifCount) {
						check = notif.length - self.notifCount
						if (check > 3) {
							check = 3
						}
						a = notif.length - check
						for (let index = a; index < notif.length; index++) {
							if (showAlert) {
								notified(self.$notification).info(notif[index].notif);
							}
						}
						self.notifCount = notif.length
					}
				})
				.catch(function (error) {
					console.log('error asking for baseline');
					if (checkConnection(self.notification)) {
						if (showAlert) {
							notified(self.$notification).error(
								"Sorry we are encountering a problem, please try again later. 🙏"
							);
						}
					}
				});
		},
		checkLoader() {
			let check = global.$loader.isOpen();
			if (check) {
				global.$loader.hide();
			}
		}
	},
	mounted() {
		let self = this;
		// get initial notification
		this.checkNotification(false);

		// check notification every 1 minute
		setInterval(() => {
			this.checkNotification();
		}, 600);

		// // get initial notification
		// this.checkNotification(false);

		// // check notification every 1 minute
		// setTimeout(() => {
		// 	// let count = self.notifCount;
		// 	this.checkNotification();
		// }, 300000);

		// check if loader still on after .3 second
		setTimeout(this.checkLoader, 3000);
	}
});

var bmPage = document.querySelector("#bookmarkPage");
if (bmPage !== null) {
	// Instance for Page Bookmark
	new Vue({
		name: 'Bookmark',
		el: '#bookmarkPage',
		components: { bookmarkButton }
	});
}

var ifooter = document.querySelector("#infoFooter");
if (ifooter !== null) {
	// Instance for Page Bookmark
	new Vue({
		name: 'infoFooter',
		el: '#infoFooter',
		components: { infoFooter }
	})
}

function sidebarToggleAnimation() {
	let btn = document.querySelector('#toggle-sidebar');
	// clean toggle nodes
	while (btn.firstChild) {
		btn.removeChild(btn.firstChild);
	}

	document.querySelector('#main-layout .sidebar').classList.remove('animated', 'slideOutLeft');

	if (SIDEBAR_TOGGLE) {
		SIDEBAR_TOGGLE = false;

		// add PROUDS Label
		let span = document.createElement("span");
		span.classList.add('animated', 'fadeIn');
		span.innerHTML = "PROUDS";
		btn.appendChild(span);

		// add chevron right
		let icon = document.createElement("span");
		icon.classList.add('animated', 'fadeIn');
		icon.classList.add('mdi', 'mdi-chevron-right', 'mdi-24px', 'in-right');
		btn.appendChild(icon);

		WRAPPER.classList.remove('open-first');
		WRAPPER.classList.add('sidebar-auto', 'sidebar-float');
	} else {
		SIDEBAR_TOGGLE = true;

		// add chevron right
		let span = document.createElement("span");
		span.classList.add('animated', 'fadeIn');
		span.classList.add('mdi', 'mdi-chevron-left', 'mdi-24px');
		btn.appendChild(span);

		if (!WRAPPER.classList.contains('open-first')) {
			WRAPPER.classList.remove('sidebar-auto', 'sidebar-float');
		}
	}
}

function trackMouse(e) {
	if (e.clientX < 35) {
		WRAPPER.classList.add('sidebar-show');
	} else {
		let sidebar = document.getElementById('side-main');
		WRAPPER.classList.remove('sidebar-show');
		if (getComputedStyle(sidebar, null).display === 'none') {
			if (typeof global.$sidebar.activeEdit === "object") {
				global.$sidebar.activeEdit.cancelEdit();
			}
		}
	}
}