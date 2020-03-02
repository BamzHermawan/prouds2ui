import Vue from 'vue';
import Buefy from 'buefy';
import Moment from 'helper-moment';
import { getBASTPlanDetail } from 'helper-apis';
import { Paging, PagingPage } from 'components';
import { notified, checkConnection } from 'helper-tools';
import 'helper-filter';

const implantTag = document.querySelector('#implantedJSON');
const implant = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { Paging, PagingPage },
	data: {
		plans: [],
		review: {
			display: false,
			feasibility: "FALSE",
			editable: true,
			isLoading: true
		},
		detail: {
			isLoading: false,
			plan: {
				id: ''
			}
		}
	},
	beforeMount() {
		let plans = implant;

		for (let i = 0; i < plans.length; i++) {
			plans[i].raw_related = plans[i].related_top;

			let related = plans[i].related_top.shift();
			plans[i].related_id = related.id;
			plans[i].related_target = related.target_top;
		}

		this.plans = plans;
	},
	computed: {
		openedPlan() {
			let opened = [];
			this.plans.forEach(plan => opened.push(plan.id));
			return opened;
		},
		totalAmount() {
			if (this.plans.length > 1) {
				return this.plans.reduce((sum, plan) => {
					if (sum instanceof Object) {
						return sum.amount + plan.amount;
					} else {
						return sum + plan.amount;
					}
				});
			} else {
				return 0;
			}
		}
	},
	methods: {
		targetStatus(plan) {
			const tplan = Moment(plan.target_date, 'DD/MM/YYYY');

			let max = Moment(plan.related_target, 'DD/MM/YYYY');
			let min = Moment(plan.related_target, 'DD/MM/YYYY');
			plan.raw_related.forEach(row => {
				let curr = Moment(row.target_top, 'DD/MM/YYYY');
				if (curr.isAfter(max)) {
					max = curr;
				}

				if (curr.isBefore(min)) {
					min = curr;
				}
			});

			if (tplan.isAfter(max)) {
				return "has-text-danger";
			} else if (tplan.isBefore(min)) {
				return "has-text-success";
			} else {
				return "";
			}
		},
		targetTooltip(plan) {
			let status = this.targetStatus(plan);
			if (status === "has-text-danger") {
				return {
					type: 'is-danger',
					label: 'Behind'
				}
			} else if (status === "has-text-success") {
				return {
					type: 'is-success',
					label: 'Ahead'
				}
			} else {
				return {
					type: 'is-light',
					label: 'Normal'
				}
			}
		},
		openDetail(id) {
			this.fetchDetail(id);
			this.detail.plan.id = id;
			this.$refs.paging.showPage("detail");
		},
		openTable() {
			this.$refs.paging.showPage();
		},
		fetchDetail(id) {
			const self = this;
			self.detail.isLoading = true;
			getBASTPlanDetail(id)
				.then(({ data }) => {
					self.detail.plan = {
						id: self.detail.plan.id,
						sequence: data.sequence,
						order_no: data.order_no,
						type: data.type,
						amount: data.amount,
						plan_date: data.plan_date,
						last_target: data.last_target,
						description: data.description
					};
				})
				.catch(error => {
					console.log(error);
					self.openTable();

					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem.<br>Your connection to our server is timeout. 🙏"
						);
					}
				})
				.finally(() => self.detail.isLoading = false);
		},
		determineReview() {
			if (!this.$refs.hasOwnProperty('feasible')) {
				setTimeout(this.determineReview, 100);
			}

			const feasibility = this.$refs.feasible.getAttribute('data-feasible');
			if (feasibility.toLowerCase() == 'true') {
				this.review.feasibility = "TRUE";
				this.review.editable = false;
			}

			this.review.isLoading = false;
		},
		openReview() {
			this.review.display = true;
			setTimeout(this.determineReview, 100);
		}
	},
	mounted() {
		global.$loader.hide();
	},
	filters: {
		validata(val) {
			if (val !== undefined) {
				return val;
			} else {
				return "-";
			}
		}
	}
});