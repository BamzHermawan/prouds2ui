<template>
	<div id="gantt_here" style="width:100%; height:400px;"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";

export default {
	data() {
		return {
			task: {
				data: DATA.data,
				links: DATA.links
			}
		};
	},
	mounted() {
		gantt.init("gantt_here");

		gantt.parse(this.task);
	}
};
</script>