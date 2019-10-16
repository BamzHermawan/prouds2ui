<template>
	<section class="card-content animated fadeIn">
		<form :action="action" :method="method">
			<slot>
				<b-field
					v-for="(input, index) in model"
					:label="input.label"
					:key="index"
				>
					<b-datepicker
						expanded
						v-if="input.type === 'datepicker'"
						placeholder="DD/MM/YYYY"
						v-model="input.value"
						:name="input.name"
					></b-datepicker>
					<b-select
						v-else-if="input.type === 'select'"
						:placeholder="input.placeholder"
						v-model="input.value"
						:name="input.name"
						expanded
					>
						<option
							v-for="(option, index) in input.option"
							:key="index"
							:value="
								typeof option === 'string' ? option : option.key
							"
							>{{
								typeof option === "string"
									? option
									: option.text | capitalize
							}}</option
						>
					</b-select>
					<b-input
						expanded
						v-else-if="input.type === 'password'"
						type="password"
						:name="input.name"
						v-model="input.value"
						password-reveal
					>
					</b-input>
					<b-input
						v-else
						expanded
						v-model="input.value"
						:type="input.type"
						:name="input.name"
					></b-input>
				</b-field>
			</slot>
			<div style="margin-top: 28px;">
				<b-button
					type="is-danger"
					@click="$emit('cancel')"
					style="min-width: 150px;"
				>
					Cancel
				</b-button>
				<button
					style="min-width: 150px;"
					class="button is-success"
					type="submit"
				>
					Save
				</button>
			</div>
		</form>
	</section>
</template>

<script>
import Moment from "helper-moment";
import CrudInput from "./crudInput";
export default {
	components: { CrudInput },
	props: {
		action: {
			type: String,
			required: true
		},
		method: {
			type: String,
			default: "post"
		},
		formData: {
			type: Object
		}
	},
	data() {
		return {
			model: []
		};
	},
	beforeMount() {
		for (const key in this.formData) {
			let input = this.formData[key];
			input.name = key;
			if (input.type === "datepicker") {
				input.value = new Date(Moment(input.value, "DD/MM/YYYY"));
			}

			this.model.push(input);
		}
	},
	methods: {
		getModel(name) {
			return this.model[name];
		}
	},
	filters: {
		capitalize(value) {
			return value.replace(/^\w|\s\w/g, function(bit) {
				return bit.toUpperCase();
			});
		}
	}
};
</script>