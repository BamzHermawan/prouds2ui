<template>
	<div class="container">
		<h1>
			<div
				style="position:relative"
				class="gantt"
				id="GanttChartDIV"
			></div>
		</h1>
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
			dataBaru: GANTT,
			// modal: {
			// 	display: false,
			// 	title: "",
			// 	StartDate: "",
			// 	EndDate: "",
			// 	duration: "",
			// 	data: {}
			// }
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
					duration: {
						title: "Duration"
					},
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
			g.setShowDur(0);
			g.setUseToolTip(0);
			// g.setEditable(1);
			g.setEventClickRow(function(e) {
				// console.log(e);
				// self.modalEvent(e);
				let taskID = e.getOriginalID();
				self.$parent.selectedTask = self.dataBaru.find(task => {
					console.log(task);
					return task.pID == taskID;
				});

				self.$parent.showSideBar = true;
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
			let eventID = e.getOriginalID();

			this.modal.data = this.dataBaru.find(task => {
				console.log(task);
				return task.pID == eventID;
			});
		}
		// closeModal() {
		// 	this.modal.display = false;
		// }
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