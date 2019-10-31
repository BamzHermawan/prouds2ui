import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import Loader from 'helper-loader';
import { crudInput } from 'components';
import api from 'helper-apis';
import { notified } from "helper-tools";

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		topNavBar, crudInput
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		selectedDocument: null,
		allowedFile: "jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx",
		profile: true,
		password: false
	},
	methods: {
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
		toggleEditPassword() {
			this.password = true
			this.profile = false
		},
		toggleEditProfile() {
			this.profile = true
			this.password = false
		},
		uploadFoto() {
			let formData = new FormData();
			let self = this

			formData.append('file', this.selectedDocument);

			api.uploadFoto(formData)
				.then((response) => {
					notified(self.$notification)
						.success("photo uploaded successfully");
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
	},
	computed: {
		filterTaskName() {
			return this.dataBaru.filter(option => {
				return (
					option.taskName
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0
				);
			});
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
		allowedArray() {
			return this.allowedFile.split("|");
		}
	},
	mounted() {
		document.getElementById("editPassword").addEventListener("click", this.toggleEditPassword);
		document.getElementById("editProfile").addEventListener("click", this.toggleEditProfile);
		Loader.hide();

	}
});