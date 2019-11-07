<template>
	<a @click="navigate">
		<slot>{{ title }}</slot>
	</a>
</template>

<script>
import { loadStorage, saveStorage } from "helper-tools";
export default {
	props: {
		href: {
			type: String,
			required: true
		},
		savePageTitle: {
			type: String,
			default: undefined
		},
		startFresh: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			nextLink: this.href,
			title: "unknown page",
			previous: [],
			current: {
				title: this.savePageTitle,
				link: window.location.href
			}
		};
	},
	watch: {
		href(changed) {
			this.nextLink = changed;
		}
	},
	methods: {
		searchTitle() {
			// last choice
			let documentTitle = document.querySelector("title").innerHTML;
			documentTitle = documentTitle.split(" | ").shift();

			// second choice
			let contentTitle = document.querySelector("#contentApp");
			if (contentTitle !== null) {
				contentTitle = contentTitle.dataset.title;
			} else {
				contentTitle = undefined;
			}

			if (this.current.title === undefined) {
				if (contentTitle === undefined) {
					this.current.title = documentTitle;
				} else {
					this.current.title = contentTitle;
				}
			} else {
				this.current.title = this.savePageTitle;
			}
		},
		checkSideItem(title) {
			let sideitem = document.getElementsByClassName("side-item");
			for (let i = 0; i < sideitem.length; i++) {
				let item = sideitem[i];
				let link = item.querySelector(".media-content > a");

				if (
					link.innerHTML == title &&
					!item.classList.contains("is-active")
				) {
					item.classList.add("is-active");
				}
			}
		},
		loadNavigation() {
			let index = undefined;

			if (this.href.charAt(0) !== "@") {
				let title = this.$slots.default[0].text;
				this.title = title !== undefined ? title : "unknown page";

				this.nextLink = this.href;
			} else {
				if (this.href === "@back") {
					index = 0;
				} else if (this.href === "@previous") {
					index = 1;
				} else if (this.href === "@last") {
					index = 2;
				} else if (this.href === "@refresh") {
					this.nextLink = false;
					return 0;
				}
			}

			let nav = loadStorage("pageNavigation");
			if (nav !== null) {
				this.previous = nav;
				if (index !== undefined) {
					if (nav[index] !== undefined) {
						this.title = nav[index].title;
						this.nextLink = nav[index].href;

						if (index === 0) {
							this.checkSideItem(this.title);
						}
					} else {
						this.nextLink = false;
						this.title = "refresh";
					}
				}
			} else {
				this.nextLink = false;
				this.title = "refresh";
			}
		},
		navigate() {
			// save navigation to localstorage
			this.saveNavigation();

			if (this.nextLink !== false) {
				// navigate to destination page
				window.location.href = this.nextLink;
			} else {
				window.location.reload();
			}
		},
		saveNavigation() {
			// Check previous link
			// if there is more than 3 history navigation
			if (this.previous.length >= 3) {
				this.previous = this.previous.slice(0, 2);
			}

			if (this.startFresh) {
				this.previous = [];
			}

			// Add current page to first index
			this.previous.unshift({
				title: this.current.title,
				href: this.current.link
			});

			console.log(this.previous);

			// save navigation to localstorage
			saveStorage("pageNavigation", this.previous);
		}
	},
	mounted() {
		// Load navigation and title when mounted
		this.loadNavigation();
		this.searchTitle();
	}
};
</script>