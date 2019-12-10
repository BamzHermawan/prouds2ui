import Vue from 'vue';
import 'helper-filter';
import Buefy from 'buefy';
import { hChart } from "components";
import pindexTable from './pIndex.vue';
import { animate, checkConnection } from "helper-tools";
import { getPIndexChart } from 'helper-apis';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { hChart, pindexTable },
	data: {
		chartIsOpen: false,
		toggleIsLoading: false,
		project_id: "",
		task: "total",
		spiChart: {
			series: [
				{
					type: 'line',
					name: 'ΣT Actual',
					color: '#48c774',
					data: []
				}, 
				{
					type: 'line',
					name: 'ΣT Plan',
					color: '#3298dc',
					data: []
				},
				{
					type: 'column',
					name: 'Gap',
					color: '#ffdd57',
					data: []
				},
			],
			xAxis: {
				title: {
					text: "Week"
				}
			},
			yAxis: {
				title: {
					text: "Progress"
				}
			}
		},
		pvrChart: {
			series: [
				{
					type: 'column',
					name: 'Plan',
					color: '#3298dc',
					data: []
				},
				{
					type: 'column',
					name: 'Actual',
					color: '#48c774',
					data: []
				}
			],
			xAxis: {
				title: {
					text: "Week"
				}
			},
			yAxis: {
				title: {
					text: "Progress"
				}
			}
		}
	},
	methods: {
		fetchChart(task_id = null){
			if(task_id == null) {
				return false;
			}

			if (!checkConnection(this.$notification)) {
				this.toggleIsLoading = false;
				return false;
			}

			let self = this;
			return getPIndexChart(this.project_id, task_id)
			.catch(err => {
				console.log(err);
				notified(self.$notification).error(
					"Sorry we are encountering a problem, please try again later. 🙏"
				);
			})
			.then(fetched => {
				self.spiChart.series[0].data = fetched.sigma_actual;
				self.spiChart.series[1].data = fetched.sigma_plan;
				self.spiChart.series[2].data = fetched.gap;

				self.pvrChart.series[0].data = fetched.plan;
				self.pvrChart.series[1].data = fetched.actual;

				self.$refs.spiChart.update(self.spiChart.series);
				self.$refs.pvrChart.update(self.pvrChart.series);

				self.toggleIsLoading = false;
				self.toggleChart();
			});
		},
		toggleChart() {
			let self = this;
			if(this.toggleIsLoading){
				return false;
			}

			this.toggleIsLoading = true;
			if (!this.chartIsOpen) {
				document.querySelector('.pindex-table-container').classList.remove('fadeIn');
				animate('.pindex-table-container', 'fadeOut', (el) => {
					el.classList.add('fadeIn');
					self.chartIsOpen = !self.chartIsOpen;
					self.toggleIsLoading = !self.toggleIsLoading;
				});
			} else {
				document.querySelector('.pindex-chart-container').classList.remove('fadeIn');
				animate('.pindex-chart-container', 'fadeOut', (el) => {
					el.classList.add('fadeIn');
					self.chartIsOpen = !self.chartIsOpen;
					self.toggleIsLoading = !self.toggleIsLoading;
				});
			}
		},
		openChart(task){
			if (this.chartIsOpen) {
				this.toggleChart();
			} else {
				let id = task;
				this.task = task;
				if(task !== 'total'){
					id = task.id;
				}

				this.toggleIsLoading = true;
				this.fetchChart(id);
			}
		}
	},
	mounted() {
		this.project_id = this.$refs.project_id.innerHTML;
		global.$loader.hide();
	}
});
