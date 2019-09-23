<template>
	<div class="card-modal">
		<section class="modal-card-body">
			<form :action="actionEvent" method="POST">
				<crud-input
					type="select"
					v-model="subtask"
					name="subtask"
					label="Parent Task"
					placeholder="Choose Parent Task"
				>
					<option :value="null">Has No Parent Task</option>
					<option
						v-for="(opt, name, idx) in dataBaru"
						:key="idx"
						:value="opt.pID"
						>{{ opt.pName }}</option
					>
				</crud-input>
				<input type="hidden" name="workplanId" v-model="workplanId" />
				<input type="hidden" name="taskID" v-model="taskID" />
				<button class="button is-fullwidth is-success" type="submit">
					Update Parent
				</button>
			</form>
		</section>
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
			subtask: this.task.pParent,
			taskID: this.task.pID
		};
	}
};
</script>