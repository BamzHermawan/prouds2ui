<template>
	<v-chart></v-chart>
	<!-- <v-highchart :dataBaru="dataBaru"></v-highchart> -->
</template>

<script>
import vChart from "../components/highchart";

export default {
	components: {
		vChart
	},
	data() {
		return {
			// dataBaru: DATA
		};
	}
};
</script>