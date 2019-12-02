<template>
	<div>
		<b-field horizontal label="Parent">
			{{ name }}
		</b-field>
		<b-field horizontal label="Task">
			{{ task.pName }}
		</b-field>
		<div class="columns">
			<div class="column">
				<b-field horizontal label="Start Date">
					{{ start }}
				</b-field>
			</div>
			<div class="column">
				<b-field horizontal label="End Date">
					{{ finish }}
				</b-field>
			</div>
		</div>

		<data-table-no-card
			:data="task.resource"
			style="font-size:11pt"
			:fields="[]"
			ref="widget"
			striped
			:per-page="10"
			:checked-rows.sync="selectedRows"
			checkable
			checkbox-position="right"
		>
			<template slot-scope="props">
				<b-table-column
					field="user"
					label="User"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.name }}</p>
				</b-table-column>
				<b-table-column
					field="bu"
					label="Business Unit"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.bu }}</p>
				</b-table-column>
				<b-table-column
					field="assigned_role"
					label="Assigned Role"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.role }}</p>
				</b-table-column>
				<b-table-column
					field="mandaysRate"
					label="Mandays Rate (IDR)"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.mandaysRate }}</p>
				</b-table-column>
				<b-table-column
					field="onGoing"
					label="On Going Project"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.onGoing }}</p>
				</b-table-column>
			</template>
			<template slot="empty">
				<span class="white-space"></span>
				<b-message type="is-warning">
					<p class="has-text-centered">
						Sorry, we can't find any data related
					</p>
				</b-message>
			</template>
			<template slot="top-right">
				<div class="navbar-menu">
					<div class="level">
						<div class="level-item">
							<b-button class="is-success"
								>Stop Assignment</b-button
							>
						</div>
						<div class="level-item">
							<b-button class="is-danger">Delete</b-button>
						</div>
					</div>
				</div>
			</template>
		</data-table-no-card>
	</div>
</template>

<script>
// TODO: Selesaikan Halaman Modal!

import moment from "helper-moment";
import { crudInput, dataTableNoCard } from "components";
export default {
	components: { crudInput, dataTableNoCard },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			selectedRows: [],
			dataBaru: GANTT,
			name: "",
			curSubTask: this.task.pParent,
			start: moment(this.task.pStart).format("dddd, DD MMMM YYYY"),
			finish: moment(this.task.pEnd).format("dddd, DD MMMM YYYY")
		};
	},
	methods: {
		approveSelected(e) {
			const form = e.target;
			for (let i = 0; i < this.selectedRows.length; i++) {
				let selected = this.selectedRows[i];
				let input = document.createElement("input");
				input.setAttribute("type", "hidden");
				input.setAttribute("name", "timesheet_id[]");
				input.value = selected.timesheet_id;

				form.appendChild(input);
			}
		}
	},
	computed: {
		total() {
			return this.dataBaru.length;
		},
		disableApprove() {
			return !(this.selectedRows.length > 0);
		},
		getParent() {
			if (this.curSubTask != 0) {
				let found = this.dataBaru.find(
					task => task.pID === this.curSubTask
				);
				if (found != undefined && found.hasOwnProperty("pName")) {
					this.name = found.pName;
				} else {
					return "";
				}
			}
		}
	},
	mounted() {
		this.getParent;
	}
};
</script>