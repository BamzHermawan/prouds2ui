import Vue from 'vue';
import Buefy from 'buefy';
import { animate } from 'helper-tools'
import { dataTableNoCard, crudInput } from "components";
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
		selectedStatus: "",
		tampung: "",
		showTable: true,
		showAdd: false,
		showEdit: false,
		start_date: undefined,
		selectedDocument: [],
		docName: [],
		fileValidation: true,
		allowedFile: "jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx",
	},
	watch: {
		selectedStatus: function (newQuery, oldQuery) {
			this.filterStatus(newQuery)
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

					document.querySelector('#tableProject').classList.add('fadeIn faster');
				});
			}
		},
		deleteFile(val) {
			this.selectedDocument.splice(val, 1)
		},
		edit(val) {
			if (this.showTable) {
				val.start_date = new Date(Moment(val.start_date, "DD/MM/YYYY"))
				val.end_date = new Date(Moment(val.end_date, "DD/MM/YYYY"))
				this.tampung = val
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
		}
	},
	computed: {
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