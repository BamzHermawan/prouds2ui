<template>
	<div class="container">
		<p class="title is-size-4">{{ title }}</p>
		<form :action="action" :method="method">
			<div v-for="(input, index) in model" :key="index" class="columns">
				<div class="column is-2">
					<p class="heading">
						{{ input.label }}
					</p>
				</div>
				<div class="column">
					<b-field v-if="input.type === 'select'">
						<b-select
							expanded
							v-model="input.value"
							:name="input.name"
						>
							<option
								v-for="(opt, name, idx) in input.select"
								:key="idx"
								:value="name"
								>{{ opt }}</option
							>
						</b-select>
					</b-field>
					<b-field v-else>
						<b-input
							expanded
							v-model="input.value"
							:type="input.type"
							:name="input.name"
						></b-input>
					</b-field>
				</div>
			</div>
			<div class="container">
				<b-button type="is-danger" @click="onCancel">
					Cancel
				</b-button>
				<button class="button is-success" type="submit">
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		method: {
			type: String,
			default: "post"
		},
		formData: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			model: {}
		};
	},
	mounted() {
		this.model = this.formData;
	},
	methods: {
		onCancel() {
			window.history.back();
		},
		getModel(name) {
			return this.model[name];
		}
	}
};
</script>