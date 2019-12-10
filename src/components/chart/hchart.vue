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
		}
	},
	data() {
		return {
			chart: undefined,
			config: {
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
		this.chart = Highcharts.chart(this.id, this.config);
	}
};
</script>