<template>
	<div
		:id="id"
		:style="
			'width: ' +
				checkWidth +
				'; height: ' +
				checkHeight +
				'; max-width: 400px; margin: 0 auto'
		"
	></div>
</template>

<script>
import Highcharts from "highcharts";
export default {
	props: {
		id: String,
		width: String,
		height: String,
		title: String,
		color: Array,
		data: {
			type: Array,
			required: true
		}
	},
	data() {
		return {};
	},
	computed: {
		checkWidth() {
			return this.width === undefined ? "100%" : this.width;
		},
		checkHeight() {
			return this.height === undefined ? "290px" : this.height;
		}
	},
	methods: {
		getChart() {
			Highcharts.chart(this.id, {
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: "pie"
				},
				title: {
					text: this.title
				},
				colors: this.color,
				tooltip: {
					pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
				},
				plotOptions: {
					pie: {
						innerSize: 130,
						depth: 150,
						allowPointSelect: true,
						cursor: "pointer",
						dataLabels: {
							enabled: false
						},
						showInLegend: true
					}
				},
				series: [
					{
						name: "Brands",
						colorByPoint: true,
						data: this.data
					}
				]
			});
		}
	},
	mounted() {
		this.getChart();
	}
};
</script>