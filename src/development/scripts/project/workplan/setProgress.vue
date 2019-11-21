<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="workplanId" v-model="workplanId" />
		<input type="hidden" name="taskID" v-model="taskID" />

		<b-field label="Task Name">
			<b-message type="is-info" class="is-on-field">
				<p class="has-text-dark">{{ taskName }}</p>
			</b-message>
		</b-field>
		<div class="columns">
			<div class="column">
				<crud-input
					type="number"
					name="progress"
					label="Progress (%)"
					color="is-info"
					v-model="progress"
					input-style="margin-bottom:0px;"
				>
				</crud-input>
			</div>
			<div class="column">
				<b-field label="EOD Est. Progress (%)">
					<b-message type="is-dark" class="is-on-field">
						<p class="has-text-light has-text-centered">
							{{ estProgress }}
						</p>
					</b-message>
				</b-field>
			</div>
		</div>

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
import { crudInput } from "components";
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
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			taskName: this.task.pName,
			progress: Number(this.task.pComp),
			estProgress: this.task.estProgress,
			taskID: this.task.pID
		};
	}
};
</script>