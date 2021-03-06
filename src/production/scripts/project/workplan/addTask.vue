<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="projectId" v-model="projectId" />
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

					<b-field label="Parent Task" style="margin-bottom:1em;">
						<div>
							<input
								type="hidden"
								name="parentTask"
								v-model="task.pID"
							/>
							<span
								class="button is-static is-fullwidth is-light-blend"
								style="justify-content: start;"
								>{{ task.pName }}</span
							>
						</div>
					</b-field>

					<!-- Input Task Name -->
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

					<crud-input
						type="select"
						label="Assigned Role"
						placeholder="Choose Role"
						name="roleID"
						input-style="margin-bottom:1em;"
						required
					>
						<option
							v-for="(val, idx) in dataRole"
							:key="idx"
							:value="val.roleId"
							>{{ val.roleName }}</option
						>
					</crud-input>

					<b-field
						label="Calculation Method*"
						style="margin-bottom:1em"
					>
						<b-select
							expanded
							name="calc_method"
							v-model="calcMethod"
							placeholder="Choose Calculation Method for Task Progress"
						>
							<slot name="calc-meth-option"></slot>
						</b-select>
					</b-field>

					<div class="columns">
						<div class="column is-6">
							<b-field label="Weight Index">
								<b-numberinput
									name="weight"
									v-model="weight"
									type="is-info"
									min="1"
									required
								></b-numberinput>
							</b-field>
						</div>
					</div>

					<hr />

					<div class="buttons">
						<button
							class="button is-success is-long"
							type="submit"
							:disabled="disableSave"
						>
							Save Task
						</button>

						<b-button
							type="is-danger is-long"
							@click="$emit('cancel')"
							>Cancel</b-button
						>
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

						<div class="columns">
							<div class="column">
								<!-- Select Workdays -->
								<crud-input
									type="select"
									label="Workdays Schema"
									name="workdays"
									placeholder="Choose Workdays Schema"
									v-model="workdays"
									input-style="margin-bottom:1em;"
									required
								>
									<slot name="workdays-option"></slot>
								</crud-input>
								<!-- Select Workdays -->
							</div>
							<div class="column is-4">
								<label class="label">Duration (days)</label>
								<b-message type="is-danger" class="is-on-field">
									<p
										class="has-text-dark"
										v-if="!isEmpty(duration)"
									>
										{{ duration }}
									</p>
									<p class="has-text-dark" v-else>
										0
									</p>
								</b-message>
							</div>
						</div>
					</b-message>
				</div>

				<slot name="additional"></slot>
			</div>
		</div>
	</form>
</template>

<script>
import Moment from "helper-moment";
import { crudInput } from "components";
import { notified, checkConnection, isEmpty } from "helper-tools";
import api from "helper-apis";

const implantTag = document.querySelector("#implantedJSON");
const implantData = JSON.parse(implantTag.innerHTML);

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
		}
	},
	data() {
		return {
			dataBaru: [],
			dataRole: [],
			start: undefined,
			finish: undefined,
			workdays: null,
			duration: this.task.duration,
			checkboxPredecessor: "true",
			predecessor: null,
			processGroupName: "",
			processGroupID: this.task.processGroupID,
			subtask: null,
			isLoading: false,
			name: "",
			selected: null,
			calcMethod: null,
			weight: 1,
			taskName: ""
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
		}
	},
	methods: {
		isEmpty: isEmpty,
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
						if (checkConnection(self.$notification)) {
							notified(self.$notification).error(
								"Sorry we are encountering a problem, please try again later. 🙏"
							);
						}
					})
					.finally(() => (self.isLoading = false));
			}
		},
		getProcessGroup() {
			if (this.processGroupID != 0 || this.processGroupID !== "") {
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
		disableSave() {
			if (isEmpty(this.start)) {
				return true;
			}
			if (isEmpty(this.finish)) {
				return true;
			}
			if (isEmpty(this.taskName)) {
				return true;
			}
			if (isEmpty(this.workdays)) {
				return true;
			}
			return false;
		}
	},
	beforeMount() {
		this.dataBaru = implantData.GANTT;
		this.dataRole = implantData.ROLE;
	},
	mounted() {
		this.getProcessGroup();
	}
};
</script>