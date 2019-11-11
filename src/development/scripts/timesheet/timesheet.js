import Vue from 'vue';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import Moment from 'helper-moment';
import { crudInput, progressBar } from 'components';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { crudInput, progressBar },
	data: {
		minDate: new Date(),
		maxDate: new Date(),
		today: "",
		myTimesheet: MYTIMESHEET.sort((a, b) => new Date(a.start) - new Date(b.start)),
		tmp: [],
		task: MYTIMESHEET,
		showList: true,
		showForm: false,
		dataForm: [],
		selectedDocument: null,
		fileValidation: true,
		allowedFile: "jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx"
	},
	methods: {
		getMonday() {
			let d = new Date();
			var day = d.getDay(),
				diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
			this.today = new Date(d.setDate(diff));
			this.minDate = new Date(
				this.today.getFullYear(),
				this.today.getMonth(),
				this.today.getDate() - 7
			)
			this.maxDate = new Date(
				this.today.getFullYear(),
				this.today.getMonth(),
				this.today.getDate() + 6
			)
		},
		sortDate() {

			for (let index = 0; index < this.myTimesheet.length; index++) {

				let a = this.myTimesheet[index].start

				if (this.tmp.indexOf(a) < 0) {
					this.tmp.push(a)
				}
			}
		},
		setTimesheet(val) {
			this.showList = !this.showList
			this.showForm = !this.showForm
			this.dataForm = val

			document.querySelector('.contentPage').scrollTop = 0;
			global.psContent.update();
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
		filterTask(){
			this.task = this.task.sort((a, b) => {
				let aMom = Moment(a.start, "DD/MM/YYYY");
				let bMom = Moment(b.start, "DD/MM/YYYY");

				if (aMom.isBefore(bMom)) {
					console.log(aMom);
					console.log(bMom);
					console.log();
					return -1;
				}
				
				if (bMom.isBefore(aMom)) {
					console.log(bMom);
					console.log(aMom);
					console.log();
					return 1;
				}
				
				return 0;
			});

			this.groupTask();
		},
		groupTask(){
			let today = this.task.filter((task) => {
				let start = Moment(task.start, "DD/MM/YYYY");
				let end = Moment(task.end, "DD/MM/YYYY");

				return Moment().isBetween(start, end);
			});

			console.log(today);
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
		this.sortDate()
		this.getMonday()
		this.filterTask();
		Loader.hide();
	}
});