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

					<!-- ########################## Select Parent Task -->
					<p class="label">Parent Task</p>
					<input
						type="hidden"
						name="parentTaskPrev"
						v-model="parent.previous"
					/>
					<input
						type="hidden"
						name="parentTask"
						v-model="parent.current"
					/>
					<b-autocomplete
						style="margin-bottom:1em;"
						v-model="parent.name"
						placeholder="Choose Parent Task"
						:open-on-focus="true"
						:data="autoCompleteParent"
						field="name"
						required
						@select="selectedParent"
						@blur="nameParentChanged"
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
						name="roleIdPrev"
						v-model="roleIdPrev"
					/>

					<crud-input
						type="select"
						label="Assigned Role"
						placeholder="Choose Role"
						name="roleId"
						v-model="roleId"
						input-style="margin-bottom:1em;"
						required
					>
						<option selected style="display: none;"></option>
						<option
							v-for="(val, idx) in dataRole"
							:key="idx"
							:value="val.roleId"
							>{{ val.roleName }}</option
						>
					</crud-input>

					<input
						type="hidden"
						name="calc_method_prev"
						v-model="calcMethodPrev"
					/>

					<b-field
						label="Calculation Method*"
						style="margin-bottom:1em"
					>
						<b-select
							expanded
							name="calc_method"
							v-model="calcMethod"
							placeholder="Choose Auto Calculation Method"
						>
							<slot name="calc-meth-option"></slot>
						</b-select>
					</b-field>

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
							<input
								type="hidden"
								name="weightPercent"
								v-model="weightPercent"
							/>
							<b-field label="Weight Percent">
								<span
									style="min-width:125px; justify-content: left;"
									class="button is-static is-light-blend"
									>{{ weightPercent }} %</span
								>
							</b-field>
						</div>
					</div>

					<hr />

					<div class="buttons">
						<button class="button is-success is-long" type="submit">
							Save
						</button>
						<b-button
							@click="$emit('cancel')"
							type="is-danger is-long"
						>
							Cancel
						</b-button>
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
									input-style="margin-bottom:0px;"
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
				<slot name="additional" :wbs="wbsNo" :integration="integration">
				</slot>
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

const passValue = val => {
	return isEmpty(val) ? null : val;
};

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
			taskName: this.task.pName,
			workdays: this.task.workdays,
			duration: this.task.duration,
			checkboxPredecessor: "true",
			predecessor: null,
			start: new Date(this.task.pStart),
			finish: new Date(this.task.pEnd),
			oldfinish: new Date(this.task.pEnd),
			taskID: this.task.pID,
			isLoading: false,
			processGroupName: "",
			processGroupID: this.task.processGroupID,
			taskNamePrev: this.task.pName,
			calcMethod: this.task.calcMethod.id,
			calcMethodPrev: this.task.calcMethod.id,
			startPrev: Moment(this.task.pStart).format("DD/MM/YYYY"),
			finishPrev: Moment(this.task.pEnd).format("DD/MM/YYYY"),
			workdaysPrev: this.task.workdays,
			weightPrev: this.task.weight,
			wbsNo: passValue(this.task.wbsNo),
			integration: passValue(this.task.integration),
			weight: this.task.weight,
			weightPercent: this.task.weightPercent,
			roleId: this.task.roleId,
			roleIdPrev: this.task.roleId,
			parent: {
				previous: this.task.pParent,
				current: this.task.pParent,
				name: ""
			}
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
		},
		selectedParent(option) {
			if (option) {
				this.parent.current = option.id;
				this.parent.name = option.name;
			}
		},
		nameParentChanged(value) {
			setTimeout(() => {
				let node = this.dataBaru.find(
					task => task.pName == this.parseTreeName
				);

				if (node === undefined) {
					node = this.dataBaru.find(
						task => task.pID === this.parent.current
					);
				}

				if (node.hasOwnProperty("treeName")) {
					this.parent.name = node.treeName;
				} else {
					this.parent.name = this.getTreeName(node);
				}
			}, 100);
		},
		getParent() {
			if (this.parent.current != 0) {
				let found = this.dataBaru.find(
					task => task.pID === this.parent.current
				);

				if (found != undefined && found.hasOwnProperty("pName")) {
					this.parent.name = this.getTreeName(found);
				} else {
					return "";
				}
			}
		},
		getTreeName(taskNode) {
			let treeName = taskNode.pName;
			let current = taskNode.pParent;

			for (let i = 0; i < 3; i++) {
				if (current != 0) {
					let parent = this.dataBaru.find(
						node => node.pID === current
					);

					if (parent === undefined) {
						console.log("error parent tidak ditemukan:", current);
						return 0;
					}

					let name = parent.pName.split(" ");
					if (name.length > 2) {
						treeName =
							name.slice(0, 2).join(" ") + "… » " + treeName;
					} else {
						treeName =
							name.slice(0, 2).join(" ") + " » " + treeName;
					}

					current = parent.pParent;
				}
			}

			return "※ " + treeName;
		}
	},
	computed: {
		parseTreeName() {
			return this.parent.name
				.replace("※ ", "")
				.replace("…", "")
				.split(" » ")
				.pop();
		},
		autoCompleteParent() {
			let filtered = [];
			let rawName = this.parseTreeName;
			for (let i = 0; i < this.dataBaru.length; i++) {
				const node = this.dataBaru[i];

				let checkName =
					node.pName
						.toString()
						.toLowerCase()
						.indexOf(rawName.toLowerCase()) >= 0;

				if (checkName && node.pID !== this.taskID) {
					let option = { id: node.pID };
					if (node.hasOwnProperty("treeName")) {
						option.name = node.treeName;
					} else {
						this.dataBaru[i].treeName = this.getTreeName(node);
						option.name = this.dataBaru[i].treeName;
					}

					filtered.push(option);
				}
			}

			return filtered;
		},
		filterPredecessor() {
			return this.dataBaru.filter(pre => {
				let preFilter = pre;

				return preFilter && pre.pID != this.taskID;
			});
		},
		finishisoverflow() {
			return this.finish > this.oldfinish;
		}
	},
	beforeMount() {
		this.dataBaru = implantData.GANTT;
		this.dataRole = implantData.ROLE;
	},
	mounted() {
		this.predecessor = this.task.pDepend ? this.task.pDepend : null;
		this.getParent();
		this.getProcessGroup();
	}
};
</script>