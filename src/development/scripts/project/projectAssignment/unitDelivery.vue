<template>
	<div class="container">
		<slot name="ade"></slot>
		<p>
			<span style="margin-right:98px"><b>Project ID</b> </span>:
			{{ selectedProject.project_id }}
			<span style="margin-left:400px; margin-right:20px"
				><b>IWO No.</b></span
			>
			{{ selectedProject.iwo }}
		</p>
		<p>
			<span style="margin-right:74px"><b>Project Name</b> </span>:
			{{ selectedProject.project_name }}
		</p>
		<p>
			<span style="margin-right:82px"><b>Unit Delivery</b> </span>:
			{{ selectedProject.unit_delivery }}
		</p>
		<hr />
		<data-table-no-card
			:show-all="false"
			:data="unitDelivery"
			:fields="[]"
			ref="widget"
		>
			<template slot-scope="props">
				<b-table-column field="bu" label="Business Unit" sortable>
					<span>{{ props.row.business_unit }}</span>
				</b-table-column>
				<b-table-column
					field="pm_resources"
					label="PM Resources"
					sortable
				>
					<span>{{ props.row.pm_resources }}</span>
				</b-table-column>
				<b-table-column
					field="on_going_project"
					label="On Going Project"
					sortable
				>
					<span>{{ props.row.on_going_project }}</span>
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
						><span class="mdi mdi-checkbox-marked-outline"></span
					></a>
				</b-table-column>
			</template>
			<template slot="top-right">
				<div class="navbar-menu"></div>
			</template>
		</data-table-no-card>
	</div>
</template>

<script>
import { dataTableNoCard } from "components";
export default {
	components: {
		dataTableNoCard
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