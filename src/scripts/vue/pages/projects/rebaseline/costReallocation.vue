<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body" style="height: auto;">
			<form :action="actionEvent" method="POST">
				<div class="columns">
					<div class="column">
						<p class="label">Task Name</p>
						<input
							type="hidden"
							name="taskID"
							v-model="selectedTask"
						/>
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
				<crud-input
					type="text"
					label="Budget Actual Cost"
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
					input-style="margin-bottom: 14px;"
				>
				</crud-input>
				<div class="is-pulled-right">
					<a class="button is-danger" @click="$parent.close()">
						Cancel
					</a>
					<button class="button is-success" type="submit">
						Save
					</button>
				</div>
			</form>
		</section>
	</div>
</template>

<script>
import CrudInput from "../../../components/crud/crudInput";
export default {
	components: { CrudInput },
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
			selectedTask: "null",
			dataBaru: DATA,
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
				if (this.selected != undefined) {
					this.selectedTask = this.selected.taskID;
				}
				let found = this.dataBaru.find(
					task => task.taskID === this.selectedTask
				);

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