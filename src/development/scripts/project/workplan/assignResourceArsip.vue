<template>
	<div>
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
					<span class="button is-static is-info-blend">End Date</span>
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
			<div class="level-right">
				<div class="level-item">
					<b-button
						class="is-success"
						@click="assign"
						:disabled="disableBtn"
						>Assign</b-button
					>
				</div>
			</div>
		</nav>

		<b-table
			:data="dataFiltered"
			style="font-size:11pt"
			class="is-packed"
			:opened-detailed="openDetail"
			detailed
			detail-key="user_id"
			:show-detail-icon="false"
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
					field="job_role"
					label="Job Role"
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
					field="select"
					label="Select"
					class="align-middle"
					centered
				>
					<b-checkbox
						v-model="selectedRows"
						:native-value="props.row.user_id"
						@input="editForm(props.row)"
					>
					</b-checkbox>
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
			<template slot="detail" slot-scope="props">
				<div class="columns">
					<div class="column">
						<p class="label">
							Assigned Role
						</p>
						<p>
							{{ props.row.assignment.roleName }}
						</p>
					</div>
					<div class="column">
						<p class="label">
							Start Date
						</p>
						<p>
							{{ props.row.assignment.start_date | fulldate }}
						</p>
					</div>
					<div class="column">
						<p class="label">
							End Date
						</p>
						<p>
							{{ props.row.assignment.end_date | fulldate }}
						</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="label">
							Mandays Rate
						</p>
						<p>
							Rp.
							{{ props.row.assignment.mandaysRate | currency }}
						</p>
					</div>
					<div class="column">
						<p class="label">
							Workload
						</p>
						<p>
							{{ props.row.assignment.workloadName }}
						</p>
					</div>
					<div class="column">
						<p class="label">
							Auto complete
						</p>
						<p v-if="props.row.assignment.progressCalculation">
							{{ props.row.assignment.progressCalculation }} ✅
						</p>
						<p v-if="!props.row.assignment.progressCalculation">
							{{ props.row.assignment.progressCalculation }} ❌
						</p>
					</div>
				</div>
			</template>
		</b-table>

		<b-modal :active.sync="showForm" width="850px" :can-cancel="false">
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">Task Assignment</p>
				</header>
				<section class="modal-card-body">
					<div class="container">
						<div class="columns">
							<div class="column is-6">
								<b-field label="Assigned Role">
									<crud-input
										type="select"
										placeholder="Choose Role"
										v-model="assignment.roleID"
										name="roleID"
										input-style="margin-bottom:0px;"
										required
									>
										<option
											v-for="(val, idx) in dataRole"
											:key="idx"
											:value="val.roleID"
											>{{ val.roleName }}</option
										>
									</crud-input>
								</b-field>
								<input
									type="hidden"
									name="mandaysRate"
									v-model="assignment.mandaysRate"
								/>
								<div class="field">
									<label class="label"
										>Mandays Rate (IDR)</label
									>
									<input
										type="text"
										class="input"
										placeholder="Fill Mandays Rate"
										v-model="currencyRate"
										@keypress="isNumber($event)"
									/>
								</div>

								<b-field>
									<div class="control">
										<span
											class="button is-static is-info-blend"
											style="width: 98px;"
											>Workload</span
										>
									</div>
									<crud-input
										type="select"
										v-model="assignment.workloadID"
										name="workloadID"
										input-style="margin-bottom:0px; width:40%"
										required
									>
										<option
											v-for="(val, idx) in dataWorkload"
											:key="idx"
											:value="val.workloadID"
											>{{ val.workloadName }}</option
										>
									</crud-input>
								</b-field>
							</div>
							<div class="column">
								<b-field label="Assignment Date">
									<b-field>
										<div class="control">
											<span
												class="button is-static is-info-blend"
												>Start Date</span
											>
										</div>
										<crud-input
											type="datepicker"
											placeholder="Pick Start Date"
											date-locale="en"
											v-model="assignment.start_date"
											name="start_date"
											input-style="margin-bottom: 0px;"
										>
										</crud-input>
									</b-field>
								</b-field>
								<b-field>
									<div class="control">
										<span
											class="button is-static is-info-blend"
											style="width: 98px;"
											>End Date</span
										>
									</div>
									<crud-input
										type="datepicker"
										:min-date="assignment.start_date"
										v-model="assignment.end_date"
										name="end_date"
										placeholder="Pick End Date"
										date-locale="en"
										input-style="margin-bottom: 0px;"
									>
									</crud-input>
								</b-field>
								<div class="block">
									<b-checkbox
										v-model="assignment.progressCalculation"
									>
										Auto complete when timesheet progress
										has been 100%
									</b-checkbox>
								</div>
							</div>
						</div>

						<hr />
						<div class="is-pulled-right">
							<div class="buttons">
								<button
									class="button is-danger is-long"
									@click="closeForm"
								>
									Cancel
								</button>
								<button
									class="button is-success is-long"
									:disabled="disableSave"
									@click="saveForm"
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</b-modal>
	</div>
</template>

<script>
// TODO: Selesaikan Halaman Modal!

import "helper-filter";
import moment from "helper-moment";
import {
	searchFilter,
	animate,
	notified,
	isEmpty,
	checkConnection
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
			dataRole: ROLE,
			dataWorkload: WORKLOAD_EFFORT,
			start: this.task.pStart,
			finish: this.task.pEnd,
			name: "",
			curSubTask: this.task.pParent,
			search: "",
			tampung: "",
			showTable: true,
			showForm: false,
			selectedRows: [],
			alertMandays: false,
			assignment: {
				user_id: undefined,
				roleID: undefined,
				roleName: undefined,
				start_date: undefined,
				end_date: undefined,
				workloadID: 1,
				workloadName: undefined,
				mandaysRate: "",
				progressCalculation: true
			},
			tampungUserID: undefined,
			arrayForm: [],
			isLoading: false,
			openDetail: [],
			listResource: []
		};
	},
	methods: {
		isEmpty: isEmpty,
		assign() {
			let form = document.createElement("form");
			form.setAttribute("action", this.actionEvent);
			form.setAttribute("method", "POST");
			let input = document.createElement("input");
			input.value = this.task.pID;
			input.name = "taskId";
			form.appendChild(input);

			for (let i = 0; i < this.arrayForm.length; i++) {
				const element = this.arrayForm[i];
				let input2 = document.createElement("input");
				input2.value = JSON.stringify(element);
				input2.name = "user[]";
				form.appendChild(input2);
			}
			document.getElementById("vapp").appendChild(form);
			form.submit();
		},
		editForm(row) {
			let found = undefined;
			for (let i = 0; i < this.arrayForm.length; i++) {
				const assign = this.arrayForm[i];
				if (assign.user_id === row.user_id) {
					found = i;
				}
			}

			if (found !== undefined) {
				this.arrayForm.splice(found, 1);
				var index = this.selectedRows.indexOf(row.user_id);

				if (index > -1) {
					this.selectedRows.splice(index, 1);
				}

				var idxDetail = this.openDetail.indexOf(row.user_id);

				if (idxDetail > -1) {
					this.openDetail.splice(idxDetail, 1);
				}
				this.clearForm();
			} else {
				this.assignment.user_id = row.user_id;
				this.showForm = true;
			}
		},
		closeForm() {
			var index = this.selectedRows.indexOf(this.assignment.user_id);

			if (index > -1) {
				this.selectedRows.splice(index, 1);
			}
			this.clearForm();
			this.showForm = false;
		},
		saveForm() {
			this.arrayForm.push(this.assignment);
			let found = this.listResource.findIndex(
				team => team.user_id === this.assignment.user_id
			);
			this.listResource[found].assignment = this.assignment;
			this.openDetail.push(this.assignment.user_id);
			this.clearForm();
			this.showForm = false;
		},
		clearForm() {
			this.assignment = {
				user_id: undefined,
				roleID: undefined,
				roleName: undefined,
				start_date: undefined,
				end_date: undefined,
				workloadID: 1,
				workloadName: undefined,
				mandaysRate: "",
				progressCalculation: true
			};
		},
		isNumber(evt) {
			evt = evt ? evt : window.event;
			var charCode = evt.which ? evt.which : evt.keyCode;
			if (
				charCode > 31 &&
				(charCode < 48 || charCode > 57) &&
				charCode !== 46
			) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		getResourceWorkplan() {
			this.isLoading = true;
			let taskId = this.task.pID;
			let self = this;
			api.getResourceWorkplan(taskId)
				.then(response => {
					if (!isEmpty(response.data)) {
						self.listResource = response.data;
					} else {
						self.listResource = [];
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
		}
	},
	computed: {
		disableBtn() {
			return !(this.selectedRows.length > 0);
		},
		disableSave() {
			if (!isEmpty(this.assignment.roleID)) {
				let found = this.dataRole.find(
					role => role.roleID === this.assignment.roleID
				);
				this.assignment.roleName = found.roleName;
			}

			if (!isEmpty(this.assignment.workloadID) && this.showForm) {
				let cari = this.dataWorkload.find(
					workload =>
						parseInt(workload.workloadID) ===
						this.assignment.workloadID
				);
				this.assignment.workloadName = cari.workloadName;
			}

			for (const index in this.assignment) {
				if (isEmpty(this.assignment[index])) {
					return true;
				}
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
			return searchFilter(this.listResource, this.search);
		},
		currencyRate: {
			get: function() {
				return this.$options.filters.currency(
					this.assignment.mandaysRate
				);
			},
			set: function(val) {
				let medown = val.replace(/\D/g, "");
				this.assignment.mandaysRate = medown;
			}
		}
	},
	mounted() {
		this.getParent;
		this.getResourceWorkplan();
	}
};
</script>