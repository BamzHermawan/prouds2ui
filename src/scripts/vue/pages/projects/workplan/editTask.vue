<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body">
			<form
				:action="actionEvent"
				method="POST"
				enctype="multipart/form-data"
			>
				<div class="columns">
					<div class="column">
						<p class="heading">Task Name</p>
						<p>{{ taskName }}</p>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">Sub task of</p>
						<b-select expanded v-model="subtask" name="subtask">
							<option value="0">No Parent</option>
							<option
								v-for="(opt, name, idx) in dataBaru"
								:key="idx"
								:value="opt.pID"
								>{{ opt.pName }}</option
							>
						</b-select>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">Start</p>
						<input
							type="hidden"
							name="start"
							v-model="formatedStart"
						/>
						<b-field>
							<b-datepicker
								placeholder="DD/MM/YYYY"
								v-model="start"
							></b-datepicker>
						</b-field>
					</div>
					<div class="column">
						<p class="heading">finish</p>
						<input
							type="hidden"
							name="finish"
							v-model="formatedFinish"
						/>
						<b-field :type="check(true)" :message="check(false)">
							<b-datepicker
								placeholder="DD/MM/YYYY"
								v-model="finish"
							></b-datepicker>
						</b-field>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<p class="heading">Phase</p>
						<b-select
							expanded
							v-model="phase"
							name="phase"
							placeholder="Choose Phase"
						>
							<slot name="phase-option"></slot>
						</b-select>
					</div>
					<div class="column">
						<p class="heading">Workdays</p>
						<b-select
							expanded
							v-model="workdays"
							name="workdays"
							placeholder="Choose Workdays"
						>
							<slot name="workdays-option"></slot>
						</b-select>
					</div>
				</div>
				<div class="columns">
					<div class="column">
						<b-checkbox
							type="is-danger"
							v-model="checkboxPredecessor"
						>
							Has Predecessor
						</b-checkbox>
					</div>
				</div>
				<div class="columns">
					<div class="column" v-if="checkboxPredecessor">
						<p class="heading">Predecessor</p>
						<b-select
							expanded
							v-model="predecessor"
							name="predecessor"
						>
							<option value="0">No has predecessor</option>
							<option
								v-for="(opt, name, idx) in dataBaru"
								:key="idx"
								:value="opt.pID"
								>{{ opt.pName }}</option
							>
						</b-select>
					</div>
					<div class="column" v-else></div>
					<!-- <div class="column is-6">
						<p class="heading">Duration</p>
						<b-input name="duration" v-model="duration" disabled>
						</b-input>
					</div> -->
				</div>
				<input type="hidden" name="workplanId" v-model="workplanId" />
				<button class="button is-fullwidth is-success" type="submit">
					Submit Document
				</button>
			</form>
		</section>
	</div>
</template>

<script>
import moment from "moment";
export default {
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		workplanId: {
			type: String,
			required: true
		},
		title: {
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
			phase: 1,
			workdays: 1,
			duration: 20,
			checkboxPredecessor: "true",
			predecessor: 1,
			subtask: this.task.pParent,
			start: new Date(this.task.pStart),
			finish: new Date(this.task.pEnd),
			oldfinish: new Date(this.task.pEnd)
		};
	},
	// watch: {
	// 	finish: function(newdata, olddata) {
	// 		if (newdata > this.oldfinish) {
	// 		}
	// 	}
	// },
	methods: {
		check(type) {
			if (type) {
				return this.finishisoverflow ? "is-danger" : undefined;
			} else {
				return this.finishisoverflow
					? "The date you choose must be approved by PMO"
					: undefined;
			}
		}
	},
	computed: {
		formatedStart() {
			// return new Date(moment(this.task.pStart, "YYYY-MM-DD"));
			return moment(this.start).format("DD/MM/YYYY");
		},
		formatedFinish() {
			return moment(this.finish).format("DD/MM/YYYY");
		},
		finishisoverflow() {
			return this.finish > this.oldfinish;
		}
	}
};
</script>