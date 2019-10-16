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
								<a href="#" aria-current="page">{{ title }}</a>
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
			<data-table :data="listpm" :fields="[]" ref="widget">
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
		title: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	methods: {
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