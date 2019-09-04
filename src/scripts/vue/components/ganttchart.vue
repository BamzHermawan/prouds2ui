<template>
	<div class="container">
		<h1>
			<div
				style="position:relative"
				class="gantt"
				id="GanttChartDIV"
			></div>
		</h1>
		<b-modal
			:active.sync="modal.display"
			width="600px"
			@close="closeModal()"
			scroll="keep"
		>
			<div class="card-modal">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ modal.title }}</p>
				</header>
				<section class="modal-card-body" style="min-height:500px;">
					<form
						:action="actionEvent"
						method="POST"
						enctype="multipart/form-data"
					>
						<b-field label="Start Date">
							<b-datepicker
								placeholder="DD/MM/YYYY"
								name="StartDate"
								v-model="modal.StartDate"
							></b-datepicker>
						</b-field>
						<b-field label="End Date">
							<b-datepicker
								placeholder="DD/MM/YYYY"
								name="EndDate"
								v-model="modal.EndDate"
							></b-datepicker>
						</b-field>
						<b-field label="Duration">
							<b-input
								expanded
								v-model="modal.duration"
								type="input"
								name="duration"
							></b-input>
						</b-field>
						<b-field label="Work">
							<b-input
								expanded
								v-model="modal.work"
								type="input"
								name="work"
							></b-input>
						</b-field>
						<b-field label="Work Total">
							<b-input
								expanded
								v-model="modal.workTotal"
								type="input"
								name="workTotal"
							></b-input>
						</b-field>
						<a
							class="button is-danger"
							style="min-width:50px; margin-top:14px;"
							type="button"
							@click="closeModal()"
						>
							Close
						</a>
						<button
							class="button is-success"
							type="submit"
							style="min-width:50px; margin-top:14px;"
						>
							Submit
						</button>
					</form>
				</section>
			</div>
		</b-modal>
	</div>
</template>

<script>
import * as JSGantt from "jsgantt-improved";
export default {
	props: {
		actionEvent: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dataBaru: DATA,
			modal: {
				display: false,
				title: "",
				StartDate: "",
				EndDate: "",
				work: "1800",
				workTotal: "6272",
				duration: ""
			}
		};
	},
	methods: {
		getChart() {
			let self = this;
			const g = new JSGantt.GanttChart(
				document.getElementById("GanttChartDIV"),
				"day"
			);
			g.setOptions({
				vCaptionType: "Complete",
				vQuarterColWidth: 36,
				vDateTaskDisplayFormat: "day dd month yyyy",
				vDayMajorDateDisplayFormat: "mon yyyy - Week ww",
				vWeekMinorDateDisplayFormat: "dd mon",
				vLang: "en",
				vShowTaskInfoLink: 1,
				vShowEndWeekDate: 0,
				vAdditionalHeaders: {
					work: {
						title: "Work"
					},
					workTotal: {
						title: "Work Total"
					}
				},
				vUseSingleCell: 10000,
				vFormatArr: ["Day", "Week", "Month", "Quarter"]
			});
			g.setShowRes(0);
			g.setShowComp(0);
			// g.setEditable(1);
			g.setEventClickRow(function(e) {
				console.log(e);
				self.modalEvent(e);
			});
			this.dataBaru.forEach(d => {
				d.pGantt = g;
				g.AddTaskItemObject(d);
			});
			g.Draw();
		},
		modalEvent(e) {
			this.modal.display = true;
			this.modal.title = "Edit " + e.getName();
			this.modal.StartDate = e.getStart();
			this.modal.EndDate = e.getEnd();
			this.modal.duration = e.getDuration();
			console.log(e.getOriginalID());
			console.log(this.modal.title);
		},
		closeModal() {
			this.modal.display = false;
		}
	},
	mounted() {
		this.getChart();
	}
};
</script>

<style>
.gtasklist {
	font-size: 1px;
}
</style>