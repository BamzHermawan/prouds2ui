<template>
	<div class="modal-card" style="min-width:250px;">
		<header class="modal-card-head">
			<p class="modal-card-title">Review</p>
		</header>
		<section class="modal-card-body">
			<input type="hidden" name="feasibility" v-model="feasible_value" />
			<b-field label="Feasibility">
				<b-checkbox v-model="value" :disabled="!editable">
					Feasible
				</b-checkbox>
			</b-field>

			<b-field label="Notes">
				<!-- Insert notes to value attribute to set -->
				<b-input
					type="textarea"
					name="note"
					:required="!feasibility"
					:readonly="!editable"
					minlength="100"
					:value="note"
					placeholder="Insert note about your review"
				>
				</b-input>
			</b-field>

			<b-message
				v-show="feasibility == 'TRUE' && editable"
				type="is-warning"
				size="is-small"
			>
				<p>
					<span class="mdi mdi-alert"></span>
					<span
						>Feasibility process (submit as checked) can not be
						undone!</span
					>
				</p>
			</b-message>
		</section>
		<footer class="modal-card-foot">
			<div class="buttons is-right" style="width:100%">
				<button
					class="button is-long"
					type="button"
					@click="$parent.close()"
				>
					Cancel
				</button>
				<button class="button is-success is-long" v-if="editable">
					Submit
				</button>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	props: {
		feasibility: {
			type: Boolean,
			required: true
		},
		note: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			value: this.feasibility
		};
	},
	computed: {
		feasible_value() {
			return this.feasibility ? "TRUE" : "FALSE";
		},
		editable() {
			return !this.feasibility;
		}
	}
};
</script>