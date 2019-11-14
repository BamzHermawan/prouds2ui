import Vue from 'vue';
import Buefy from 'buefy';
import { notified, checkConnection, animate } from 'helper-tools'
import { dataTableNoCard, crudInput, linker } from "components";
import api from 'helper-apis';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTableNoCard, crudInput, notified, linker
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		projectlist: PROJECTLIST,
		projectlistOri: PROJECTLIST,
		showTable: true,
		showMilestone: false,
		showCost: false,
		showEdit: false,
		form: "",
		selectedStatus: "",
		selectedDocument: null,
		fileValidation: true,
		allowedFile: "jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx",
		start: undefined,
		newCost: ""
	},
	watch: {
		selectedStatus: function (newQuery, oldQuery) {
			this.filterStatus(newQuery)
		}
	},
	methods: {
		sendInitialBaseline(val) {
			let self = this;
			let bundle = { project_id: val.project_id }
			api.sendInitialBaseline(bundle)
				.then((response) => {
					notified(self.$notification)
						.success("Project <b class='has-text-dark'>" + val.iwo + "</b> baseline has been successfully initiated. 🏃‍");
				})
				.catch(function (error) {
					console.log('error asking for baseline');
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				});
		},
		setInitialBaseline(val) {
			let self = this;
			let bundle = { project_id: val.project_id }
			api.setInitialBaseline(bundle)
				.then((response) => {
					let message = response.data;
					if (message != "") {
						self.$dialog.alert({
							message: message,
							type: 'is-warning'
						});
					} else {
						self.$dialog.confirm({
							title: 'Initial Baseline',
							message: 'Project <b>' + val.project_name + '</b> baseline will be initiated, you sure ?',
							confirmText: 'Start Initial Baseline',
							type: 'is-warning',
							onConfirm: () => {
								self.sendInitialBaseline(val)
							}
						})
					}

				})
				.catch(function (error) {
					console.log('error asking for baseline');
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				});
		},
		setMileStone(val) {
			if (this.showTable) {
				this.form = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false;
					this.showMilestone = true;

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document.querySelector('#setMilestoneForm').classList.remove('fadeIn', 'faster');
				animate('#setMilestoneForm', 'fadeOut faster', (el) => {
					this.showTable = true;
					this.showMilestone = false;

					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.form = ""
				});
			}
		},
		setCost(val) {
			if (this.showTable) {
				this.form = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false
					this.showCost = true

					el.classList.add('fadeIn');
				});
			} else {
				document.querySelector('#setCost').classList.remove('fadeIn', 'faster');
				animate('#setCost', 'fadeOut faster', (el) => {
					this.showTable = true
					this.showCost = false

					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.form = ""
				});
			}
		},
		editProject(val) {
			if (this.showTable) {
				if (val.classification === "") {
					val.classification = null
				}
				if (val.project_segment === "") {
					val.project_segment = null
				}
				if (val.project_type.id === "") {
					val.project_type.id = null
				}
				this.form = val
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false;
					this.showEdit = true;

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document.querySelector('#editProjectForm').classList.remove('fadeIn', 'faster');
				animate('#editProjectForm', 'fadeOut faster', (el) => {
					this.showTable = true;
					this.showEdit = false;

					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.form = ""
				});
			}
		},
		filterStatus(val) {
			if (val !== "") {
				this.projectlist = this.projectlistOri;
				this.projectlist = this.projectlist.filter(project =>
					this.selectedStatus.includes(project.status)
				);
			} else {
				this.projectlist = this.projectlistOri
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
		actualCostUnformat(val) {
			let medown = val.replace(/\D/g, "");
			this.newCost = medown;
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
		allowedArray() {
			return this.allowedFile.split("|");
		}
	},
	mounted() {
		global.$loader.hide();
	}
});