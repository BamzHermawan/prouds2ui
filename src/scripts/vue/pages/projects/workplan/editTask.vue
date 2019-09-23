<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<section class="modal-card-body" style="height: 75vh;">
			<div class="container">
				<form
					:action="actionEvent"
					method="POST"
					enctype="multipart/form-data"
				>
					<input
						type="hidden"
						name="workplanId"
						v-model="workplanId"
					/>
					<input type="hidden" name="taskID" v-model="taskID" />
					<div class="tile is-ancestor">
						<div class="tile is-vertical is-parent">
							<div class="tile is-child">
								<b-message
									title="Task Schedule"
									type="is-primary"
									:closable="false"
								>
									<div class="columns">
										<div class="column">
											<!-- Datepicker Start Date -->
											<crud-input
												type="datepicker"
												label="Start Date"
												name="start"
												placeholder="Pick Start Date"
												v-model="start"
												date-locale="en"
											>
											</crud-input>
											<!-- Datepicker Start Date -->
										</div>
										<div class="column">
											<!-- Datepicker Finish Date -->
											<crud-input
												type="datepicker"
												label="Finish Date"
												name="finish"
												placeholder="Pick End Date"
												v-model="finish"
												date-locale="en"
											>
												<template slot="helptext">
													<p
														:class="
															'help ' +
																check(true)
														"
													>
														{{ check(false) }}
													</p>
												</template>
											</crud-input>
											<!-- Datepicker Finish Date -->
										</div>
									</div>

									<div class="columns">
										<div class="column">
											<!-- Select Workdays -->
											<crud-input
												type="select"
												label="Workdays Schema"
												name="workdays"
												placeholder="Choose Workdays Schema"
												v-model="workdays"
											>
												<slot
													name="workdays-option"
												></slot>
											</crud-input>
											<!-- Select Workdays -->
										</div>
										<div class="column">
											<b-field label="Duration of Days">
												<span
													disabled
													class="button is-info is-fullwidth"
													>{{ duration }}</span
												>
											</b-field>
										</div>
									</div>
								</b-message>
							</div>
						</div>
						<div class="tile is-vertical is-parent">
							<div class="tile is-child">
								<!-- Input Task Name -->
								<crud-input
									type="text"
									label="Task Name"
									placeholder="a name for the task"
									name="taskName"
									v-model="taskName"
									input-style="margin-bottom:15px;"
								>
								</crud-input>
								<!-- Input Task Name -->

								<!-- Select Parent Task -->
								<crud-input
									type="select"
									label="Parent Task"
									name="subtask"
									placeholder="Choose Parent Task"
									v-model="subtask"
									input-style="margin-bottom:15px;"
								>
									<option value="0"
										>Doesn't Have Parent</option
									>
									<option
										v-for="(opt, name, idx) in dataBaru"
										:key="idx"
										:value="opt.pID"
										>{{ opt.pName }}</option
									>
								</crud-input>
								<!-- Select Parent Task -->

								<!-- Select Task Phase -->
								<crud-input
									type="select"
									label="Group Phase"
									name="phase"
									placeholder="Choose Task Phase"
									v-model="phase"
								>
									<slot name="phase-option"></slot>
								</crud-input>
								<!-- Select Task Phase -->

								<!-- Select Predecessor -->
								<crud-input
									type="select"
									label="Predecessor"
									name="predecessor"
									placeholder="This Task Doesn't Have Predecessor"
									v-model="predecessor"
								>
									<option
										v-for="(opt, name, idx) in dataBaru"
										:key="idx"
										:value="opt.pID"
										>{{ opt.pName }}</option
									>

									<template slot="addons">
										<a
											class="button is-warning"
											@click="predecessor = null"
											:disabled="predecessor == null"
										>
											Remove Link
										</a>
									</template>
								</crud-input>
								<!-- Select Predecessor -->

								<div class="is-pulled-right">
									<a
										class="button is-danger"
										@click="$parent.close()"
									>
										Cancel
									</a>
									<button
										class="button is-success"
										type="submit"
									>
										Save Task
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</section>
	</div>
</template>

<script>
// TODO: Selesaikan Halaman Modal!

import moment from "moment";
import Axios from "axios";
import CrudInput from "../../../components/crud/crudInput";
import { notified } from "../../../../tools";
export default {
	components: { CrudInput },
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
		},
		apiGetDuration: {
			type: String,
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
			predecessor: null,
			subtask: this.task.pParent,
			start: new Date(this.task.pStart),
			finish: new Date(this.task.pEnd),
			oldfinish: new Date(this.task.pEnd),
			taskID: this.task.pID,
			isLoading: false
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
		},
		getDuration(start, finish, workdays) {
			this.isLoading = true;
			let self = this;
			return Axios.get(this.apiGetDuration, {
				params: { start: start, finish: finish, workdays: workdays }
			})
				.then(function(response) {
					let dur = response.data;
					self.duration = dur.duration;
				})
				.catch(function(error) {
					notified(self.$toast).error(
						"Mohon maaf terjadi sebuah kesalahan. Kami tidak dapat terhubung dengan server. Silakan ulangi beberapa saat lagi. 🙏"
					);
				})
				.finally(() => (self.isLoading = false));
		}
	},
	watch: {
		start: function() {
			if (this.start > this.finish) {
				this.finish = this.start;
			}
			this.getDuration(this.start, this.finish, this.workdays);
		},
		finish: function() {
			this.getDuration(this.start, this.finish, this.workdays);
		},
		workdays: function() {
			this.getDuration(this.start, this.finish, this.workdays);
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
		formatedMinDate() {
			return new Date(
				this.start.getFullYear(),
				this.start.getMonth(),
				this.start.getDate()
			);
		},
		finishisoverflow() {
			return this.finish > this.oldfinish;
		}
	},
	mounted() {
		this.predecessor = this.task.pDepend ? this.task.pDepend : null;
	}
};
</script>