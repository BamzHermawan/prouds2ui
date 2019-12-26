<template>
	<div class="loader-container-purrfect" style="min-height: 350px;">
		<div
			v-show="!tableLoading"
			class="pindex-table-container add-max-height"
		>
			<div class="pindex-table-left">
				<table class="table is-narrow is-bordered is-fullwidth">
					<thead>
						<tr>
							<th class="is-double-decker" align>Task</th>
							<th class="is-double-decker" align>Weight</th>
							<th class="is-double-decker" align>
								<abbr title="Task Start Date">Start</abbr>
							</th>
							<th class="is-double-decker" align>
								<abbr title="Task End Date">End</abbr>
							</th>
							<th class="is-double-decker" align>
								<abbr title="Task Current Progress"
									>Progress</abbr
								>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							@mouseover="hoverRow"
							@mouseout="removeHoverRow"
							:data-row="row.id"
							v-for="(row, idx) in tasks"
							:key="'row-' + idx"
							:class="isTaskRoot(row)"
							:data-parent="row.parent"
						>
							<td
								@click="emitRowClick(row)"
								:class="levelCheck(row, idx)"
							>
								<span
									v-if="row.hasChild"
									class="mdi mdi-toggle-folder"
									@click.stop="toggleChild(row.id)"
								></span>
								<span
									v-else
									class="mdi mdi-file-outline is-marginless"
								></span>
								<abbr :title="row.name">{{ row.name }}</abbr>
							</td>
							<td class="has-text-right">
								{{ row.weight.toFixed(2) }}%
							</td>
							<td class="has-text-right">{{ row.start }}</td>
							<td class="has-text-right">{{ row.end }}</td>
							<td
								@click="
									isDelay(row.weight, row.progress).open(idx)
								"
								:class="
									'has-text-right' +
										isDelay(
											row.weight,
											row.progress
										).bg.danger()
								"
							>
								{{ row.progress.toFixed(2) }}%
							</td>
						</tr>
						<tr>
							<td colspan="5" class="has-background-light">
								<b>Current Progress of</b>
							</td>
						</tr>
						<tr>
							<td colspan="5" class="has-background-light">
								<b>Σ Progress</b>
							</td>
						</tr>
						<tr>
							<td colspan="5" class="has-background-light">
								<b>Δ Progress</b>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="pindex-table-right" @scroll="listenScroll">
				<table class="table is-narrow is-bordered is-fullwidth">
					<thead>
						<tr>
							<th
								v-for="n in weekCount"
								:key="'header-week-' + n"
								class="has-border-right-bold"
								colspan="2"
								align
							>
								Week #{{ n }}
							</th>
							<td
								id="rocketLoadProgress"
								v-if="fetchingProgress"
								style="border-style:none;"
								class="has-background-light"
							>
								<span class="animated flash infinite slower"
									>🚀</span
								>
							</td>
						</tr>
						<tr>
							<template v-for="n in weekCount">
								<th align :key="'hyy-' + n">Plan</th>
								<th
									align
									:key="'hyyy-' + n"
									class="has-border-right-bold"
								>
									Actual
								</th>
							</template>
							<td
								v-if="fetchingProgress"
								style="border-style:none;"
								class="has-background-light"
							>
								<span class="animated flash infinite slower"
									>🚀</span
								>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr
							@mouseover="hoverRow"
							@mouseout="removeHoverRow"
							:data-row="task.id"
							v-for="(task, idx) in progress.tasks"
							:class="isTaskRoot(tasks[idx])"
							:key="'week-' + idx"
						>
							<template v-for="(weekly, n) in task.weekly">
								<td align="right" :key="'week-task-plan-' + n">
									<b class="has-text-link">
										{{ weekly.plan | stripWhenEmpty }}
									</b>
								</td>
								<td
									align="right"
									class="has-border-right-bold"
									:class="
										isDelay(
											weekly.plan,
											weekly.actual
										).bg.warning()
									"
									@click="
										isDelay(
											weekly.plan,
											weekly.actual
										).open(idx, n, false)
									"
									:key="'week-task-actual-' + n"
								>
									<b class="has-text-success">
										{{ weekly.actual | stripWhenEmpty }}
									</b>
								</td>
							</template>

							<td
								v-if="fetchingProgress"
								style="border-style:none;"
								class="has-background-light"
							>
								<span class="animated flash infinite slower"
									>🚀</span
								>
							</td>
						</tr>

						<tr class="has-background-light">
							<template v-for="(total, n) in progress.total">
								<td align="right" :key="'total1-' + n">
									<b class="has-text-link">{{
										total.plan | stripWhenEmpty
									}}</b>
								</td>
								<td
									align="right"
									:key="'total2-' + n"
									class="has-border-right-bold"
								>
									<b class="has-text-success">{{
										total.actual | stripWhenEmpty
									}}</b>
								</td>
							</template>

							<td
								v-if="fetchingProgress"
								style="border-style:none;"
								class="has-background-light"
							>
								<span class="animated flash infinite slower"
									>🚀</span
								>
							</td>
						</tr>

						<tr class="has-background-light">
							<template v-for="(sigma, n) in progress.sigma">
								<td align="right" :key="'sigma1-' + n">
									<b class="has-text-link">{{
										sigma.plan | stripWhenEmpty
									}}</b>
								</td>
								<td
									align="right"
									:key="'sigma2-' + n"
									class="has-border-right-bold"
								>
									<b class="has-text-success">{{
										sigma.actual | stripWhenEmpty
									}}</b>
								</td>
							</template>

							<td
								v-if="fetchingProgress"
								style="border-style:none;"
								class="has-background-light"
							>
								<span class="animated flash infinite slower"
									>🚀</span
								>
							</td>
						</tr>

						<tr class="has-background-light">
							<td
								:key="'delta-' + n"
								colspan="2"
								align="right"
								class="has-border-right-bold"
								v-for="(delta, n) in progress.delta"
							>
								<b class="has-text-success">{{
									delta | stripWhenEmpty
								}}</b>
							</td>

							<td
								v-if="fetchingProgress"
								style="border-style:none;"
								class="has-background-light"
							>
								<span class="animated flash infinite slower"
									>🚀</span
								>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<b-loading
			:is-full-page="false"
			:active.sync="tableLoading"
		></b-loading>
	</div>
</template>

<script>
import Tasks from "./taskController";
import { isEmpty } from "helper-tools";

export default {
	name: "pindexTable",
	props: {
		projectId: {
			type: String,
			required: true
		},
		weekLimit: {
			type: Number,
			default: 10
		},
		gapTreshold: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			weekCount: 1,
			progress: {
				total: [],
				sigma: [],
				delta: [],
				tasks: []
			},
			root: undefined,
			tasks: [],
			descendant: [],
			fetchingProgress: false,
			tableLoading: true
		};
	},
	watch: {
		projectId(change) {
			if (!isEmpty(change)) this.fetchData(change);
		}
	},
	methods: {
		// listen to table left horizontal scroll
		listenScroll(e) {
			let target = e.target;
			let maxScroll = target.scrollWidth - target.clientWidth;

			if (target.scrollLeft > maxScroll - 5 && !this.fetchingProgress) {
				if (this.progress.week_total <= this.progress.week_end) {
					this.fetchingProgress = false;
					return false;
				}

				this.fetchingProgress = true;
				target.parentNode.scrollLeft = target.offsetLeft;
				setTimeout(() => this.fetchWeekly(this.progress), 500);
			}
		},

		// fetch weekly progress to backend
		fetchWeekly(toMerge = null) {
			let self = this;
			this.root.weekly(
				this.weekCount,
				this.weekLimit,
				(response, err) => {
					if (isEmpty(response)) {
						// ! error notification
						console.log(err);
					} else {
						self.weekCount = response.week_count;
						self.progress = response;
						self.fetchingProgress = false;
						self.tableLoading = false;
					}
				},
				toMerge
			);
		},

		// fetch data tasks to backend
		fetchData(projectId) {
			let self = this;
			if (!isEmpty(projectId)) {
				this.root = new Tasks(projectId);
				this.root.fetch((tasks, err) => {
					if (!isEmpty(err)) {
						// ! error notification
						console.log(err);
					} else {
						self.tasks = tasks.parseArray;
						self.descendant = tasks.descendant;
						self.fetchWeekly();

						self.$emit("loaded", this);
					}
				});
			}
		},

		// emit task name row clicked so parent could do something
		emitRowClick(row) {
			this.$emit("rowclicked", row);
		},

		// method to determine wether task is delayed or not
		isDelay(plan, actual) {
			let roofGap = plan - this.gapTreshold;
			const checkStatus = function(useGap = true) {
				if (isEmpty(actual)) {
					return false;
				}

				if (useGap) {
					return roofGap > actual;
				} else {
					return plan > actual;
				}
			};

			return {
				status: checkStatus,
				bg: {
					danger: () => {
						if (checkStatus()) {
							return " is-fall-behind ";
						}

						return "";
					},
					warning: () => {
						if (checkStatus(false)) {
							return " is-fall-behind-warning ";
						}

						return "";
					}
				},
				open: (index, week = null, useGap = true) => {
					if (checkStatus(useGap)) {
						console.log(week);
						this.$emit("redclicked", {
							task: this.tasks[index],
							useGap: useGap,
							week
						});
					}
				}
			};
		},

		// give hover highlight
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

		// remove hover highlight
		removeHoverRow() {
			let isHover = document.querySelectorAll("tr.is-hover");
			isHover.forEach(node => {
				node.classList.remove("is-hover");
			});
		},

		// determine is task a root then give highlight class
		isTaskRoot(task) {
			if (task.level == 0) {
				return " has-background-light ";
			}

			return "";
		},

		// check which padding level a task row needed
		levelCheck(row, index) {
			return "is-task-name has-text-info is-level-" + row.level;
		},

		// toggle display descendant
		toggleChild(taskId) {
			let self = document.querySelector("[data-row='" + taskId + "']");
			let isHidden = self.classList.contains("is-folded");
			let task = this.descendant.find(task => task.id === taskId);

			for (let i = 0; i < task.descendant.length; i++) {
				const child = task.descendant[i];
				if (isHidden) {
					document
						.querySelectorAll("[data-row='" + child + "']")
						.forEach(node => {
							node.classList.remove("is-hidden", "is-folded");
						});
				} else {
					document
						.querySelectorAll("[data-row='" + child + "']")
						.forEach(node => {
							node.classList.add("is-hidden");
						});
				}
			}

			self.classList.toggle("is-folded");
		}
	},
	filters: {
		stripWhenEmpty(value) {
			if (isEmpty(value)) {
				return "-";
			}

			return parseFloat(value).toFixed(2);
		}
	}
};
</script>