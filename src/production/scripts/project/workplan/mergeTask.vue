<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="projectId" v-model="projectId" />
		<input type="hidden" name="taskID" v-model="taskID" />

		<div style="margin-bottom:20px">
			<slot name="msg"></slot>
		</div>
		<b-field label="Task Name">
			<b-message type="is-info" class="is-on-field">
				<p class="has-text-dark">{{ taskName }}</p>
			</b-message>
		</b-field>
		<b-field>
			<b-input
				placeholder="Search Destination Task"
				type="search"
				icon="magnify"
				v-model="searchQuery"
			>
			</b-input>
		</b-field>
		<b-select
			multiple
			expanded
			native-size="7"
			v-model="selectedOptions"
			name="destination"
			required
		>
			<option
				v-for="(task, index) in listTask"
				:key="index"
				:value="task.pID"
				>{{ task.pName }}
			</option>
		</b-select>

		<hr />

		<div class="is-pulled-right">
			<button class="button is-success" type="submit">
				Update Progress
			</button>
		</div>
	</form>
</template>

<script>
import moment from "helper-moment";
import crudInput from "components";
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
			destination: null,
			taskNew: "",
			name: "",
			listTask: [],
			searchTask: [],
			searchQuery: ""
		};
	},
	watch: {
		searchQuery: function(newQuery, oldQuery) {
			if (newQuery !== "") {
				let self = this;
				this.listTask = this.searchTask.filter(task =>
					task.pName.toLowerCase().includes(newQuery.toLowerCase())
				);
			} else {
				this.filterTaskName;
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
		}
	},
	mounted() {
		this.filterTaskName;
	}
};
</script>