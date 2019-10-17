import Vue from 'vue';
import Buefy from 'buefy';
import Loader from "../loader.js";
import NavBar from "../vue/components/topNavBar.vue";
import EditTask from "./../vue/pages/projects/workplan/editTask.vue";
import SetProgress from "./../vue/pages/projects/workplan/setProgress.vue";
import ChangeParentTask from "./../vue/pages/projects/workplan/changeParentTask.vue";
import LinkPredecessor from "./../vue/pages/projects/workplan/linkPredecessor.vue";
import AssignResource from "./../vue/pages/projects/workplan/assignResource.vue";
import MergeTask from "./../vue/pages/projects/workplan/mergeTask.vue";
import vGantt from "../vue/components/ganttchart.vue";

import "../filters";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar,
		EditTask,
		vGantt,
		SetProgress,
		ChangeParentTask,
		LinkPredecessor,
		MergeTask,
		AssignResource
	},
	data: {
		modal: {
			editTask: false,
			setProgress: false,
			changeParentTask: false,
			linkPredecessor: false,
			mergeTask: false,
			assignResource: false
		},
		selectedTask: {
			pID: null,
			pName: null,
			pStart: null,
			pEnd: null,
			pComp: null,
			pGroup: null,
			pParent: null,
			work: null,
			workTotal: null,
			estProgress: null,
			unlinkPredecessor: null,
			deleteTask: null,
			resource: null
		},
		dataBaru: GANTT,
		selectedDocument: null,
		showSideBar: false
	},
	methods: {
		toggleSideBar() {
			if (this.showSideBar) {
				let lastActive = document.querySelector("tr.gname.is-active");
				if (lastActive !== null) {
					lastActive.classList.remove("is-active");
				}
			}

			this.showSideBar = !this.showSideBar;
		},
		editTask() {
			this.modal.editTask = true;
		},
		setProgress() {
			this.modal.setProgress = true;
		},
		changeParentTask() {
			if (
				!this.selectedTask.hasOwnProperty('changeableParent') ||
				!this.selectedTask.changeableParent
			) {
				this.$dialog.alert({
					message: 'Sorry, but you cannot Change the parent of <b>' + this.selectedTask.pName + "</b>.",
					type: 'is-warning'
				});
			} else {
				this.modal.changeParentTask = true;
			}
		},
		linkPredecessor() {
			this.modal.linkPredecessor = true;
		},
		unlinkPredecessor() {
			if (
				this.selectedTask.hasOwnProperty('unlinkPredecessor') == null ||
				!this.selectedTask.unlinkPredecessor
			) {
				this.$dialog.alert({
					message: "Sorry, <b>(" + this.selectedTask.pName + ")</b> doesn\'t have predecessor.",
					type: 'is-warning'
				});
			} else {
				this.$dialog.confirm({
					title: 'Unlink Predecessor',
					message: 'Are you sure you want to remove predecessor from link <b>' + this.selectedTask.pName + '</b> ?',
					confirmText: 'Oke',
					type: 'is-danger',
					hasIcon: true,
					onConfirm: () => window.location.href = this.selectedTask.unlinkPredecessor
				})
			}
		},
		shrinkTask() {
			if (
				this.selectedTask.hasOwnProperty('shrinkTask') == null ||
				!this.selectedTask.shrinkTask
			) {
				this.$dialog.alert({
					message: 'Sorry, but you cannot shrink <b>' + this.selectedTask.pName + "</b>.",
					type: 'is-warning'
				});
			} else {
				this.$dialog.confirm({
					title: 'Shrink Task',
					message: 'Are you sure you want to Shrink this task from link <b>' + this.selectedTask.pName + '</b> ?',
					confirmText: 'Oke',
					type: 'is-danger',
					hasIcon: true,
					onConfirm: () => window.location.href = this.selectedTask.unlinkShrink
				})
			}
		},
		deleteTask() {
			if (
				this.selectedTask.hasOwnProperty('deleteTask') == null ||
				!this.selectedTask.deleteTask
			) {
				this.$dialog.alert({
					message: 'Sorry, but you cannot delete <b>' + this.selectedTask.pName + "</b>.",
					type: 'is-warning'
				});
			} else {
				this.$dialog.confirm({
					title: 'Delete task',
					message: 'Are you sure you want to <b>delete</b> ' + this.selectedTask.pName + ' ?',
					confirmText: 'Oke',
					type: 'is-danger',
					hasIcon: true,
					onConfirm: () => window.location.href = this.selectedTask.deleteTask
				})
			}
		},
		mergeTask() {
			this.modal.mergeTask = true;
		},
		assignResource() {
			this.modal.assignResource = true;
		},
		checkExtention(filename) {
			let sliced = filename.split(".");
			let lastEnd = sliced.pop();
			this.fileValidation = this.allowedArray.includes(
				lastEnd.toLowerCase()
			);
		},
		formatSizeString(size) {
			let counter = 0;
			while (size > 1000) {
				size = size / 1000;
				counter++;
			}

			if (counter == 0) {
				size = size.toFixed(0) + " Byte";
			} else if (counter == 1) {
				size = size.toFixed(1) + " KB";
			} else if (counter == 2) {
				size = size.toFixed(1) + " MB";
			} else if (counter == 3) {
				size = size.toFixed(1) + " GB";
			} else {
				size = size.toFixed(2);
			}

			return size;
		}
	},
	computed: {
		documentName() {
			if (this.selectedDocument !== null) {
				let size = this.formatSizeString(this.selectedDocument.size);
				this.checkExtention(this.selectedDocument.name);
				return this.selectedDocument.name + " [ " + size + " ] ";
			}

			return "No Document Selected";
		},
		determineFieldStatus() {
			if (!this.fileValidation) {
				return "is-danger";
			}

			if (this.selectedDocument === null) {
				return "";
			}

			return "is-success";
		},
		disableSubmit() {
			if (!this.fileValidation || this.selectedDocument === null) {
				return true;
			}

			return false;
		},
		allowedArray() {
			return this.allowedFile.split("|");
		}
	},
	mounted() {
		Loader();
	}
});
