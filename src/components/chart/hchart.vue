<template>
	<nav :class="'panel ' + panelType">
		<p class="panel-heading">
			{{ this.title }}
		</p>
		<div class="chart-container with-padding">
			<div :id="id" :style="style" class="chart"></div>
		</div>
	</nav>
</template>

<script>
import Highcharts from "highcharts";
import { isEmpty } from "helper-tools";
export default {
	props: {
		id: {
			type: String,
			required: true
		},
		width: {
			type: String,
			required: true
		},
		height: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: ""
		},
		panelType: {
			type: String,
			default: "is-dark"
		},
		xAxis: {
			required: true
		},
		yAxis: {
			required: true
		},
		series: {
			required: true
		},
		tooltipFormat: {
			default: undefined
		}
	},
	data() {
		return {
			chart: undefined,
			config: {
				chart: {
					zoomType: "x"
				},
				title: {
					text: ""
				},
				xAxis: this.xAxis,
				yAxis: this.yAxis,
				series: this.series
			}
		};
	},
	methods: {
		update(series) {
			this.config.series = series;
			this.chart = Highcharts.chart(this.id, this.config);
		}
		// parseTooltip() {
		// 	let link = this.tooltipFormat;
		// 	let bundle = {
		// 		x:
		// 	}
		// 	return link.replace(/\{\w*\}/g, function (prop) {
		// 		let val = prop.replace(/\{|\}/g, "");
		// 		return bundle[val];
		// 	});
		// }
	},
	computed: {
		style() {
			let style = "";
			style += "width:" + this.width + ";";
			style += "height:" + this.height + ";";

			return style;
		}
	},
	mounted() {
		if (this.tooltipFormat !== undefined) {
			this.config.tooltip = {
				formatter: this.tooltipFormat
			};
		}

		this.chart = Highcharts.chart(this.id, this.config);
	}
};
</script>