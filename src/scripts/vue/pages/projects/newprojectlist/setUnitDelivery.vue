<template>
	<section class="info">
		<div class="container" style="min-height: 100vh;">
			<div class="level">
				<div class="level-left">
					<nav
						class="breadcrumb has-succeeds-separator"
						aria-label="breadcrumbs"
					>
						<ul>
							<li>
								<a
									href="http://localhost:5500/project/listnewproject.html"
									>List New Project</a
								>
							</li>
							<li class="is-active">
								<a href="#" aria-current="page"
									>Set Unit Delivery</a
								>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<p>
				<span style="margin-right:97px">Project ID </span>:
				{{ selectedProject.project_id }}
				<span style="margin-left:400px; margin-right:20px"
					>IWO No.</span
				>
				{{ selectedProject.iwo_no }}
			</p>
			<p>
				<span style="margin-right:73px">Project Name </span>:
				{{ selectedProject.project_name }}
			</p>
			<p>
				<span style="margin-right:73px">Project Name </span>:
				{{ selectedProject.project_name }}
			</p>
			<p>
				<span style="margin-right:55px">Project Manager </span>:
				{{ selectedProject.project_manager }}
			</p>
			<p>
				<span style="margin-right:30px">Co- Project Manager </span>:
				{{ selectedProject.co_project_manager }}
			</p>
			<p>
				<span style="margin-right:81px">Project Adm </span>:
				{{ selectedProject.project_adm }}
			</p>
			<p>
				<span style="margin-right:80px">Unit Delivery </span>:
				{{ selectedProject.unit_delivery }}
			</p>
			<br />
			<data-table :data="unitDelivery" :fields="[]" ref="widget">
				<template slot-scope="props">
					<b-table-column field="bu" label="Business Unit" sortable>
						<span>{{ props.row.business_unit }}</span>
					</b-table-column>
					<b-table-column
						field="directorate"
						label="Directorate"
						sortable
					>
						<span>{{ props.row.directorate }}</span>
					</b-table-column>
					<b-table-column
						field="superior"
						label="Vice President / Director"
						sortable
					>
						<span>{{ props.row.supervisor }}</span>
					</b-table-column>
					<b-table-column field="action" label="Action" sortable>
						<a
							@click="send(props.row)"
							style="cursor: pointer !important;"
							>👈</a
						>
					</b-table-column>
				</template>
			</data-table>
		</div>
	</section>
</template>

<script>
import DataTable from "../../../components/dataTable";
export default {
	components: {
		DataTable
	},
	props: {
		unitDelivery: {
			type: Array,
			required: true
		},
		selectedProject: {
			type: Object,
			required: true
		},
		actionAdd: {
			type: String,
			required: true
		},
		actionUpdate: {
			type: String,
			required: true
		}
	},
	methods: {
		send(val) {
			let self = this;
			let action = "";
			let msg = "";
			if (this.selectedProject.unit_delivery !== "") {
				action = this.actionUpdate;
				msg =
					"Unit Delivery is already exists, would you like to change / replace it ?";
			} else {
				action = this.actionAdd;
				msg =
					"Are you sure select <b>" +
					val.business_unit +
					"</b> as Unit Delivery ? ";
			}

			this.$dialog.confirm({
				title: "Confirm Changes",
				message: msg,
				confirmText: "Oke",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () => {
					let form = document.createElement("form");
					form.setAttribute("action", action);
					form.setAttribute("method", "POST");

					let input = document.createElement("input");
					input.value = this.selectedProject.project_id;
					input.setAttribute("name", "project_id");
					form.appendChild(input);
					let input2 = document.createElement("input");
					input2.value = val.bu_id;
					input2.setAttribute("name", "bu_id");
					form.appendChild(input2);
					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			});
		}
	}
};
</script>