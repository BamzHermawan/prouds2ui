<template>
	<div class="card-modal">
		<form :action="actionEvent" method="POST" enctype="multipart/form-data">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ title }}</p>
			</header>
			<section class="modal-card-body">
				<div style="margin-bottom:20px">
					<b-message type="is-warning">
						<p class="has-text-dark has-text-justified">
							<b>Merge Task</b> allows you to move your resource's
							task assignment and their timesheets to other task,
							it also delete the old task afterwards. By merging
							task, it merge task date, assignment, task
							predecessor, and also a possibility to change the
							start date of the destination task
						</p>
					</b-message>
				</div>
				<b-field label="Task Name">
					<b-message type="is-info" class="is-on-field">
						<p class="has-text-dark">{{ taskName }}</p>
					</b-message>
				</b-field>
				<!-- <p class="label">Destination Task</p>
				<input type="hidden" name="destination" v-model="destination" />
				<b-autocomplete
					style="margin-bottom:10px;"
					v-model="name"
					placeholder="Choose Destination Task"
					:open-on-focus="true"
					:data="filterTaskName"
					field="pName"
					@select="option => (selected = option)"
				>
				</b-autocomplete> -->
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
					native-size="5"
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
				<input type="hidden" name="workplanId" v-model="workplanId" />
				<input type="hidden" name="taskID" v-model="taskID" />
			</section>
			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<a class="button is-danger" @click="$parent.close()">
						Cancel
					</a>
					<button class="button is-success" type="submit">
						Update Progress
					</button>
				</div>
			</section>
		</form>
	</div>
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
		workplanId: {
			type: String,
			required: true
		},
		title: {
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
			name: "",
			selected: null,
			listTask: [],
			searchTask: [],
			searchQuery: ""
		};
	},
	watch: {
		name: function() {
			if (this.selected != undefined) {
				this.destination = this.selected.pID;
			} else {
				this.destination = "";
			}
		},
		searchQuery: function(newQuery, oldQuery) {
			if (newQuery !== "") {
				let self = this;
				this.listTask = this.searchTask.filter(task =>
					task.pName.toLowerCase().includes(newQuery.toLowerCase())
				);
			} else {
				this.listTask = this.listTask;
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