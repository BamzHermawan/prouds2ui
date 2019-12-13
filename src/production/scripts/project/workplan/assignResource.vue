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
		<b-field horizontal label="Assigned Role">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ roleName }}</span
			>
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
						@click="editForm"
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
			show-detail-icon
			paginated
			:per-page="10"
			pagination-simple
		>
			<template slot-scope="props">
				<b-table-column
					field="nik"
					label="NIK"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.nik }}</p>
				</b-table-column>
				<b-table-column
					field="user"
					label="User"
					sortable
					class="align-middle"
					width="200"
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
					field="job_role"
					label="Job Role"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.role }}</p>
				</b-table-column>
				<b-table-column
					field="latest_assign"
					label="Latest Assign Date"
					sortable
					class="align-middle"
				>
					<p>{{ props.row.latest_assign | moment }}</p>
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
				<div class="columns is-multiline">
					<div class="column is-12">
						<div class="content">
							<p class="title is-size-6">
								🏆 Kemampuan (Skill)
							</p>
							<div style="padding:8px;">
								<div
									class="columns is-multiline"
									v-if="props.row.skill.length > 0"
								>
									<div
										v-for="(skill, index) in props.row
											.skill"
										:key="index"
										class="column is-one-quarter"
										style="padding: 5px;"
									>
										{{ index + 1 }}.
										<b>{{ skill.skillName }}</b
										>:
										{{ skill.skillLevel }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="column is-12">
						<div class="content">
							<p class="title is-size-6">
								📜 Certificate
							</p>
							<div style="padding:8px;">
								<div
									class="columns is-multiline"
									v-if="props.row.certificate.length > 0"
								>
									<div
										v-for="(certificate, index) in props.row
											.certificate"
										:key="index"
										class="column is-one-quarter"
										style="padding: 5px;"
									>
										{{ index + 1 }}.
										{{ certificate.certificateName }}
									</div>
								</div>
							</div>
						</div>
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
								<b-field label="Task Name">
									<span
										class="button is-static is-fullwidth is-light-blend"
										style="justify-content: start;"
										>{{ taskName }}</span
									>
								</b-field>
								<b-field label="Assigned Role">
									<span
										class="button is-static is-fullwidth is-light-blend"
										style="justify-content: start;"
										>{{ roleName }}</span
									>
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
											:min-date="start"
											:max-date="finish"
											v-model="start_date"
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
										:min-date="start_date"
										:max-date="finish"
										v-model="end_date"
										name="end_date"
										placeholder="Pick End Date"
										date-locale="en"
										input-style="margin-bottom: 0px;"
									>
									</crud-input>
								</b-field>
								<div class="block">
									<b-checkbox v-model="progressCalculation">
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
	searchTree,
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
			taskName: this.task.pName,
			roleName: this.task.roleName,
			search: "",
			tampung: "",
			showTable: true,
			showForm: false,
			selectedRows: [],
			alertMandays: false,
			start_date: new Date(this.task.pStart),
			end_date: new Date(this.task.pEnd),
			progressCalculation: true,
			tampungUserID: undefined,
			arrayForm: [],
			isLoading: false,
			openDetail: [],
			listResource: []
		};
	},
	methods: {
		isEmpty: isEmpty,
		editForm() {
			this.showForm = true;
		},
		closeForm() {
			this.showForm = false;
		},
		saveForm() {
			let form = document.createElement("form");
			form.setAttribute("action", this.actionEvent);
			form.setAttribute("method", "POST");
			let input = document.createElement("input");
			input.value = this.task.pID;
			input.name = "taskId";
			form.appendChild(input);

			let input2 = document.createElement("input");
			input2.value = this.selectedRows;
			input2.name = "user_id";
			form.appendChild(input2);

			let input3 = document.createElement("input");
			input3.value = moment(this.start_date).format("DD/MM/YYYY");
			input3.name = "start_date";
			form.appendChild(input3);

			let input4 = document.createElement("input");
			input4.value = moment(this.end_date).format("DD/MM/YYYY");
			input4.name = "end_date";
			form.appendChild(input4);

			let input5 = document.createElement("input");
			input5.value = this.progressCalculation;
			input5.name = "progressCalculation";
			form.appendChild(input5);
			document.getElementById("vapp").appendChild(form);
			form.submit();
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
						this.listResource.forEach(row => {
							this.openDetail.push(row.user_id);
						});
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
			if (isEmpty(this.start_date) || isEmpty(this.end_date)) {
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
			return searchTree(this.listResource, this.search);
		}
	},
	mounted() {
		this.getParent;
		this.getResourceWorkplan();
	}
};
</script>