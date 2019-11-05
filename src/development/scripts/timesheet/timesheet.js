import Vue from 'vue';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import { crudInput } from 'components';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { crudInput },
	data: {
		minDate: new Date(),
		maxDate: new Date(),
		today: "",
		myTimesheet: MYTIMESHEET.sort((a, b) => new Date(a.start) - new Date(b.start)),
		tmp: [],
		showList: true,
		showForm: false,
		dataForm: []
	},
	methods: {
		getMonday() {
			let d = new Date();
			var day = d.getDay(),
				diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
			this.today = new Date(d.setDate(diff));
			this.minDate = new Date(
				this.today.getFullYear(),
				this.today.getMonth(),
				this.today.getDate() - 7
			)
			this.maxDate = new Date(
				this.today.getFullYear(),
				this.today.getMonth(),
				this.today.getDate() + 6
			)
		},
		sortDate() {

			for (let index = 0; index < this.myTimesheet.length; index++) {

				let a = this.myTimesheet[index].start

				if (this.tmp.indexOf(a) < 0) {
					this.tmp.push(a)
				}
			}
		},
		setTimesheet(val) {
			this.showList = !this.showList
			this.showForm = !this.showForm
			this.dataForm = val

			document.querySelector('.contentPage').scrollTop = 0;
			global.psContent.update();
		}
	},
	mounted() {
		this.sortDate()
		this.getMonday()
		Loader.hide();
	}
});