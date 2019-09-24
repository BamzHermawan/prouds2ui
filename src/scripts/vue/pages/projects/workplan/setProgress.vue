<template>
	<div class="card-modal">
		<form :action="actionEvent" method="POST" enctype="multipart/form-data">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ title }}</p>
			</header>
			<section class="modal-card-body">
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
							<span
								class="button is-info is-fullwidth"
								disabled
								>{{ estProgress }}</span
							>
						</b-field>
					</div>
				</div>
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
			taskName: this.task.pName,
			progress: this.task.pComp,
			estProgress: this.task.estProgress,
			taskID: this.task.pID
		};
	}
};
</script>