<template>
	<div v-show="!loader" class="loader-container-purrfect">
		<div class="pindex-table-container add-max-height">
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
							@mouseout="removeRow"
							:data-row="idx"
							v-for="(row, idx) in task"
							:key="'hxa-' + idx"
						>
							<template v-if="isTaskParent(row)">
								<td colspan="5" class="has-background-light">
									{{ row.name }}
								</td>
							</template>
							<template v-else>
								<td
									@click="emitRowClick(row)"
									class="is-child is-task-name has-text-info"
								>
									<abbr :title="row.name">{{
										row.name
									}}</abbr>
								</td>
								<td class="has-text-right">
									{{ row.weight.toFixed(2) }}%
								</td>
								<td class="has-text-right">{{ row.start }}</td>
								<td class="has-text-right">{{ row.end }}</td>
								<td :class="'has-text-right' + fallBehind(row)">
									{{ row.progress.toFixed(2) }}%
								</td>
							</template>
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
			<div class="pindex-table-right">
				<table class="table is-narrow is-bordered is-fullwidth">
					<thead>
						<tr>
							<th
								v-for="n in week_count"
								:key="'header-week-' + n"
								colspan="2"
								align
							>
								Week #{{ n }}
							</th>
						</tr>
						<tr>
							<template v-for="n in week_count">
								<th align :key="'hyy-' + n">Plan</th>
								<th align :key="'hyyy-' + n">Actual</th>
							</template>
						</tr>
					</thead>
					<tbody>
						<tr
							@mouseover="hoverRow"
							@mouseout="removeRow"
							:data-row="idx"
							v-for="(row, idx) in task"
							:key="'ax-' + idx"
						>
							<template v-if="isTaskParent(row)">
								<td
									:colspan="week_count * 2"
									class="is-empty has-background-light"
								></td>
							</template>
							<template v-else>
								<template
									v-for="(progress, n) in row.weekly_progress"
								>
									<td align="right" :key="'dyy-' + n">
										<b class="has-text-link">{{
											progress.plan | stripWhenEmpty
										}}</b>
									</td>
									<td align="right" :key="'hyyy-' + n">
										<b class="has-text-success">{{
											progress.actual | stripWhenEmpty
										}}</b>
									</td>
								</template>
							</template>
						</tr>

						<tr class="has-background-light">
							<template v-for="(total, n) in progress.total">
								<td align="right" :key="'total1-' + n">
									<b class="has-text-link">{{
										total.plan | stripWhenEmpty
									}}</b>
								</td>
								<td align="right" :key="'total2-' + n">
									<b class="has-text-success">{{
										total.actual | stripWhenEmpty
									}}</b>
								</td>
							</template>
						</tr>

						<tr class="has-background-light">
							<template v-for="(sigma, n) in progress.sigma">
								<td align="right" :key="'sigma1-' + n">
									<b class="has-text-link">{{
										sigma.plan | stripWhenEmpty
									}}</b>
								</td>
								<td align="right" :key="'sigma2-' + n">
									<b class="has-text-success">{{
										sigma.actual | stripWhenEmpty
									}}</b>
								</td>
							</template>
						</tr>

						<tr class="has-background-light">
							<td
								:key="'delta-' + n"
								colspan="2"
								align="right"
								v-for="(delta, n) in progress.delta"
							>
								<b class="has-text-success">{{
									delta | stripWhenEmpty
								}}</b>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<b-loading :is-full-page="false" :active.sync="loader"></b-loading>
	</div>
</template>

<script>
import { getPIndexTable } from "helper-apis";
import { isEmpty } from "helper-tools";

export default {
	name: "pindexTable",
	props: {
		projectId: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			loader: true,
			week_count: 0,
			progress: {
				total: [],
				sigma: [],
				delta: []
			},
			task: []
		};
	},
	watch: {
		// task(change) {
		// 	console.log(change);
		// },
		projectId(change) {
			if (!isEmpty(change)) this.fetchData(change);
		}
	},
	methods: {
		fetchData(projectId) {
			let self = this;
			getPIndexTable(projectId)
				.then(fetched => {
					self.week_count = fetched.week_count;
					self.progress.total = fetched.total_weekly_progress;
					self.progress.sigma = fetched.sigma_progress;
					self.progress.delta = fetched.delta_progress;
					self.task = fetched.task;
					self.loader = false;
				})
				.catch(err => console.log(err));
		},
		emitRowClick(row) {
			this.$emit("rowclicked", row);
		},
		fallBehind(task) {
			if (task.weight > task.progress) {
				return " has-bg-danger-lighter has-text-danger has-text-weight-bold ";
			}

			return "";
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
		removeRow() {
			let isHover = document.querySelectorAll("tr.is-hover");
			isHover.forEach(node => {
				node.classList.remove("is-hover");
			});
		},
		isTaskParent(task) {
			return (
				!isEmpty(task.isParent) &&
				task.isParent &&
				isEmpty(task.weekly_progress)
			);
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