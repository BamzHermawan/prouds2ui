<template>
	<form :action="action" method="post">
		<input type="hidden" name="timesheet_id" :value="timesheetId" />
		<b-field grouped>
			<b-field label="Working Progress" style="width:125px;">
				<div class="field has-addons">
					<p class="control">
						<input
							v-model="modelProgress"
							class="input is-small"
							name="work_progress"
							:disabled="!active"
							type="number"
							max="100"
							min="0"
						/>
					</p>
					<p class="control">
						<span class="button is-normal-small is-static">%</span>
					</p>
				</div>
			</b-field>
			<b-field label="Work Hour" style="width:125px;">
				<div class="field has-addons">
					<p class="control">
						<input
							class="input is-small"
							v-model="modelHour"
							:disabled="!active"
							type="number"
							name="hour"
							max="24"
							min="1"
						/>
					</p>
					<p class="control">
						<span class="button is-normal-small is-static"
							>Hours</span
						>
					</p>
				</div>
			</b-field>
			<b-field class="has-align-bottom" expanded>
				<div class="field is-align-bottom" style="width:100%;">
					<div class="buttons">
						<b-button
							v-show="!active"
							size="is-normal-small"
							@click="toggle"
							type="is-info"
							>Adjust</b-button
						>

						<b-button
							v-show="active"
							size="is-normal-small"
							@click="toggle"
							type="is-danger"
							>Cancel</b-button
						>
						<b-button
							native-type="submit"
							v-show="active"
							size="is-normal-small"
							type="is-success"
							>Save</b-button
						>
					</div>
				</div>
			</b-field>
		</b-field>
	</form>
</template>

<script>
export default {
	props: {
		action: {
			type: String,
			required: true
		},
		timesheetId: {
			type: String,
			required: true
		},
		progress: {
			type: Number,
			required: true
		},
		hour: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			model: {
				progress: this.progress,
				hour: this.hour
			},
			active: false
		};
	},
	computed: {
		modelProgress: {
			get() {
				return this.model.progress;
			},
			set(val) {
				if (val > 100) {
					this.model.progress = 100;
				} else if (val < 0) {
					this.model.progress = 0;
				} else {
					this.model.progress = val;
				}
			}
		},
		modelHour: {
			get() {
				return this.model.hour;
			},
			set(val) {
				if (val > 24) {
					this.model.hour = 24;
				} else if (val < 1) {
					this.model.hour = 1;
				} else {
					this.model.hour = val;
				}
			}
		}
	},
	methods: {
		toggle() {
			this.cancel();
			this.active = !this.active;
		},
		cancel() {
			this.model.progress = this.progress;
			this.model.hour = this.hour;
		}
	}
};
</script>