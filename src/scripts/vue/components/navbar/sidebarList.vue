<template>
	<div :class="'side-list ' + listAnimation">
		<div v-if="label !== undefined" class="parent-list" @click="toggleList">
			<div class="list-title">
				<label>{{ label }}</label>
				<span :class="chooseChevron"></span>
			</div>
		</div>
		<ul ref="list" v-if="isOpened" class="animated fadeIn faster">
			<slot></slot>
			<side-item
				v-for="(item, i) in addedItem"
				:key="i"
				:link="item.link"
				>{{ item.text }}</side-item
			>
		</ul>
	</div>
</template>

<script>
import SideItem from "./sidebarItem";
import Vue from "vue";
export default {
	components: { SideItem },
	props: {
		label: {
			type: String,
			required: true
		},
		name: {
			type: String,
			default: undefined
		},
		open: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isSideListComponent: true,
			isOpened: this.open,
			addedItem: []
		};
	},
	computed: {
		uniqueID() {
			if (this.name !== undefined) {
				return this.name.replace(/\W/g, "");
			} else {
				return this.label.replace(/\W/g, "").toLowerCase();
			}
		},
		chooseChevron() {
			if (
				Object.keys(this.$slots).length == 0 &&
				this.addedItem.length == 0
			) {
				return "action";
			}

			if (this.isOpened) {
				return "action mdi mdi-chevron-up";
			} else {
				return "action mdi mdi-chevron-down";
			}
		},
		listAnimation() {
			if (this.$parent.isSideListComponent) {
				return "";
			} else {
				return "animated slideInLeft faster";
			}
		}
	},
	methods: {
		hideList() {
			this.isOpened = false;
		},
		openList() {
			this.isOpened = true;
		},
		toggleList() {
			this.isOpened = !this.isOpened;
			console.log(this.$parent);
		},
		addList(text, link) {
			//! Open list first, or it will show error
			if (!this.isOpened) this.toggleList();

			//TODO: Ajax Axios send text and link to server
			// After receiving result, add item to list.
			//? Axios.post(...)

			//* Add Item with text and link to list
			this.addedItem.push({
				link: link,
				text: text
			});
		}
	},
	mounted() {
		if (!global.hasOwnProperty("sideList")) {
			global.$sidebar = {};
		}

		global.$sidebar[this.uniqueID] = {};
		global.$sidebar[this.uniqueID].hideList = this.hideList;
		global.$sidebar[this.uniqueID].openList = this.openList;
		global.$sidebar[this.uniqueID].toggleList = this.toggleList;
		global.$sidebar[this.uniqueID].addList = this.addList;
	}
};
</script>