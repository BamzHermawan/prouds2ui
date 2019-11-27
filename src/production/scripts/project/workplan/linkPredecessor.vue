<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="projectId" v-model="projectId" />
		<input type="hidden" name="taskID" v-model="taskID" />

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Progress Group</p>
			</div>
			<div class="column">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ processGroupName }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Parent Task</p>
			</div>
			<div class="column">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ task.pName }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Task</p>
			</div>
			<div class="column">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ taskName }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-6">
				<div class="columns">
					<div class="column is-4">
						<p class="label">Start Date</p>
					</div>
					<div class="column">
						<span
							class="button is-static is-fullwidth is-light-blend"
							style="justify-content: start;"
							>{{ start }}</span
						>
					</div>
				</div>
			</div>
			<div class="column is-6">
				<div class="columns">
					<div class="column is-4">
						<p class="label">End Date</p>
					</div>
					<div class="column">
						<span
							class="button is-static is-fullwidth is-light-blend"
							style="justify-content: start;"
							>{{ finish }}</span
						>
					</div>
				</div>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Duration</p>
			</div>
			<div class="column is-1">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ task.duration }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Predecessor</p>
			</div>
			<div class="column">
				<input
					type="hidden"
					name="predecessor"
					v-model="predecessor"
					v-if="predecessor === null || predecessor === ''"
				/>
				<crud-input
					type="select"
					name="predecessor"
					placeholder="This Task Doesn't Have Predecessor"
					v-model="predecessor"
					input-style="margin-bottom:0.5em;"
				>
					<option
						v-for="(opt, name, idx) in filterPredecessor"
						:key="idx"
						:value="opt.pID"
						>{{ opt.pName }}</option
					>

					<template slot="addons">
						<a
							class="button is-warning"
							@click="predecessor = null"
							:disabled="predecessor == null"
						>
							Remove Link
						</a>
					</template>
				</crud-input>
			</div>
		</div>

		<div class="is-pulled-left">
			<button class="button is-success" type="submit" :disabled="btn">
				Update
			</button>
		</div>
		<br />
	</form>
</template>

<script>
import moment from "helper-moment";
import { crudInput } from "components";
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
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			taskName: this.task.pName,
			taskID: this.task.pID,
			taskNew: "",
			listTask: [],
			searchTask: [],
			searchQuery: "",
			name: "",
			start: moment(this.task.pStart).format("dddd, DD MMMM YYYY"),
			finish: moment(this.task.pEnd).format("dddd, DD MMMM YYYY"),
			processGroupName: "",
			processGroupID: this.task.processGroupID,
			predecessor: this.task.pDepend ? this.task.pDepend : null,
			predecessorOri: this.task.pDepend ? this.task.pDepend : null,
			btn: true
		};
	},
	watch: {
		searchQuery: function(newQuery, oldQuery) {
			if (newQuery !== "") {
				let self = this;
				this.listTask = this.searchTask.filter(task =>
					task.pName.toLowerCase().includes(newQuery.toLowerCase())
				);
				console.log(this.searchQuery);
			} else {
				this.listTask = this.listTask;
			}
		},
		predecessor: function(newQuery, oldQuery) {
			if (this.predecessor === this.predecessorOri.toString()) {
				this.btn = true;
			} else {
				this.btn = false;
			}
		}
	},
	methods: {
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
		selectedOptions: {
			get: function() {
				return [this.taskNew];
			},
			set: function(newValue = []) {
				if (newValue.length > 0) {
					this.taskNew = newValue.shift();
				} else {
					this.taskNew = "";
				}
			}
		},
		filterTaskName() {
			this.listTask = this.dataBaru.filter(option => {
				let checkName =
					option.pName
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0;

				return checkName && option.pID != this.taskID;
			});
			this.searchTask = this.listTask;
		},
		filterPredecessor() {
			return this.dataBaru.filter(pre => {
				let preFilter = pre;
				return preFilter && pre.pID != this.taskID;
			});
		}
	},
	mounted() {
		this.filterTaskName;
		this.getProcessGroup();
	}
};
</script>