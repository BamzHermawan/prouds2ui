import Vue from 'vue';
import 'helper-filter';
import Buefy from 'buefy';
import Moment from 'helper-moment';
import Loader from 'helper-loader';
import mapTable from './mapTable.vue';
import weekpicker from './weekpicker.vue';
import unitForm from './../selectUnit.vue';
import stackedChart from './stackedChart.vue';

import { Paging, PagingPage } from 'components';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: {
		mapTable,
		unitForm,
		weekpicker,
		stackedChart,
		Paging,
		PagingPage
	},
	data: {
		jumpStart: false,
		filterStart: null,
		filterEnd: null,
		unitID: null,
		chartData: undefined,
		currentPage: 'table'
	},
	computed: {
		minWeekEnd() {
			if (this.filterStart !== null) {
				return new Date(Moment(this.filterStart.end, 'DD/MM/YYYY'));
			}

			return undefined;
		},
		dateFilter() {
			if (this.filterStart == null) {
				const start = Moment().startOf('week').format('DD/MM/YYYY');
				const end = Moment().endOf('week').format('DD/MM/YYYY');

				return { start, end };
			} else {
				return this.getRange();
			}
		},
		exportFilter() {
			if (this.filterStart == null) {
				const start = new Date(Moment().startOf('week'));
				const end = new Date(Moment().endOf('week'));

				return { start, end };
			} else {
				const range = this.getRange();
				range.start = new Date(Moment(range.start, 'DD/MM/YYYY'));
				range.end = new Date(Moment(range.end, 'DD/MM/YYYY'));

				return range;
			}
		},
		isChartVisible() {
			return this.$refs.hasOwnProperty('cmChart');
		}
	},
	methods: {
		getRange() {
			const start = this.filterStart.start;
			let end = this.filterStart.end;

			if (this.filterEnd !== null) {
				end = this.filterEnd.end;
			}

			return { start, end };
		},
		selectUnit(unit) {
			this.unitID = unit;
			this.$refs.mapTable.reloadTable(this.getRange());
		},
		filterMap() {
			if (this.currentPage == "table") {
				this.$refs.mapTable.reloadMap(
					this.getRange()
				);
			} else if (this.currentPage == "chart") {
				this.$refs.cmChart.updateChart();
			}
		},
		startTable(startWeek) {
			if (!this.jumpStart) {
				this.jumpStart = true;
				this.filterStart = startWeek;

				if (this.unitID !== null) {
					this.$refs.mapTable.reloadTable(this.getRange());
				}
			}
		},
		changePage(key) {
			this.currentPage = key;
			this.$refs.paging.showPage(key);
		}
	},
	mounted() {
		Loader.hide();
	}
});