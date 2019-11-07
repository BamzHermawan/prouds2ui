<template>
	<div class="container">
		<slot name="breadcrumb"></slot>
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
					<div class="control" v-if="name === 'PM'">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Project Manager</b-tag>
							<b-tag
								v-if="!isEmpty(selectedProject.project_manager)"
								type="is-info"
								>{{ selectedProject.project_manager }}</b-tag
							>
							<b-tag v-else type="is-danger">EMPTY</b-tag>
						</b-taglist>
					</div>
					<div class="control" v-if="name === 'Co PM'">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Co PM</b-tag>
							<b-tag
								v-if="
									!isEmpty(selectedProject.co_project_manager)
								"
								type="is-info"
								>{{ selectedProject.co_project_manager }}</b-tag
							>
							<b-tag v-else type="is-danger">EMPTY</b-tag>
						</b-taglist>
					</div>
					<div class="control" v-if="name === 'Project Adm'">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Project Adm</b-tag>
							<b-tag
								v-if="!isEmpty(selectedProject.project_adm)"
								type="is-info"
								>{{ selectedProject.project_adm }}</b-tag
							>
							<b-tag v-else type="is-danger">EMPTY</b-tag>
						</b-taglist>
					</div>
				</b-field>
			</div>
		</div>

		<hr />
		<data-table-no-card
			striped
			hoverable
			:data="listpm"
			:fields="[]"
			ref="widget"
		>
			<template slot-scope="props">
				<b-table-column
					field="project_manager"
					label="Project Manager"
					sortable
				>
					<span>{{ props.row.pm_name }}</span>
				</b-table-column>
				<b-table-column
					field="classification"
					label="Classification"
					sortable
					v-if="name !== 'Project Adm'"
				>
					<span>{{ props.row.classification }}</span>
				</b-table-column>
				<b-table-column
					width="90"
					field="on_going"
					label="On Going"
					sortable
				>
					<span>{{ props.row.on_going }}</span>
				</b-table-column>
				<b-table-column field="past" label="Past" sortable>
					<span>{{ props.row.past }}</span>
				</b-table-column>
				<b-table-column
					field="dominan_segment"
					label="Dominan Segment"
					sortable
				>
					<span>{{ props.row.dominant_segment }}</span>
				</b-table-column>
				<b-table-column
					field="last_project"
					label="Last Project"
					sortable
				>
					<span>{{ props.row.last_project }}</span>
				</b-table-column>
				<b-table-column field="action" label="Action" sortable>
					<a
						@click="sendPM(props.row)"
						style="cursor: pointer !important; padding:1px; height:21px;"
						class="button is-success is-small"
						><span class="mdi mdi-checkbox-marked-outline"></span
					></a>
				</b-table-column>
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
		listpm: {
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
		},
		name: {
			type: String,
			required: true
		}
	},
	methods: {
		isEmpty: isEmpty,
		sendPM(val) {
			let self = this;
			let action = "";
			let msg = "";
			if (
				this.name === "PM" &&
				this.selectedProject.project_manager !== ""
			) {
				action = this.actionUpdate;
				msg =
					"PM is already exists, would you like to change / replace it ?";
			} else if (
				this.name === "Co PM" &&
				this.selectedProject.co_project_manager !== ""
			) {
				action = this.actionUpdate;
				msg =
					"Co PM is already exists, would you like to change / replace it ?";
			} else if (
				this.name === "Project Adm" &&
				this.selectedProject.project_adm !== ""
			) {
				action = this.actionUpdate;
				msg =
					"Project Adm is already exists, would you like to change / replace it ?";
			} else {
				action = this.actionAdd;
				msg =
					"Are you sure select <b>" +
					val.pm_name +
					"</b> as " +
					this.name +
					" ?";
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
					input2.value = val.pm_id;
					input2.setAttribute("name", "pm_id");
					form.appendChild(input2);
					document.getElementById("vapp").appendChild(form);
					form.submit();
				}
			});
		}
	}
};
</script>