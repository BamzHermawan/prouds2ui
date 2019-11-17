<template>
	<div class="card-modal">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ title }}</p>
		</header>
		<form :action="actionEvent" method="POST" enctype="multipart/form-data">
			<section class="modal-card-body">
				<div class="container" style="margin: 15px auto 12px auto;">
					<input
						type="hidden"
						name="workplanId"
						v-model="workplanId"
					/>
					<div class="tile is-ancestor">
						<div class="tile is-vertical is-parent">
							<div class="tile is-child">
								<!-- Input Task Name -->
								<crud-input
									type="text"
									label="Task Name"
									placeholder="a name for the task"
									name="taskName"
									input-style="margin-bottom:15px;"
								>
								</crud-input>

								<!-- Select Parent Task -->
								<p class="label">Parent Task</p>
								<input
									type="hidden"
									name="parentTask"
									v-model="subtask"
								/>
								<b-autocomplete
									style="margin-bottom:15px;"
									placeholder="Choose Parent Task"
									:open-on-focus="true"
									:data="filterTaskName"
									field="pName"
									@select="option => (selected = option)"
								>
								</b-autocomplete>
								<!-- Select Parent Task -->

								<!-- Select Task Phase -->
								<crud-input
									type="select"
									label="Group Phase"
									name="phase"
									placeholder="Choose Task Phase"
									input-style="margin-bottom:15px;"
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
									input-style="margin-bottom:15px;"
								>
									<option
										v-for="(opt,
										name,
										idx) in filterPredecessor"
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
							</div>
						</div>
						<div class="tile is-vertical is-parent is-7">
							<div class="tile is-child">
								<b-message
									title="Task Schedule"
									type="is-primary"
									:closable="false"
								>
									<!-- Datepicker Start Date -->
									<crud-input
										type="datepicker"
										label="Start Date"
										name="start"
										v-model="start"
										placeholder="Pick Start Date"
										date-locale="en"
										input-style="margin-bottom: 5px;"
									>
									</crud-input>
									<!-- Datepicker Start Date -->

									<!-- Datepicker Finish Date -->
									<crud-input
										type="datepicker"
										label="Finish Date"
										name="finish"
										:min-date="start"
										v-model="finish"
										placeholder="Pick Finish Date"
										date-locale="en"
										input-style="margin-bottom: 5px;"
									>
									</crud-input>
									<!-- Datepicker Finish Date -->

									<div class="columns">
										<div class="column">
											<!-- Select Workdays -->
											<crud-input
												type="select"
												label="Workdays Schema"
												name="workdays"
												placeholder="Choose Workdays Schema"
												v-model="workdays"
												input-style="margin-bottom:0px;"
											>
												<slot
													name="workdays-option"
												></slot>
											</crud-input>
											<!-- Select Workdays -->
										</div>
										<div class="column is-4">
											<label class="label"
												>Duration of Days</label
											>
											<b-message
												type="is-danger"
												class="is-on-field"
											>
												<p
													class="has-text-dark"
													v-if="!isEmpty(duration)"
												>
													{{ duration }}
												</p>
												<p class="has-text-dark" v-else>
													-
												</p>
											</b-message>
										</div>
									</div>
								</b-message>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section class="modal-card-foot is-clearfix is-block">
				<div class="is-pulled-right">
					<a class="button is-danger" @click="$parent.close()">
						Cancel
					</a>
					<button class="button is-success" type="submit">
						Save Task
					</button>
				</div>
			</section>
		</form>
	</div>
</template>

<script>
// TODO: Selesaikan Halaman Modal!

import Moment from "helper-moment";
import { crudInput } from "components";
import { notified, isEmpty } from "helper-tools";
import api from "helper-apis";
export default {
	components: { crudInput },
	props: {
		actionEvent: {
			type: String,
			required: true
		},
		workplanId: {
			type: String,
			required: true
		},
		apiGetDuration: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dataBaru: GANTT,
			start: undefined,
			finish: undefined,
			workdays: null,
			duration: "",
			checkboxPredecessor: "true",
			predecessor: null,
			subtask: null,
			isLoading: false,
			name: "",
			selected: null
		};
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
	methods: {
		isEmpty: isEmpty,
		getDuration(start, finish, workdays) {
			this.isLoading = true;
			let self = this;
			let bundle = {
				start: Moment(start).format("DD/MM/YYYY"),
				finish: Moment(finish).format("DD/MM/YYYY"),
				workdays: workdays
			};
			api.getDuration(bundle)
				.then(response => {
					let dur = response.data;
					self.duration = dur.duration;
				})
				.catch(function(error) {
					console.log("error asking for baseline");
					if (checkConnection(self.notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				})
				.finally(() => (self.isLoading = false));
		}
	},
	computed: {
		filterTaskName() {
			return this.dataBaru.filter(option => {
				let checkName =
					option.pName
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0;

				return checkName && option.pID != this.taskID;
			});
		},
		filterPredecessor() {
			return this.dataBaru.filter(pre => {
				let preFilter = pre;

				return preFilter && pre.pID != this.taskID;
			});
		}
	}
};
</script>