<template>
	<div class="container">
		<slot name="ade"></slot>
		<div class="columns is-marginless">
			<div
				class="column is-12-desktop content is-marginless is-paddingless"
			>
				<h3
					class="is-small has-text-weight-light is-reduced-margin is-uppercase"
				>
					{{ selectedProject.project_name }}
				</h3>
				<b-field grouped>
					<div class="control">
						<b-taglist attached>
							<b-tag type="is-dark">ID</b-tag>
							<b-tag type="is-info">{{
								selectedProject.project_id
							}}</b-tag>
						</b-taglist>
					</div>
					<div class="control">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">IWO</b-tag>
							<b-tag type="is-info">{{
								selectedProject.iwo
							}}</b-tag>
						</b-taglist>
					</div>
					<div class="control">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Unit Delivery</b-tag>
							<b-tag
								v-if="!isEmpty(selectedProject.unit_delivery)"
								type="is-info"
								>{{ selectedProject.unit_delivery }}</b-tag
							>
							<b-tag v-else type="is-danger">EMPTY</b-tag>
						</b-taglist>
					</div>
				</b-field>
			</div>
		</div>

		<hr />

		<data-table-no-card
			:show-all="false"
			:data="unitDelivery"
			:fields="[]"
			ref="widget"
			striped
			hoverable
		>
			<template slot-scope="props">
				<b-table-column field="bu" label="Business Unit" sortable>
					<span>{{ props.row.business_unit }}</span>
				</b-table-column>
				<b-table-column
					field="pm_resources"
					label="PM Resources"
					width="125"
					centered
					sortable
				>
					<span class="mdi mdi-account-tie in-left"></span>
					<span>{{ props.row.pm_resources }}</span>
				</b-table-column>
				<b-table-column
					field="on_going_project"
					label="On Going Project"
					width="125"
					centered
					sortable
				>
					<span class="mdi mdi-timer in-left"></span>
					<span>{{ props.row.on_going_project }}</span>
				</b-table-column>
				<b-table-column
					field="superior"
					label="Vice President / Director"
					sortable
				>
					<span>{{ props.row.supervisor }}</span>
				</b-table-column>
				<b-table-column
					field="action"
					label="Action"
					centered
					width="125"
					sortable
				>
					<a
						@click="send(props.row)"
						style="cursor: pointer !important; padding:1px; height:21px;"
						class="button is-success is-small"
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
import { isEmpty } from "helper-tools";
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
		isEmpty: isEmpty,
		send(val) {
			let self = this;
			let action = "";
			let msg = "";
			if (this.selectedProject.unit_delivery !== "") {
				action = this.actionUpdate;
				msg =
					"Unit Delivery is selected to <b>" +
					this.selectedProject.unit_delivery +
					"</b>, and you want to change selected to <b>" +
					val.business_unit +
					"</b>, are you sure ?";
			} else {
				action = this.actionAdd;
				msg =
					"You want to select <b>" +
					val.business_unit +
					"</b> as Unit Delivery, are you sure ? ";
			}

			this.$dialog.confirm({
				title: "Confirm Changes",
				message: msg,
				confirmText: "Yes, Sure!",
				type: "is-success",
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