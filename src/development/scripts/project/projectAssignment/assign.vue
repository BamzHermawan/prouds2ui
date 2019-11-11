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
					{{ project.project_name }}
				</h3>
				<b-field grouped>
					<div class="control">
						<b-taglist attached>
							<b-tag type="is-dark">ID</b-tag>
							<b-tag type="is-info">{{
								project.project_id
							}}</b-tag>
						</b-taglist>
					</div>
					<div class="control">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">IWO</b-tag>
							<b-tag type="is-info">{{ project.iwo }}</b-tag>
						</b-taglist>
					</div>
					<div class="control" v-if="checkType('PM')">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Project Manager</b-tag>
							<b-tag
								v-if="!isEmpty(project.project_manager)"
								type="is-info"
								>{{ project.project_manager }}</b-tag
							>
							<b-tag v-else type="is-danger">EMPTY</b-tag>
						</b-taglist>
					</div>
					<div class="control" v-if="checkType('Co-PM')">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Co PM</b-tag>
							<b-tag
								v-if="!isEmpty(project.co_project_manager)"
								type="is-info"
								>{{ project.co_project_manager }}</b-tag
							>
							<b-tag v-else type="is-danger">EMPTY</b-tag>
						</b-taglist>
					</div>
					<div class="control" v-if="checkType('Admin')">
						<b-taglist attached size="are-medium">
							<b-tag type="is-dark">Project Admin</b-tag>
							<b-tag
								v-if="!isEmpty(project.project_adm)"
								type="is-info"
								>{{ project.project_adm }}</b-tag
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
			:data="users"
			:fields="[]"
			ref="widget"
		>
			<template slot-scope="props">
				<b-table-column field="pm_name" label="Name" sortable>
					{{ props.row.name }}
				</b-table-column>
				<b-table-column
					field="classification"
					label="Classification"
					sortable
					v-if="!checkType('Admin')"
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
						@click="assignRole(props.row)"
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
		users: {
			type: Array,
			required: true
		},
		project: {
			type: Object,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	methods: {
		isEmpty: isEmpty,
		checkType(type) {
			return this.type === type;
		},
		checkRoleEmpty() {
			if (this.checkType("PM")) {
				return isEmpty(this.project.project_manager);
			} else if (this.checkType("Co-PM")) {
				return isEmpty(this.project.co_project_manager);
			} else if (this.checkType("Admin")) {
				return isEmpty(this.project.project_adm);
			} else {
				return true;
			}
		},
		pickMessage(user) {
			if (!this.checkRoleEmpty()) {
				if (this.checkType("PM")) {
					return (
						"Project Manager is already selected, would you like to change it to <b>" +
						user.name +
						"</b> ?"
					);
				} else if (this.checkType("Co-PM")) {
					return (
						"Co-Project Manager is already selected, would you like to change it to <b>" +
						user.name +
						"</b> ?"
					);
				} else if (this.checkType("Admin")) {
					return (
						"Project Admin is already selected, would you like to change it to <b>" +
						user.name +
						"</b> ?"
					);
				}
			} else {
				let jobsetter = this.type;

				if (this.checkType("PM")) jobsetter = "Project Manager";
				if (this.checkType("Co-PM")) jobsetter = "Co-PM";
				if (this.checkType("Admin")) jobsetter = "Project Admin";

				return (
					"You want to select <b>" +
					user.name +
					"</b> as " +
					jobsetter +
					", are you sure ?"
				);
			}
		},
		assignRole(picked) {
			let self = this;
			let message = this.pickMessage(picked);

			this.$dialog.confirm({
				title: "Confirmation",
				message: message,
				confirmText: "Yes, Sure!",
				type: "is-success",
				onConfirm: () => {
					self.sendPM(this.project.project_id, picked.id);
				}
			});
		},
		sendPM(pID, pmID) {
			// Create Form Element
			let form = document.createElement("form");
			form.setAttribute("action", this.action);
			form.setAttribute("method", "POST");

			// Create Project ID Input Field
			let pid = document.createElement("input");
			pid.setAttribute("name", "project_id");
			pid.setAttribute("type", "hidden");
			pid.value = pID;

			// Create PM ID Input Field
			let pmid = document.createElement("input");
			pmid.setAttribute("name", "pm_id");
			pmid.setAttribute("type", "hidden");
			pmid.value = pmID;

			// Append Input to Form and form to Document, then submit
			form.appendChild(pid);
			form.appendChild(pmid);
			document.getElementById("vapp").appendChild(form);
			form.submit();
		}
	}
};
</script>