import { loadStorage, saveStorage, isEmpty } from "./tools.js";

const mySidebar = () => {
	return document.querySelector("#side-main");
}

module.exports.background = {
	holder(){
		let sidebar = mySidebar();
		return sidebar.querySelector(".set-background");
	},
	change(imageLink){
		let sidebar = mySidebar();
		let holder = this.holder();
		if (holder === null) {
			holder = new Image();
			holder.classList.add(
				"set-background",
				"animated",
				"fadeIn"
			);
		}

		holder.crossOrigin = "Anonymous";
		holder.src = imageLink;

		sidebar.appendChild(holder);
		sidebar.classList.add("has-background");
	},
	remove(){
		let sidebar = mySidebar();
		let holder = this.holder();
		if (holder !== null || holder !== undefined) {
			sidebar.classList.remove("has-background");
			sidebar.removeChild(holder);
		}
	},
	load(){
		let setting = loadStorage("preference");
		if(setting !== null){
			if(isEmpty(setting.sidebar.bg)){
				this.remove();
			}else{
				this.change(setting.sidebar.bg);
			}
		}
	}
}