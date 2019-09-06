 <template>
	<b-field :label="label">
		<div v-if="type === 'datepicker'">
			<input type="hidden" :name="name" v-model="dateModel" />
			<b-datepicker
				expanded
				:month-names="monthList()"
				:date-formatter="dateFormater"
				:placeholder="placeholder"
				v-model="model"
				:inline="inline"
				@input="input"
			>
				<b-button
					@click="model = null"
					type="is-grey"
					class="is-fullwidth"
				>
					<span class="mdi mdi-calendar-remove in-left"></span> Clear
					Selection
				</b-button>
			</b-datepicker>
		</div>
		<b-select
			v-else-if="type === 'select'"
			:placeholder="placeholder"
			v-model="model"
			:name="name"
			expanded
			@input="input"
		>
			<slot></slot>
		</b-select>
		<b-input
			expanded
			v-else-if="type === 'password'"
			:placeholder="placeholder"
			type="password"
			:name="name"
			v-model="model"
			password-reveal
			@input="input"
		>
		</b-input>
		<b-input
			v-else
			expanded
			v-model="model"
			:type="type"
			:name="name"
			@input="input"
			:placeholder="placeholder"
		></b-input>
	</b-field>
</template>
 
 <script>
import Moment from "../../../moment-locale";
export default {
	props: {
		label: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
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
		dateInputFormat: {
			default: undefined
		},
		dateOutputFormat: {
			default: "DD/MM/YYYY"
		},
		dateLocale: {
			type: String,
			default: "id"
		},
		inline: {
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
				this.dateModel = this.value;
			}

			this.model = changed;
		}
	},
	computed: {
		dateModel: {
			set(value) {
				if (value === "" || value === undefined) {
					this.input(null);
				} else if (this.dateInputFormat !== undefined) {
					let valueDate = new Date(
						Moment(this.value, this.dateInputFormat)
					);

					this.input(valueDate);
				} else {
					this.input(value);
				}
			},
			get() {
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
		monthList() {
			Moment.locale(this.dateLocale);
			return Moment.months();
		}
	},
	beforeMount() {
		if (this.type === "datepicker") {
			this.dateModel = this.value;
		}
	}
};
</script>