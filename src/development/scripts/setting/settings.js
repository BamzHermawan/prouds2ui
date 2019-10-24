import Vue from 'vue';
import Buefy from 'buefy'
import { topNavBar } from "components";
import Loader from 'helper-loader';
import { crud } from 'components';
import { crudForm } from 'components';
import { crudInput } from 'components';
import { dataTableNoCard } from 'components';
import VJstree from 'vue-jstree'

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		topNavBar, crud, crudForm, crudInput, dataTableNoCard, VJstree
	},
	data: {
		userlog: {
			name: 'Ade Wiranat Putra'
		},
		props: VAPPS,
		organization: [],
		drag: false,
		menuTree: false,
		buID: "",
		buName: "",
		buCode: "",
		buHead: "",
		modal: {
			addBU: false,
			editBU: false,
			confirmChanges: false
		},
		isDragged: undefined,
		orgChanges: [],
		selectedDocument: null,
		edit: false,
		add: false,
		toggleEdit: {
			internal: false,
			external: false,
		},
		togglePassword: {
			internal: false,
			external: false
		},
		toggleTable: {
			internal: true,
			external: true
		},
		showTable: true,
		paginated: 5,
		checkboxGroup: [],
		tampung: ""
	},
	methods: {
		itemClick(node) {
			this.menuTree = true;
			this.buName = node.model.text;
			this.buID = node.model.id;
			this.buCode = node.model.BUCode;
			this.buHead = node.model.BUHead;

		},
		toggleSideBar() {
			this.menuTree = !this.menuTree;
		},
		draggable() {
			this.drag = true;
		},
		addBU() {
			this.modal.addBU = true;
		},
		editBU() {
			this.modal.editBU = true;
		},
		saveDrag(saveLink) {
			let self = this;
			this.$dialog.confirm({
				title: 'Confirm Changes',
				message: 'Are you sure you want to <b>save</b> ?',
				confirmText: 'Oke',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: () => {
					let form = document.createElement("form");
					form.setAttribute("action", saveLink);
					form.setAttribute("method", "POST");

					let input = document.createElement("input");
					input.value = JSON.stringify(self.orgChanges);
					input.setAttribute("name", "data")
					form.appendChild(input);
					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			})
		},
		closeDrag() {
			if (this.orgChanges.length > 0) {
				location.reload()
			} else {
				this.drag = !this.drag
			}
		},
		deleteBU(deleteLink) {
			this.$dialog.confirm({
				title: 'Delete BU',
				message: 'Are you sure you want to <b>delete</b> ' + this.buName + ' ?',
				confirmText: 'Oke',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: () => window.location.href = deleteLink + "id=" + this.buID
			})
		},
		dragStart(node) {
			this.isDragged = node.model
		},
		drop(node) {
			let tes = {
				parent: node.model.text,
				child: this.isDragged.text
			};
			this.orgChanges.push(tes)
			this.isDragged = undefined;
		},
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
		},
		addform() {
			if (this.add) {
				this.add = false
				this.showTable = true
			} else {
				this.add = true
				this.showTable = false
			}
		},
		editForm(val) {
			this.showTable = !this.showTable
			this.edit = !this.edit
			this.tampung = val
		},
		editUser(idd, val) {
			this.toggleTable[idd] = !this.toggleTable[idd]
			this.toggleEdit[idd] = !this.toggleEdit[idd]
			this.tampung = val
		},
		changePassword(idd, val) {
			this.toggleTable[idd] = !this.toggleTable[idd]
			this.togglePassword[idd] = !this.togglePassword[idd]
			this.tampung = val
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
		if (this.props.ORGANIZATION != undefined) {
			// 	this.organization = this.props.ORGANIZATION
			var mappedArr = {},
				arrElem,
				mappedElem;

			for (var i = 0; i < this.props.ORGANIZATION.length; i++) {
				arrElem = this.props.ORGANIZATION[i];
				mappedArr[arrElem.id] = arrElem;
				mappedArr[arrElem.id]['children'] = [];
			}

			for (var id in mappedArr) {
				if (mappedArr.hasOwnProperty(id)) {
					mappedElem = mappedArr[id];
					if (mappedElem.parent) {
						mappedArr[mappedElem['parent']]['children'].push(mappedElem);
					}
					else {
						this.organization.push(mappedElem);
					}
				}
			}
		}
		Loader.hide();
	}
});