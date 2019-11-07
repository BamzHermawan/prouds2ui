import Vue from 'vue';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import PerfectScrollbar from 'perfect-scrollbar';
import { notified, checkConnection } from 'helper-tools';
import api from 'helper-apis'
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
global.psContent = new PerfectScrollbar('.contentPage');
global.psSide = new PerfectScrollbar('#side-main');

// GLOBAL VAR FOR LOADER
global.$loader = Loader;
global.$sidebar = {};

Vue.use(Buefy);
const VueSidebar = new Vue({
	name: 'Sidebar',
	el: '#side-main',
	components: { SideList, SideItem },
	data: {
		notifTotal: 0,
		userlog: {
			user_id: '1'
		}
	},
	computed: {
		notifCount() {
			return this.notifTotal + 1
		}
	},
	methods: {
		checkNotification(showAlert = true) {
			let self = this;
			let bundle = { user_id: this.userlog.user_id }
			api.getNotification(bundle)
				.then((response) => {
					let notif = response.data
					if (notif.length > self.notifTotal) {
						self.notifTotal = notif.length
						if (showAlert) {
							notified(self.$notification).info("You have <b>" + self.notifCount + "<b> new notification");
						}
					}
				})
				.catch(function (error) {
					console.log('error asking for notification');
					if (checkConnection(self.notification)) {
						if (showAlert) {
							if (showAlert) {
								notified(self.$notification).error(
									"Sorry we are encountering a problem, please try again later. 🙏"
								);
							}
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
			// let count = self.notifTotal;
			self.checkNotification();
		}, 300000);

		// check if loader still on after .3 second
		setTimeout(this.checkLoader, 3000);
	}
});

const bmPage = document.querySelector("#bookmarkPage");
if (bmPage !== null) {
	// Instance for Page Bookmark
	new Vue({
		name: 'Bookmark',
		el: '#bookmarkPage',
		components: { bookmarkButton }
	});
}

const ifooter = document.querySelector("#infoFooter");
if (ifooter !== null) {
	// Instance for Page Bookmark
	new Vue({
		name: 'infoFooter',
		el: '#infoFooter',
		components: { infoFooter }
	})
}

const notifiedEl = document.querySelector("notified");
if(notifiedEl !== null){
	let message = 'Hello, welcome to PROUDS!';
	let type = 'is-info';

	if(notifiedEl.hasAttribute('message')) message = notifiedEl.getAttribute('message');
	if (notifiedEl.hasAttribute('type')) type = notifiedEl.getAttribute('type');

	VueSidebar.$notification.open({
		duration: 5000,
		message: message,
		position: 'is-top-right',
		type: type
	});
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
		span.classList.add('mdi', 'mdi-dots-vertical', 'mdi-24px');
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