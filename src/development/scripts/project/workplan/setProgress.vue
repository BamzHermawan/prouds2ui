<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="projectId" v-model="projectId" />
		<input type="hidden" name="taskID" v-model="taskID" />

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Progress Group</p>
			</div>
			<div class="column">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ processGroupName }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Parent Task</p>
			</div>
			<div class="column">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ task.pName }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Task</p>
			</div>
			<div class="column">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ taskName }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-6">
				<div class="columns">
					<div class="column is-4">
						<p class="label">Start Date</p>
					</div>
					<div class="column">
						<span
							class="button is-static is-fullwidth is-light-blend"
							style="justify-content: start;"
							>{{ start }}</span
						>
					</div>
				</div>
			</div>
			<div class="column is-6">
				<div class="columns">
					<div class="column is-2">
						<p class="label">End Date</p>
					</div>
					<div class="column">
						<span
							class="button is-static is-fullwidth is-light-blend"
							style="justify-content: start;"
							>{{ finish }}</span
						>
					</div>
				</div>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-2">
				<p class="label">Duration</p>
			</div>
			<div class="column is-1">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ task.duration }}</span
				>
			</div>
		</div>

		<div class="columns" style="margin-bottom:0.5em;">
			<div class="column is-6">
				<div class="columns">
					<div class="column is-4">
						<p class="label">Progress (%)</p>
					</div>
					<div class="column is-5">
						<crud-input
							type="number"
							name="progress"
							color="is-info"
							v-model="progress"
							input-style="margin-bottom:0px;"
						>
						</crud-input>
					</div>
				</div>
			</div>
			<div class="column">
				<div class="columns">
					<div class="column is-5">
						<p class="label">Auto Calculated Progress</p>
					</div>
					<div class="column is-2">
						<b-message type="is-dark" class="is-on-field">
							<p class="has-text-light has-text-centered">
								{{ task.autoCalculationProgress }}
							</p>
						</b-message>
					</div>
				</div>
			</div>
		</div>

		<div class="is-pulled-left">
			<button class="button is-success" type="submit" :disabled="btn">
				Update
			</button>
		</div>
		<br />
	</form>
</template>

<script>
import moment from "helper-moment";
import { crudInput } from "components";
export default {
	components: { crudInput },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		projectId: {
			type: String,
			required: true
		},
		task: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			taskName: this.task.pName,
			progress: Number(this.task.pComp),
			estProgress: this.task.estProgress,
			taskID: this.task.pID,
			start: moment(this.task.pStart).format("dddd, DD MMMM YYYY"),
			finish: moment(this.task.pEnd).format("dddd, DD MMMM YYYY"),
			processGroupName: "",
			processGroupID: this.task.processGroupID,
			btn: true
		};
	},
	watch: {
		progress: function(newQuery) {
			if (this.progress.toString() === this.task.pComp.toString()) {
				this.btn = true;
			} else {
				this.btn = false;
			}
		}
	},
	methods: {
		getProcessGroup() {
			if (this.processGroupID != 0 || this.processGroupID !== "") {
				let found = this.dataBaru.find(
					task => task.pID === this.processGroupID
				);
				if (found != undefined && found.hasOwnProperty("pName")) {
					this.processGroupName = found.pName;
				} else {
					return "";
				}
			}
		}
	},
	mounted() {
		this.getProcessGroup();
	}
};
</script>