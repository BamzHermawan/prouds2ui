<template>
	<div :id="id" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
</template>

<script>
import Highcharts from "highcharts";
import Axios from "axios";
import moment from "helper-moment";
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
					zoomType: "x"
				},
				title: {
					text: this.title
				},
				subtitle: {
					text:
						document.ontouchstart === undefined
							? "Click and drag in the plot area to zoom in"
							: "Pinch the chart to zoom in"
				},
				xAxis: {
					type: "datetime"
				},
				yAxis: {
					title: {
						text: ""
					}
				},
				legend: {
					enabled: false
				},
				plotOptions: {
					area: {
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, Highcharts.getOptions().colors[0]],
								[
									1,
									Highcharts.Color(
										Highcharts.getOptions().colors[0]
									)
										.setOpacity(0)
										.get("rgba")
								]
							]
						},
						marker: {
							radius: 2
						},
						lineWidth: 1,
						states: {
							hover: {
								lineWidth: 1
							}
						},
						threshold: null
					}
				},

				series: [
					{
						type: "area",
						name: this.title,
						data: this.dataChart
					}
				]
			});

			// Highchart Donut
			// Highcharts.chart(this.id, {
			// chart: {
			// 	plotBackgroundColor: null,
			// 	plotBorderWidth: null,
			// 	plotShadow: false,
			// 	type: "pie"
			// },
			// title: {
			// 	text: this.title
			// },
			// colors: this.color,
			// tooltip: {
			// 	pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
			// },
			// plotOptions: {
			// 	pie: {
			// 		innerSize: 130,
			// 		depth: 150,
			// 		allowPointSelect: true,
			// 		cursor: "pointer",
			// 		dataLabels: {
			// 			enabled: false
			// 		},
			// 		showInLegend: true
			// 	}
			// },
			// series: [
			// 	{
			// 		name: "Brands",
			// 		colorByPoint: true,
			// 		data: this.dataChart
			// 	}
			// ]
			// })
		},
		fetchdataChart() {
			let self = this;
			return Axios.get(this.dataBae)
				.then(function(response) {
					// handle success
					// self.dataChart = response.data[self.namadata];
					let dataChart = response.data[self.namadata];
					for (let index = 0; index < dataChart.length; index++) {
						const element = dataChart[index];
						console.log(element[0]);
						dataChart[index][0] = moment(
							element[0],
							"DD/MM/YYYY"
						).valueOf();
					}
					self.dataChart = dataChart;
				})
				.catch(function(error) {
					// handle error
					self.$toast.open({
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