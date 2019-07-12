<template>
	<v-chart :dataBaru="dataBaru"></v-chart>
</template>

<script>
import vChart from "../components/ganttchart";

export default {
	components: {
		vChart
	},
	data() {
		return {
			dataBaru: DATA
		};
	}
};
</script>