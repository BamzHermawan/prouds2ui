<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<form :action="actionEvent" method="POST" enctype="multipart/form-data">
			<section class="modal-card-body">
				<b-field label="Task Name">
					<b-message type="is-info" class="is-on-field">
						<p class="has-text-dark">{{ taskName }}</p>
					</b-message>
				</b-field>
				<input
					type="hidden"
					name="predecessor"
					v-model="selectedOptions"
				/>
				<b-field>
					<b-input
						placeholder="Search Predecessor..."
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
				>
					<option :value="null" class="has-background-grey-lighter"
						><span class="has-text-dark"
							>Doesn't have predecessor</span
						></option
					>
					<option
						v-for="(taska, index) in listTask"
						:key="index"
						:value="taska.pID"
						>{{ taska.pName }}
					</option>
				</b-select>

				<input type="hidden" name="workplanId" v-model="workplanId" />
				<input type="hidden" name="taskID" v-model="taskID" />
			</section>
			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<b-button type="is-danger" @click="$parent.close()"
						>Cancel</b-button
					>
					<button class="button is-success" type="submit">
						Update Link
					</button>
				</div>
			</section>
		</form>
	</div>
</template>

<script>
import moment from "moment";
import CrudInput from "../../../components/crud/crudInput";
export default {
	components: { CrudInput },
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
			predecessor: this.task.pDepend,
			taskID: this.task.pID,
			taskNew: "",
			listTask: [],
			searchTask: [],
			searchQuery: "",
			name: ""
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
		this.filterTaskName();
	}
};
</script>