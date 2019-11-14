import Vue from 'vue';
import Buefy from 'buefy';
import { notified, checkConnection, animate } from 'helper-tools'
import { dataTableNoCard, crudInput } from "components";
import api from 'helper-apis';
import Moment from "helper-moment";

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTableNoCard, crudInput
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		newproject: NEWPROJECT,
		newprojectOri: NEWPROJECT,
		customer: CUSTOMER,
		selectedStatus: "",
		tampung: "",
		tampungFile: [],
		showTable: true,
		showAdd: false,
		showEdit: false,
		start_date: undefined,
		customer_id: null,
		customer_name: "",
		selectedDocument: [],
		docName: [],
		fileValidation: true,
		allowedFile: "jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx",
	},
	watch: {
		selectedStatus: function (newQuery) {
			this.filterStatus(newQuery)
		},
		customer_name: function () {
			if (this.selected != undefined) {
				this.customer_id = this.selected.customer_id;
			} else {
				this.customer_id = "";
			}
		}
	},
	methods: {
		filterStatus(val) {
			if (val !== "") {
				this.newproject = this.newprojectOri;
				this.newproject = this.newproject.filter(project =>
					this.selectedStatus.includes(project.status)
				);
			} else {
				this.newproject = this.newprojectOri
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
		newRequest() {
			if (this.showTable) {
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false;
					this.showAdd = true;

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document.querySelector('#add').classList.remove('fadeIn', 'faster');
				animate('#add', 'fadeOut faster', (el) => {
					this.showTable = true;
					this.showAdd = false;

					document.querySelector('.contentPage').scrollTop = 0;
					document.querySelector('#tableProject').classList.add('fadeIn faster');
				});
			}
		},
		deleteFile(val, idx) {
			let self = this;
			let bundle = { file_id: val.file_id }
			self.$dialog.confirm({
				title: 'Delete',
				message: 'File <b>' + val.name + '</b> baseline will be deleted, you sure ?',
				confirmText: 'Delete',
				type: 'is-warning',
				onConfirm: () => {
					api.deleteFile(bundle)
						.then(response => {
							this.tampungFile.splice(idx, 1)
							notified(self.$notification)
								.success("File <b class='has-text-dark'>" + val.name + "</b> has been successfully deleted. 🏃‍");
						})
						.catch(function (error) {
							console.log("error asking for baseline");
							if (checkConnection(self.notification)) {
								notified(self.$notification).error(
									"Sorry we are encountering a problem, please try again later. 🙏"
								);
							}
						})
				}
			})
		},
		edit(val) {
			if (this.showTable) {
				this.customer_name = val.customer
				val.start_date = new Date(Moment(val.start_date, "DD/MM/YYYY"))
				val.end_date = new Date(Moment(val.end_date, "DD/MM/YYYY"))
				this.tampung = val
				this.tampungFile = val.document
				animate('#tableProject', 'fadeOut faster', (el) => {
					this.showTable = false;
					this.showEdit = true;

					el.classList.add('fadeIn');
					document.querySelector('.contentPage').scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document.querySelector('#edit').classList.remove('fadeIn', 'faster');
				animate('#edit', 'fadeOut faster', (el) => {
					this.showTable = true;
					this.showEdit = false;

					document.querySelector('.contentPage').scrollTop = 0;
					document.querySelector('#tableProject').classList.add('fadeIn faster');
					this.tampung = ""
				});
			}
		},
		deleteRequest(val, deleteLink) {
			this.$dialog.confirm({
				title: 'Delete',
				message: 'Are you sure you want to delete <b>' + val.project_name + '</b> ?',
				confirmText: 'Oke',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: () => window.location.href = deleteLink + "project_id=" + val.project_id
			})
		}
	},
	computed: {
		filterCustomer() {
			return this.customer.filter(option => {
				let checkName =
					option.customer_name
						.toString()
						.toLowerCase()
						.indexOf(this.customer_name.toLowerCase()) >= 0;

				return checkName && option.customer_id != this.customer_id;
			});
		},
		documentName() {
			if (this.selectedDocument !== []) {
				this.selectedDocument.forEach(doc => {
					let size = this.formatSizeString(doc.size);
					this.checkExtention(doc.name);
					this.docName.push(doc.name);
				});
				return this.docName;
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