<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ modalChangePhaseTask.title }}</p>
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
						<b-input
							name="taskName"
							v-model="modalChangePhaseTask.title"
							disabled
						>
						</b-input>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">Phase</p>
						<b-select
							expanded
							v-model="modalChangePhaseTask.phase"
							name="subtask"
						>
							<option value="1">Execution</option>
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
export default {
	data() {
		return {
			modalChangePhaseTask: {
				display: false,
				title: "Change Phase Task",
				phase: 1
			}
		};
	},
	methods: {
		changePhaseTask() {
			this.modalChangePhaseTask.display = true;
		}
	}
};
</script>