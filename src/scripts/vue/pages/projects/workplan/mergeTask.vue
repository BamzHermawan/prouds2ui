<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body">
			<div style="margin-bottom:20px">
				<b-message class="messagemergetask" type="is-info">
					<b>Merge Task</b> allows you to move your resource's task
					assignment and their timesheets to other task, it also
					delete the old task afterwards. By merging task, it merge
					task date, assignment, task predecessor, and also a
					possibility to change start date of destination task
				</b-message>
			</div>
			<form
				:action="actionEvent"
				method="POST"
				enctype="multipart/form-data"
			>
				<div class="columns">
					<div class="column">
						<p class="heading">Task Name</p>
						{{ taskName }}
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">Destination Task</p>
						<b-select
							expanded
							v-model="destination"
							name="destination"
						>
							<option
								v-for="(opt, name, idx) in dataBaru"
								:key="idx"
								:value="opt.pID"
								>{{ opt.pName }}</option
							>
						</b-select>
					</div>
				</div>
				<input type="hidden" name="workplanId" v-model="workplanId" />
				<button class="button is-fullwidth is-success" type="submit">
					Submit Document
				</button>
			</form>
		</section>
	</div>
</template>

<script>
import moment from "moment";
export default {
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
			destination: 1
		};
	}
};
</script>