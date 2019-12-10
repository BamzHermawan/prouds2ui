<template>
	<div>
		<div v-if="showTable" id="tableID" class="animated">
			<b-field horizontal label="Parent">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ name }}</span
				>
			</b-field>
			<b-field horizontal label="Task">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ task.pName }}</span
				>
			</b-field>
			<b-field horizontal label="Task Schedule">
				<b-field expanded>
					<div class="control">
						<span class="button is-static is-info-blend"
							>Start Date</span
						>
					</div>
					<div class="control is-expanded">
						<p
							class="button is-static is-fullwidth is-light-blend"
							style="justify-content: start;"
						>
							{{ start | fulldate }}
						</p>
					</div>
				</b-field>
				<b-field expanded>
					<div class="control">
						<span class="button is-static is-info-blend"
							>End Date</span
						>
					</div>
					<div class="control is-expanded">
						<p
							class="button is-static is-fullwidth is-light-blend"
							style="justify-content: start;"
						>
							{{ finish | fulldate }}
						</p>
					</div>
				</b-field>
			</b-field>

			<hr />
			<nav class="level is-marginless">
				<div class="level-left">
					<b-field>
						<b-input
							placeholder="Search..."
							type="search"
							icon="magnify"
							v-model="search"
							style="margin-right: 10px;"
						>
						</b-input>
					</b-field>
				</div>
			</nav>

			<b-table
				:data="dataFiltered"
				style="font-size:11pt"
				class="is-packed"
				paginated
				:per-page="10"
				pagination-simple
			>
				<template slot-scope="props">
					<b-table-column
						field="user"
						label="User"
						sortable
						class="align-middle"
						width="250"
					>
						<p>{{ props.row.name }}</p>
					</b-table-column>
					<b-table-column
						field="bu"
						label="Business Unit"
						sortable
						class="align-middle"
						width="250"
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
						width="150"
						centered
					>
						<p class="has-text-right">
							{{ props.row.mandaysRate | currency }}
						</p>
					</b-table-column>
					<b-table-column
						field="onGoing"
						label="On Going Project"
						sortable
						class="align-middle"
						width="100"
						centered
					>
						<p>{{ props.row.onGoing }}</p>
					</b-table-column>
					<b-table-column
						field="action"
						label="Action"
						class="align-middle"
						centered
					>
						<b-tooltip label="Stop Assignment" type="is-warning">
							<button
								class="button is-warning is-small"
								@click="stopAssign(props.row)"
							>
								<span
									class="mdi mdi-cancel is-marginless"
								></span>
							</button>
						</b-tooltip>
						<button
							class="button is-danger is-small"
							@click="deleteUser(props.row)"
						>
							<span class="mdi mdi-delete is-marginless"></span>
						</button>
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
				<template slot="top-right"> </template>
			</b-table>
		</div>

		<div v-if="showForm" id="formID" class="animated fadeIn faster">
			<form :action="actionEvent" method="POST">
				<b-field horizontal label="User">
					<span
						class="button is-static is-fullwidth is-light-blend"
						style="justify-content: start;"
						>{{ tampung.name }}</span
					>
				</b-field>

				<b-field horizontal label="Task">
					<span
						class="button is-static is-fullwidth is-light-blend"
						style="justify-content: start;"
						>{{ task.pName }}</span
					>
				</b-field>

				<b-field horizontal label="Task Schedule">
					<b-field expanded>
						<div class="control">
							<span class="button is-static is-info-blend"
								>Start</span
							>
						</div>
						<div class="control is-expanded">
							<p
								class="button is-static is-fullwidth is-light-blend"
								style="justify-content: start;"
							>
								{{ start | fulldate }}
							</p>
						</div>
					</b-field>
					<b-field expanded>
						<div class="control">
							<span class="button is-static is-info-blend"
								>End</span
							>
						</div>
						<div class="control is-expanded">
							<p
								class="button is-static is-fullwidth is-light-blend"
								style="justify-content: start;"
							>
								{{ finish | fulldate }}
							</p>
						</div>
					</b-field>
				</b-field>

				<b-field horizontal label="Assignment Date">
					<b-field expanded>
						<div class="control">
							<span class="button is-static is-info-blend"
								>Start</span
							>
						</div>
						<div class="control is-expanded">
							<p
								class="button is-static is-fullwidth is-light-blend"
								style="justify-content: start;"
							>
								{{ start | fulldate }}
							</p>
						</div>
					</b-field>
					<b-field expanded>
						<div class="control">
							<span class="button is-static is-info-blend"
								>End</span
							>
						</div>
						<div class="control is-expanded">
							<p
								class="button is-static is-fullwidth is-light-blend"
								style="justify-content: start;"
							>
								{{ finish | fulldate }}
							</p>
						</div>
					</b-field>
				</b-field>

				<b-field horizontal label="Assignment Until">
					<crud-input
						type="datepicker"
						name="assignmentUntil"
						v-model="assignmentUntil"
						placeholder="Pick Start Date"
						date-locale="en"
						input-style="margin-bottom: 1em; width:35%"
					>
					</crud-input>
				</b-field>
				<div class="block">
					<b-radio
						v-model="progress"
						name="progress"
						native-value="auto"
						type="is-info"
						required
					>
						Auto complete when timesheet progress has been 100%
					</b-radio>
					<br />
					<b-radio
						v-model="progress"
						name="progress"
						native-value="complete"
						type="is-info"
						required
					>
						Complete Now
					</b-radio>
				</div>
				<hr />
				<div class="is-pulled-right">
					<div class="buttons">
						<b-button class="is-danger is-long" @click="stopAssign">
							Cancel
						</b-button>
						<button
							class="button is-success is-long"
							type="submit"
							:disabled="disableSave"
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
// TODO: Selesaikan Halaman Modal!

import moment from "helper-moment";
import {
	searchFilter,
	animate,
	checkConnection,
	notified,
	isEmpty
} from "helper-tools";
import { crudInput, dataTableNoCard } from "components";
import api from "helper-apis";
export default {
	components: { crudInput, dataTableNoCard },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		actionDelete: {
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
			start: this.task.pStart,
			finish: this.task.pEnd,
			search: "",
			tampung: "",
			showTable: true,
			showForm: false,
			progress: "auto",
			listTeam: [],
			assignmentUntil: undefined
		};
	},
	methods: {
		isEmpty: isEmpty,
		stopAssign(val) {
			if (this.showTable) {
				animate("#tableID", "fadeOut faster", el => {
					this.tampung = val;
					this.showTable = false;
					this.showForm = true;

					el.classList.add("fadeIn");
					document.querySelector(".contentPage").scrollTop = 0;
					global.psContent.update();
				});
			} else {
				document
					.querySelector("#formID")
					.classList.remove("fadeIn", "faster");
				animate("#formID", "fadeOut faster", el => {
					this.showTable = true;
					this.showForm = false;
					this.tampung = "";
					this.assignmentUntil = undefined;
					document.querySelector(".contentPage").scrollTop = 0;
				});
			}
		},
		getTeamWorkplan() {
			this.isLoading = true;
			let task_id = this.task.pID;
			let self = this;
			api.getTeamWorkplan(task_id)
				.then(response => {
					if (!isEmpty(response.data)) {
						self.listTeam = response.data;
					} else {
						self.listTeam = [];
					}
				})
				.catch(() => {
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				})
				.finally(() => (self.isLoading = false));
		},
		deleteUser(val) {
			this.$dialog.confirm({
				title: "Delete",
				message: "Are you sure to delete <b>" + val.name + "</b> ?",
				confirmText: "Ok",
				type: "is-danger",
				hasIcon: true,
				onConfirm: () =>
					(window.location.href =
						this.actionDelete + "user_id=" + val.user_id)
			});
		}
	},
	computed: {
		disableSave() {
			if (isEmpty(this.assignmentUntil)) {
				return true;
			}
			return false;
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
		},
		dataFiltered() {
			return searchFilter(this.listTeam, this.search);
		}
	},
	mounted() {
		this.getParent;
		this.getTeamWorkplan();
	}
};
</script>