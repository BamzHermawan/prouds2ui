<template>
	<div :class="'card timesheet ' + type" @click="onClicked">
		<div class="card-content">
			<p class="has-text-weight-bold">{{ task }}</p>
		</div>
		<div class="card-content content is-marginless">
			<p>{{ project }}</p>
			<nav class="level has-min-margin-bottom">
				<div class="level-left">
					<b-taglist attached size="are-medium">
						<b-tag type="is-dark">IWO</b-tag>
						<b-tag type="is-info">{{ iwo }}</b-tag>
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
							<span class="tag is-info">{{ member }}</span>
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
									>{{ workload }}%</span
								>
							</div>
						</b-tooltip>
					</div>
				</div>
			</nav>

			<b-message
				v-if="type === 'is-delayed'"
				type="is-danger"
				size="is-small"
			>
				<span class="icon is-small">
					<span class="mdi mdi-calendar-clock"></span>
				</span>
				<span>{{ start | moment }} - {{ end | moment }}</span>
			</b-message>
			<b-message v-else type="is-info" size="is-small">
				<span class="icon is-small">
					<span class="mdi mdi-calendar-clock"></span>
				</span>
				<span>{{ start | moment }} - {{ end | moment }}</span>
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
										>{{ timesheet[0].data }}%</b-tag
									>
								</b-tooltip>
							</div>
							<div class="level-item">
								<b-tooltip
									label="Submited Timesheet"
									type="is-info"
								>
									<b-tag type="is-info"
										>{{ timesheet[1].data }}%</b-tag
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
							<span>Task Progress</span>
						</p>
						<p class="level-right">
							<b-tag type="is-success">{{ taskProgress }}%</b-tag>
						</p>
					</nav>
					<progress-bar
						:value="taskProgress"
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
export default {
	components: { progressBar },
	props: {
		task: {
			type: String,
			required: true
		},
		project: {
			type: String,
			required: true
		},
		iwo: {
			type: String,
			required: true
		},
		member: {
			required: true
		},
		workload: {
			required: true
		},
		start: {
			type: String,
			required: true
		},
		end: {
			type: String,
			required: true
		},
		timesheet: {
			type: Array,
			default: () => {
				return [];
			}
		},
		taskProgress: {
			default: undefined
		},
		type: {
			type: String,
			default: "is-ongoing"
		}
	},
	methods: {
		onClicked() {
			console.log("clicked");
			this.$emit("clicked");
		}
	}
};
</script>