<template>
	<form :action="actionEvent" method="POST" enctype="multipart/form-data">
		<input type="hidden" name="workplanId" v-model="workplanId" />

		<div class="columns">
			<div class="column is-10">
				<crud-input
					type="select"
					label="Select Template"
					name="templateId"
					placeholder="Choose Template"
					v-model="template"
					input-style="margin-bottom:0px;"
					required
				>
					<slot name="template-option"></slot>
				</crud-input>
			</div>
			<div class="column">
				<button
					class="button is-success is-long"
					type="submit"
					style="margin-top:30px"
				>
					Save
				</button>
			</div>
		</div>

		<p class="label" v-if="template !== null">Preview</p>
		<br />

		<div style="position:relative" class="gantt" id="GanttChartDIV"></div>
	</form>
</template>

<script>
import { crudInput } from "components";
import * as JSGantt from "jsgantt-improved";

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
		}
	},
	data() {
		return {
			dataBaru: TEMPLATE,
			template: null
		};
	},
	watch: {
		template: function(newQuery) {
			this.getChart(newQuery);
		}
	},
	methods: {
		getChart(val) {
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
				vUseSingleCell: 10000,
				vFormatArr: ["Day", "Week", "Month", "Quarter"],
				vAdditionalHeaders: {
					start: {
						title: "Start Date"
					},
					end: {
						title: "End Date"
					},
					duration: {
						title: "Duration"
					},
					team: {
						title: "Team"
					},
					pComp: {
						title: "Progress %"
					}
				}
			});
			g.setShowStartDate(0);
			g.setShowEndDate(0);
			g.setShowRes(0);
			g.setShowComp(0);
			g.setShowDur(0);
			g.setUseToolTip(0);
			g.setShowComp(0);
			g.setEventClickRow(function(e) {
				// console.log(e);
				// self.modalEvent(e);
				let taskID = e.getOriginalID();
				self.$parent.selectedTask = self.dataBaru.find(task => {
					return task.pID == taskID;
				});

				let lastActive = document.querySelector("tr.gname.is-active");
				if (lastActive !== null) {
					lastActive.classList.remove("is-active");
				}

				let childRow = e.getChildRow();
				let id_childRow = childRow.getAttribute("id");
				let id_row = id_childRow.replace("childrow", "child");
				document.querySelector("#" + id_row).classList.add("is-active");

				self.$parent.showSideBar = true;
			});
			this.dataBaru[val].forEach(d => {
				d.pGantt = g;
				g.AddTaskItemObject(d);
			});
			g.Draw();
		}
	}
};
</script>