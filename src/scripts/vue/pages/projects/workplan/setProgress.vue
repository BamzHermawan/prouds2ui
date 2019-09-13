<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body">
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
						<p class="heading">Progress (%)</p>
						<b-input name="progress" v-model="progress"></b-input>
					</div>
					<div class="column">
						<p class="heading">EOD Est. Progress (%)</p>
						<b-input v-model="estProgress" disabled></b-input>
					</div>
				</div>
				<input type="hidden" name="workplanId" v-model="workplanId" />
				<input type="hidden" name="taskID" v-model="taskID" />
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
			taskName: this.task.pName,
			progress: this.task.pComp,
			estProgress: this.task.estProgress,
			taskID: this.task.pID
		};
	}
};
</script>