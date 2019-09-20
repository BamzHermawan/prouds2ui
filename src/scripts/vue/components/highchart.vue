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
import Axios from "axios";
export default {
	props: {
		id: String,
		width: String,
		height: String,
		namadata: String,
		title: String,
		color: Array,
		dataBae: {
			required: true
		}
	},
	data() {
		return {
			dataChart: []
		};
	},
	watch: {
		data(newdata, olddata) {
			if (newdata !== olddata) {
				this.getChart();
			}
		}
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
						data: this.dataChart
					}
				]
			});
		},
		fetchdataChart() {
			let self = this;
			return Axios.get(this.dataBae)
				.then(function(response) {
					// handle success
					self.dataChart = response.data[self.namadata];
				})
				.catch(function(error) {
					// handle error
					self.$buefy.toast.open({
						duration: 5000,
						message: `Mohon Maaf, Kami tidak dapat menghubungi server terkait data dataChart.`,
						position: "is-top",
						type: "is-danger"
					});
				});
		}
	},
	mounted() {
		console.log(typeof this.dataBae);
		if (typeof this.dataBae == "string") {
			let self = this;
			this.fetchdataChart().then(function() {
				self.getChart();
			});
		} else {
			let self = this;
			self.dataChart = this.dataBae;
			self.getChart();
		}
	}
};
</script>