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
							:class="isTaskRoot(row)"
							:data-parent="whoMyParent(row, idx)"
						>
							<td
								@click="emitRowClick(row)"
								:class="levelCheck(row, idx)"
							>
								<span
									v-if="isTaskParent(row, idx)"
									@click.stop="toggleParent(idx)"
									class="mdi mdi-toggle-folder"
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
								@click="isDelay(row).open()"
								:class="
									'has-text-right' + isDelay(row).bg.danger()
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
			<div class="pindex-table-right">
				<table class="table is-narrow is-bordered is-fullwidth">
					<thead>
						<tr>
							<th
								v-for="n in week_count"
								:key="'header-week-' + n"
								class="has-border-right-bold"
								colspan="2"
								align
							>
								Week #{{ n }}
							</th>
						</tr>
						<tr>
							<template v-for="n in week_count">
								<th align :key="'hyy-' + n">Plan</th>
								<th
									align
									:key="'hyyy-' + n"
									class="has-border-right-bold"
								>
									Actual
								</th>
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
							:class="isTaskRoot(row)"
						>
							<template
								v-for="(progress, n) in row.weekly_progress"
							>
								<td align="right" :key="'dyy-' + n">
									<b class="has-text-link">{{
										progress.plan | stripWhenEmpty
									}}</b>
								</td>
								<td
									align="right"
									@click="isDelay(row).open(false, n)"
									class="has-border-right-bold"
									:class="isDelay(row).bg.warning(n)"
									:key="'hyyy-' + n"
								>
									<b class="has-text-success">{{
										progress.actual | stripWhenEmpty
									}}</b>
								</td>
							</template>
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
			task: [],
			childIndex: []
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
		isDelay(task) {
			let roofGap = task.weight - task.gap_treshold;
			const checkStatus = function(useGap = true, progressIndex = null) {
				let plan = task.weight;
				let actual = task.progress;
				if (progressIndex !== null) {
					plan = task.weekly_progress[progressIndex].plan;
					actual = task.weekly_progress[progressIndex].actual;
					roofGap = plan - task.gap_treshold;
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
					danger: (index = null) => {
						if (checkStatus(true, index)) {
							return " is-fall-behind ";
						}

						return "";
					},
					warning: index => {
						if (checkStatus(false, index)) {
							return " is-fall-behind-warning ";
						}

						return "";
					}
				},
				open: (useGap = true, index = null) => {
					if (checkStatus(useGap, index)) {
						this.$emit("redclicked", { task, useGap, index });
					}
				}
			};
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
		isTaskRoot(task) {
			if (task.level == 0) {
				return " has-background-light ";
			}

			return "";
		},
		levelCheck(row, index) {
			let kelas = "is-task-name has-text-info is-level-" + row.level;

			//! Uncomment jika children tidak menggunakan icon
			// if (this.isTaskParent(row, index)) kelas += " has-children";
			return kelas;
		},
		whoMyParent(row, index) {
			let current = row.level;

			if (current <= 0 || index <= 0) {
				this.childIndex[index] = [];
				return "root";
			}

			let parent = index;
			let siblings = [];
			for (let i = index; i >= 0; i--) {
				const before = this.task[i].level;
				if (current > before) {
					//* Check and update siblings in this.childIndex
					let exist = this.childIndex[i];
					if (isEmpty(exist)) {
						this.childIndex[i] = siblings;
					} else {
						siblings.forEach(id => {
							if (!exist.includes(id)) {
								exist.push(id);
							}
						});

						this.childIndex[i] = exist;
					}

					//* grandparent need to know their grandkids
					for (let j = 0; j < this.childIndex.length; j++) {
						const parent = this.childIndex[j];
						// if instance have parents;
						if (parent instanceof Array) {
							// check where about of the parent for current entity
							if (parent.includes(i)) {
								this.childIndex[i].forEach(grandkids => {
									if (!parent.includes(grandkids)) {
										this.childIndex[j].push(grandkids);
									}
								});
							}
						}
					}

					return i;
				}

				if (current == before) {
					siblings.push(i);
				}
			}

			return 0;
		},
		toggleParent(parent) {
			let self = document.querySelector("[data-row='" + parent + "']");
			let hidden = self.classList.contains("is-folded");
			let childs = this.childIndex[parent];

			for (let i = 0; i < childs.length; i++) {
				const child = childs[i];
				if (hidden) {
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
		},
		isTaskParent(row, index) {
			let current = row.level;
			let after = undefined;

			if (index < this.task.length - 1) {
				after = this.task[index + 1].level;

				// jika level current lebih kecil dari setelahnnya, maka punya anak
				return current < after;
			}

			return false;
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