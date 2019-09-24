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

				<crud-input
					label="Predecessor"
					type="select"
					name="predecessor"
					v-model="predecessor"
					input-style="margin-bottom:0px;"
				>
					<option :value="null">Doesn't Have Predecessor</option>
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
			taskID: this.task.pID
		};
	}
};
</script>