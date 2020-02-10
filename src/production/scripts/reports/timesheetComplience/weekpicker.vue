<template>
	<div class="field">
		<div class="control">
			<b-dropdown
				position="is-bottom-left"
				@active-change="check4Reload"
				@change="changed"
				trap-focus
				paddingless
			>
				<div class="field" slot="trigger">
					<p class="control has-icons-left">
						<input
							class="input"
							type="text"
							v-model="value"
							:placeholder="placeholder"
							readonly
						/>
						<span class="icon is-left">
							<span class="mdi mdi-calendar mdi-24px"></span>
						</span>
					</p>
				</div>

				<b-dropdown-item custom :focusable="false">
					<div class="modal-card" style="width:225px;">
						<section class="modal-card-body is-paddingless">
							<b-field>
								<b-select
									expanded
									placeholder="Month"
									v-model="model.month"
									:disabled="mapping.length == 0"
								>
									<option
										v-for="(month, index) in months"
										:key="'month-' + index"
										>{{ month }}</option
									>
								</b-select>
								<b-select
									placeholder="Year"
									v-model="model.year"
									@input="fetchMap"
								>
									<option
										v-for="year in years"
										:key="'year-' + year"
										>{{ year }}</option
									>
								</b-select>
							</b-field>
						</section>
					</div>
				</b-dropdown-item>
				<hr class="dropdown-divider" />

				<b-dropdown-item
					v-for="{ week, month, start, end } in weeks"
					:value="{ week, month, start, end }"
					:key="'week-' + week"
				>
					<b>W{{ week }}</b
					>: {{ start }} — {{ end }}
				</b-dropdown-item>

				<b-loading
					:is-full-page="false"
					:active.sync="loading"
				></b-loading>
			</b-dropdown>
		</div>
	</div>
</template>

<script>
import Moment from "helper-moment";
import { weekMonthMapping } from "helper-apis";
import { checkConnection, notified } from "helper-tools";
export default {
	props: {
		placeholder: {
			type: String,
			default: "Select date of week"
		},
		defaultToday: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		years() {
			let yearList = [];
			const today = parseInt(Moment().format("YYYY"));
			for (let y = today; y >= 1989; y--) {
				yearList.push(y);
			}

			return yearList;
		},
		months() {
			let monthList = [];
			for (let m = 1; m <= 12; m++) {
				monthList.push(Moment(m.toString(), "M").format("MMMM"));
			}

			return monthList;
		},
		weeks() {
			let weekList = [];

			for (let i = 0; i < this.mapping.length; i++) {
				const week = this.mapping[i];
				const month = Moment(week.month, "MM/YYYY").format("MMMM");
				if (month == this.model.month) {
					weekList.push(week);
				}
			}

			return weekList;
		},
		value: {
			set(val) {
				return val;
			},
			get() {
				const { week, month } = this.model.value;
				return this.formatter({ week, month });
			}
		}
	},
	data() {
		return {
			model: {
				month: null,
				year: null,
				value: {
					week: "",
					month: "",
					start: "",
					end: ""
				}
			},
			loading: true,
			mapping: []
		};
	},
	beforeMount() {
		const today = Moment();
		this.model.month = today.format("MMMM");
		this.model.year = today.format("YYYY");

		this.fetchMap(this.model.year);
	},
	methods: {
		fetchMap(year) {
			const self = this;
			this.loading = true;
			weekMonthMapping(year)
				.then(resp => {
					self.mapping = resp.data;
					self.loading = false;
					self.setDefault();
				})
				.catch(err => {
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
						);
					}
				});
		},
		setDefault() {
			if (this.defaultToday) {
				const found = this.mapping.find(map => {
					const today = Moment();
					const end = Moment(map.end, "DD/MM/YYYY");
					const start = Moment(map.start, "DD/MM/YYYY");
					return (
						(today.isAfter(start) || today.isSame(start)) &&
						(today.isBefore(end) || today.isSame(end))
					);
				});

				if (found) {
					this.model.value = found;
					this.$emit("loaded", found);
				}
			} else {
				this.$emit("loaded", null);
			}
		},
		check4Reload(displayed) {
			if (this.mapping.length <= 0) {
				const today = Moment().format("YYYY");
				this.fetchMap(today);
			}
		},
		changed(item) {
			this.model.value = item;
			this.$emit("change", item);
		},
		formatter({ week, month }) {
			if (week == "" && month == "") {
				return "";
			}

			return "W" + week + Moment(month, "MM/YYYY").format(" MMMM");
		}
	}
};
</script>