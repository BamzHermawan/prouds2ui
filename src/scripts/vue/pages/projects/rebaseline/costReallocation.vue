<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body" style="height: auto;">
			<form :action="actionEvent" method="POST">
				<input type="hidden" name="taskId" v-model="taskId" />
				<input type="hidden" name="actualCost" v-model="actualCost" />
				<crud-input
					type="text"
					label="Budget Actual Cost"
					:value="actualCost | currency"
					@input="actualCostUnformat"
					name=""
				>
				</crud-input>
				<crud-input
					type="datepicker"
					label="Reallocation Date"
					name="reallocationDate"
					placeholder="Pick Reallocation Date"
					date-locale="en"
					input-style="margin-bottom: 14px;"
					v-model="reallocationDate"
				>
				</crud-input>
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
		},
		allowedFile: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			reallocationDate: new Date(),
			actualCost: 10000000000000
		};
	},
	methods: {
		actualCostUnformat(val) {
			let medown = val.replace(/\D/g, "");
			this.actualCost = medown;
		}
	}
};
</script>