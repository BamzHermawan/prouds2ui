<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body" style="height: auto;">
			<form :action="actionEvent" method="POST">
				<input type="hidden" name="taskId" v-model="taskId" />
				<crud-input
					type="text"
					label="Task Name"
					placeholder="a name for the task"
					name="taskName"
					v-model="taskName"
					required
				>
				</crud-input>
				<div class="columns">
					<div class="column">
						<crud-input
							type="datepicker"
							label="Old Start Date"
							name="oldStartDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="oldStartDate"
							disabled
						>
						</crud-input>
					</div>
					<div class="column">
						<crud-input
							type="datepicker"
							label="Old End Date"
							name="oldEndDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
							v-model="oldEndDate"
							disabled
						>
						</crud-input>
					</div>
				</div>

				<div class="columns">
					<div class="column">
						<crud-input
							type="datepicker"
							label="New Start Date"
							name="newStartDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
						>
						</crud-input>
					</div>
					<div class="column">
						<crud-input
							type="datepicker"
							label="New End Date"
							name="newEndDate"
							placeholder="Pick Start Date"
							date-locale="en"
							input-style="margin-bottom: 14px;"
						>
						</crud-input>
					</div>
				</div>

				<div class="is-pulled-right">
					<a class="button is-danger" @click="$parent.close()">
						Cancel
					</a>
					<button class="button is-success" type="submit">
						Save
					</button>
				</div>
			</form>
		</section>
	</div>
</template>

<script>
import CrudInput from "../../../components/crud/crudInput";
export default {
	components: { CrudInput },
	props: {
		title: {
			type: String,
			required: true
		},
		actionEvent: {
			type: String,
			required: true
		},
		taskId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			oldStartDate: new Date(),
			oldEndDate: new Date(),
			reallocationDate: new Date(),
			taskName: "Test"
		};
	}
};
</script>