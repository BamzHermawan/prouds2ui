import { loadStorage, saveStorage, isEmpty } from "./tools.js";

const mySidebar = () => {
	return document.querySelector("#side-main");
}

const getSetting = (key) => {
	let setting = loadStorage("preference");
	if (!isEmpty(setting)) {
		return setting[key];
	} else {
		return false;
	}
}

// Sidebar Objects for changing sidebar background
const sidebar = {
	themeList: [
		'is-crimson', 'is-skyblue', 'is-mossgreen', 'is-pinkrose', 'is-latte'
	],

	// Changing Sidebar Theme
	theme(type) {
		let sidebar = mySidebar();
		this.themeList.forEach(type => sidebar.classList.remove(type));

		if (this.themeList.includes(type)) {
			sidebar.classList.add(type);
		}
	},

	textColor(type) {
		let sidebar = mySidebar();
		if (type === 'has-text-light') {
			sidebar.classList.add(type);
		} else {
			sidebar.classList.remove('has-text-light');
		}
	},

	// Changing Sidebar Background
	background: {
		holder() {
			let sidebar = mySidebar();
			return sidebar.querySelector(".set-background");
		},
		shader() {
			let sidebar = mySidebar();
			return sidebar.querySelector(".set-shader");
		},
		change(imageLink) {
			let sidebar = mySidebar();
			let holder = this.holder();
			let shader = this.shader();
			
			if (holder === null) {
				holder = new Image();
				holder.classList.add(
					"set-background",
					"animated",
					"fadeIn"
				);
			}

			if (shader === null) {
				shader = document.createElement('div');
				shader.classList.add("set-shader");
			}

			holder.crossOrigin = "Anonymous";
			holder.src = imageLink;

			sidebar.appendChild(shader);
			sidebar.appendChild(holder);
			sidebar.classList.add("has-background");
		},
		remove() {
			let sidebar = mySidebar();
			let holder = this.holder();
			let shader = this.shader();

			if (!isEmpty(holder)) {
				sidebar.removeChild(shader);
			}
			
			if (!isEmpty(holder)) {
				sidebar.classList.remove("has-background");
				sidebar.removeChild(holder);
			}
		}
	},

	// Load all
	load() {
		let setting = getSetting('sidebar');
		if (setting !== false) {
			this.theme(setting.theme);
			this.textColor(setting.color);

			if (isEmpty(setting.bg)) {
				this.background.remove();
			} else {
				this.background.change(setting.bg);
			}
		}
	}
}

module.exports.loadPreference = () => {
	sidebar.load();
}

module.exports.sidebar = sidebar;