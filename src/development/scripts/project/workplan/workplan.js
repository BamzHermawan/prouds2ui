import Vue from 'vue';
import Buefy from 'buefy'
import { dataTableNoCard, crudInput, ganttchart } from 'components';
import Loader from 'helper-loader';
import { animate } from 'helper-tools';
import EditTask from "./editTask.vue"
import AddTask from "./addTask.vue"
import Tmp from "./template.vue"
import AssignResource from "./assignResource.vue"
import StopAssignment from "./stopAssignment.vue"
import SetProgress from "./setProgress.vue"
import ChangeParentTask from "./changeParentTask.vue"
import LinkPredecessor from "./linkPredecessor.vue"
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTableNoCard,
		crudInput,
		ganttchart,
		EditTask,
		AddTask,
		Tmp,
		AssignResource,
		StopAssignment,
		SetProgress,
		ChangeParentTask,
		LinkPredecessor
	},
	data: {
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
			resource: null,
			phase: null,
		},
		toggleForm: {
			addTask: false,
			template: false,
			editTask: false,
			assignTeam: false,
			stopAssign: false,
			updateProgress: false,
			changeParent: false,
			linkPredecessor: false,
		},
		titleActive: "",
		idd: "",
		showWorkplan: true,
		dataBaru: GANTT,
		dataWorkdays: WORKDAYS,
		dataTemplate: TEMPLATE,
		selectedDocument: null,
		showSideBar: false
	},
	methods: {
		addFavorite(title, link) {
			global.$sidebar.ws.addList(title, link);
		},
		toggleSideBar() {
			let self = this;
			if (this.showSideBar) {
				let lastActive = document.querySelector("tr.gname.is-active");
				if (lastActive !== null) {
					lastActive.classList.remove("is-active");
				}

				document.querySelector('.floating-taskbar').classList.remove('fadeInRight');
				animate('.floating-taskbar', 'fadeOutRight', (el) => {
					el.classList.add('fadeInRight');
					self.showSideBar = false;
				});
			} else {
				self.showSideBar = true;
			}
		},
		actionTask(idd) {
			document.querySelector('#' + idd).classList.remove('fadeIn', 'faster');
			animate('#' + idd, 'fadeOut faster', (el) => {
				this.showWorkplan = !this.showWorkplan;
				this.toggleForm[idd] = !this.toggleForm[idd]
				this.idd = ""
				this.titleActive = ""

				document.querySelector('.contentPage').scrollTop = 0;
			});
		},

		template(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Template"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			}
		},
		addTask(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Add Task"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			}
		},
		editTask(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Edit Task"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});

			}
		},
		assignTeam(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Assign Team"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});

			}
		},
		stopAssign(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Stop Assignment"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			}
		},
		updateProgress(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Update Progress"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});

			}
		},
		changeParentTask(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Change Parent"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			}
		},
		linkPredecessor(idd) {
			if (this.showWorkplan) {
				animate('#workplan', 'fadeOut faster', (el) => {
					this.idd = idd
					this.showWorkplan = !this.showWorkplan;
					this.toggleForm[idd] = !this.toggleForm[idd]
					this.titleActive = "Set Predecessor"

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			}
		},
		deleteTask() {
			if (
				this.selectedTask.hasOwnProperty('deleteTask') == null ||
				!this.selectedTask.deleteTask
			) {
				this.$dialog.alert({
					message: 'Sorry, but you cannot delete <b>' + this.selectedTask.pName + "</b>.",
					type: 'is-info'
				});
			} else {
				this.$dialog.confirm({
					title: 'Delete task',
					message: 'Are you sure to <b>delete</b> ' + this.selectedTask.pName + ' ?',
					confirmText: 'Ok',
					type: 'is-danger',
					hasIcon: true,
					onConfirm: () => window.location.href = this.selectedTask.deleteTask
				})
			}
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
		Loader.hide();
	}
});