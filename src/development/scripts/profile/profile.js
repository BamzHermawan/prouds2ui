import Vue from 'vue';
import Buefy from 'buefy'
import Loader from 'helper-loader';
import { crudInput, easterEgg as whiteSpace } from 'components';
import api from 'helper-apis';
import { notified } from "helper-tools";

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		whiteSpace, crudInput
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		selectedDocument: null,
		allowedFile: "jpg|jpeg|png|doc|docx|pdf|xls|xlsx|ppt|pptx",
		profile: true,
		password: false,
		validation: {
			newPw: {
				msg: "",
				type: "",
				valid: false
			},
			confirmPw: {
				msg: "",
				type: "",
				valid: false
			}
		},
		currentPw: "",
		newPw: "",
		confirmPw: "",
		easterEgg: false,
	},
	watch: {
		newPw: function (newQuery) {
			if (newQuery === this.currentPw) {
				this.validation.newPw.type = "is-danger"
				this.validation.newPw.msg = "The new password cannot be the same as the previous password"
				this.validation.newPw.valid = false
			} else {
				this.validation.newPw.type = ""
				this.validation.newPw.msg = ""
				this.validation.newPw.valid = true
			}

			// kondisi merubah password ketika confirm password telah terisi untuk menyamakan new password dengan current password
			if (this.confirmPw !== "" && this.confirmPw !== newQuery) {
				this.validation.confirmPw.type = "is-danger"
				this.validation.confirmPw.msg = "The password does not match"
				this.validation.confirmPw.valid = false
			} else {
				this.validation.confirmPw.type = ""
				this.validation.confirmPw.msg = ""
				this.validation.confirmPw.valid = true
			}
		},
		confirmPw: function (newQuery) {
			if (this.newPw !== newQuery) {
				this.validation.confirmPw.type = "is-danger"
				this.validation.confirmPw.msg = "The password does not match"
				this.validation.confirmPw.valid = false
			} else {
				this.validation.confirmPw.type = ""
				this.validation.confirmPw.msg = ""
				this.validation.confirmPw.valid = true
			}
		}
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
			this.clearValidation()
		},
		toggleEditProfile() {
			this.profile = true
			this.password = false
			this.clearValidation()
		},
		clearValidation() {
			this.currentPw = ""
			this.newPw = ""
			this.confirmPw = ""
			this.typeNew = ""
			this.typeConfirm = ""
			this.msgNew = ""
			this.msgConfirm = ""
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