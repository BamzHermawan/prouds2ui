import Vue from 'vue';
import Buefy from 'buefy';
import Api from 'helper-apis';
import Loader from 'helper-loader';
import Moment from 'helper-moment';
import { checkConnection, notified, isEmpty } from 'helper-tools';
import { crudInput, progressBar, taskGroup, taskCard } from 'components';
import 'helper-filter';

Vue.use(Buefy);
new Vue({
	el: '#contentApp',
	components: { crudInput, progressBar, taskGroup, taskCard },
	data: {
		minDate: new Date(),
		maxDate: new Date(),
		workhour: {
			value: null,
			alert: ''
		},
		task: {
			ongoing: ONGOING,
			delayed: DELAYED,
			scheduled: PLANNED
		},
		tmp: [],
		showList: true,
		showForm: false,
		dataForm: {
			iwo: "-",
			project_id: '-',
			task_id: '-',
			pm_name: '-',
			project_name: "",
			task: '',
			start: Moment().format('DD/MM/YYYY'),
			end: Moment().format('DD/MM/YYYY'),
		},
		rangeToggle: false,
		endWorkload: Moment().format('MMMM YYYY'),
		datepicker: {
			alert: false,
			start: {
				val: null,
				focused: new Date(),
				selected: Moment().format('MMMM - YYYY')
			},
			end: {
				val: null,
				focused: new Date(),
				selected: Moment().format('MMMM - YYYY')
			},
			filled: []
		},
		modal: {
			singleDate: false,
			rangeDate: false
		},
	},
	methods: {
		checkForFloat(val){
			this.workhour.value = val + 1;
		},
		getFilled(id, start, end){
			let self = this;
			Api.filledTimesheet(id, start, end)
				.then(response => {
					let filled = response.data;
					for (let i = 0; i < filled.length; i++) {
						let tsDate = filled[i];
						self.datepicker.filled.push({
							date: new Date(Moment(tsDate, 'DD/MM/YYYY')),
							type: 'is-warning'
						});
					}
				}).catch(() => {
					if (checkConnection(self.$notification)) {
						notified(self.$notification).error(
							"Sorry we are encountering a problem, please try again later. 🙏"
						);
					}
				})
		},
		getMinDate(){
			return new Date(Moment(this.dataForm.start, 'DD/MM/YYYY'));
		},
		submitForm(e){
			if(this.datepicker.start.val === null){
				e.preventDefault();
				this.datepicker.alert = true;

				let self = this;
				setTimeout(() => {
					self.datepicker.alert = false;
				}, 5000);
			}

			if(this.workhour.value === null){
				e.preventDefault();
				this.workhour.alert = 'Please insert how much hour you work on this task';

				let self = this;
				setTimeout(() => {
					self.workhour.alert = '';
				}, 5000);
			} else if (this.workhour.value > 24 || this.workhour.value < 1) {
				e.preventDefault();
				this.workhour.alert = 'In a day there is only 24 hour, please insert the right amount';

				let self = this;
				setTimeout(() => {
					self.workhour.alert = '';
				}, 5000);
			}
		},
		openModalDate(){
			if(this.rangeToggle){
				this.modal.rangeDate = true;
			}else{
				this.modal.singleDate = true;
			}
		},
		setTimesheet(val) {
			let maxDate = new Date();
			if(Moment().isAfter(Moment(val.end, 'DD/MM/YYYY'))){
				maxDate = new Date(Moment(val.end, 'DD/MM/YYYY'));
			}

			this.getFilled(val.assignment_id, val.start, val.end);

			this.showList = !this.showList
			this.showForm = !this.showForm
			this.dataForm = val
			this.datepicker = {
				alert: false,
				start: {
					val: null,
					focused: maxDate,
					selected: Moment(maxDate).format('MMMM - YYYY')
				},
				end: {
					val: null,
					focused: maxDate,
					selected: Moment(maxDate).format('MMMM - YYYY')
				},
				filled: []
			}

			document.querySelector('.contentPage').scrollTop = 0;
			global.psContent.update();
		},
		formatSizeString(size) {
			let counter = 0;
			while (size > 1000) {
				size = size / 1000;
				counter++;
			}

			if (counter == 0) {
				size = size.toFixed(0) + " Byte";
			} else if (counter == 1) {
				size = size.toFixed(1) + " KB";
			} else if (counter == 2) {
				size = size.toFixed(1) + " MB";
			} else if (counter == 3) {
				size = size.toFixed(1) + " GB";
			} else {
				size = size.toFixed(2);
			}

			return size;
		},
		sortTask(task){
			return task.sort((a, b) => {
				let aMom = Moment(a.start, "DD/MM/YYYY");
				let bMom = Moment(b.start, "DD/MM/YYYY");

				if (aMom.isBefore(bMom)) {
					return -1;
				}
				
				if (bMom.isBefore(aMom)) {
					return 1;
				}
				
				return 0;
			});
		},
		groupByMonth(task){
			if(task.length <= 0){
				return [];
			}

			let cooked = [];
			let current = Moment(task[0].start, 'DD/MM/YYYY');

			let cook = [];
			let month = Moment(task[0].start, 'DD/MM/YYYY');
			for (let idx = 0; idx < task.length; idx++) {
				month = Moment(task[idx].start, 'DD/MM/YYYY');
				if(current.month() == month.month()){
					cook.push(task[idx]);
				}else{
					cooked.push({
						month: current.format('MMMM'),
						list: cook
					});

					cook = [];
					cook.push(task[idx]);
					current = month;
				}
			}

			if(cook.length > 0){
				cooked.push({
					month: month.format('MMMM'),
					list: cook
				});
			}

			return cooked;
		},
		selectMonth(key){
			this.datepicker[key].focused = new Date(Moment(this.datepicker[key].selected, 'MMMM - YYYY'));
		},
		changeSelectedMonth(key, tgl) {
			this.datepicker[key].val = tgl;
			this.datepicker[key].focused = tgl;
			this.datepicker[key].selected = Moment(tgl).format('MMMM - YYYY');
		},
		checkWorkloadEnd(scheduled) {
			let morefar = Moment();

			for (let x = 0; x < this.task.ongoing.length; x++) {
				const task = this.task.ongoing[x];
				let end = Moment(task.end, 'DD/MM/YYYY');
				if (morefar.isBefore(end)) {
					morefar = end;
				}
			}

			for (let y = 0; y < scheduled.length; y++) {
				const task = scheduled[y];
				let end = Moment(task.end, 'DD/MM/YYYY');
				if (morefar.isBefore(end)) {
					morefar = end;
				}
			}

			this.endWorkload = morefar.format('MMMM YYYY');
		}
	},
	computed: {
		startDate(){
			if(this.datepicker.start.val === null){
				return null;
			}else{
				return Moment(this.datepicker.start.val).format('DD/MM/YYYY');
			}
		},
		endDate(){
			if (this.datepicker.end.val === null) {
				return this.startDate;
			} else {
				return Moment(this.datepicker.end.val).format('DD/MM/YYYY');
			}
		},
		monthList(){
			let today = Moment();
			let min = Moment(this.dataForm.start, 'DD/MM/YYYY');
			let list = [];
			let detector = true;

			while (detector) {
				list.push({
					label: min.format('MMMM - YYYY'),
					date: new Date(min)
				});

				if(today.format('MM/YYYY') === min.format('MM/YYYY')){
					detector = false;
				}else{
					let endTask = Moment(this.dataForm.end, 'DD/MM/YYYY').format('MM/YYYY');
					if(endTask === min.format('MM/YYYY')){
						detector = false;
					}else{
						min.add(1, 'M');
					}
				}
			}

			return list;
		},
		selectedDateList(){
			let list = [];
			let start = this.datepicker.start.val;
			let end = this.datepicker.end.val;

			if(start !== null && end !== null){
				start = Moment(start);
				end = Moment(end);
				if (start.isBefore(end)){
					let detector = true;

					while (detector) {
						list.push({
							date: new Date(start),
							type: 'is-success'
						});

						if (start.isSame(end)) {
							detector = false;
						} else {
							start.add(1, 'days');
						}
					}
				}
			}

			return this.datepicker.filled.concat(list);
		},
		timesheetDate(){
			let start = this.datepicker.start.val;
			let end = this.datepicker.end.val;
			let setMoment = (tgl, format = 'DD MMM YYYY') => {
				return Moment(tgl).format(format);
			}

			if(start != null){
				if (end === null){
					this.changeSelectedMonth('end', this.datepicker.start.val);
					end = this.datepicker.end.val;
				}

				if (Moment(end).isBefore(Moment(start))) {
					this.changeSelectedMonth('end', this.datepicker.start.val);
					end = this.datepicker.end.val;
				}

				if(this.rangeToggle){
					return setMoment(start) + ' - ' + setMoment(end)
				}else{
					this.changeSelectedMonth('end', this.datepicker.start.val);
					return setMoment(start, 'dddd, DD MMMM YYYY');
				}
			}else{
				return "Choose Timesheet Date";
			}
		},
		determineFieldStatus() {
			if (!this.fileValidation) {
				return "is-danger";
			}

			if (this.selectedDocument === null) {
				return "";
			}

			return "is-success";
		}
	},
	mounted() {
		let task = this.task;

		this.task.ongoing = this.sortTask(task.ongoing);
		this.task.delayed = this.sortTask(task.delayed);

		let scheduled = this.sortTask(task.scheduled);
		this.task.scheduled = this.groupByMonth(scheduled);
		this.checkWorkloadEnd(scheduled);


		Loader.hide();
	}
});