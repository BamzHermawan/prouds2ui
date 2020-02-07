<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="projectId" v-model="projectId" />
		<input type="hidden" name="taskID" v-model="this.task.pID" />

		<b-field horizontal label="Progress Group">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ processGroup }}</span
			>
		</b-field>

		<b-field horizontal label="Parent Task">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ parentTask.pName }}</span
			>
		</b-field>

		<b-field horizontal label="Task">
			<span
				class="button is-static is-fullwidth is-light-blend"
				style="justify-content: start;"
				>{{ task.pName }}</span
			>
		</b-field>

		<b-field horizontal label="Start Date">
			<b-field>
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ start }}</span
				>
			</b-field>
			<b-field horizontal label="End Date" style="margin-left:2em;">
				<span
					class="button is-static is-fullwidth is-light-blend"
					style="justify-content: start;"
					>{{ finish }}</span
				>
			</b-field>
		</b-field>

		<b-field horizontal label="Duration">
			<div class="buttons">
				<span
					class="button is-static is-light-blend"
					style="justify-content: start; min-width: 200px; margin-right:.7rem;"
					>{{ task.duration }}</span
				>
				<b-field>
					<p class="control">
						<button class="button is-static is-info-blend">
							Auto by timesheet hours
						</button>
					</p>
					<p class="control">
						<span
							class="button is-static is-light-blend is-fullwidth"
							style="min-width: 115px;"
							>{{
								parseValue(task.autoCalculationProgress, 0)
							}}%</span
						>
					</p>
				</b-field>
			</div>
		</b-field>

		<b-field horizontal label="Progress Adjustment [%]">
			<crud-input
				type="number"
				name="progress"
				color="is-info"
				v-model="progress"
				input-style="margin-bottom:0px;"
				style="width:250px;"
			>
			</crud-input>
		</b-field>

		<b-field horizontal>
			<hr />
		</b-field>

		<b-field horizontal>
			<div class="buttons">
				<button
					type="submit"
					class="button is-success is-long"
					:disabled="disableButton"
				>
					Update
				</button>
				<b-button @click="$emit('cancel')" type="is-danger is-long">
					Cancel
				</b-button>
			</div>
		</b-field>

		<span class="white-space"></span>
	</form>
</template>

<script>
import moment from "helper-moment";
import { crudInput } from "components";
import { isEmpty } from "helper-tools";

const implantTag = document.querySelector("#implantedJSON");
const implantData = JSON.parse(implantTag.innerHTML);

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
			dataBaru: [],
			progress: 0,
			start: "",
			finish: "",
			processGroup: "",
			parentTask: null
		};
	},
	computed: {
		disableButton() {
			return this.progress == this.task.pComp;
		},
		autoCalc() {
			if (this.task.hasOwnProperty("autoCalculationProgress")) {
				return this.task.autoCalculationProgress;
			} else {
				return "—";
			}
		}
	},
	methods: {
		parseValue(val, defults) {
			if (isEmpty(val)) {
				return defaults;
			} else {
				return val;
			}
		},

		getProcessGroup() {
			if (this.processGroupID != 0 || this.processGroupID !== "") {
				let found = this.dataBaru.find(
					task => task.pID === this.task.processGroupID
				);
				if (found != undefined && found.hasOwnProperty("pName")) {
					this.processGroup = found.pName;
				} else {
					return "";
				}
			}
		}
	},
	beforeMount() {
		this.dataBaru = implantData.GANTT;

		this.start = moment(this.task.pStart).format("dddd, DD MMMM YYYY");
		this.finish = moment(this.task.pEnd).format("dddd, DD MMMM YYYY");
		this.progress = parseInt(this.task.pComp);

		this.parentTask = this.dataBaru.find(
			node => node.pID === this.task.pParent
		);
	},
	mounted() {
		this.getProcessGroup();
	}
};
</script>