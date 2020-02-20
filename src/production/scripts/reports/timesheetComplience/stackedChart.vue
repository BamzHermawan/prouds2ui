<template>
	<center>
		<figure class="highcharts-figure">
			<div id="ComplienceChart"></div>
			<slot></slot>
		</figure>
	</center>
</template>

<script>
import Highcharts from "highcharts";
import { postAxios, parsedURL } from "helper-apis";
import { checkConnection, notified } from "helper-tools";
export default {
	props: {
		title: {
			type: String,
			default: "Stacked Column Chart"
		},
		start: {
			type: String,
			required: true
		},
		end: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			errorFetch: false,
			chart: undefined,
			config: {
				chart: {
					type: "column"
				},
				title: {
					text: this.title
				},
				xAxis: {
					categories: []
				},
				yAxis: {
					min: 0
				},
				tooltip: {
					pointFormat:
						"<span>{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>"
				},
				plotOptions: {
					column: {
						stacking: "percent"
					}
				},
				series: []
			}
		};
	},
	methods: {
		fetchData(start, end) {
			const self = this;
			const bundle = { start, end };
			postAxios(parsedURL("complienceChart", bundle), bundle)
				.then(res => {
					if (res.data.hasOwnProperty("category")) {
						self.config.xAxis.categories = res.data.category;
					}

					if (res.data.hasOwnProperty("series")) {
						self.config.series = res.data.series;
					}

					self.resetChart();
				})
				.catch(err => {
					if (self.errorFetch) return 0;

					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
						);

						self.errorFetch = true;
						setTimeout(() => (self.errorFetch = false), 5000);
					}
				});
		},
		updateChart() {
			this.fetchData(this.start, this.end);
		},
		resetChart() {
			this.chart = Highcharts.chart("ComplienceChart", this.config);
		}
	},
	created() {
		this.updateChart();
	}
};
</script>