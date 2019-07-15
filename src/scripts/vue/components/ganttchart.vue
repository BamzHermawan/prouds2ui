<template>
	<h1>
		hello Vue
		<div style="position:relative" class="gantt" id="GanttChartDIV"></div>
	</h1>
</template>

<script>
import * as JSGantt from "jsgantt-improved";
export default {
	data() {
		return {
			dataBaru: DATA
		};
	},
	methods: {
		getChart() {
			const g = new JSGantt.GanttChart(
				document.getElementById("GanttChartDIV"),
				"day"
			);

			// g.AddTaskItemObject(this.dataBaru);

			g.setOptions({
				vCaptionType: "Complete", // Set to Show Caption : None,Caption,Resource,Duration,Complete,
				vQuarterColWidth: 36,
				vDateTaskDisplayFormat: "day dd month yyyy", // Shown in tool tip box
				vDayMajorDateDisplayFormat: "mon yyyy - Week ww", // Set format to dates in the "Major" header of the "Day" view
				vWeekMinorDateDisplayFormat: "dd mon", // Set format to display dates in the "Minor" header of the "Week" view
				vLang: "en",
				vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
				vShowEndWeekDate: 0, // Show/Hide the date for the last day of the week in header for daily
				vAdditionalHeaders: {
					// Add data columns to your table
					category: {
						title: "Category"
					},
					sector: {
						title: "Sector"
					}
				},
				vUseSingleCell: 10000, // Set the threshold cell per table row (Helps performance for large data.
				vFormatArr: ["Day", "Week", "Month", "Quarter"] // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,
			});
			this.dataBaru.forEach(d => {
				d.pGantt = g;
				g.AddTaskItemObject(d);
			});
			g.Draw();
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