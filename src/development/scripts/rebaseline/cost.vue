<template>
	<div class="container">
		<slot name="ade"></slot>
		<form :action="actionEvent" method="POST">
			<div class="columns">
				<div class="column">
					<p class="label">Task Name</p>
					<input type="hidden" name="taskID" v-model="selectedTask" />
					<b-autocomplete
						v-model="name"
						placeholder="Choose Task Name"
						:open-on-focus="true"
						:data="filterTaskName"
						field="taskName"
						@select="option => (selected = option)"
					>
					</b-autocomplete>
				</div>
			</div>
			<input type="hidden" name="actualCost" v-model="getCost" />
			<b-field label="Budget Actual Cost" v-if="selectedTask === null">
				<b-input
					type="text"
					placeholder="10.000.000"
					disabled
				></b-input>
			</b-field>
			<crud-input
				v-if="selectedTask !== null"
				type="text"
				label="Budget Actual Cost"
				placeholder="10.000.000"
				:value="getCost | currency"
				@input="actualCostUnformat"
				name=""
			>
			</crud-input>
			<crud-input
				type="datepicker"
				label="Reallocation Date"
				name="reallocationDate"
				placeholder="Pick Reallocation Date"
				date-locale="en"
				input-style="margin-bottom: 0px;"
			>
			</crud-input>
			<br />
			<div class="is-pulled-right">
				<button class="button is-success is-long" type="submit">
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { crudInput } from "components";
export default {
	components: { crudInput },
	props: {
		title: {
			type: String,
			required: true
		},
		actionEvent: {
			type: String,
			required: true
		},
		taskId: {
			type: String,
			required: true
		},
		allowedFile: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			selectedTask: null,
			dataBaru: DATA.allTask,
			name: "",
			selected: null
		};
	},
	methods: {
		actualCostUnformat(val) {
			let medown = val.replace(/\D/g, "");
			this.getCost = medown;
		}
	},
	computed: {
		filterTaskName() {
			return this.dataBaru.filter(option => {
				return (
					option.taskName
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0
				);
			});
		},
		getCost: {
			get() {
				let found = "";
				if (this.selected != undefined) {
					this.selectedTask = this.selected.taskID;
					found = this.dataBaru.find(
						task => task.taskID === this.selectedTask
					);
				} else {
					this.selectedTask = null;
				}

				if (found != undefined && found.hasOwnProperty("cost")) {
					return found.cost;
				} else {
					return "";
				}
			},
			set(val) {
				if (this.selected != undefined) {
					this.selectedTask = this.selected.taskID;
				}
				let found = this.dataBaru.find(
					task => task.taskID === this.selectedTask
				);

				if (found != undefined && found.hasOwnProperty("cost")) {
					found.cost = val;
				}
			}
		}
	}
};
</script>