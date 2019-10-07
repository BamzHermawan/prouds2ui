import Vue from 'vue';
import Buefy from 'buefy';
import DataTable from "../vue/components/dataTable";
import NavBar from "../vue/components/topNavBar.vue";
import SideBar from "../vue/components/settingSidebar.vue";
import Loader from "../loader.js";

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: { DataTable, NavBar, SideBar },
	data: {
		selectedDocument: null,
		newuser: NEWUSER,
		deactiveuser: DEACTIVEUSER,
		updateuser: UPDATEUSER
	},
	methods: {
		changeProfile(value, nik) {
			let self = this;
			this.$dialog.confirm({
				title: 'Confirm Changes',
				message: 'Are you sure you want to <b>save</b> ?',
				confirmText: 'Oke',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: () => {
					let form = document.createElement("form");
					form.setAttribute("action", this.$refs.actionTable.dataset.action);
					form.setAttribute("method", "POST");

					let input = document.createElement("input");
					input.value = value;
					input.setAttribute("name", "profile_id")
					form.appendChild(input);
					let input2 = document.createElement("input");
					input2.value = nik;
					input2.setAttribute("name", "nik")
					form.appendChild(input2);
					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			})
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