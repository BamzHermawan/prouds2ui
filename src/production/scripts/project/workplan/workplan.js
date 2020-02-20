import Vue from 'vue';
import Buefy from 'buefy'
import { Paging, PagingPage, ganttchart, crudInput } from 'components';
import Loader from 'helper-loader';
import { animate, parseURLRoute, isEmpty } from 'helper-tools';
import EditTask from "./editTask.vue"
import AddTask from "./addTask.vue"
import AssignResource from "./assignResource.vue"
import ShowAssignment from "./showAssignment.vue"
import SetProgress from "./setProgress.vue"
import ChangeParentTask from "./changeParentTask.vue"
import LinkPredecessor from "./linkPredecessor.vue"
import approveBtn from "./approveWorkplan.vue"
import 'helper-filter';

const implantTag = document.querySelector('#implantedJSON');
const implantData = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		Paging,
		PagingPage,
		ganttchart,
		crudInput,
		EditTask,
		AddTask,
		AssignResource,
		ShowAssignment,
		SetProgress,
		ChangeParentTask,
		LinkPredecessor,
		approveBtn
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
			wbsNo: null,
			integration: null
		},
		tampungSelectedTask: {},
		toggleForm: {
			addTask: false,
			template: false,
			editTask: false,
			assignTeam: false,
			showAssign: false,
			updateProgress: false,
			changeParent: false,
			linkPredecessor: false,
		},
		titleActive: "",
		idd: "",
		showWorkplan: true,
		dataBaru: [],
		dataRole: [],
		dataWorkdays: [],
		selectedDocument: null,
		showSideBar: false
	},
	methods: {
		isEmpty: isEmpty,
		getPageTitle(id) {
			return id;
		},
		changePage(pageId = null) {
			this.$refs.paging.showPage(pageId);
		},
		selectTask(task) {
			this.selectedTask = task;
			this.showSideBar = true;
		},
		toggleSideBar(action = null) {
			let self = this;
			if (action !== null) {
				this.showSideBar = action;
				return action;
			}

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
		closeTask(idd) {
			console.log(idd);
			document.querySelector('#' + idd).classList.remove('fadeIn', 'faster');
			animate('#' + idd, 'fadeOut faster', (el) => {
				this.showWorkplan = !this.showWorkplan;
				this.toggleForm[idd] = !this.toggleForm[idd]
				this.idd = ""
				this.titleActive = ""

				document.querySelector('.contentPage').scrollTop = 0;
			});
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
					message: 'Are you sure to delete <b>' + this.selectedTask.pName + '</b> ?',
					confirmText: 'Delete',
					type: 'is-danger',
					onConfirm: () => window.location.href = this.selectedTask.deleteTask,
					onCancel: () => this.toggleSideBar(false)
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
		},
		hasnotCalcMethID(id) {
			return this.selectedTask.calcMethod.id != id;
		}
	},
	computed: {
		parentisEmpty() {
			return this.selectedTask.pParent == 0;
		},
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
		this.dataBaru = implantData.GANTT;
		this.dataRole = implantData.ROLE;
		this.dataWorkdays = implantData.WORKDAYS;

		let routes = parseURLRoute();
		if (routes !== false) {
			if (routes.args.length > 0) {
				let selected = this.dataBaru.find((row) => row.pID == routes.args[0])
				if (selected != undefined) {
					this.selectedTask = selected
					switch (routes.route) {
						case 'showAssign':
							this.showAssign('showAssign');
							break;
					}
				}

			}
		}
		Loader.hide();
	}
});