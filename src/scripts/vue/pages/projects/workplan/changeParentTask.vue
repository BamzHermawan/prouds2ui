<template>
	<div class="card-modal">
		<form :action="actionEvent" method="POST">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ title }}</p>
			</header>
			<section class="modal-card-body">
				<crud-input
					type="select"
					v-model="subtask"
					name="subtask"
					label="Parent Task"
					placeholder="Choose Parent Task"
					input-style="margin-bottom:0px;"
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
			</section>
			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<b-button type="is-danger" @click="$parent.close()"
						>Cancel</b-button
					>
					<button class="button is-success" type="submit">
						Update Parent
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
			subtask: this.task.pParent,
			taskID: this.task.pID
		};
	}
};
</script>