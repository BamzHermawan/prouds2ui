import Vue from 'vue';
import Buefy from 'buefy';
import 'helper-filter';
import formEdit from './formEdit.vue';
import {
	dataTableNoCard,
	linker, PagingPage, Paging
} from "components";

const implantTag = document.querySelector('#implantedJSON');
const implant = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		dataTableNoCard, formEdit, linker, Paging, PagingPage
	},
	data: {
		projects: implant,
		status: "",
		project: {
			project_id: "",
			iwo: "",
			project_name: "",
			amount: 0,
			customer: "",
			project_type: {
				id: "",
				label: ""
			},
			project_manager: "",
			co_project_manager: "",
			status: "",
			start: undefined,
			end: undefined,
			contract_length: 0,
			unit_delivery: "",
			classification: "",
			cost: 0,
			project_segment: "",
			synergy_channel: ""
		},
	},
	computed: {
		project_list() {
			if (this.status === "") {
				return this.projects;
			}

			return this.projects.filter(project =>
				this.status === project.status
			);
		}
	},
	methods: {
		openTable() {
			this.project = {
				project_id: "",
				iwo: "",
				project_name: "",
				amount: 0,
				customer: "",
				project_type: {
					id: "",
					label: ""
				},
				project_manager: "",
				co_project_manager: "",
				status: "",
				start: undefined,
				end: undefined,
				contract_length: 0,
				unit_delivery: "",
				classification: "",
				cost: 0,
				project_segment: "",
				synergy_channel: ""
			};
			this.$refs.paging.showPage();
		},
		editProject(val) {
			if (val.classification === "") {
				val.classification = null
			}
			if (val.project_segment === "") {
				val.project_segment = null
			}
			if (val.project_type.id === "") {
				val.project_type.id = null
			}
			this.project = val
			this.$refs.paging.showPage("edit");
		},
		sync(val, link) {
			this.$dialog.confirm({
				title: 'Confirmation',
				message: 'Are you sure to sync <b>' + val.project_name + '</b> ?',
				confirmText: 'OK',
				type: 'is-success',
				onConfirm: value => {
					let project_id = val.project_id
					let iwo = val.iwo

					let form = document.createElement("form");
					form.setAttribute("action", link);
					form.setAttribute("method", "POST");

					let input = document.createElement("input");
					input.value = project_id;
					input.setAttribute("name", "project_id")
					form.appendChild(input);

					let input2 = document.createElement("input");
					input2.value = iwo;
					input2.setAttribute("name", "iwo")
					form.appendChild(input2);

					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			})
		}
	},
	mounted() {
		global.$loader.hide();
	}
});