<template>
	<div class="loader-container-purrfect" style="min-height: 350px;">
		<div
			v-show="!loading && usermap.length > 0"
			class="pindex-table-container add-max-height map-table-reuse is-60-1fr"
		>
			<div class="pindex-table-left">
				<table
					style="border-right-style: double;"
					class="table is-narrow is-bordered is-fullwidth"
				>
					<thead>
						<tr>
							<th
								class="is-triple-decker has-bg-info-lighter"
								align
							>
								Name
							</th>
							<th
								class="is-triple-decker has-bg-info-lighter"
								align
							>
								NIK
							</th>
							<th
								class="is-triple-decker has-bg-info-lighter"
								align
							>
								<abbr title="Employee Status">Status</abbr>
							</th>
							<th
								class="is-triple-decker has-bg-info-lighter"
								align
							>
								Job Role
							</th>
							<th
								class="is-triple-decker has-bg-info-lighter"
								align
							>
								Join Date
							</th>
							<th
								class="is-triple-decker has-bg-info-lighter"
								style="width: 80px;"
								align
							>
								Total Workhours
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							@mouseover="hoverRow"
							@mouseout="removeHoverRow"
							:data-row="user.nik"
							v-for="(user, index) in usermap"
							:key="user.nik + '-' + index"
						>
							<td>
								<abbr
									:title="user.name"
									v-if="user.name.split(' ').length > 3"
									style="cursor:help; text-decoration:none;"
									>{{ user.name | shortName(3) }}</abbr
								>
								<span v-else>{{ user.name }}</span>
							</td>
							<td>{{ user.nik }}</td>
							<td class="has-text-centered">
								<abbr
									:title="user.status"
									v-if="user.status.split(' ').length > 1"
									style="cursor:help; text-decoration:none;"
									>{{ user.status | elipsisTxt(1) }}</abbr
								>
								<span v-else>{{ user.status }}</span>
							</td>
							<td>{{ user.role }}</td>
							<td class="has-text-centered">
								<abbr
									:title="user.join | fulldate"
									style="text-decoration:none;"
									>{{ user.join }}</abbr
								>
							</td>
							<td
								:class="
									barrierChecker(user, 'has-text-centered')
								"
							>
								<b>{{ totalWorkHour(user) }}</b>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pindex-table-right">
				<table
					v-if="!timeout"
					class="table is-narrow is-bordered is-fullwidth"
				>
					<thead>
						<tr>
							<th
								v-for="month in monthHeader"
								:key="'month-name-' + month.name.toLowerCase()"
								:colspan="month.days.length"
								class="has-text-centered has-bg-success-lighter add-green-border"
							>
								{{ month.name }}
							</th>
						</tr>
						<tr>
							<template v-for="(month, i) in monthHeader">
								<th
									:class="weekEndClass(day, true)"
									v-for="(day, index) in month.days"
									:key="
										'day-number-' + index + '-' + day.D + i
									"
								>
									{{ day.D }}
								</th>
							</template>
						</tr>
						<tr>
							<template v-for="(month, i) in monthHeader">
								<th
									:class="weekEndClass(day, true)"
									v-for="(day, index) in month.days"
									:key="'dn-' + index + '-' + day.dd + i"
								>
									{{ day.dd }}
								</th>
							</template>
						</tr>
					</thead>
					<tbody>
						<tr
							@mouseover="hoverRow"
							@mouseout="removeHoverRow"
							:data-row="user.nik"
							v-for="(user, index) in usermap"
							:key="user.nik + '-map-' + index"
						>
							<template v-for="(day, n) in user.score">
								<td
									:key="'map-day-' + n"
									:class="weekEndClass(day)"
								>
									<abbr
										style="text-decoration:none!important;"
										:title="getValueTooltip(user.name, day)"
										>{{ day.value }}</abbr
									>
								</td>
							</template>
						</tr>
					</tbody>
				</table>

				<div
					v-if="timeout"
					class="fetch-is-timeout-wrapper animated"
					@click="reloadMap"
				>
					<p
						class="has-text-grey sticky"
						:style="'top:' + stickyTop + 'px;'"
					>
						<span class="animated fadeIn fast">
							<slot>
								Sorry, we are having problem connecting to
								server and can't get related data for this
								table. 😔
								<br /><b class="has-text-info"
									>click to refresh</b
								>.
							</slot>
						</span>
					</p>
				</div>
			</div>
		</div>
		<b-message v-show="usermap.length == 0 && !timeout">
			<slot name="whenEmpty"></slot>
		</b-message>
		<b-message
			type="is-danger"
			v-show="usermap.length == 0 && timeout"
			class="animated fadeIn slower"
		>
			<p class="has-text-centered has-text-dark">
				Sorry, we are having problem connecting to server and can't get
				related data for this table. 😔
			</p>
			<p class="has-text-centered has-text-dark">
				Please check your connection, then try again later..
			</p>
		</b-message>
		<b-loading :is-full-page="false" :active.sync="loading"></b-loading>
	</div>
</template>

<script>
import fetch from "helper-apis";
import Moment from "helper-moment";
import { isEmpty, checkConnection, notified } from "helper-tools";

export default {
	data() {
		return {
			errorFetch: false,
			loading: true,
			timeout: false,
			usermap: [],
			unitID: null,
			contentScroll: 0,
			monthHeader: [],
			mapRange: {
				start: null,
				end: null
			}
		};
	},
	computed: {
		stickyTop() {
			if (this.contentScroll > 0) {
				return this.contentScroll - 100;
			}

			return this.contentScroll;
		}
	},
	methods: {
		moment: Moment,
		totalWorkHour(usermap) {
			if (usermap.hasOwnProperty("score")) {
				if (usermap.score.length > 0) {
					let sum = usermap.score.reduce((a, b) => {
						return {
							value: a.value + b.value
						};
					});

					return sum.value;
				}
			}

			return 0;
		},
		barrierChecker(row, classes) {
			const twh = this.totalWorkHour(row);
			if (twh < row.twhBarrier) {
				return classes + " has-bg-danger-light";
			}

			return classes;
		},
		getValueTooltip(user, day) {
			let tgl = Moment(day.date, "DD/MM/YYYY").format("ddd, D MMM YYYY");
			return user + " work " + day.value + " hours on " + tgl;
		},
		weekEndClass(day, isHeader = false) {
			let weekend = false;
			let endMonth = false;
			let hasWarning = false;

			if (isHeader === false) {
				// days from usermap[].score that only have { date, value };
				let theDay = Moment(day.date, "DD/MM/YYYY");
				let dd = theDay.format("dd");
				weekend = dd == "Su" || dd == "Sa";

				let endDay = theDay.daysInMonth();
				endMonth = endDay == theDay.format("D");

				hasWarning = day.alert;
			} else {
				// days from setHeader that have data isWeekend;
				weekend = day.isWeekend;
				endMonth = day.endDay == day.D;
			}

			return {
				"has-text-centered": true,
				"has-background-grey-lighter": weekend && !hasWarning,
				"has-bg-success-lighter": !weekend && isHeader,
				"has-bg-danger-light": hasWarning,
				"add-green-border": endMonth
			};
		},
		reloadTable(unit = null, range = null) {
			if (unit !== null) {
				this.unitID = unit;
			}

			if (range !== null) {
				this.mapRange = range;
			}

			this.loading = true;
			this.timeout = false;
			this.fetchUser();
		},
		reloadMap(range = null) {
			if (range !== null) {
				this.mapRange = range;
			}

			if (this.usermap.length > 0) {
				this.loading = true;
				this.fetchMap();
			} else {
				this.timeout = false;
				this.reloadTable();
			}
		},
		hoverRow(e) {
			let row = e.target.getAttribute("data-row");
			if (isEmpty(row)) {
				row = e.target.parentNode.getAttribute("data-row");
			}

			let atHover = document.querySelectorAll(
				'tr[data-row="' + row + '"]'
			);
			atHover.forEach(node => {
				node.classList.add("is-hover");
			});
		},
		removeHoverRow() {
			let isHover = document.querySelectorAll("tr.is-hover");
			isHover.forEach(node => {
				node.classList.remove("is-hover");
			});
		},
		fetchUser() {
			if (this.unitID !== undefined) {
				let self = this;
				fetch
					.getUserByUnit(this.unitID)
					.then(res => {
						let users = res.data;
						if (!isEmpty(users)) {
							self.usermap = users;
							self.fetchMap();
						}
					})
					.catch(err => {
						if (self.errorFetch) return 0;

						if (checkConnection(self.$notification)) {
							notified(self.$notification).error(
								"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
							);

							self.errorFetch = true;
							self.loading = false;
							self.timeout = true;
							setTimeout(() => (self.errorFetch = false), 5000);
						}
					});
			}
		},
		fetchMap() {
			if (this.unitID !== undefined) {
				let self = this;
				fetch
					.timesheetComplience(this.unitID, this.mapRange)
					.then(res => {
						let map = res.data;
						if (!isEmpty(map) && map instanceof Array) {
							for (let i = 0; i < self.usermap.length; i++) {
								if (self.usermap[i].hasOwnProperty("nik")) {
									const nik = self.usermap[i].nik;
									const item = map.find(
										item => item.nik == nik
									);

									self.usermap[i].score = item.score;

									if (item.hasOwnProperty("whTotalBarrier")) {
										self.usermap[i].twhBarrier =
											item.whTotalBarrier;
									} else {
										self.usermap[i].twhBarrier = 0;
									}
								}
							}

							self.setMonthHeader(map[0]);
						}
					})
					.catch(err => {
						if (self.errorFetch) return 0;

						if (checkConnection(self.$notification)) {
							notified(self.$notification).error(
								"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
							);

							self.errorFetch = true;
							self.timeout = true;
							setTimeout(() => (self.errorFetch = false), 5000);
						}
					})
					.finally(() => (self.loading = false));
			}
		},
		setMonthHeader(map) {
			if (map.hasOwnProperty("score")) {
				const maps = this.usermap[0].score;

				let days = [];
				let months = [];
				for (let i = 0; i < maps.length; i++) {
					let mDate = Moment(maps[i].date, "DD/MM/YYYY");
					let dd = mDate.format("dd");

					let isWeekend = dd == "Su" || dd == "Sa";
					let day = {
						month: mDate.format("MMMM YYYY"),
						date: maps[i].date,
						D: mDate.format("D"),
						isWeekend: isWeekend,
						endDay: mDate.daysInMonth(),
						dd: dd
					};

					days.push(day);
					if (!months.includes(day.month)) {
						months.push(day.month);
					}
				}

				let header = [];
				for (let j = 0; j < months.length; j++) {
					let found = days.filter(day => day.month === months[j]);

					header.push({
						name: months[j],
						days: found
					});
				}

				this.monthHeader = header;
			}
		}
	},
	beforeMount() {
		if (this.unitID !== null) {
			this.reloadTable();
		} else {
			this.loading = false;
		}
	},
	mounted() {
		let self = this;
		document.querySelector(".contentPage").onscroll = function(e) {
			let target = e.target;
			self.contentScroll = target.scrollTop;
		};
	}
};
</script>