import Vue from 'vue';
import Buefy from 'buefy';
import NavBar from "../vue/components/topNavBar.vue";
import SideBar from "../vue/components/settingSidebar.vue";
import Crud from "../vue/components/crud/crud.vue";
import CrudForm from "../vue/components/crud/crudForm.vue";
import CrudInput from "../vue/components/crud/crudInput.vue";
import AddBu from "./../vue/pages/settingOrganization/addBU.vue";
import EditBu from "./../vue/pages/settingOrganization/editBU.vue";
import Loader from "../loader.js";
import VJstree from 'vue-jstree'

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		NavBar,
		SideBar,
		Crud,
		CrudForm,
		CrudInput,
		VJstree,
		AddBu,
		EditBu,
		Loader
	},
	data: {
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
		orgChanges: []
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
		}
	},
	mounted() {
		if (this.props.ORGANIZATION != undefined) {
			this.organization = this.props.ORGANIZATION
		}
		Loader();
	}
});