import Vue from 'vue';
import Buefy from 'buefy';
import { sortDate } from 'helper-tools';
import formProject from './forms.vue';

import {
	dataTableNoCard,
	PagingPage,
	Paging,
	linker
} from "components";

const implantTag = document.querySelector('#implantedJSON');
const implant = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTableNoCard,
		formProject,
		PagingPage,
		Paging,
		linker
	},
	data: {
		_projects: undefined,
		_customers: undefined,
		project: undefined,
		status: ""
	},
	methods: {
		sortDate: sortDate,
		newRequest() {
			this.$refs.paging.showPage("addForm");
		},
		edit(project) {
			// this.customer_name = val.customer.label
			// this.customer_id = val.customer.id
			// val.start_date = new Date(Moment(val.start_date, "DD/MM/YYYY"))
			// val.end_date = new Date(Moment(val.end_date, "DD/MM/YYYY"))
			// this.tampung = val
			// this.tampungFile = val.document

			this.project = {
				name: project.project_name,
				description: project.desc,
				background: project.background,
				type: project.project_type.id,
				start_date: project.start_date,
				end_date: project.end_date,
				document: project.document,
				customer: {
					id: project.customer.id,
					name: project.customer.label
				}
			};
			// this.customer.id = project.customer.id;
			// this.customer.name = project.customer.label;
			this.$refs.paging.showPage("editForm");
		},
		setIWO(val, link) {
			this.$dialog.prompt({
				message: `Set IWO Number`,
				confirmText: "Save",
				type: "is-success",
				inputAttrs: {
					placeholder: "Fill IWO number"
				},
				trapFocus: true,
				onConfirm: value => {
					let project_id = val.project_id

					let form = document.createElement("form");
					form.setAttribute("action", link);
					form.setAttribute("method", "POST");

					let input = document.createElement("input");
					input.value = project_id;
					input.setAttribute("name", "project_id")
					form.appendChild(input);

					let input2 = document.createElement("input");
					input2.value = value;
					input2.setAttribute("name", "iwo")
					form.appendChild(input2);

					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			});
		},
		approve(val, link) {
			this.$dialog.confirm({
				title: 'Confirmation',
				message: 'Are you sure to approve <b>' + val.project_name + '</b> ?',
				confirmText: 'Ok',
				type: 'is-success',
				onConfirm: value => {
					let project_id = val.project_id

					let form = document.createElement("form");
					form.setAttribute("action", link);
					form.setAttribute("method", "POST");

					let input = document.createElement("input");
					input.value = project_id;
					input.setAttribute("name", "project_id")
					form.appendChild(input);

					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			})
		},
		deleteRequest(val, deleteLink) {
			this.$dialog.confirm({
				title: 'Delete',
				message: 'Are you sure to delete <b>' + val.project_name + '</b> ?',
				confirmText: 'Ok',
				type: 'is-danger',
				hasIcon: true,
				onConfirm: () => window.location.href = deleteLink + "project_id=" + val.project_id
			})
		}
	},
	computed: {
		projects() {
			if (typeof this._projects !== "array") {
				this._projects = implant.projects
			}

			if (this.status !== "" && this._projects instanceof Array) {
				return this._projects.filter(project =>
					this.status.toLowerCase() === project.status.toLowerCase()
				);
			} else {
				return this._projects;
			}
		},
		customers() {
			if (this._customers === undefined) {
				this._customers = implant.customers;
			}

			return this._customers;
		}
	},
	mounted() {
		global.$loader.hide();
	}
});