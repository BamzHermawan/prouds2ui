import Vue from 'vue';
import Buefy from 'buefy';
import Loader from '../scripts/loader.js';
import {notified} from '../scripts/tools.js';
import SideList from '../scripts/vue/components/navbar/sidebarList.vue';
import SideItem from '../scripts/vue/components/navbar/sidebarItem.vue';

// SIDEBAR TOGGLE SCRIPT
var WRAPPER = document.querySelector('#main-layout');
var SIDEBAR_TOGGLE = false;
window.onload = sidebarToggleAnimation;
document.querySelector('#toggle-sidebar')
.addEventListener("click", sidebarToggleAnimation);

// Tracking Mouse when entering sidebar area
document.onmousemove = trackMouse;

// GLOBAL VAR FOR LOADER
global.$loader = Loader;
global.$sidebar = {};

Vue.use(Buefy);
new Vue({
	el: '#side-main',
	components: { SideList, SideItem },
	mounted(){
		let sideItem = document.querySelector('.side-item');
		for (let i = 0; i < sideItem.length; i++) {
			const item = sideItem[i];
			console.log(item);
			item.addEventListener("click", function () {
				console.log(item.querySelector('a[href]'));
			});
		}
	},
	methods: {
		callNotif(){
			notified(this.$notification).success("Hai ini hasil testing action!");
		}
	}
});

function sidebarToggleAnimation(){
	let btn = document.querySelector('#toggle-sidebar');
	// clean toggle nodes
	while (btn.firstChild) {
		btn.removeChild(btn.firstChild);
	}

	document.querySelector('#main-layout .sidebar').classList.remove('animated', 'slideOutLeft');

	if(SIDEBAR_TOGGLE){
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
	}else{
		SIDEBAR_TOGGLE = true;

		// add chevron right
		let span = document.createElement("span");
		span.classList.add('animated', 'fadeIn');
		span.classList.add('mdi', 'mdi-chevron-left', 'mdi-24px');
		btn.appendChild(span);

		if (!WRAPPER.classList.contains('open-first')){
			WRAPPER.classList.remove('sidebar-auto', 'sidebar-float');
		}
	}
}

function trackMouse(e){
	if(e.clientX < 35){
		WRAPPER.classList.add('sidebar-show');
	} else{
		let sidebar = document.getElementById('side-main');
		WRAPPER.classList.remove('sidebar-show');
		if (getComputedStyle(sidebar, null).display === 'none'){
			if (typeof global.$sidebar.activeEdit === "object") {
				global.$sidebar.activeEdit.cancelEdit();
			}
		}
	}
}

function addFav(){
	
}