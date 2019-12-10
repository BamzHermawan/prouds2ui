<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="projectId" v-model="projectId" />
		<input type="hidden" name="taskID" v-model="taskID" />
		<div class="tile is-ancestor">
			<div class="tile is-vertical is-parent">
				<div class="tile is-child">
					<b-field label="Process Group" style="margin-bottom:1em;">
						<div>
							<input
								type="hidden"
								name="processGroup"
								v-model="processGroupID"
							/>
							<span
								class="button is-static is-fullwidth is-light-blend"
								style="justify-content: start;"
								>{{ processGroupName }}</span
							>
						</div>
					</b-field>

					<!-- Select Parent Task -->
					<p class="label">Parent Task</p>
					<input
						type="hidden"
						name="parentTaskPrev"
						v-model="curSubTask"
					/>
					<input type="hidden" name="parentTask" v-model="subtask" />
					<b-autocomplete
						style="margin-bottom:1em;"
						v-model="name"
						placeholder="Choose Parent Task"
						:open-on-focus="true"
						:data="filterTaskName"
						field="pName"
						required
						@select="option => (selected = option)"
					>
					</b-autocomplete>
					<!-- Select Parent Task -->

					<!-- Input Task Name -->
					<input
						type="hidden"
						name="taskNamePrev"
						v-model="taskNamePrev"
					/>
					<crud-input
						type="text"
						label="Task Name"
						placeholder="a name for the task"
						name="taskName"
						v-model="taskName"
						input-style="margin-bottom:1em;"
						required
					>
					</crud-input>

					<input
						type="hidden"
						name="progressCalculationPrev"
						v-model="progressCalculationPrev"
					/>
					<input
						type="hidden"
						name="progressCalculation"
						v-model="progressCalculation"
					/>
					<crud-input
						type="select"
						label="WBS No."
						name="wbsNo"
						placeholder="Choose WBS Number"
						v-model="wbsNo"
						input-style="margin-bottom:1em;"
					>
						<slot name="wbs-option"></slot>
					</crud-input>

					<crud-input
						type="select"
						label="Integration Method"
						name="integration"
						placeholder="Choose Integration Method"
						v-model="integration"
						input-style="margin-bottom:1em;"
						v-if="showIntegration === 'true'"
					>
						<slot name="integration-option"></slot>
					</crud-input>

					<input
						type="hidden"
						name="weightPrev"
						v-model="weightPrev"
					/>
					<div class="columns">
						<div class="column is-6">
							<b-field label="Weight Index">
								<b-numberinput
									name="weight"
									v-model="weight"
									type="is-info"
									min="1"
								></b-numberinput>
							</b-field>
						</div>
						<div class="column">
							<b-field
								label="Weight Percent"
								style="margin-bottom:1em;"
							>
								<div>
									<input
										type="hidden"
										name="weightPercent"
										v-model="weightPercent"
									/>
									<span
										class="button is-static is-light-blend"
										style="justify-content: start;"
										>{{ weightPercent }}</span
									>
								</div>
							</b-field>
						</div>
					</div>

					<b-field
						label="Progress Calculation"
						style="margin-bottom:1em"
					>
						<div class="block">
							<b-checkbox v-model="progressCalculation">
								Auto by Timesheet
							</b-checkbox>
						</div>
					</b-field>

					<div class="is-pulled-left">
						<button class="button is-success" type="submit">
							Save Task
						</button>
					</div>
				</div>
			</div>
			<div class="tile is-vertical is-parent is-5">
				<div class="tile is-child">
					<b-message
						title="Task Schedule"
						type="is-primary"
						:closable="false"
					>
						<!-- Datepicker Start Date -->
						<input
							type="hidden"
							name="startPrev"
							v-model="startPrev"
						/>
						<crud-input
							type="datepicker"
							label="Start Date"
							name="start"
							v-model="start"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 1em;"
						>
						</crud-input>
						<!-- Datepicker Start Date -->

						<!-- Datepicker Finish Date -->
						<input
							type="hidden"
							name="finishPrev"
							v-model="finishPrev"
						/>
						<crud-input
							type="datepicker"
							label="Finish Date"
							name="finish"
							:min-date="start"
							v-model="finish"
							placeholder="Pick Finish Date"
							date-locale="en"
							input-style="margin-bottom: 1em;"
						>
						</crud-input>
						<!-- Datepicker Finish Date -->

						<!-- Select Workdays -->
						<div class="columns">
							<div class="column">
								<input
									type="hidden"
									name="workdaysPrev"
									v-model="workdaysPrev"
								/>
								<crud-input
									type="select"
									label="Workdays Schema"
									name="workdays"
									placeholder="Choose Workdays Schema"
									v-model="workdays"
									input-style="margin-bottom:1em;"
								>
									<slot name="workdays-option"></slot>
								</crud-input>
							</div>
							<div class="column is-4">
								<label class="label">Duration (days)</label>
								<b-message type="is-danger" class="is-on-field">
									<p class="has-text-dark">
										{{ duration }}
									</p>
								</b-message>
							</div>
						</div>
						<!-- Select Workdays -->
					</b-message>
				</div>
			</div>
		</div>
	</form>
</template>

<script>
// TODO: Selesaikan Halaman Modal!

import Moment from "helper-moment";
import { crudInput } from "components";
import { notified, checkConnection } from "helper-tools";
import api from "helper-apis";
export default {
	components: { crudInput },
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
		},
		apiGetDuration: {
			type: String,
			required: true
		},
		showIntegration: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			taskName: this.task.pName,
			workdays: this.task.workdays,
			duration: 20,
			checkboxPredecessor: "true",
			predecessor: null,
			subtask: null,
			curSubTask: this.task.pParent,
			start: new Date(this.task.pStart),
			finish: new Date(this.task.pEnd),
			oldfinish: new Date(this.task.pEnd),
			taskID: this.task.pID,
			isLoading: false,
			name: "",
			selected: null,
			processGroupName: "",
			processGroupID: this.task.processGroupID,
			progressCalculation: this.task.progressCalculation,
			taskNamePrev: this.task.pName,
			progressCalculationPrev: this.task.progressCalculation,
			startPrev: Moment(this.task.pStart).format("DD/MM/YYYY"),
			finishPrev: Moment(this.task.pEnd).format("DD/MM/YYYY"),
			workdaysPrev: this.task.workdays,
			weightPrev: this.task.weight,
			wbsNo: this.task.wbsNo,
			integration: this.task.integration,
			weight: this.task.weight,
			weightPercent: this.task.weightPercent
		};
	},
	watch: {
		start: function() {
			if (this.start > this.finish) {
				this.finish = this.start;
			}
			this.getDuration(this.start, this.finish, this.workdays);
		},
		finish: function() {
			this.getDuration(this.start, this.finish, this.workdays);
		},
		workdays: function() {
			this.getDuration(this.start, this.finish, this.workdays);
		},
		name: function() {
			if (this.selected != undefined) {
				this.subtask = this.selected.pID;
			} else {
				this.subtask = this.curSubTask;
			}
		}
	},
	methods: {
		check(type) {
			if (type) {
				return this.finishisoverflow ? "is-danger" : undefined;
			} else {
				return this.finishisoverflow
					? "The date you choose must be approved by PMO"
					: undefined;
			}
		},
		getDuration(start, finish, workdays) {
			this.isLoading = true;
			let self = this;
			let bundle = {
				start: Moment(start).format("DD/MM/YYYY"),
				finish: Moment(finish).format("DD/MM/YYYY"),
				workdays: workdays
			};
			if (start != undefined && finish != undefined && workdays != null) {
				api.getDuration(bundle)
					.then(response => {
						let dur = response.data;
						self.duration = dur.duration;
					})
					.catch(function(error) {
						console.log("error asking for get duration");
						if (checkConnection(self.notification)) {
							notified(self.$notification).error(
								"Sorry we are encountering a problem, please try again later. 🙏"
							);
						}
					})
					.finally(() => (self.isLoading = false));
			}
		},
		getProcessGroup() {
			if (this.processGroupID != 0) {
				let found = this.dataBaru.find(
					task => task.pID === this.processGroupID
				);
				if (found != undefined && found.hasOwnProperty("pName")) {
					this.processGroupName = found.pName;
				} else {
					return "";
				}
			}
		}
	},
	computed: {
		filterTaskName() {
			return this.dataBaru.filter(option => {
				let checkName =
					option.pName
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0;

				return checkName && option.pID != this.taskID;
			});
		},
		filterPredecessor() {
			return this.dataBaru.filter(pre => {
				let preFilter = pre;

				return preFilter && pre.pID != this.taskID;
			});
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
		finishisoverflow() {
			return this.finish > this.oldfinish;
		}
	},
	mounted() {
		this.predecessor = this.task.pDepend ? this.task.pDepend : null;
		this.getParent;
		this.getProcessGroup();
	}
};
</script>