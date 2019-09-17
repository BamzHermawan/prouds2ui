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
						<p class="heading">Sub task of</p>
						<b-select expanded v-model="subtask" name="subtask">
							<option value="0">No Parent</option>
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
			dataBaru: GANTT,
			taskName: this.task.pName,
			subtask: this.task.pParent,
			taskID: this.task.pID
		};
	}
};
</script>