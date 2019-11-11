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
							<b-tag type="is-dark">Project Admin</b-tag>
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
				<b-table-column field="pm_name" label="Name" sortable>
					{{ props.row.pm_name }}
				</b-table-column>
				<b-table-column
					field="classification"
					label="Classification"
					sortable
					v-if="name !== 'Project Adm'"
				>
					{{ props.row.classification }}
				</b-table-column>
				<b-table-column
					field="past"
					label="Project Past"
					sortable
					centered
					width="90"
				>
					{{ props.row.past }}
				</b-table-column>
				<b-table-column
					field="on_going"
					label="Project OnGoing"
					sortable
					centered
					width="90"
				>
					{{ props.row.on_going }}
				</b-table-column>
				<b-table-column
					field="dominant_segment"
					label="Dominant Segment"
					sortable
				>
					{{ props.row.dominant_segment }}
				</b-table-column>
				<b-table-column
					field="last_project"
					label="Last Project"
					sortable
				>
					{{ props.row.last_project }}
				</b-table-column>
				<b-table-column field="pm_id" label="Action">
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
		splitTitle(text) {
			return text.replace(" ", "<br>");
		},
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
					"Project Manager is already selected, would you like to change it to <b>" +
					val.pm_name +
					"</b> ?";
			} else if (
				this.name === "Co PM" &&
				this.selectedProject.co_project_manager !== ""
			) {
				action = this.actionUpdate;
				msg =
					"Co-Project Manager is already selected, would you like to change it to <b>" +
					val.pm_name +
					"</b> ?";
			} else if (
				this.name === "Project Adm" &&
				this.selectedProject.project_adm !== ""
			) {
				action = this.actionUpdate;
				msg =
					"Project Admin is already selected, would you like to change it to <b>" +
					val.pm_name +
					"</b> ?";
			} else {
				let jobsetter = this.name;
				action = this.actionAdd;

				if (this.name === "PM") jobsetter = "Project Manager";
				if (this.name === "Co PM") jobsetter = "Co-PM";
				if (this.name === "Project Adm") jobsetter = "Project Admin";

				console.log(jobsetter);

				msg =
					"You want to select <b>" +
					val.pm_name +
					"</b> as " +
					jobsetter +
					", are you sure ?";
			}

			this.$dialog.confirm({
				title: "Confirmation",
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