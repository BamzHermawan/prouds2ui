<template>
	<form :action="action" method="post">
		<input type="hidden" name="timesheet_id" :value="timesheetId" />
		<label class="label">Adjustment Form</label>
		<b-field grouped class="is-marginless">
			<b-field>
				<div class="field has-addons">
					<p class="control">
						<span
							class="button is-normal-small is-static is-light-blend"
							>Working Progress</span
						>
					</p>
					<template v-if="active">
						<p class="control">
							<input
								style="width:52px;"
								v-model="modelProgress"
								class="input is-small"
								name="work_progress"
								type="number"
								max="100"
								min="0"
							/>
						</p>
						<p class="control">
							<span class="button is-normal-small is-static"
								>%</span
							>
						</p>
					</template>
					<p v-else class="control">
						<span
							class="button is-normal-small is-static"
							style="border-style:none;"
							>{{ modelProgress }} %</span
						>
					</p>
				</div>
			</b-field>
			<b-field>
				<div class="field has-addons">
					<p class="control">
						<span
							class="button is-normal-small is-static is-light-blend"
							>Work Hour</span
						>
					</p>
					<template v-if="active">
						<p class="control">
							<input
								style="width:52px;"
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
					</template>
					<p v-else class="control">
						<span
							class="button is-normal-small is-static"
							style="border-style:none;"
							>{{ modelHour }} Hours</span
						>
					</p>
				</div>
			</b-field>
		</b-field>
		<b-field grouped>
			<b-field>
				<div class="field has-addons">
					<p class="control">
						<span
							class="button is-normal-small is-static is-light-blend"
						>
							Activity Type
						</span>
					</p>
					<p class="control">
						<b-select
							size="is-small"
							v-model="model.type"
							:disabled="!active"
							name="activity_type"
						>
							<slot name="type-option"></slot>
						</b-select>
					</p>
				</div>
			</b-field>
			<b-field expanded>
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
		},
		activityType: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			model: {
				progress: this.progress,
				hour: this.hour,
				type: this.activityType.id
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
			this.model.type = this.activityType.id;
		}
	}
};
</script>