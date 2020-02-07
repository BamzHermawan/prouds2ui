<template>
	<div ref="container" style="position:relative" class="gantt"></div>
</template>

<script>
const initGANTT = (el, onclick) => {
	const gchart = new JSGantt.GanttChart(el, "day");

	gchart.setOptions({
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
			mandays: {
				title: "Mandays"
			},
			weightPercent: {
				title: "Weight (%)"
			},
			pComp: {
				title: "Progress (%)"
			},
			roleName: {
				title: "Role"
			}
		},
		vUseSingleCell: 10000,
		vFormatArr: ["Day", "Week", "Month", "Quarter"]
	});

	gchart.setShowRes(0);
	gchart.setShowComp(0);
	gchart.setShowDur(0);
	gchart.setUseToolTip(0);
	gchart.setShowComp(0);
	gchart.setEventClickRow(onclick);

	return gchart;
};

export default {
	props: {
		actionEvent: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			tasks: []
		};
	},
	methods: {
		chartClickEvent(event) {
			let taskID = event.getOriginalID();
			let selectedTask = this.tasks.find(task => {
				return task.pID == taskID;
			});

			let lastActive = document.querySelector("tr.gname.is-active");
			if (lastActive !== null) {
				lastActive.classList.remove("is-active");
			}

			let childRow = event.getChildRow();
			let id_childRow = childRow.getAttribute("id");
			let id_row = id_childRow.replace("childrow", "child");
			document.querySelector("#" + id_row).classList.add("is-active");

			this.$emit("select", selectedTask);
		},

		loadChart(tasks) {
			const gantt = initGANTT(this.$refs.container, this.chartClickEvent);

			for (let i = 0; i < tasks.length; i++) {
				const task = tasks[i];
				task.pGantt = gantt;
				gantt.AddTaskItemObject(task);
			}

			gantt.Draw();
			this.tasks = tasks;
		}

		// modalEvent(e) {
		// 	this.modal.display = true;
		// 	this.modal.title = "Edit " + e.getName();
		// 	this.modal.StartDate = e.getStart();
		// 	this.modal.EndDate = e.getEnd();
		// 	this.modal.duration = e.getDuration();
		// 	let eventID = e.getOriginalID();

		// 	this.modal.data = this.workplan.find(task => {
		// 		return task.pID == eventID;
		// 	});
		// }
	},
	mounted() {
		let implantTag = document.querySelector("#GanttJSON");
		if (implantTag == null) {
			implantTag = document.querySelector("#implantedJSON");
			const bulk = JSON.parse(implantTag.innerHTML);
			this.loadChart(bulk.GANTT);
		} else {
			this.loadChart(JSON.parse(implantTag.innerHTML));
		}
	}
};
</script>