<template>
	<div class="crudInput">
		<label v-if="hasAddons !== '' && label != undefined" class="label"
			>{{ label }}{{ required ? "*" : "" }}</label
		>
		<div :class="'field ' + hasAddons + color" :style="inputStyle">
			<label v-if="hasAddons === '' && label != undefined" class="label"
				>{{ label }}{{ required ? "*" : "" }}</label
			>
			<div v-if="type === 'datepicker'">
				<input
					v-if="dateModel !== null"
					type="hidden"
					:name="name"
					v-model="dateModel"
					:loading="loading"
				/>
				<b-datepicker
					expanded
					:icon="iconPicker()"
					:month-names="monthList()"
					:date-formatter="dateFormater"
					:placeholder="placeholder"
					v-model="model"
					:inline="inline"
					@input="input"
					:required="required"
					:position="datePosition"
					:disabled="disabled"
					:loading="loading"
					:readonly="readonly"
					size="is-small"
				>
					<b-button
						@click="model = null"
						type="is-grey"
						class="is-fullwidth"
					>
						<span class="mdi mdi-calendar-remove in-left"></span>
						Clear Selection
					</b-button>
				</b-datepicker>
			</div>
			<b-select
				v-else-if="type === 'select'"
				:placeholder="placeholder"
				v-model="model"
				:name="name"
				:icon="iconPicker()"
				expanded
				@input="input"
				:required="required"
				:disabled="disabled"
				:loading="loading"
				:readonly="readonly"
			>
				<slot></slot>
			</b-select>
			<b-numberinput
				v-else-if="type === 'number'"
				:placeholder="placeholder"
				:type="color"
				:name="name"
				v-model="model"
				:disabled="disabled"
				:loading="loading"
				:readonly="readonly"
			></b-numberinput>
			<b-input
				expanded
				v-else-if="type === 'password'"
				:placeholder="placeholder"
				type="password"
				:name="name"
				:icon="iconPicker()"
				v-model="model"
				password-reveal
				@input="input"
				:required="required"
				:disabled="disabled"
				:loading="loading"
				:readonly="readonly"
			>
			</b-input>
			<b-input
				v-else
				expanded
				v-model="model"
				:type="type"
				:icon="iconPicker()"
				:name="name"
				@input="input"
				:placeholder="placeholder"
				:required="required"
				:disabled="disabled"
				:loading="loading"
				:maxlength="maxLength"
				:readonly="readonly"
			></b-input>
			<slot name="helptext"></slot>
			<div class="control">
				<slot name="addons"></slot>
			</div>
		</div>
	</div>
</template>
 
<script>
import Moment from "helper-moment";
export default {
	props: {
		label: {
			type: String,
			default: undefined
		},
		color: {
			type: String,
			default: ""
		},
		inputStyle: {
			type: String,
			default: "margin-bottom: 23px;"
		},
		maxLength: {
			type: String,
			default: undefined
		},
		icon: {
			type: String,
			default: undefined
		},
		type: {
			type: String,
			default: "text"
		},
		name: {
			type: String,
			required: true
		},
		value: {
			default: null
		},
		placeholder: {
			type: String
		},
		required: {
			type: Boolean,
			default: false
		},
		validation: {
			type: Function,
			default: undefined
		},
		datePosition: {
			type: String,
			default: undefined
		},
		dateInputFormat: {
			default: undefined
		},
		dateOutputFormat: {
			default: "DD/MM/YYYY"
		},
		dateLocale: {
			type: String,
			default: "en"
		},
		inline: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			model: this.value
		};
	},
	watch: {
		value(changed) {
			if (this.type === "datepicker") {
				this.dateModel = new Date(this.value);
			}

			this.model = changed;
		}
	},
	computed: {
		hasAddons() {
			return this.$slots.hasOwnProperty("addons") ? " has-addons " : "";
		},
		dateModel: {
			set(value) {
				if (value === "" || value === undefined) {
					this.input(null);
				} else if (this.dateInputFormat !== undefined) {
					if (
						this.value !== undefined &&
						this.value !== null &&
						this.value !== ""
					) {
						let valueDate = new Date(
							Moment(this.value, this.dateInputFormat)
						);

						this.input(valueDate);
					} else {
						this.input(null);
					}
				} else {
					this.input(value);
				}
			},
			get() {
				let compare = value => this.model === value;
				if (compare(undefined) || compare(null) || compare("")) {
					return null;
				}

				Moment.locale(this.dateLocale);
				return Moment(this.model).format(this.dateOutputFormat);
			}
		}
	},
	methods: {
		input(value) {
			this.model = value;
			this.$emit("input", value);
		},
		dateFormater(date) {
			if (date) {
				Moment.locale(this.dateLocale);
				return Moment(date).format("dddd, DD MMMM YYYY");
			} else {
				return "";
			}
		},
		iconPicker() {
			let compare = color => this.color === color;

			if (compare("is-danger") || compare("is-warning")) {
				return "alert-box";
			} else if (compare("is-success")) {
				return "checkbox-marked";
			} else {
				if (this.type === "datepicker") {
					return "calendar";
				} else {
					return this.icon;
				}
			}
		},
		monthList() {
			Moment.locale(this.dateLocale);
			return Moment.months();
		}
	},
	beforeMount() {
		if (this.type === "datepicker") {
			this.dateModel = this.value;
		}
	},
	mounted() {
		if (this.type === "datepicker") {
			let input = document.querySelector(
				".datepicker.is-small input.is-small"
			);
			input.classList.remove("is-small");
			input.nextElementSibling.classList.remove("is-small");
		}
	}
};
</script>