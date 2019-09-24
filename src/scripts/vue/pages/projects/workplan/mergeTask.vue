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
				<crud-input
					label="Destination Task"
					v-model="destination"
					name="destination"
					type="select"
					placeholder="Choose Task to Merge to"
					input-style="margin-bottom: 0px;"
				>
					<option
						v-for="(opt, name, idx) in dataBaru"
						:key="idx"
						:value="opt.pID"
						>{{ opt.pName }}</option
					>
				</crud-input>
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
			destination: 1,
			taskID: this.task.pID
		};
	}
};
</script>