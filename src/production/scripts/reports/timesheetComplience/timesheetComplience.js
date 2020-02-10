import Vue from 'vue';
import 'helper-filter';
import Buefy from 'buefy';
import Moment from 'helper-moment';
import Loader from 'helper-loader';
import mapTable from './mapTable.vue';
import weekpicker from './weekpicker.vue';
import unitForm from './../selectUnit.vue';
import { getUserActivityByDate } from 'helper-apis';
import { checkConnection, notified } from "helper-tools";

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { mapTable, unitForm, weekpicker },
	data: {
		filterStart: null,
		filterEnd: null,
		unitID: null,
		modal_act: {
			display: false,
			loading: false,
			fetchError: false,
			date: null,
			user: {
				name: "-",
				nik: "-",
			},
			timesheet: []
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
			this.$refs.mapTable.reloadTable(
				unit, this.getRange()
			);
		},
		filterMap() {
			this.$refs.mapTable.reloadMap(
				this.getRange()
			);
		},
		displayDetailModal(data) {
			console.log(data);
			this.modal_act.user.nik = data.user.nik;
			this.modal_act.user.name = data.user.name;
			this.modal_act.date = data.day.date;
			this.fetchTimesheet(data.user.nik, data.day.date, data.day.value);

			this.modal_act.display = true;
		},
		fetchTimesheet(nik, date, workhour) {
			let self = this;
			this.modal_act.loading = true;
			getUserActivityByDate(nik, date, workhour)
				.then(res => {
					let ts = res.data;
					if (ts instanceof Array) {
						self.modal_act.timesheet = ts;
					}
				}).catch(err => {
					if (self.modal_act.fetchError) return 0;

					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
						);

						self.modal_act.fetchError = true;
						setTimeout(() => (self.errorFetch = false), 5000);
					}
				}).finally(() => self.modal_act.loading = false);
		},
		startTable(startWeek) {
			this.filterStart = startWeek;

			if (this.unitID !== null) {
				this.$refs.mapTable.reloadTable(
					this.unitID, this.getRange()
				);
			}
		}
	},
	mounted() {
		Loader.hide();
	}
});