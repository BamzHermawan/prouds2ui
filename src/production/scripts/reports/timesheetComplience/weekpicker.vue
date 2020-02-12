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
					:disabled="isWeekDisabled(start)"
					:key="'week-' + week"
				>
					<b>W{{ week }}</b
					>: {{ start }} — {{ end }}
				</b-dropdown-item>

				<template v-if="resetable && !isEmpty">
					<hr class="dropdown-divider" />
					<b-dropdown-item custom :focusable="false">
						<div class="modal-card" style="width:225px;">
							<section class="modal-card-body is-paddingless">
								<b-field expanded>
									<b-button
										type="is-warning is-fullwidth"
										size="is-small"
										@click="reset"
										>Reset</b-button
									>
								</b-field>
							</section>
						</div>
					</b-dropdown-item>
				</template>

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
		},
		min: {
			type: Date,
			default: undefined
		},
		resetable: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		min(updated) {
			if (updated == undefined) {
				return 0;
			}

			this.model.month = Moment(this.min).format("MMMM");
			if (updated.getFullYear() != this.model.year) {
				this.model.year = Moment(this.min).format("YYYY");
				this.fetchMap(this.model.year, true);
			}
		}
	},
	computed: {
		isEmpty() {
			return this.model.value.start == "";
		},
		years() {
			const minYear = this.getMinDate("YYYY", 1990);
			const today = parseInt(Moment().format("YYYY"));
			if (today == minYear) {
				return [today];
			}

			let yearList = [];
			let min = today > minYear ? minYear : 1990;
			for (let y = today; y >= min; y--) {
				yearList.push(y);
			}

			return yearList;
		},
		months() {
			let monthList = [];
			const min = this.getMinDate(null, null);
			if (min === null) {
				for (let m = 0; m < 12; m++) {
					const mdate = Moment([this.model.year, m, 1]).endOf(
						"month"
					);

					if (mdate.isSameOrBefore(Moment(), "month")) {
						monthList.push(mdate.format("MMMM"));
					}
				}
			} else {
				for (let m = 0; m < 12; m++) {
					const mdate = Moment([this.model.year, m, 1]).endOf(
						"month"
					);

					if (
						mdate.isAfter(min) &&
						mdate.isSameOrBefore(Moment(), "month")
					) {
						monthList.push(mdate.format("MMMM"));
					}
				}
			}

			return monthList;
		},
		weeks() {
			let weekList = [];

			for (let i = 0; i < this.mapping.length; i++) {
				const week = this.mapping[i];
				const month = Moment(week.month, "MM/YYYY").format("MMMM");
				const start = Moment(week.start, "DD/MM/YYYY");
				if (
					month == this.model.month &&
					start.isSameOrBefore(Moment())
				) {
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
		getMinDate(format = null, fallback = null) {
			if (this.min === undefined) {
				return fallback;
			}

			if (format !== null) {
				return Moment(this.min).format(format);
			}

			return Moment(this.min);
		},
		fetchMap(year, align = false) {
			const self = this;
			this.loading = true;
			weekMonthMapping(year)
				.then(resp => {
					let initializing = self.mapping.length == 0;
					self.mapping = resp.data;
					self.loading = false;

					if (initializing) {
						self.setDefault();
					} else if (align) {
						self.alignSelected(self.getMinDate(null, Moment()));
					}
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
					const end = Moment(map.end, "DD/MM/YYYY");
					const start = Moment(map.start, "DD/MM/YYYY");
					return Moment().isBetween(start, end, null, "[]");
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
		alignSelected(target) {
			this.model.year = target.format("YYYY");
			this.model.month = target.format("MMMM");

			if (this.mapping.length > 0) {
				const found = this.mapping.find(week => {
					const end = Moment(map.end, "DD/MM/YYYY");
					const start = Moment(map.start, "DD/MM/YYYY");
					return target.isBetween(start, end, null, "[]");
				});

				if (found) {
					this.changed(found);
				}
			}
		},
		reset() {
			this.model.value = {
				week: "",
				month: "",
				start: "",
				end: ""
			};

			this.$emit("change", null);
		},
		changed(item) {
			this.model.value = item;
			this.$emit("change", item);
		},
		formatter({ week, month }) {
			if (week == "" && month == "") {
				return "";
			}

			return "W" + week + Moment(month, "MM/YYYY").format(": MMMM YYYY");
		},
		isWeekDisabled(weekStart) {
			if (this.getMinDate() === null) {
				return false;
			}

			return Moment(weekStart, "DD/MM/YYYY").isBefore(this.getMinDate());
		}
	}
};
</script>