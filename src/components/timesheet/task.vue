<template>
	<div :class="'card timesheet ' + type" @click="onClicked">
		<div class="card-content">
			<p class="has-text-weight-bold">{{ task.task }}</p>
		</div>
		<div class="card-content content is-marginless">
			<p>{{ task.project_name }}</p>
			<nav class="level has-min-margin-bottom">
				<div class="level-left">
					<b-taglist attached size="are-medium">
						<b-tag type="is-dark">IWO</b-tag>
						<b-tag type="is-info">{{ task.iwo }}</b-tag>
					</b-taglist>
				</div>
				<div class="level-right">
					<div class="level-item">
						<div class="tags has-addons">
							<span class="tag is-dark" style="padding:0px 6px;">
								<span
									class="mdi mdi-account-tie is-marginless"
								></span>
							</span>
							<span class="tag is-info">{{ task.member }}</span>
						</div>
					</div>
					<div class="level-item">
						<b-tooltip label="Your Workload" type="is-warning">
							<div class="tags has-addons">
								<span
									class="tag is-dark"
									style="padding:0px 6px;"
								>
									<span
										class="mdi mdi-wrench is-marginless"
									></span>
								</span>
								<span class="tag is-warning"
									>{{ task.workload }}%</span
								>
							</div>
						</b-tooltip>
					</div>
				</div>
			</nav>

			<p class="button is-static is-small is-fullwidth">
				<span style="margin-right:.35em;">Assigned as</span
				><b>{{ task.role }}</b>
			</p>

			<b-message
				v-if="type === 'is-delayed'"
				type="is-danger"
				size="is-small"
			>
				<span class="icon is-small">
					<span class="mdi mdi-calendar-clock"></span>
				</span>
				<span>{{ task.start | moment }} - {{ task.end | moment }}</span>
			</b-message>
			<b-message v-else type="is-info" size="is-small">
				<span class="icon is-small">
					<span class="mdi mdi-calendar-clock"></span>
				</span>
				<span>{{ task.start | moment }} - {{ task.end | moment }}</span>
			</b-message>
		</div>

		<footer v-if="type !== 'is-scheduled'" class="card-footer">
			<div class="card-footer-item">
				<div class="timesheet-progress">
					<nav class="level is-marginless">
						<p class="level-left">
							<span>Timesheet</span>
						</p>
						<div class="level-right">
							<div class="level-item">
								<b-tooltip
									label="Approved Timesheet"
									type="is-success"
								>
									<b-tag type="is-success"
										>{{ task.timesheet.approved }}%</b-tag
									>
								</b-tooltip>
							</div>
							<div class="level-item">
								<b-tooltip
									label="Submited Timesheet"
									type="is-info"
								>
									<b-tag type="is-info"
										>{{ task.timesheet.submited }}%</b-tag
									>
								</b-tooltip>
							</div>
						</div>
					</nav>
					<progress-bar
						:bars="timesheet"
						no-margin
						clean-bar
						size="is-small"
					></progress-bar>
				</div>
			</div>
			<div class="card-footer-item">
				<div class="timesheet-progress">
					<nav class="level is-marginless">
						<p class="level-left">
							<span>Task</span>
						</p>
						<div class="level-right">
							<div class="level-item">
								<b-tooltip
									label="Actual Progress"
									type="is-success"
								>
									<b-tag type="is-success"
										>{{ task.taskProgress.actual }}%</b-tag
									>
								</b-tooltip>
							</div>
							<div class="level-item">
								<b-tooltip
									label="Planned Progress"
									type="is-info"
								>
									<b-tag type="is-info"
										>{{ task.taskProgress.plan }}%</b-tag
									>
								</b-tooltip>
							</div>
						</div>
					</nav>
					<progress-bar
						:bars="taskProgress"
						no-margin
						clean-bar
						size="is-small"
					></progress-bar>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import progressBar from "../progressBar";
import Moment from "helper-moment";
export default {
	components: { progressBar },
	props: {
		task: {
			type: Object,
			required: true,
			default() {
				return {
					task: "",
					project_name: "",
					iwo: "",
					role: "",
					member: 0,
					workload: 0,
					start: Moment().format("DD/MM/YYYY"),
					end: Moment().format("DD/MM/YYYY"),
					taskProgress: [],
					timesheet: []
				};
			}
		},
		type: {
			type: String,
			default: "is-ongoing"
		}
	},
	computed: {
		taskProgress() {
			let actual = this.task.taskProgress.actual;
			let plan = this.task.taskProgress.plan;

			if (actual > plan) {
				return [
					{ data: plan, color: "is-info" },
					{ data: actual, color: "is-success" }
				];
			} else {
				return [
					{ data: actual, color: "is-success" },
					{ data: plan, color: "is-info" }
				];
			}
		},
		timesheet() {
			let approved = this.task.timesheet.approved;
			let submited = this.task.timesheet.submited;

			return [
				{ data: approved, color: "is-success" },
				{ data: submited, color: "is-info" }
			];
		}
	},
	methods: {
		onClicked() {
			this.$emit("clicked");
		}
	}
};
</script>