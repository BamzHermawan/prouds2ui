import Vue from 'vue';
import Buefy from 'buefy';
import Axios from 'axios';
import Loader from 'helper-loader';
import { notified, animate } from 'helper-tools';
import ContentPage from "./contentPage.vue";

function numberPretty(str) {
	str += "";
	var x = str.split(".");
	var x1 = x[0];
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1" + "," + "$2");
	}

	return x1;
}

Vue.use(Buefy);
new Vue({
	el: '#vapp',
	components: {
		ContentPage
	},
	data: {
		editPlan: false,
		loadingSavePlan: false,
		planSums: {
			qty: 0,
			mandays: 0,
			total: 0
		},
		planResource: {}
	},
	methods: {
		cancelEditPlan() {
			this.cycleTablePlan();
			this.editPlan = false;
		},
		saveEditPlan() {
			let cook = [];
			let columns = document.getElementsByClassName('is-days-has-input');
			let apiURL = document.querySelector('#tablePlan>tbody').dataset.url;
			for (let i = 0; i < columns.length; i++) {
				let dataset = columns[i].parentElement.dataset;
				cook.push({
					refId: dataset.id,
					days: dataset.days,
					qty: dataset.qty,
					rate: dataset.rate,
					total: dataset.total,
					mandays: dataset.mandays
				});
			}

			let cooked = new FormData();
			cooked.set('data', JSON.stringify({
				projectId: this.$refs.content.projectId,
				allocation: cook
			}));

			let self = this;
			Axios.post(apiURL, cooked, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}
			).then(({ data }) => {
				if (data.status) {
					notified(self.$notification).success(data.message);
					self.cycleTablePlan(true);
				} else {
					notified(self.$notification).error(data.message);
					self.cycleTablePlan(true);
				}

				let el = document.getElementById('is-alert-message');
				console.log(el.classList);
				if (data.warning) {
					if (el.classList.contains('is-hidden')) {
						el.classList.remove('fadeOutUp');
						el.classList.add('fadeInDown');
						el.classList.remove('is-hidden');
					}
				} else {
					if (!el.classList.contains('is-hidden')) {
						el.classList.remove('fadeInDown');
						animate('#is-alert-message', 'fadeOutUp', (target) => {
							target.classList.add('is-hidden');
						})
					}
				}

				self.editPlan = false;
			}).catch(() => {
				notified(self.$notification).error("Sorry, we can't connect to the server. Please try again later. 🙏");
			})
		},
		cycleTablePlan(acceptNewValue = false) {
			let columns = document.getElementsByClassName('is-days-has-input');
			this.planSums.qty = 0;
			this.planSums.mandays = 0;
			this.planSums.total = 0;

			for (let i = 0; i < columns.length; i++) {
				let column = columns[i];
				let dataset = column.parentElement.dataset;
				let input = column.children[1];

				// Checking if the input have value already
				if (input.value !== undefined && input.value !== null && input.value !== "") {
					// if the days need to be overwrite with input value
					if (acceptNewValue) {
						dataset.days = input.value;
					} else {
						dataset.days = dataset.curDays;
					}
				}

				input.value = dataset.days;
				dataset.curDays = dataset.days;

				console.log(column.children);
				this.calculatePlan(dataset.id, dataset);
			}

			this.calculateSums();
		},
		daysChange({ target }) {
			let dataset = target.parentElement.parentElement.dataset;
			this.calculatePlan(dataset.id, dataset, target.value);
		},
		$val(id, key) {
			let plan = this.resplan[id];
			if (typeof plan === "object" && plan.hasOwnProperty(key)) {
				return plan[key];
			} else {
				return 1;
			}
		},
		calculatePlan(id, dataset, days_val = undefined) {
			if (days_val !== undefined) {
				dataset.days = days_val;
			}

			dataset.mandays = dataset.qty * dataset.days;
			dataset.total = dataset.rate * dataset.mandays;

			let qty = document.getElementsByClassName('val-' + id + '-qty')[0];
			let days = document.getElementsByClassName('val-' + id + '-days')[0];
			let rate = document.getElementsByClassName('val-' + id + '-rate')[0];
			let total = document.getElementsByClassName('val-' + id + '-total')[0];
			let mandays = document.getElementsByClassName('val-' + id + '-mandays')[0];

			qty.innerHTML = dataset.qty;
			days.innerHTML = dataset.days;
			rate.innerHTML = numberPretty(dataset.rate);
			total.innerHTML = numberPretty(dataset.total);
			mandays.innerHTML = numberPretty(dataset.mandays);

			this.planResource[dataset.id] = dataset;
			this.calculateSums();

			return dataset;
		},
		calculateSums() {
			this.planSums = {
				qty: 0,
				mandays: 0,
				total: 0
			};

			for (const key in this.planResource) {
				let row = this.planResource[key];
				this.planSums.qty += parseInt(row.qty);
				this.planSums.total += parseInt(row.total);
				this.planSums.mandays += parseInt(row.mandays);
			}
		}
	},
	filters: {
		numformat(value) {
			return numberPretty(value);
		}
	},
	mounted() {
		this.cycleTablePlan();
		Loader.hide();
	}
});