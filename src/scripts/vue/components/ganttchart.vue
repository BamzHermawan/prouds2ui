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
					category: {
						title: "Category"
					},
					sector: {
						title: "Sector"
					}
				},
				vUseSingleCell: 10000,
				vFormatArr: ["Day", "Week", "Month", "Quarter"]
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