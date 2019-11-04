import Vue from 'vue';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import PerfectScrollbar from 'perfect-scrollbar';
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
	},
	computed: {
		notifClass() {
			let style = "parent-list";
			let el = document.querySelector('#sidenotif');
			let href = el.getAttribute('href');

			let currentPage = window.location.href.toLowerCase();
			let link = href !== undefined ? href.toLowerCase() : "";
			if (this.active) {
				style += " is-active";
			} else if (link === currentPage) {
				style += " is-active";
			}

			return style;
		}
	},
	methods: {
		checkNotification() {
			console.log("ade")
			//TODO: Ade
			// axios request ke server dapet list notifikasi,
			// di cek jumlahnya masih sama kaya this.notifCount atau enggak
			// kalau nambah tampilin notified Toast.

			// jika notifikasi ada yang baru notifcount di sesuaikan jumlahnya 
			// dan tampilkan notifikasinya. [loop]
			notified(this.$notification).info().bottomRight('Notification Text');
			this.notifCount++;
		}
	},
	mounted() {

		// get initial notification
		this.checkNotification();

		// check notification every 1 minute
		setInterval(() => {
			this.checkNotification();
		}, 60000);
	}
});

// Instance for Page Bookmark
new Vue({
	name: 'Bookmark',
	el: '#bookmarkPage',
	components: { bookmarkButton }
});

// Instance for Page Bookmark
new Vue({
	name: 'infoFooter',
	el: '#infoFooter',
	components: { infoFooter }
})

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